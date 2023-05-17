import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';

const HOSTNAME = 'localhost';
const PORT = 64000;

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

app.get("/", (req, res) => {
    res.send("<h1>Hello TypeScript from ExpressJS!!!<h1>")
}).get("/api/todos", (req, res) => {
    // res.type('json')
    res.set({
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache'
    }).json(todos)
}).get("/api/todos/:id", (req, res) => {
    res.set({
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache'
    }).json(todos.find(td => td.id === +req.params.id));
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`HTTP Server listening on: http://${HOSTNAME}:${PORT}`);
})

app.on('error', err => {
    console.log('Server error:', err);
});