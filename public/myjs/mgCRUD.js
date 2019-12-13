const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://10.24.4.89:27017';
//const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

const mt = require( "./myTools");

async function mgFind(dbName,collName,filter,fields,n=0){
    const client = new MongoClient(url,{ useUnifiedTopology: true });
    try {
        await client.connect();
        console.log("Connected correctly to server"+filter);
        const db = client.db(dbName);
        // Get the collection
        const col = db.collection(collName);
        // Get first two documents that match the query
      //  let f = JSON.parse(filter);
        let fn = mt.numerizeObj(filter);
      //  let fields={'PN':1,'_id':0};
        const docs = await col.find(fn).project(fields).limit(n).toArray();
        console.log(fn);
        return docs;
    } catch (err) {
        console.log(err.stack);
    }

    // Close connection
    client.close();
}

async function mgFindOneAndUpdate(dbName,collName,filter,newData) {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db(dbName);

        // Get the findAndModify collection
        const col = db.collection(collName);
        let r;
        // Modify and return the modified document
        r = await col.findOneAndUpdate(filter, {$set: newData}, {
            returnOriginal: false,
            upsert: true
        });

    } catch (err) {
        console.log(err.stack);
    }

    // Close connection
    client.close();
}

module.exports= {mgFind,mgFindOneAndUpdate}