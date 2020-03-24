const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
const port = 3000;
app.use(express.json());
app.use(routes);
app.listen(port, () => console.log(`App listening on port: ` + port));


