const express = require("express");
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const app = express();
const expressLayouts = require("express-ejs-layouts");
const _PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

/* Database */
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => {
	console.error(error);
});
db.once("open", () => {
	console.log("Connected to mongoose");
});
/* Database */

/* Include Router */
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");

/* Include Router */

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

/* Register Router */
app.use("/", indexRouter);
app.use("/authors", authorRouter);

app.listen(process.env.PORT || 3000, () => {
	console.log(`Listening on port ${_PORT}`);
});
