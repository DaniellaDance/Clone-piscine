import {isTop} from './access.mjs';
export async function handleDemoFinances({url,req,u,query,send,fail}){
 if(url.pathname!=='/api/project-finances/demo')return false;
 if(!isTop(u))fail(403,'Демонстрационные финансы доступны директору');
 if(req.method!=='GET')fail(405,'Метод недоступен');
 const rows=(await query('SELECT demo_key AS key,title,phase,department,income,expense FROM ideafix.demo_project_finances ORDER BY phase,title')).rows;
 send(rows.map(r=>({...r,is_demo:true,currency:'KZT'})));return true;
}
