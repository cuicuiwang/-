/**
 * @Description:
 * @author cuixia wang
 * @date 2020-07-26
 */
// 方法一:利用.then 可以返回一个promise 对象
const promise=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        const a ='hello';
        resolve(a)
    },10)
});
promise.then((value)=>{
    return new Promise((resolve) => {
        setTimeout(() => {
            const b = 'lagou';
            resolve(value + b);
        }, 10)
    })
}).then((value)=>{
    setTimeout(()=>{
        const c ='I ❤️ U';
        console.log(`${value}${c}`)
    },10)
});

// 方法二：利用.all 可以将多个异步函数放入数组作为参数，按顺序执行

function setTimeoutFun(meassage){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(meassage)
        },10)
    })

}
Promise.all([
    setTimeoutFun('hello'),
    setTimeoutFun('lagou'),
    setTimeoutFun('I ❤️ U')
]).then((value)=>{
    console.log('all 方法-',value.join(''))
});
