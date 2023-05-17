import * as express from 'express';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as logger from 'morgan';
import { sendErrorResponse } from './utils';
import { HttpError } from './model/error';

dotenv.config()

const todos = [
    { id: 1, text: 'Implement REST API' },
    { id: 2, text: 'Implement GET All Todos endpoint' },
    { id: 3, text: 'Implement POST new Todo}' },
    { id: 4, text: 'Implement error handling' }
]

const app = express();
app.options('*', cors());
app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

app.use(express.json({
    limit: '10mb'
}));

app.use(logger('dev'));

app.get("/", (req: Request, res: Response) => {
    res.set('Content-Type', 'text/html')
    res.send("<h1>Hello World!!!</h1>")
})
app.get("/api/todos", (req: Request, res: Response) => {
    res.json(todos)
})
app.get("/api/todos/:todoId", (req: Request, res: Response, next: express.NextFunction) => {
    console.log(req.params);
    const todo = todos.find(td => td.id === +req.params.todoId);
    if (todo) {
        res.json(todo)
    } else {
        next(new HttpError(404, `Todo with ID='${req.params.todoId}' not found`));
        // sendErrorResponse(req, res, `Todo with ID='${req.params.todoId}' not found`, 404)
    }
});
app.use((err, req, res, next) => {
    if (err instanceof HttpError) {
        sendErrorResponse(req, res, err.message, err.status, err)
    } else {
        next(err);
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
});
