const MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017/";

MongoClient.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(connection => {
    const db = connection.db('webstore_fmi_2022');
    db.collection('products')
        // .find({ name: /^Super/ })
        .find()
        // .filter({ name: /^Super/ })
        .project({name: 1, price: 1})
        .sort({price: -1})
        .toArray().then(res => {
            console.log(res);
        }).finally(() => connection.close());
    console.log("Database connected.");
});