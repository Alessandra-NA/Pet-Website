const { Post, Pet, Gender, User } = require('../models');

module.exports = {
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     *
     */

    getPost: (req, res) => {
        try {
            Post.findByPk(req.params.postid, {
                include: [
                    {
                        model: Pet,
                        as: 'pet',
                        include: {all: true},
                    },
                    {
                        model: User,
                        as: 'user',
                        include: ['location'],
                    }
                ]
            }).then((post) => {
                post.pet.photo = Buffer.from(post.pet.photo).toString('base64');
                res.render('post', {post: post})
            })

        }
        catch { }
    }

};
