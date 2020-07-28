/**
 * @Description:
 * @author cuixia wang
 * @date 2020-07-26
 */
const fp=require('lodash/fp');
const cars=[
    {name:'Ferrari FF',horsepower:660,dollar_value:700000,in_stock:true},
    {name:'Spyker C12 Zagato',horsepower:650,dollar_value:648000,in_stock:false},
    {name:'Jaguar XKR-s',horsepower:550,dollar_value:132000,in_stock:false},
    {name:'Audi R8',horsepower:525,dollar_value:114200,in_stock:false},
    {name:'Aston Martiin One-77',horsepower:750,dollar_value:185000,in_stock:true},
    {name:'Pagani Huayra',horsepower:700,dollar_value:1300000,in_stock:false},
];
// 练习1
const last_in_stock=fp.flowRight(fp.prop('in_stock'),fp.last);
console.log(last_in_stock(cars));//===》false

// 练习1
const first_car_name=fp.flowRight(fp.prop('name'),fp.first);
console.log(first_car_name(cars)); //==》Ferrari FF

// 练习3
let _average =function (xs){
    return fp.reduce(fp.add,0,xs)/xs.length
};
let averageDollarValue=(cars)=>fp.map(({dollar_value})=>dollar_value,cars);
let getAverage=fp.flowRight(_average,averageDollarValue);
console.log(getAverage(cars)); //==》513200

// 练习4_underscore
let _underscore=fp.replace(/\W+/g,'_');
//  分析：
//  map数组 得到name 并转换小写

let getNames=(cars)=>fp.map(({name})=>fp.toLower(name),cars);
let sanitizeNames=fp.flowRight(_underscore,getNames);
console.log(sanitizeNames(cars));
