// // index.js
const express = require("express");
const router = express.Router();
const rootRoutes  = require('./root.routes.js')
const notaRoutes  = require('./nota.routes.js')

router.use('/',rootRoutes);
router.use('/api', notaRoutes);

// for speer
router.use('/api/auth', rootRoutes); 

module.exports = router;