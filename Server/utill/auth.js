export function checkingIsEvil(req, res, next) {
    if (req.session.isEvil !== true) {
        return res.status(401).send({ message: "not evil enought!" })
    }
    next()
}


export function checkingUser(req, res, next) {
    if (req.session.userid !== Number(req.params.id)) {
        return res.status(401).send({ message: "Not authorized." })
    }

    next()
}

export function checkingLogin(req, res, next) {
    if (req.session.isLoggedIn !==true) {
        return res.status(401).send({ message: "Not signed in." })
    }
    next()
}