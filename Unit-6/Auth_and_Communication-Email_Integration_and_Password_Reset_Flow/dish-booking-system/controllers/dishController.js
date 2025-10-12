exports.createDish = async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const { name, price } = req.body;
    const dish = await Dish.create({ name, price, createdBy: req.user._id });
    res.json(dish);
};
