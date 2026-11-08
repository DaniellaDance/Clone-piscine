import pg from 'pg';
import {randomUUID,randomBytes,scryptSync,timingSafeEqual,createHash} from 'node:crypto';
const pool=new pg.Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false},max:5});
const digest=t=>createHash('sha256').update(t).digest('hex');
const hashPassword=(password,salt=randomBytes(16).toString('hex'))=>salt+':'+scryptSync(password,salt,64).toString('hex');
const verify=(password,stored)=>{const [salt,hex]=stored.split(':');return !!salt&&!!hex&&timingSafeEqual(Buffer.from(hex,'hex'),scryptSync(password,salt,64))};
const cleanName=x=>String(x||'').trim().toLowerCase();
function check(username,password){if(!/^[a-zA-Z0-9_]{3,24}$/.test(username))throw Error('Логин: 3–24 латинские буквы, цифры или _');if(typeof password!=='string'||password.length<6||password.length>128)throw Error('Пароль: от 6 до 128 символов')}
export async function register(username,password){username=cleanName(username);check(username,password);const id=randomUUID();try{await pool.query('INSERT INTO players(id,username,password_hash) VALUES($1,$2,$3)',[id,username,hashPassword(password)])}catch(e){if(e.code==='23505')throw Error('Этот логин уже занят');throw e}return issue({id,username})}
export async function login(username,password){username=cleanName(username);check(username,password);const {rows}=await pool.query('SELECT id,username,password_hash FROM players WHERE username=$1',[username]);if(!rows.length||!verify(password,rows[0].password_hash))throw Error('Неверный логин или пароль');return issue(rows[0])}
async function issue(account){const token=randomBytes(32).toString('hex');await pool.query("INSERT INTO player_sessions(token_hash,player_id,expires_at) VALUES($1,$2,now()+interval '90 days')",[digest(token),account.id]);return{token,username:account.username}}
export async function authenticate(token){if(!/^[a-f0-9]{64}$/.test(token||''))throw Error('Войдите в аккаунт');const {rows}=await pool.query('SELECT p.id,p.username FROM player_sessions s JOIN players p ON p.id=s.player_id WHERE s.token_hash=$1 AND s.expires_at>now()',[digest(token)]);if(!rows.length)throw Error('Сессия истекла. Войдите заново');return rows[0]}
export async function logout(token){if(token)await pool.query('DELETE FROM player_sessions WHERE token_hash=$1',[digest(token)])}
export const history={
 async used(ids){if(!ids.length)return new Set();const {rows}=await pool.query('SELECT DISTINCT question_key FROM correct_answers WHERE player_id=ANY($1::uuid[])',[ids]);return new Set(rows.map(r=>r.question_key))},
 async mark(id,key){await pool.query('INSERT INTO correct_answers(player_id,question_key) VALUES($1,$2) ON CONFLICT DO NOTHING',[id,key])}
};
