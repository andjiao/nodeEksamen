
function isEvilUser (req, res, next) { 
    // 401 Unauthorized
    // 403 Forbidden 
    
    if (!req.user.isEvil) return res.status(403).send('Only for evil people!!!');
  
    next();
  }

  export default isEvilUser; 