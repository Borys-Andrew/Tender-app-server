import User from '../models/user.js';

export const getAll = async() => {
  try {
    const result = await User.find();

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLeaders = async() => {
  try {
    const result = await User.find({ role: 'leader' });

    console.log('service result-->>', result);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const add = async(userData) => {
  try {
    const result = await User.create(userData);

    // console.log('from services userData --->', userData);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getById = async(userId) => {
  try {
    const result = await User.findById(userId);

    return result;
  } catch (error) {
    throw new Error('User not found');
  }
};

export const remove = async(userId) => {
  try {
    await User.findByIdAndRemove(userId);
  } catch (error) {
    throw new Error('User not found');
  }
};

export const update = async(userId, userData) => {
  // console.log('service userData===>>', userData);

  try {
    const result = await User.findOneAndUpdate(
      { _id: userId },
      userData,
      { new: true },
    );

    return result;
  } catch (error) {
    throw new Error('User not found');
  }
};
