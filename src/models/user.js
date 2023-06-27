import { Schema, model } from 'mongoose';

const roles = ['superAdmin', 'admin', 'leader', 'manager', 'member'];

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  role: {
    type: String,
    required: true,
    enum: roles,
  },
  department: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: emailRegexp,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  leaderId: {
    type: Schema.Types.ObjectId || null,
    ref: 'user',
    required: false,
  },
}, { versionKey: false, timestamps: true });

const User = model('user', userSchema);

export default User;
