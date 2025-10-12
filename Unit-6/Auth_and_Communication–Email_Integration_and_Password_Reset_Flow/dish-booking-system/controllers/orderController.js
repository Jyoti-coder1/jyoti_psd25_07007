exports.createOrder = async (req, res) => {
    const { dishId } = req.body;
    const chefs = await User.find({ role: 'chef' });
    const randomChef = chefs[Math.floor(Math.random() * chefs.length)];
    const order = await Order.create({ dish: dishId, user: req.user._id, chef: randomChef._id });
    res.json(order);
};