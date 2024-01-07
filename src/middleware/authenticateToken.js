// import jwt from "jsonwebtoken";

// // Middleware to verify JWT token and authenticate users
// const authenticateToken = (req, res, next) => {
//   const token = req.header("Authorization");
//   console.log(token);
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Forbidden: Invalid token" });
//     }

//     req.user = user;
//     next();
//   });
// };

// export { authenticateToken };
//
import jwt from "jsonwebtoken";

// Middleware to verify JWT token and authenticate users
const authenticateToken = (req, res, next) => {
  const tokenHeader = req.header("Authorization");

  console.log("tokenHeader", tokenHeader);

  if (!tokenHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Extract the token from the header (remove "Bearer " if present)
  const token = tokenHeader.replace("Bearer ", "");
  //
  // console.log("token", token);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      //
      console.error("Error verifying token:", err);
      //
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    req.user = user;
    next();
  });
};

export { authenticateToken };
