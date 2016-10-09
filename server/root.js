const express = require('express');

const router = new express.Router();

router.use('/bundled', express.static('client/bundled'));
router.use('/', express.static('client/static'));

module.exports = {
  router,
};
