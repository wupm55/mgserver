
const mg = require( "./myjs/mgCRUD");
var express = require('express');
var qs =require('qs');
const BSON = require('bson');


var app = express();
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

//var app = require('express')();
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

const fileUpload = require('express-fileupload');
app.use( fileUpload() );
//app.use(express.static('public'));
app.use('/img/', express.static("D:/img/"));
app.post('/img/', function(req, res) {
    console.log('det')
    if(req.files === null){
        return res.status(400).json({msg:'no file uploaded'});
  // console.log("files:"+req.files)
    }
    const file = req.files.upload;
  //  console.log(file)
    if(file.name==='image.png'){
        file.name='image'+Math.floor(Math.random()*100000000000000000000)+'.png';
    }
   file.mv(`D:/img/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        // 若无错误 返回一个 json
        // 我们计划上传文件后 根据文件在服务器上的路径 显示上传后的文件
        // 随后我们会在 react 组件中实现
        // 在客户端中的 public 文件夹下创建 uploads 文件夹 用于保存上传的文件
        res.json({fileName: file.name, filePath: `/img/${file.name}`,url:`http://${server.address().address}:3300/img/${file.name}`});
        console.log(`saved in: http://${server.address().address}:3300/img/${file.name}`);
    });
});

app.post('/memo/', function(req, res) {
    let body = []
    req.on('data',chunk=>{
        body.push(chunk)
    });
    req.on('end',()=>{
        res.end("server got data!")
        let buf=[]
        buf=Buffer.concat(body)
        const data = BSON.deserialize(buf);
        console.log(data)
        let filter = {"title":data.title};
        mg.mgFindOneAndUpdate("memo","editor",filter,data)
        res.end('done!')
    })
});
app.post('/gantt/', function(req, res) {
    let body = []
    req.on('data',chunk=>{
        body.push(chunk)
    });
    req.on('end',()=>{
        res.end("server got data!")
        let buf=[]
        buf=Buffer.concat(body)
        const data = BSON.deserialize(buf);
        console.log(data)
        let filter = {"_id":data._id};
        mg.mgFindOneAndUpdate("project","gantt",filter,data)
        res.end('done!')
    })
});

app.get('/gantt/:filter', function (req, res) {
    // your code goes here
    let filter=qs.parse(req.params.filter);
    console.log(filter)
    let fields={'_id':0};
    mg.mgFind("project", "gantt", filter,fields,0).then(doc=>{
        res.send(doc);
        console.log(doc);
    })
});
app.get('/gantt/', function (req, res) {
    // your code goes here
     let fields={'_id':0};
    mg.mgFind("project", "gantt", {},fields,0).then(doc=>{
        res.send(doc);
        console.log(doc);
    })
});

app.post('/py', function(req, res) {
    let body = []
    req.on('data',chunk=>{
        body.push(chunk)
    });
    req.on('end',()=>{
        res.end("server got data!")
        let buf=[]
        buf=Buffer.concat(body)
        const data = BSON.deserialize(buf);
        console.log(data)
         io.emit('py',{"message":data} )
    })
});

app.get('/listLib/', function (req, res) {
    // your code goes here
    let filter=req.params.filter;
    if(!filter){filter={}}
    let fields={'_id':0};
    mg.mgFind("memo", "editor", filter,fields,0).then(doc=>{
        res.send(doc);
        console.log(doc);
    })
});


function addRex(item){
    if (typeof item ==='string')
    {return {"$regex":item,"$options":"xi"};}
    else {
        return item
    }
}

app.get('/listSearch/:filter', function (req, res) {
    // your code goes here
    let filter=qs.parse(req.params.filter);
    if(!filter){filter={}}
    let filterFlex={...filter};
    filterFlex.content=addRex(filterFlex.content)
    console.log(filterFlex)
    let fields={'_id':0};
    mg.mgFind("memo", "editor", filterFlex,fields,0).then(doc=>{
        res.send(doc);
        console.log(doc);
    })
});

app.get('/listLib/:filter', function (req, res) {
    // your code goes here
    let filter=qs.parse(req.params.filter);
    if(!filter){filter={}}

    let fields={'_id':0};
    mg.mgFind("memo", "editor",filter ,fields,0).then(doc=>{
        res.send(doc);
        console.log(doc);
    })
});




var server=http.listen(3300,'192.168.3.220',function(){

    console.log(`listening on ${server.address().address}:3300`);

});



app.get('/ok/configurationjs', function(req, res){
    console.log(req)
    let response={"versionPlatform":"unknown","editorParameters":{},"imageFormat":"svg","CASEnabled":false,"parseModes":["latex"],"editorToolbar":"","editorAttributes":"width=570, height=450, scroll=no, resizable=yes","base64savemode":"default","modalWindow":true,"version":"7.14.0.1421","enableAccessibility":true,"saveMode":"xml","saveHandTraces":false,"editorUrl":"https://www.wiris.net/demo/editor/editor","editorEnabled":true,"chemEnabled":true,"CASMathmlAttribute":"alt","CASAttributes":"width=640, height=480, scroll=no, resizable=yes","modalWindowFullScreen":false,"imageMathmlAttribute":"data-mathml","hostPlatform":"unknown","wirisPluginPerformance":true}
    res.json(response);
})

