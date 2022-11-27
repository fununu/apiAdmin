'use strict'
import express from 'express';
const router: express.Router = express.Router();

router.use('/test', require('./apps/api/apitest'));

module.exports = router;