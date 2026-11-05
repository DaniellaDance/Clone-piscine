const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/server.js','utf8').split('// Direct image declarations')[0];
let room,players,current,attempts,question;
function reset(){room={code:'ABC123',status:'playing',turn_no:0,session_number:1};players=[{id:'a',name:'A',animal:'fox',position:0,altitude:0,correct:0,active:true,skipped_quests:[],finished_at:null}];current={player_id:'a',question_id:'q1',created_at:new Date()};attempts=[];question={id:'q1',quest:1,difficulty:'easy',options_ru:['yes','no'],correct_index:0,explanation_ru:'test'};}
const rows=arr=>({rows:arr,rowCount:arr.length});
const client={release(){},async query(sql,args=[]){
 if(['BEGIN','COMMIT','ROLLBACK'].includes(sql))return rows([]);
 if(sql.startsWith('WITH earned'))return rows(players.map(p=>({player_id:p.id,units:attempts.filter(a=>a.player_id===p.id&&a.correct).reduce((n,a)=>n+({easy:1,medium:3,hard:9}[a.difficulty]),0)})));
 if(sql.startsWith('WITH history'))return rows([{id:question.id}]);
 if(sql.startsWith('SELECT count(*)'))return rows([{n:attempts.length}]);
 if(sql.includes('FROM mountain_rooms'))return rows([{...room}]);
 if(sql.startsWith('SELECT * FROM mountain_questions'))return rows([{...question}]);
 if(sql.includes('FROM mountain_players WHERE id='))return rows(players.filter(p=>p.id===args[0]).map(p=>({...p})));
 if(sql.includes('FROM mountain_players'))return rows(players.filter(p=>!sql.includes('active AND finished_at IS NULL')||(p.active&&!p.finished_at)).map(p=>({...p})));
 if(sql.includes('JOIN mountain_questions'))return rows(current?[{...question,created_at:current.created_at}]:[]);
 if(sql.includes('FROM mountain_current'))return rows(current?[{...current}]:[]);
 if(sql.startsWith('INSERT INTO mountain_attempts')){attempts.push({player_id:args[2],correct:args[3],difficulty:question.difficulty});return rows([])}
 if(sql.startsWith('INSERT INTO mountain_answers'))return rows([]);
 if(sql.startsWith('DELETE FROM mountain_current')){current=null;return rows([])}
 if(sql.startsWith('INSERT INTO mountain_current')){current={player_id:args[1],question_id:args[2],created_at:new Date()};return rows([])}
 if(sql.startsWith('UPDATE mountain_players SET altitude=$2')){const p=players.find(p=>p.id===args[0]);p.altitude=args[1];p.skipped_quests.push(args[2]);p.finished_at=p.altitude>=12000?new Date():null;return rows([])}
 if(sql.startsWith('UPDATE mountain_players SET altitude=LEAST')){const p=players.find(p=>p.id===args[0]);p.altitude=Math.min(12000,p.altitude+100);p.correct++;if(p.altitude===12000)p.finished_at=new Date();return rows([])}
 if(sql.startsWith("UPDATE mountain_rooms SET status='finished'")){room.status='finished';return rows([])}
 if(sql.startsWith('UPDATE mountain_rooms SET turn_no=')){room.turn_no=args[1];if(args[2])room.status=args[3];return rows([])}
 throw Error('Unhandled test query: '+sql);
}};
const context={require:name=>name==='pg'?{Pool:class{async connect(){return client}}}:require(name),console,process,Date};vm.createContext(context);vm.runInContext(source+'\nthis.testApi={action,coinBalance,coinWinners};',context);const {action,coinBalance,coinWinners}=context.testApi;
const call=(actionName,extra={})=>action({action:actionName,code:'ABC123',id:'a',...extra});
(async()=>{
 for(let units=0;units<1000;units++){const w=coinBalance(units);assert.equal(w.gold*9+w.silver*3+w.copper,units);assert.ok(w.copper<3&&w.silver<3)}
 assert.equal(coinBalance(3).silver,1);assert.equal(coinBalance(9).gold,1);assert.equal(coinBalance(62).gold,6);assert.equal(coinBalance(63).gold,7);
 for(const [difficulty,expected] of [['easy',1],['medium',3],['hard',9]]){reset();question.difficulty=difficulty;let out=await call('answer',{choice:1,questionId:'q1'});assert.equal(out.players[0].coins.units,0);out=await call('answer',{choice:0,questionId:'q1'});assert.equal(out.players[0].coins.units,expected);assert.equal(out.feedback.coinAward,{easy:'copper',medium:'silver',hard:'gold'}[difficulty]);}
 reset();attempts=Array.from({length:6},()=>({player_id:'a',correct:true,difficulty:'hard'}));question.difficulty='hard';let out=await call('answer',{choice:0,questionId:'q1'});assert.equal(out.status,'finished');assert.equal(out.players[0].coins.gold,7);assert.equal(out.winnerIds[0],'a');await assert.rejects(call('answer',{choice:0}),/завершена/);
 reset();attempts=Array.from({length:62},()=>({player_id:'a',correct:true,difficulty:'easy'}));out=await call('answer',{choice:0,questionId:'q1'});assert.equal(out.status,'finished');assert.equal(out.players[0].coins.gold,7);
 reset();players[0].altitude=200;attempts=[{player_id:'a',correct:true,difficulty:'medium'}];out=await call('skipQuest',{quest:1});assert.equal(out.players[0].altitude,1000);assert.equal(out.players[0].skipped_quests[0],1);assert.equal(out.players[0].coins.silver,1);assert.ok(out.question);assert.equal(out.turn,'a');
 out=await call('skipQuest',{quest:1});assert.equal(out.players[0].altitude,1000);assert.equal(out.players[0].skipped_quests.length,1);
 for(let q=2;q<=12;q++)out=await call('skipQuest',{quest:q});assert.equal(out.status,'finished');assert.equal(out.players[0].skipped_quests.length,12);assert.equal(out.winnerIds.length,0);
 reset();room.status='paused';await assert.rejects(call('skipQuest',{quest:1}),/паузе/);assert.equal(players[0].altitude,0);
 reset();players.push({...players[0],id:'b',animal:'wolf',position:1});room.turn_no=1;await assert.rejects(call('skipQuest',{quest:1}),/свой ход/);
 const rewards=fs.readFileSync(__dirname+'/server.js','utf8').match(/function questRewards\(altitude,skipped=\[\]\)\{[^}]+\}\}/)?.[0];assert.ok(rewards);const rewardVm={};vm.createContext(rewardVm);vm.runInContext(rewards+';this.reward=questRewards',rewardVm);assert.equal(rewardVm.reward(1000,[1]).diamonds,0);assert.equal(rewardVm.reward(2000,[1]).diamonds,1);
 console.log('PASS: 1000 exchange balances; rewards by difficulty; incorrect answers; immediate 7-gold victory; converted victory; quest skipping, duplicate guard, final quest, pause and turn checks; no rewards for skipped quests.');
})().catch(e=>{console.error(e);process.exit(1)});
