import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const { SECRET_KEY } = process.env;

export const auth = async(req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      res.status(401);
    }

    try {
      const { _id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(_id);

      if (!user) {
        return res.status(401).send('Invalid user');
      };

      req.user = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      next();
    } catch (error) {
      error.status(401);
      throw error;
    }
  } catch (error) {
    next();
  }
};
