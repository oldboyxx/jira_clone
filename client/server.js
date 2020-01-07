const express = require('express');
const fallback = require('express-history-api-fallback');
const compression = require('compression');

const PORT = process.env.$PORT || process.env.PORT || 8080;

const app = express();

app.use(compression());

app.use(express.static(`${__dirname}/build`));

app.use(fallback(`${__dirname}/build/index.html`));

app.listen(PORT);
