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

const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifyToken(req, res, next) {
  console.log(req.headers);
  const tokenHeader = req.headers['authorization'];
  if(!tokenHeader) {
    next({ status: 401, message: `No access token provided.` });
    return;
  }
  const segments = tokenHeader.split(' ');
  if (segments.length !== 2 || segments[0].trim() !== 'Bearer' || segments[1].trim().length < 80) {
    next({ status: 401, message: `No valid access token provided.` });
    return;
  }
  const token = segments[1].trim();
  console.log(`Token: ${token}`);

  jwt.verify(token, config.secret, function (error, decoded) {
    if (error) next({ status: 403, message: `Failed to authenticate token.`, error });
    else {
      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    }
  });
}

module.exports = verifyToken;
