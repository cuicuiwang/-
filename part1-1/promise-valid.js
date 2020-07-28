/**
 * @flow
 * @Description:
 * @author cuixia wang
 * @date 2020-07-26
 */
const MyPromise =require('./code-4');
// const promise=new Promise((resolve,reject)=>{
//     resolve('成功');// 成功
//     //resolve('失败'); // 失败
// });
const promise=new MyPromise((resolve,reject)=>{
    resolve('成功');
    // reject('失败');
});
promise.then((value)=>{
    console.log('value',value);
},(reson)=>{
    console.log('reson',reson)
});
promise.then((value)=>{
    console.log('value',value);
},(reson)=>{
    console.log('reson',reson)
});
