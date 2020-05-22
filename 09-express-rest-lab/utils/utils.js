module.exports.sendErrorResponse  = function(req, res, code, message, err) {
    if(req.get('env') !== 'development') {
        err = undefined;
    }
    res.status(code).json({
        code,
        message,
        error: err
    })
}