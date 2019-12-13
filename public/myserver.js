
const mg = require( "./myjs/mgCRUD");

var express = require('express');
var app = express();

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



var qs =require('qs');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/filter/:filter', function (req, res) {
    // your code goes here
    let filter=qs.parse(req.params.filter);
     let fields={'_id':0};
    mg.mgFind("turbo", "cw", filter,fields,5).then(doc=>{
        res.send(doc);
    })
});

app.get('/mapheader/:filter', function (req, res) {
    // your code goes here
    let filter=qs.parse(req.params.filter);

    let fields={'_id':0,'data':0,'Test_Operator':0,"Test_SampleStr":0,"Turbo_SizeStr":0,'Test_StartTime':0,'Test_StartDate':0,'Test_BenchStr':0,'Sample Rate (sec)':0,'A_3':0,
        'A_1':0,'A_2':0,'A_4':0};
    mg.mgFind("turbo", "map", filter,fields,0).then(doc=>{
        res.send(doc);
        console.log(`found map header info ${doc.length} records` );

    })
});
//"n_t_tv","u_cor_T","pi_ts_T","MFP_T","eta_tot_ts_T"
app.get('/tmapdata/:filter', function (req, res) {
    // your code goes here
    let filter=qs.parse(req.params.filter);
    let fields={'_id':1,'Test_Number':1,'data.Line_Point_No':1,'data.Line_No':1,'data.n_t_tv':1,'data.V_dot_Tcor_C':1,
        "data.u_cor_T":1,"data.pi_ts_T":1,"data.MFP_T":1,"data.eta_tot_ts_T":1};
    mg.mgFind("turbo", "map", filter,fields,0).then(doc=>{
        res.send(doc);
        console.log(doc);
    })
});
app.get('/cmapdata/:filter', function (req, res) {
    // your code goes here
    let filter=qs.parse(req.params.filter);
    let fields={'_id':1,'Test_Number':1,'data.Line_Point_No':1,'data.Line_No':1,'data.n_t_tv':1,
        'data.u_cor_C_tv':1,'data.V_dot_Tcor_C':1,'data.m_dot_Tcor_C':1,
        'data.pi_tt_C':1,'data.eta_ad_tt_C':1};
    mg.mgFind("turbo", "map", filter,fields,0).then(doc=>{
        res.send(doc);
        console.log(doc);
    })
});
app.get('/list/:filter', function (req, res) {
    // your code goes here
    let filter=qs.parse(req.params.filter);
    console.log(filter)
    let fields={'_id':1,'Test_Number':1};
    mg.mgFind("turbo", "map", filter,fields,0).then(doc=>{
        res.send(doc);
        console.log(doc);
    })
});
app.get('/list/', function (req, res) {
    // your code goes here
    let filter={};
    let fields={'_id':1,'Test_Number':1};
    mg.mgFind("turbo", "map", filter,fields,0).then(doc=>{
        res.send(doc);
        console.log(doc);
    })
});
app.get('/engine/:filter', function (req, res) {
    // your code goes here
    let filter= req.params.filter;
    let fields={'_id':0,'data':0};
    mg.mgFind("turbo", "engineTest", filter,fields,1).then(doc=>{
        res.send(doc[0])

    })
});

app.get('/enginedata/:filter', function (req, res) {
    // your code goes here
    let filter=qs.parse(req.params.filter);

    let fields={'_id':1,'data':1};
    mg.mgFind("turbo", "engineTest", filter,fields,1).then(doc=>{
        res.send(doc[0])

    })
});

app.use(express.static(__dirname+'/public',{index:'index.html'}));

app.listen(3000)

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on("chat message",function (data) {
        console.log("message from client: "+data);
        socket.emit('mm',{"message":data})
        socket.broadcast.emit('mm',{"message":data})

    })

});


    //
    //
    //  ;

app.post('/py', function(req, res) {
    let body =''
    req.on('data',chunk=>{
        body+= chunk.toString();
    });
    req.on('end',()=>{
        console.log(body);
        res.end("server get data : ")
    })

//    res.send("server get data : ")
   // console.log(data)
    //dec(data,function (de) {
    //  console.log(de)
    //io.emit('py',{"message":de} )
    //})

//}
});

http.listen(3300,function(){
    console.log('listening on *:3000');
});
