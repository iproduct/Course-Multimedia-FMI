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

import { MongoClient, ObjectId } from 'mongodb';
import { Post, IPost } from './model/post.model';
import MOCK_POSTS from './model/mock-posts';

const dbUrl = `mongodb://localhost:27017`;
const database = 'ts-academy-2022';
const collection = 'posts';

async function main() {
    // connect to mongodb
    const con = await MongoClient.connect(dbUrl);
    const db = con.db(database);
    const postId = '633f1e501d575409116ce602';
    try {
        // update by _id
        const myquery = { _id: new ObjectId(postId) };
        const post = await db.collection<Post>(collection).findOne(myquery);
        post.title = "React Refs - REPLACED"
        post.categories = ["frontend", "development"]
        // var newvalues = { $set: {title: "React Refs - MODIFIED", categories: ['frontend']} };
        const updateRes = await db.collection(collection)
            // .updateOne(myquery, newvalues)
            // .findOneAndUpdate(myquery, newvalues)
            .replaceOne(myquery, post)
        // console.log(updateRes);
        // if (updateRes.acknowledged && updateRes.modifiedCount === 1) {
        // if (updateRes.ok) {
        if (updateRes.acknowledged && updateRes.modifiedCount === 1) {
            // console.log("Updated document:", updateRes.value);
            console.log(`Replaced document with ID: ${postId}`);
        }

        // get all posts
        const posts = await db.collection<Post>(collection)
            .find(myquery)
            .sort({title: 1})
            .toArray();
       
        posts.forEach(post => console.log(post));

    } catch (err) {
        console.error(err);
    } finally {
        con.close();
        return 'Finishing demo...';
    }
}

// run the demo
main().then(result => console.log(result));
