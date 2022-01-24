"use strict";

const ret1=(v)=>()=>v;
const ret2=(v)=>()=>v;

const add = (v1,v2)=>v1+v2;
const add2=(fn1,fn2)=>add(fn1(1)(),fn2(1)());

const addn=(res=0,...fns)=>{
    if(fns.length ===0)return res;
    if(fns.length === 1) return addn(add2(fns[0],()=>0),fns);
    const fn1 = fns.shift();
    const fn2 = fns.shift();
    return addn(add2(fn1(),fn2()),fns);
}


console.log(add(ret1(1)(),ret2(1)()));
console.log(addn(0,[ret1(1), ret1(1),ret1(1),ret1(1),ret1(1),ret1(1),ret1(1),ret1(1)]))
// Put your code here! :)

