require("dotenv").config();
const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes
const binRouter = require("./routes/bins");
app.use("/", binRouter);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
