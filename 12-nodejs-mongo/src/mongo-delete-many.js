const MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, function (err, con) {
    if (err) throw err;
    const db = con.db('webstore5');
    db.collection('products')
        .deleteMany({ name: 'Super Mouse' })
        .then(res => {
            console.log(`${res.deletedCount} records deleted`);
            // console.log(res);
            db.collection('products')
                .find({ name: /^Super/ })
                .project({ name: 1, price: 1 })
                .sort({ price: 1 })
                .toArray().then(res => {
                    console.log(res);
                }).finally(() => {
                    con.close();
                });
        }).catch(err => {
            console.log("Error: Delete unsuccessfull.")
        })
});