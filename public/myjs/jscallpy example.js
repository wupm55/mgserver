


function dec(str){
    let child =  require("child_process")
let spawn = child.spawn;
let process = spawn('python',["./jscallpy.py",
    "mydecode", str] );
let result = ''
process.stdout.on('data', function(data) {
    let o=(data.toString());
    //let a=JSON.parse(o);
    result = o
    console.log(o);
})
process.stdout.on('error', function(err) {

    console.log(err.message);
}

)
return result
}

let x="pyData=二二"
var r= dec(x)
console.log('result:'+r)