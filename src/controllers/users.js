import * as userService from '../services/user.js';
import bcrypt from 'bcryptjs';

export const getAll = async(req, res) => {
  try {
    const result = await userService.getAll();

    if (req.user.role === 'leader') {
      const managers = result.filter(user => user.role === 'manager');

      res.send(managers);

      return;
    }

    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getLeaders = async(_req, res) => {
  try {
    const result = await userService.getLeaders();

    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const add = async(req, res) => {
  const {
    userName,
    password,
    role,
    department,
    email,
    phone,
    leaderId,
  } = req.body;
  const { _id: user, role: position } = req.user;

  const hashPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    userName,
    password: hashPassword,
    role,
    department,
    email,
    phone,
    createdBy: user,
    leaderId,
  };

  // console.log('position===>>>', position);
  // console.log('newUser.role===>>>', newUser.role);

  if (position !== 'superAdmin' && newUser.role === 'superAdmin') {
    res.sendStatus(401);
  }

  try {
    const result = await userService.add(newUser);

    res.status(201).send({
      userName: result.userName,
      role: result.role,
      department: result.department,
      email: result.email,
      phone: result.phone,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getById = async(req, res) => {
  const { userId } = req.params;

  try {
    const result = await userService.getById(userId);

    if (!result) {
      return res.sendStatus(404);
    }

    res.send(result);
  } catch (error) {
    res.sendStatus(404);
  }
};

export const remove = async(req, res) => {
  const { userId } = req.params;

  try {
    const result = await userService.getById(userId);

    if (!result) {
      return res.sendStatus(404);
    }

    await userService.remove(userId);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
};

export const update = async(req, res) => {
  const { userId } = req.params;

  try {
    const result = await userService.update(
      { _id: userId },
      { ...req.body },
      { new: true },
    );

    if (!result) {
      res.sendStatus(404);
    }

    res.send(result);
  } catch (error) {
    res.sendStatus(404);
  }
};
