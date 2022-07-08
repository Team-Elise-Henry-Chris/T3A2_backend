const app = require('./app');
const port = 4000;

app.listen(port, () =>
    console.log(`App is running at http://localhost:${port}/`)
);
