import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { SECRET_KEY } = process.env;

export const login = async(req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).send({ message: 'Email not found' });

      return;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).send({ message: 'Password is wrong' });

      return;
    }

    const payload = {
      _id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, {});

    res.send({ token });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
