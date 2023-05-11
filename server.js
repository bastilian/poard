const express = require('express');
const morgan = require('morgan');
const remix = require('@remix-run/express');

const app = express();

app.use(morgan('combined'));
app.use(express.static('public', { maxAge: '1h' }));
app.all('*', remix.createRequestHandler({ build: require('./build') }));

app.listen(process.env.PORT || 3000, () => {
  console.log(
    'Applciation running on http://localhost:' + (process.env.PORT || 3000)
  );
});
