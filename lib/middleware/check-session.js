module.exports = function (route, controller, steps, first) {
    return function checkSession(req, res, next) {
        if (controller.options.checkSession !== false && (req.method === 'POST' || req.path !== first)) {
            if (req.cookies['pex-sc'] && req.session.exists !== true) {
                var err = new Error('Session expired');
                err.code = 'SESSION_TIMEOUT';
                return next(err);
            }
        }
        req.session.exists = true;
        res.cookie('pex-sc', 1);
        next();
    };
};
