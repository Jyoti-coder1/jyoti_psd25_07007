const express = require("express");
const router = express.Router();
const Redis = require("redis");
const items = require("../data");

const redisClient = Redis.createClient();
redisClient.connect().catch(console.error);

router.get("/", async (req, res) => {
    try {
        const cacheResults = await redisClient.get("items:all");
        if (cacheResults) {
            console.log("Cache hit");
            return res.json(JSON.parse(cacheResults));
        }
        console.log("Cache miss");
        await redisClient.setEx("items:all", 60, JSON.stringify(items));
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        const newItem = { id: items.length + 1, name };
        items.push(newItem);
        await redisClient.del("items:all");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const item = items.find((i) => i.id == id);
        if (!item) return res.status(404).json({ error: "Item not found" });
        item.name = name;
        await redisClient.del("items:all");
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const index = items.findIndex((i) => i.id == id);
        if (index === -1) return res.status(404).json({ error: "Item not found" });
        const deleted = items.splice(index, 1);
        await redisClient.del("items:all");
        res.json(deleted[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;