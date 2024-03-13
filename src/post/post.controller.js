import { response, request } from "express";
import Post from "./post.model.js";

export const createPost = async (req, res = response) => {
    const user = req.user._id;
    const { title, category, content } = req.body;

    const post = new Post({ user, title, category, content });

    await post.save();
    res.status(200).json({ msg: "Your post was created successfully",  post });
}

export const addOpinion = async (req, res = response) => {
    const { id } = req.params;
    const user = req.user._id;
    const { opinion } = req.body;

    const post = await Post.findOne({ _id: id });

    if (!post) {
        return res.status(400).json({ msg: "Post not found" });
    }

    const opinionObject = {
        user,
        opinion
    }

    post.opinions.push(opinionObject);

    await post.save();
    res.status(200).json({ msg: "Your opinion was added successfully", post });
}

export const deleteOwnPost = async (req, res = response) => {
    const { id } = req.params;
    const user = req.user._id;

    const post = await Post.findOne({ _id: id });

    if (!post) {
        return res.status(400).json({ msg: "Post not found" });
    }

    if (post.user.toString() !== user.toString()) {
        return res.status(401).json({ msg: "You are not allowed to delete this post" });
    }

    post.status = false;

    await post.save();
    res.status(200).json({ msg: "Your post was deleted successfully", post });
}

export const getPosts = async (req, res) => {
    const query = { status: true };

    const [total, posts] = await Promise.all([
        Post.countDocuments(query),
        Post.find(query)
            .populate('user', 'name')
    ]);

    res.status(200).json({ total, posts });
}

export const updateOwnOpinion = async (req, res = response) => {
    const { id } = req.params;
    const user = req.user._id;
    const { opinion } = req.body;

    const post = await Post.findOne({ _id: id });

    if (!post) {
        return res.status(400).json({ msg: "Post not found" });
    }

    const opinionIndex = post.opinions.findIndex(op => op.user.toString() === user.toString());

    if (opinionIndex === -1) {
        return res.status(400).json({ msg: "You don't have an opinion in this post" });
    }

    post.opinions[opinionIndex].opinion = opinion;

    await post.save();
    res.status(200).json({ msg: "Your opinion was updated successfully", post });
}

export const deleteOwnOpinion = async (req, res = response) => {
    const { id } = req.params;
    const user = req.user._id;

    const post = await Post.findOne({ _id: id });

    if (!post) {
        return res.status(400).json({ msg: "Post not found" });
    }

    const opinionIndex = post.opinions.findIndex(op => op.user.toString() === user.toString());

    if (opinionIndex === -1) {
        return res.status(400).json({ msg: "You don't have an opinion in this post" });
    }

    post.opinions.splice(opinionIndex, 1);

    await post.save();
    res.status(200).json({ msg: "Your opinion was deleted successfully", post });
}