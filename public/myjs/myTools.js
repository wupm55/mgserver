 function isNumber(input) {
    let re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
    let result=re.test(input)
    return result;

}

 function array2Obj(keys,vals){
    let object = {};
    for(let i =0;i<keys.length;i++){
        object[keys[i]]= vals[i];
    }
    return object
}
 function numerizeObj(obj){
    let keys=Object.keys(obj);
    let vals=Object.values(obj);
    let valN=[];
    vals.forEach(x=>{
        valN.push(isNumber(x)?Number(x):x);
    })
    return array2Obj(keys,valN);
}

 function objs2Table(objs,noneReplacer=''){
    let keys=[];
    let data=[];
    if (Array.isArray(objs)){

        objs.forEach(o=>{
           let ok=Object.keys(o);
           if (ok.length>keys.length)
           {keys=ok;}
        })


        objs.forEach(o=>{
            let row=[];
            keys.forEach(k=>{

                row.push((o[k]==undefined)?noneReplacer:o[k]);

            });
            data.push(row);

        });

    }
    else if(typeof objs =='string'){
        keys=[objs];
        data=[];

    }
    else{
        keys=Object.keys(objs);
        data=Object.values(objs);
    }
    return {keys:keys,data:data}
}





/*
let objs=[{a:1,b:2},{a:2,b:3},{a:1,b:32,c:4}];
let obj={a:1,b:32,c:4};
const {keys:k,data:d}=objs2Table(obj,'NA');
console.log(k)

 */
module.exports= {isNumber,array2Obj,numerizeObj,objs2Table}