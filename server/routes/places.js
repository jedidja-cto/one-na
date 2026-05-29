const express = require('express');
const router = express.Router();
const { searchByCategory, getAllResults } = require('../services/foursquare');
const { mapFoursquareToListing } = require('../services/dataMapper');
const { deduplicate } = require('../services/deduplicator');

// Simple in-memory cache
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Helper to get cache key
const getCacheKey = (prefix, region, sector) => {
  return `${prefix}:${region || 'all'}:${sector || 'all'}`;
};

// Foursquare search endpoint
router.get('/foursquare/search', async (req, res) => {
  try {
    const { sector, region } = req.query;
    if (!sector || !region) {
      return res.status(400).json({ error: 'sector and region are required' });
    }

    const cacheKey = getCacheKey('fsq', region, sector);

    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_TTL) {
        return res.json(cached.data);
      }
      cache.delete(cacheKey);
    }

    const fsqResults = await searchByCategory(sector, region);
    const listings = fsqResults.map(place => mapFoursquareToListing(place, sector, region));

    cache.set(cacheKey, { data: listings, timestamp: Date.now() });
    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Combined search endpoint (Foursquare only
router.get('/combined', async (req, res) => {
  try {
    const { sector, region } = req.query;
    if (!sector || !region) {
      return res.status(400).json({ error: 'sector and region are required' });
    }

    const cacheKey = getCacheKey('combined', region, sector);

    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_TTL) {
        return res.json(cached.data);
      }
      cache.delete(cacheKey);
    }

    const fsqResults = await searchByCategory(sector, region);
    const listings = fsqResults.map(place => mapFoursquareToListing(place, sector, region));

    cache.set(cacheKey, { data: listings, timestamp: Date.now() });
    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
