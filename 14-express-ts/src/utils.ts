export const sendErrorResponse = function(req, res, status = 500, message, err = null) {
    if(req.get('env') === 'production') {
        err = undefined;
    }
    res.status(status).json({
        code: status,
        message,
        error: err
    })
}

export const replace_id = function (entity) {
    entity.id = entity._id;
    delete entity._id;
    return entity;
}