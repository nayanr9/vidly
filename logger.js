function log(req, res, next){
    debug('Logging..');
    next();
}

module.exports = log;