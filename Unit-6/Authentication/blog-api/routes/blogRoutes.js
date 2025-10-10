const express = require("express");
const Blog = require("../models/Blog");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    const { title, content, tags } = req.body;
    const blog = await Blog.create({ title, content, tags, createdBy: req.user.userId });
    res.json(blog);
});

router.get("/", authMiddleware, async (req, res) => {
    const blogs = await Blog.find({ createdBy: req.user.userId });
    res.json(blogs);
});

router.put("/:id", authMiddleware, async (req, res) => {
    await Blog.updateOne({ _id: req.params.id, createdBy: req.user.userId }, req.body);
    res.json({ message: "Blog updated" });
});

router.delete("/:id", authMiddleware, async (req, res) => {
    await Blog.deleteOne({ _id: req.params.id, createdBy: req.user.userId });
    res.json({ message: "Blog deleted" });
});

router.get("/stats", authMiddleware, async (req, res) => {
    const stats = await Blog.aggregate([
        { $group: { _id: "$createdBy", totalBlogs: { $sum: 1 } } }
    ]);
    res.json(stats);
});

module.exports = router;