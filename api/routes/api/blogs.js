let router = require('express').Router(),
    Blog = require('../../models/Blog'),
    User = require('../../models/User'),
    Comment = require('../../models/Comment'),
    auth = require('../middleware/auth');

router.param('blog', async function (req, res, next, slug) {

    Blog.findOne({ slug: slug })
        .populate('author')
        .then(function (blog) {
            if (!blog) { return res.sendStatus(404); }

            req.blog = blog;

            return next();
        }).catch(next);

});

router.get('/blogs/:id', auth.optional, async function (req, res, next) {

    try {
        let id = req.params.id;

        if (!id) {
            return res.status(404);
        }

        let blog = await Blog.findOne({ _id: id })
            .populate('author').lean().exec();

        if (!blog) {
            return res.status(404);
        }

        return res.status(200).json({ blog: { ...blog } });

    } catch (err) {
        next(err);
    }

});

router.get('/blogs', auth.optional, async function (req, res, next) {
    try {
        let query = {},
            limit = 9, offset = 0;

        if (req.query.limit) {
            limit = req.query.limit;
        }

        if (req.query.offset) {
            offset = req.query.offset;
        }

        let blogs = await Blog.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .populate('author');

        let count = await Blog.countDocuments(query).exec();

        return res.status(200).json({
            blogs: blogs.map(blog => { return blog.toJSON(); }),
            count: count
        });

    } catch (err) {
        next(err);
    }
});

router.post('/blogs', auth.required, async function (req, res, next) {
    try {
        let user = await User.findById(req.payload.id);

        if (!user) { return res.sendStatus(401); }

        var blog = new Blog(req.body.blog);

        blog.author = user;

        return blog.save().then(function () {
            return res.json({ blog: blog.toJSON(user) });
        }).catch(next);

    } catch (err) {
        next(err);
    }

});

router.get('/blogs/:blog_id/comments', auth.optional, async function (req, res, next) {

    Comment.find({ blog: Object(req.params.blog_id) }).populate('author', { username: 1 }).sort({ publishDate: 1 }).lean().exec()
        .then(comments => {

            const threads = [];

            comments.forEach(node => {

                if (!node.parentId) return threads.push(node);

                const parentIndex = comments.findIndex(el => el._id.toString() === node.parentId.toString());

                console.log(parentIndex);
                if (!comments[parentIndex].children) {
                    return comments[parentIndex].children = [node];
                }

                comments[parentIndex].children.push(node);
            });

            return res.json({
                'count': comments.length,
                'comments': threads
            });
        }).catch(err => res.status(500).json({ error: err }));


});

router.post('/blogs/:blog/comments', auth.required, async function (req, res, next) {

    try {

        let user;
        if (req.payload.id) {
            user = await User.findById(req.payload.id);
        }

        if (!req.payload.id) {
            user = await User.find({ email: req.body.user.email });
            if (!user) {
                user = new User();
                user.username = req.body.user.username;
                user.email = req.body.user.email;
                user.setPassword(req.body.user.username);
                user = await user.save();
            }
        }

        let comment = new Comment(req.body.comment);
        comment.blog = req.blog._id;
        comment.author = user;
        comment = await comment.save();

        if (comment) {
            req.blog.comments.push(comment._id);
            await Blog.updateOne({ _id: req.blog._id }, { $set: { comments: req.blog.comments } }, { upsert: false, strict: true });
        }

        return res.status(200).json({ comment: comment });

    } catch (err) {
        next(err);
    }

});

module.exports = router;