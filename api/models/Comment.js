var mongoose = require('mongoose');
var Schema = mongoose.Schema({
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    publishDate: { type: Date, default: Date.now },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        required: true
    },
    depth: {
        type: Number,
        default: 1
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', Schema);