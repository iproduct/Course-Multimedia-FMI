import { MongoClient } from "mongodb";
import { Post } from "./model/post";

const dbUrl = `mongodb://localhost:27017`;
const database = 'ts-academy-2022';

MongoClient.connect(dbUrl).then(async (con) => {
    const db = con.db(database);
    try {
        const {acknowledged, insertedId} = await db.collection<Post>('posts').insertOne(new Post(
            "Learning React 123",
            "123 A Hands-On Guide to Building Web Applications Using React and Redux, 2nd Edition",
            "111111111111111111111111",
            "https://images-na.ssl-images-amazon.com/images/I/51AFwrzNmdL._SX386_BO1,204,203,200_.jpg",
            ["nodejs", "expressjs"],
            ["react", "javascript", "redux", "hands-on"]
        ));
        if(acknowledged){
            console.log(`Successfully inserted 1 document with ID ${insertedId}`);
        }
        const posts = await db.collection<Post>('posts').find().toArray();
        console.log(posts);
    } catch (err) {
        console.log(err);
    } finally {
        con.close();
        return 'Finishing demo...';
    }
}).catch(err => console.log(err));