require("dotenv").config();
const app = require("./app");
const dbConnect = require("./config/dbConnect");
const port = process.env.PORT || 8000;
console.log(process.env.PORT);

dbConnect();

app.listen(port, () => console.log(`Serve starting on port: ${port}`));
