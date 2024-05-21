const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/Url');

// @route   POST /shorten
// @desc    Create short URL
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = process.env.BASE_URL;

    // Check base URL
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL');
    }

    // Create URL code
    const urlCode = shortid.generate();

    // Check long URL
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if (url) {
                res.json(url);
            } else {
                const shortUrl = `${baseUrl}/${urlCode}`;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid long URL');
    }
});

// @route   GET /:code
// @desc    Redirect to long URL
router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });

        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No URL found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});

module.exports = router;
