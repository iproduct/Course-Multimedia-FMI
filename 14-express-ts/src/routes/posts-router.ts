import { NotFoundError } from './../model/errors';
import { Repository } from './../dao/repository';
import { HOSTNAME, PORT } from './../02-server-blogs-api';
import * as express from 'express';
import { sendErrorResponse } from '../utils';
import * as indicative from 'indicative';
import { Post } from '../model/post';


const router = express.Router();

// Posts API Feature
router.get('/', async (req, res) => {
    const postsRepo: Repository<Post> = req.app.locals.postsRepo;
    try {
        const posts = await postsRepo.findAll();
        res.json(posts);
    } catch (err) {
        console.error(`Unable to find posts.`);
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.get('/:id', async (req, res) => {
    const postsRepo: Repository<Post> = req.app.locals.postsRepo;
    const params = req.params;
    try {
        await indicative.validator.validate(params,
            { id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' });
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }
    try {
        const post = await postsRepo.findById(params.id);
        res.json(post);
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            console.error(`Unable to find post: ${params.id}.`);
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

router.post('/', async function (req, res) {
    const postsRepo: Repository<Post> = req.app.locals.postsRepo;
    const post = req.body;
    try {
        await indicative.validator.validate(post, {
            // id: 'required|regex:^[0-9a-f]{24}',
            title: 'required|string|min:3|max:60',
            text: 'string|max:120',
            authorId: 'required|regex:^[0-9a-f]{24}$',
            content: 'string',
            imageUrl: 'url',
            categories: 'array',
            'categories.*': 'string',
            keywords: 'array',
            'keywords.*': 'string'
        });
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }

    try {
        const created = await postsRepo.create(post);
        res.status(201).location(`http://${HOSTNAME}:${PORT}/api/posts/${created.id}`).json(created);
    } catch (error) {
        console.error(`Unable to create post: ${post.id}: ${post.title}.`);
        sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
    }
});

// router.put('/:id', verifyToken, verifyRole(['Author','Admin']), async (req, res) => {
//     const old = await req.app.locals.db.collection('posts').findOne({ _id: new ObjectID(req.params.id) });
//     if (!old) {
//         sendErrorResponse(req, res, 404, `Post with ID=${req.params.id} does not exist`);
//         return;
//     }
//     const post = req.body;
//     if (old._id.toString() !== post.id) {
//         sendErrorResponse(req, res, 400, `Post ID=${post.id} does not match URL ID=${req.params.id}`);
//         return;
//     }
//     try {
//         await indicative.validator.validate(post, {
//             id: 'required|regex:^[0-9a-f]{24}',
//             title: 'required|string|min:3|max:60',
//             text: 'string|max:120',
//             authorId: 'required|regex:^[0-9a-f]{24}',
//             content: 'string',
//             imageUrl: 'url',
//             categories: 'array',
//             'categories.*': 'string',
//             keywords: 'array',
//             'keywords.*': 'string'
//         });
//         try {
//             r = await req.app.locals.db.collection('posts').updateOne({ _id: new ObjectID(req.params.id) }, { $set: post });
//             if (r.result.ok) {
//                 console.log(`Updated post: ${JSON.stringify(post)}`);
//                 if (r.modifiedCount === 0) {
//                     console.log(`The old and the new posts are the same.`);
//                 }
//                 res.json(post);
//             } else {
//                 sendErrorResponse(req, res, 500, `Unable to update post: ${post.id}: ${post.title}`);
//             }
//         } catch (err) {
//             console.log(`Unable to update post: ${post.id}: ${post.title}`);
//             console.error(err);
//             sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
//         }
//     } catch (errors) {
//         sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
//     }
// });

// router.delete('/:id', async (req, res) => {
//     const params = req.params;
//     try {
//         await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
//         const old = await req.app.locals.db.collection('posts').findOne({ _id: new ObjectID(req.params.id) });
//         if (!old) {
//             sendErrorResponse(req, res, 404, `Post with ID=${req.params.id} does not exist`);
//             return;
//         }
//         replace_id(old)
//         const r = await req.app.locals.db.collection('posts').deleteOne({ _id: new ObjectID(req.params.id) });
//         if(r.result.ok && r.deletedCount === 1) {
//             console.log(`Deleted post: ${old.id}: ${old.title}`);
//             res.json(old);
//         } else {
//             console.log(`Unable to delete post: ${post.id}: ${post.title}`);
//             sendErrorResponse(req, res, 500, `Unable to delete post: ${old.id}: ${old.title}`);
//         }
//     } catch (errors) {
//         sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
//     }
// });

export default router;