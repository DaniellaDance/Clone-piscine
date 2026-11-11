export function validateVendorScope(catalog,b){
 const vendor=catalog.vendors.find(v=>v.id===b.vendor_id);if(!vendor)return;
 if(b.technical_id&&!vendor.tech.includes(b.technical_id))throw Object.assign(new Error('Выбранный вендор не связан с этим техническим решением'),{status:400});
 if(b.offering_id){const product=catalog.products?.find(p=>p.id===b.offering_id&&p.vendor_id===b.vendor_id);if(!product||product.technical_id!==b.technical_id)throw Object.assign(new Error('Выберите продукт или услугу выбранного вендора'),{status:400});}
}
