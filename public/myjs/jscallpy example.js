var child =  require("child_process")
function dec(str="pyData=s",func){

    let spawn = child.spawn;
    let process = spawn('python',["./myjs/jscallpy.py",
        "mydecode", str] );
    let result = '';
    process.stdout.on('data', function(data) {
        let o=(data.toString());
        //let a=JSON.parse(o);
        func(o)
        //   console.log(o);
    })
    process.stdout.on('error', function(err) {

            console.log(err.message);
        }

    )
}