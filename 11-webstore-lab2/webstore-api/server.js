/*
 * Copyright (c) 2015-2018 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This software provided by IPT-Intellectual Products & Technologies (IPT) is for
 * non-commercial illustartive and evaluation purposes only.
 * It is NOT SUITABLE FOR PRODUCTION purposes because it is not finished,
 * and contains security flаws and weaknesses (like sending the passwords and
 * emails of users to the browser client, wich YOU SHOULD NEVER DO with real user
 * data). You should NEVER USE THIS SOFTWARE with real user data.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this repository.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const MongoClient = require('mongodb').MongoClient;

const rootPath = path.normalize(path.join(__dirname, '..'));
const authRoutes = require("./routes/auth.routes");
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // create-react-app dev server
};

app.use(cors(corsOptions));

// view engine setup
// app.set('app', path.join(rootPath, 'app'));
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));

// Route to  REST API top-level resources
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err.error || err || {}
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {}
    });
  });
}

//Connection URL to db
const url = 'mongodb://localhost:27017';

//Use connect to connect to db
MongoClient.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  db: { w: 1 }
}).then(con => {
  // assert.equal(null, err);
  console.log(`Successfully connected to MongoDB server at: ${url}`);

  //Add db as app local property
  app.locals.db = con.db('webstore');

  // Starting the server
  app.listen(9000, (err) => {
    if (err) {
      throw err;
    }
    console.log('WebStore Service API listening on port 9000.')
  })

}).catch((err) => { throw err; });
