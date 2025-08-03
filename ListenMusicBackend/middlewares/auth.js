const { getUser } = require("../services/auth");

function restrictToLoggedInUsersOnly(req, res, next) {
  const openRoutes = ["/user/signin", "/api/auth/google"];

  if (openRoutes.includes(req.path)) {
    return next(); // skip auth check
  }
  const userToken = req.cookies?.DTTES;

  if (!userToken) return res.status(401).json({ loggedIn: false });
  const user = getUser(userToken);

  if (!user) return res.status(401).json({ loggedIn: false });

  req.user = user;
  // console.log(userToken);
  next();
}

// function checkLogin(req, res, next) {
//   const userUid = req.cookies?.uid;
//   const user = getUser(userUid);
//   req.user = user;
//   next();
// }
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const user = getUser (token);
  if (!user) {
    return res.status(403).json({ error: 'Invalid access token' });
  }
  req.user = user;
    next();
};

module.exports = {
  restrictToLoggedInUsersOnly,
  authenticateToken,
};
