const apps = require('./apps');
const port = 3000;

apps.listen(port, () => {
    console.log(`API listening on port ${port}.`);
})

