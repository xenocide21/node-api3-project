// code away!
const server = require('./server.js');

const port = process.env.PORT || 5000;
server.listen(5000, () => console.log(`Server listening on port ${port}`));