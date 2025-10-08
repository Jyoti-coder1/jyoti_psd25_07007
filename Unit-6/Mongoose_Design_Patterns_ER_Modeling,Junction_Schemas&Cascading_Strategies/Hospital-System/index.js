const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const doctorRoutes = require("./routes/doctor.routes");
const patientRoutes = require("./routes/patient.routes");
const consultationRoutes = require("./routes/consultation.routes");

app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/consultations", consultationRoutes);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));