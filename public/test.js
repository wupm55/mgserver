const BSON = require('bson');


// Serialize a document
const doc = { "a":1};
const data = BSON.serialize(doc);
console.log('data:', data);

// Deserialize the resulting Buffer
const doc_2 = BSON.deserialize(data);
console.log('doc_2:', doc_2);