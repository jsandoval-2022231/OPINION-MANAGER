import mongoose from "mongoose";

const userPostSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    opinion: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    opinions: [userPostSchema],
    status: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Post', postSchema);