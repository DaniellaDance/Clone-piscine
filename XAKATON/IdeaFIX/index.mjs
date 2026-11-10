import app from './function-adapter.mjs';
if(process.env.RUN_VERIFICATION==='1'){
 const {verifyDeployment}=await import('./verify-function.mjs');
 await verifyDeployment(app);
 console.log('IDEAFIX_VERIFICATION_PASSED: nine-stage workflow, sequential transitions, permissions, anonymous privacy, votes, decisions, sessions');
}
export default app;
