const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require('cookie-parser')


const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Укажите ваш фронтенд URL
    res.header("Access-Control-Allow-Credentials", "true"); // Разрешить передачу cookies
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser())

app.use("/api/users", userRoutes);

module.exports = app;
