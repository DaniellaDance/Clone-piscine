import {getCompanyNews} from '../company-news.mjs';
const rows=await Promise.all([0,1].map(i=>getCompanyNews(i)));
for(const row of rows)console.log('RSS verification:',row.company,'articles:',row.articles.length,'unavailable:',!!row.unavailable);
if(!rows.some(row=>row.articles.length))throw Error('Live company-news sources could not be verified');
