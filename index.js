const express = require('express');
const router = require('./router');
const app = express();

router(app);
app.listen(3000, () => console.log('Photopick listening on port 3000!'));