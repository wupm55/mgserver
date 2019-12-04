let spawn = require("child_process").spawn;
let process = spawn('python',["./jscallpy.py",
    "get2",1,2] );
process.stdout.on('data', function(data) {

    let o=(data.toString());
    let a=JSON.parse(o);
    console.log(Object.values(a));
})
process.stdout.on('error', function(err) {

    console.log(err.message);
})