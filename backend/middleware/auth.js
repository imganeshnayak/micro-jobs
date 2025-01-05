// // middleware/auth.js
// import { verify } from 'jsonwebtoken';
// import { findOne } from '../models/User.js';

// const auth = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     const decoded = verify(token, process.env.JWT_SECRET);
//     const user = await findOne({ _id: decoded._id });

//     if (!user) {
//       throw new Error();
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Please authenticate' });
//   }
// };

// export default auth;