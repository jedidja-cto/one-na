const express = require('express');
const router = express.Router();
const { searchByCategory, getAllResults } = require('../services/foursquare');
const { mapPlaceToListing, mapFoursquareToListing } = require('../services/dataMapper');
const { deduplicate } = require('../services/deduplicator');

// Simple in-memory cache
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Helper to get cache key
const getCacheKey = (prefix, region, sector) => {
  return `${prefix}:${region || 'all'}:${sector || 'all'}`;
};

// Existing Google Places search endpoint (placeholder for existing implementation)
router.get('/search', async (req, res) => {
  try {
    const { sector, region } = req.query;
    const cacheKey = getCacheKey('google', region, sector);
    
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_TTL) {
        return res.json(cached.data);
      }
      cache.delete(cacheKey);
    }
    
    // Placeholder - in real implementation, this would call Google Places API
    const listings = [];
    cache.set(cacheKey, { data: listings, timestamp: Date.now() });
    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// New Foursquare search endpoint
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

// New combined search endpoint
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
    
    // Get both sources
    const [googleResults, fsqResults] = await Promise.all([
      // Placeholder - in real implementation, replace with actual Google Places call
      Promise.resolve([]),
      searchByCategory(sector, region)
    ]);
    
    // Map both to listings
    const googleListings = googleResults.map(place => mapPlaceToListing(place, sector, region));
    const fsqListings = fsqResults.map(place => mapFoursquareToListing(place, sector, region));
    
    // Combine and deduplicate
    const { listings: uniqueListings } = deduplicate([...googleListings, ...fsqListings]);
    
    cache.set(cacheKey, { data: uniqueListings, timestamp: Date.now() });
    res.json(uniqueListings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
