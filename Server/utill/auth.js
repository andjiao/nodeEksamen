export function checkingIsEvil(req, res, next) {
    if (req.session.isEvil !== true) {
        return res.status(401).send({ message: "not evil enought!" })
    }
    next()
}


export function checkingUser(req, res, next) {
    if (req.session.userid !== req.body.userid) {
        return res.status(401).send({ message: "Not authorized." })
    }

    next()
}

