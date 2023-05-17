import { JsonFileRepository } from './dao/posts-repository copy';
import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import { sendErrorResponse } from './utils';
import postsRouter from './routes/posts-router';

export const HOSTNAME = 'localhost';
export const PORT = 64000;
const POSTS_DB_FILE = 'posts.json';

const todos = [
    { id: 1, text: 'Implement REST server' },
    { id: 2, text: 'Implement GET all TODOs' },
    { id: 3, text: 'Implement POST new TODO' },
    { id: 4, text: 'Implement error handling' },
];

let nextId = 4;

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST'
}))
app.use(logger('dev'))
app.use(express.json({ limit: '10mb' }))

app
    .use('/api/posts', postsRouter)
    // .use('/api/users', usersRouter);
    .use((req, res) => {
        sendErrorResponse(req, res, 404, `This is not the page you are looking for :)`);
    });

app.use(function (err, req, res, next) {
    console.error(err.stack)
    sendErrorResponse(req, res, err.status || 500, `Server error: ${err.message}`, err);
})

app.locals.postsRepo = new JsonFileRepository(POSTS_DB_FILE);

app.listen(PORT, HOSTNAME, () => {
    console.log(`HTTP Server listening on: http://${HOSTNAME}:${PORT}`);
})



app.on('error', err => {
    console.log('Server error:', err);
});