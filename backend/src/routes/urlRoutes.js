const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/shorten', urlController.shortenUrl);
router.get('/:urlId', urlController.redirectUrl);

router.get('/all', async (req, res) => {
    try {
      const urls = await Url.find();
      res.json(urls);
    } catch (err) {
      console.error(err);
      res.status(500).json('Server Error');
    }
  });

module.exports = router;
