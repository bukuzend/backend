require("dotenv").config();

const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();

const libRouter = require("./Routers/libRouter");
const profRouter = require("./Routers/profRouter");
const authRouter = require("./Routers/authRouter");
const adminRouter = require('./Routers/adminRouter');

const checkAuth = require("./Helper/checkAuth");
const distRole = require("./Helper/distRole")

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser())

app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
}))


app.use("/api/lib",libRouter);
app.use("/api/profile",  checkAuth.checkAuth,  profRouter);
app.use("/api/auth",checkAuth.checkLogin, authRouter);

app.use("/api/admin", checkAuth.checkAuth,distRole.checkRole,adminRouter)/////////////////


app.use((req, res) => {
    res.status(404);
    res.end();
});

app.use((err, req, res, next) => {
    res.status(500);
    console.log(err);
    res.end();
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
})