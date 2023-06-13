const express = require("express");

const app = express();

const port = 8000;

app.listen(port, () => console.log(`Serve starting on port: ${port}`));
