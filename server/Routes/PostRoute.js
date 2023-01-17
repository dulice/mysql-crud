const Post = require('../Model/PostModel');
const router = require('express').Router();

router.post('/post', async (req, res) => {
    try {
        await Post.create(req.body);
        res.status(200).json("post created");
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const post = await Post.findAll();
        res.json(post);
    } catch (err) {
        res.json(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findAll({
            where: { id: id }
        });
        res.json(post[0]);
    } catch (err) {
        res.json(err.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Post.update(req.body, {
            where: { id: id }
        });
        res.json("post updated");
    } catch (err) {
        res.json(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Post.destroy({
            where: { id: id }
        });
        res.json("post deleted");
    } catch (err) {
        res.json(err.message);
    }
});

module.exports = router;