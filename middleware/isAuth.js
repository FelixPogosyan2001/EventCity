const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];//Basic token;
  if (!token || token == '') {
    req.isAuth = false;
    return next()
  }
  let decoded;
  try {
    decoded = jwt.verify(token,'atom301')
  } catch(e) {
      req.isAuth = false;
      return next()
  }
  if (!decoded) {
    req.isAuth = false;
    return next()
  }
  req.isAuth = true;
  req.userId = decoded;
  next()
}
