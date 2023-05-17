import { Request, Response } from 'express';

export const sendErrorResponse = (req: Request, res: Response, message, status=500, err=null) => {
    if(req.app.get('env') === 'production') {
        err = undefined;
    }
    res.status(status).json({
        status,
        message,
        error: err
    })
}