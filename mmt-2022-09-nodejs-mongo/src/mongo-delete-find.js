const MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017/";

MongoClient.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err, con) {
    if (err) throw err;
    const db = con.db('webstore_fmi_2022');
    db.collection('products')
        .findOneAndDelete({ name: 'Wireless Keyboard' })
        .then(res => {
            console.log(`${JSON.stringify(res.value?.name)} product deleted successfully.`);
        }).catch(err => {
            console.log("Error: Delete unsuccessfull.")
        }).finally(() => {
            con.close();
        })

});