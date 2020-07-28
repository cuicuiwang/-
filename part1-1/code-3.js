/**
 * @Description:
 * @author cuixia wang
 * @date 2020-07-26
 */
const fp=require('lodash/fp');
const {Maybe,Container}=require('./support');
let maybe=Maybe.of([5,6,1]);
let ex1=(addStep)=>
    maybe.map((value)=>{
        const result= fp.map((val)=>{
            return fp.add(val,addStep)
        },value);
        console.log(result);
    });

ex1(1);//[ 6, 7, 2 ]
ex1(2);//[ 7, 8, 3 ]
ex1(3);//[ 8, 9, 4 ]


// 练习2
let xs=Container.of(['do','ray','me','fa','so','la','ti','do']);
let ex2=()=>{
    xs.map((value)=>{
        const first=fp.first(value);
        console.log(first);
    })
};
ex2();

//练习3

let safeProps=fp.curry((function (x,o){
    return Maybe.of(o[x])
}));
let user ={id:2,name:'Albert'};
let ex3=()=>{
    safeProps('name',user).map((value)=>{
         const first=fp.first(value);
        console.log(first);// A
    })
};
ex3();

// 练习4

let ex4=function (n){
    Maybe.of(n).map(parseInt);
}
