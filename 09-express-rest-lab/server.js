const express = require('express');
const sendErrorResponse = require('./utils/utils').sendErrorResponse;
const productsRouter = require('./routes/product-routes');

const app = express();
const port = 3000;

app.use(express.json({limit: '10mb'}))

app.get('/api/hello/:name', (req, res) => {
    res.json({ name: req.params.name, message: `hello ${req.params.name}` });
});

// add routes
app.use('/api/products', productsRouter);


app.use(function (err, req, res, next) {
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));