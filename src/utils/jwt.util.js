const jwt = require("jsonwebtoken");

exports.CreateTokens = (user) => {
  try {
    const accessToken = jwt.sign(user, process.env.KEY_TOKEN, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(user, process.env.KEY_TOKEN_REFRESH, {
      expiresIn: "7d",
    });
    return { accessToken, refreshToken };
  } catch (error) {
    // Handle error appropriately, e.g., log it or throw a custom error
    throw new Error("Failed to create tokens");
  }
};

exports.VerifyAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.KEY_TOKEN, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ status: 403, message: "Invalid Access Token" });
    }

    // Assert the type of 'user' to the custom interface after successful verification
    req.user = user;
    next();
  });
};

exports.VerifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.KEY_TOKEN_REFRESH, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};
