import Event from "../models/event.model";

export const createEvent = async(req, res) => {
    try {
        const { name, category, date, basePrice } = req.body;
        if (!name || !catergory || !date || basePrice == null) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const event = new Event({ name, category, date, basePrice });
        await event.save();
        return res.status(201).json({ message: "Event created", event });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const listEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        return res.json({ events });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Sever error" });
    }
};