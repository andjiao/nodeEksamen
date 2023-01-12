function isGoodUser (req, res, next) { 
    // 401 Unauthorized
    // 403 Forbidden 
    
    if (req.user.isEvil) return res.status(403).send('Be gone evil, you creature!!!');
  
    next();
  }

  export default isGoodUser; 