const jwt = require('jsonwebtoken');

function authenticateToken(req,res,next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the "Bearer" header
    
    if (token == null) return res.status(401).json({message: "Error authenticating: Unauthorized, no token found"});
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
  
      if (err) return res.status(401).json({message: "Error authenticating: Unauthorized, invalid token"});
  
      req.user = user;
  
      next();
    })
}

module.exports={
    authenticateToken
}