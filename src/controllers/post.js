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
    },

    deletePost: async (req,res) => {
        try{
            const postAEliminar = await Post.findOne({where : {id : req.params.postid}})
            idPet = postAEliminar.pet_id
            

            Post.findByPk(req.params.postid).then(response => {
                response.destroy();
                Pet.findAll({where : {'id': idPet}}).then(posts => posts.forEach(post => post.destroy()))
                res.redirect('/usuario/perfil')
            })
        }
        catch{}
    }

};
