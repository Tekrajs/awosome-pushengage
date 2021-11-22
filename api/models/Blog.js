let mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    slug = require('slug');

let BlogSchema = new mongoose.Schema({
    title: String,
    slug: { type: String, lowercase: true, unique: true },
    content: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    date: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    commentor: String,
}, { timestamps: true });

BlogSchema.plugin(uniqueValidator, { message: ' is already used.' });

BlogSchema.pre('validate', function (next) {
    this.slugify();
    next();
});

BlogSchema.methods.slugify = function () {
    this.slug = slug(this.title);
};

BlogSchema.methods.toJSON = function (user) {
    return {
        id: this._id,
        slug: this.slug,
        title: this.title,
        content: this.content,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        date: this.date,

    };
};

module.exports = mongoose.model('Blog', BlogSchema);
