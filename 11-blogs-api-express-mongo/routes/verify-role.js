/**
 * THIS HEADER SHOULD BE KEPT INTACT IN ALL CODE DERIVATIVES AND MODIFICATIONS.
 * 
 * This file provided by IPT is for non-commercial testing and evaluation
 * purposes only. IPT reserves all rights not expressly granted.
 *  
 * The security implementation provided is DEMO only and is NOT intended for production purposes.
 * It is exclusively your responsisbility to seek advice from security professionals 
 * in order to secure the REST API implementation properly.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


const mongodb = require('mongodb');
const replaceId = require('./utils').replaceId;

module.exports = function verifyRoleOrSelf(roles) {
  return function (req, res, next) {
    const paramUserId = req.params.userId;
    const userId = req.userId;
    const db = req.app.locals.db;
    if (!userId) next({ status: 403, message: `No userId provided.` }); //Error
    else {
      db.collection('users').findOne({ _id: new mongodb.ObjectID(userId) }, function (error, user) {
        if (error) next({ status: 500, message: `Server error.`, error }); //Error
        else if (!user) next({ status: 404, message: `User not found.` }); //Error
        else {
            if ( roles.findIndex(r => r === user.role) < 0 ) 
                next({ status: 403, message: `Not enough privilegies for this operation.` }); //Error
            else {
                delete user.password;
                replaceId(user);
                // if everything good, save user to request for use in other routes
                req.user = user;
                next();
            }
        }
      });
    }
  }
}

