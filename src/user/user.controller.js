import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.status(200).json({
        user
    });
}

export const getUsers = async (req = request, res = response) => {
    const { limit, from } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({ total, users });
}

export const updateOwnUser = async (req, res = response) => {
    const authenticatedUser = req.user;
    const { _id,email, password, role, status, ...rest } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    await User.findByIdAndUpdate(authenticatedUser._id, rest);

    const user = await User.findOne({ _id: authenticatedUser._id });

    res.status(200).json({ msg: 'User Updated', user });
}
