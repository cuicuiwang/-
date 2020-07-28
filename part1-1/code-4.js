/**
 * @flow
 * @Description:
 * @author cuixia wang
 * @date 2020-07-26
 */
// Promise 是一个类 // 执行时传入执行器并立即执行，里面两个参数，分别代表执行成功后的回掉，和失败后的回掉
// 3个状态  等待，成功，失败 状态明确后不能改变
// resolve 作用，更改等待状态为成功
// reject 更改等待状态为失败状态



const PENDING='pending';
const FULFILLED='fulfilled';
const REJECTED='rejected';
class MyPromise{
    constructor(executor) {
        //捕获错误
        try{
            executor(this.resolve,this.reject);
        }catch(err){
            this.reject(err)
        }
        this.status=PENDING;
        // 成功后的值
        this.value=undefined;
        // 失败后的原因
        this.reason=undefined;
        //成功回掉 存储多个回掉函数
        this.successCallback=[];
        //失败回掉
        this.failCallback=[];
    }

    resolve(value) {
        // 成功后的回掉 这里写成箭头函数的原因，this 指向 这个promise的实例

        // 作用是，是将等待状态改为成功，
        // 因为状态只能被明确一次，所以需要判断，只有在 是等待状态，才能更改
        if (this.status !== PENDING) return;
        this.status = FULFILLED;
        this.value = value;//保存成功的值
        // 处理异步// 判断成功回掉是否存在
        // this.successCallback&&this.successCallback(this.value)
        //当有多个成功的回掉函数需要执行时，循环successCallback数组，长度大于1的时候 一个个执行，并将执行过的回调函数删除
        while (this.successCallback.length !== 0) this.successCallback.shift()();

    } ;
    reject (reason){
        // 执行失败后的回掉

        // 作用是，是将等待状态改为失败，
        if(this.status!==PENDING) return;
        this.status=REJECTED;
        this.reason=reason;
        // 处理异步// 判断失败回掉是否存在；
        // this.failCallback&&this.failCallback(this.reason)
        while (this.failCallback.length !== 0) this.failCallback.shift()();
    };
    then(successCallback,failCallback){
        // 里面有两个参数，成功的回掉和失败的回掉 并将成功的结果和失败的原因传递出去
        // 判断状态是成功还是失败，并选择执行哪个方法
        // then 方法支持链式调用，返回一个全新的propmise 对象
        successCallback=successCallback?successCallback:value=>value;
        failCallback=failCallback?failCallback:reason => {throw reason};

        let promise2=new MyPromise((resolve,reject)=>{
            if(this.status===FULFILLED){
                setTimeoutFun(promise2,successCallback,resolve,reject,this.value);
            }else if(this.status===REJECTED){
                setTimeoutFun(promise2,failCallback,resolve,reject,this.reason);
            }else{
                // 等待
                // 存储成功和失败的回掉 （比如外部有计时器，现在是等待期，还不知道该执行哪个，先存储起来，）
                this.successCallback.push(()=>setTimeoutFun(promise2,successCallback,resolve,reject,this.value));
                this.failCallback.push(()=>setTimeoutFun(promise2,failCallback,resolve,reject,this.reason));
            }
        });
        return promise2
    }
    
    finally(callback){
        return this.then(value=>{
            MyPromise.resolve(callback()).then(()=>value);
        },reason=>{
            MyPromise.resolve(callback()).then(()=>{throw reason});
        });
    }
    catch(failCallback){
       return  this.then(undefined,failCallback)
    }

    static all(array){
        let result=[];
        let index=0;

        return new MyPromise((resolve,reject)=>{
            function add(key,value){
                result[key]=value;
                index++;
                if(index===result.length){
                    resolve(result)
                }
            }
            for(let i=0;i<array.length;i++){
                let current=result[i];
                if(current instanceof MyPromise){
                    current.then(value=>add(i,value),reason=>reject(reason))
                }else {
                    add(i,current)
                }
            }
        })

    }
    static resolve(value) {
        if (value instanceof MyPromise) return value;
        return new MyPromise(resolve=>resolve(value));
    }

}
function resolvePromise(promise2,x,resolve,reject){
    if(promise2 === x ){
       return reject(new TypeError('dd'))
    }
    if(x instanceof MyPromise){
        // promise duixiang
        x.then(resolve,reject)
    }else{
        //普通值
        resolve(x)
    }
}
function setTimeoutFun(promise2,callBack,resolve,reject,stateValue){
    setTimeout(()=>{
        //捕获错误
        try {
            let value= callBack(stateValue);
            // 判断value 是普通值还是promise 对象，
            // 如果是普通纸 直接resolve  如果是proemise 查看promise结果，再决定使用resolve 还是reject
            resolvePromise(promise2,value,resolve,reject)
        }catch(err){
            reject(err)
        }

    },0)
}
 module.exports=MyPromise;
