const app = require("./app");
const dbConnect = require("./config/dbConnect");
const port = process.env.PORT || 8000;

dbConnect();

app.listen(port, () => console.log(`Serve starting on port: ${port}`));
