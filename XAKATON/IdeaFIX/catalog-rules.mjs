export function validateVendorScope(catalog,b){
 const vendor=catalog.vendors.find(v=>v.id===b.vendor_id);if(!vendor)return;
 if(b.technical_id&&!vendor.tech.includes(b.technical_id))throw Object.assign(new Error('Выбранный вендор не связан с этим техническим решением'),{status:400});
 if(b.industry_id&&!(vendor.industry||[]).includes(b.industry_id))throw Object.assign(new Error('Для вендора не подтверждена связь с этой отраслью. Уточните справочник или оставьте отрасль пустой.'),{status:400});
}
