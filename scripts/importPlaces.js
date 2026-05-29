require('dotenv').config({ path: '.env' });
const { getAllResults } = require('../server/services/foursquare');
const { mapPlaceToListing, mapFoursquareToListing } = require('../server/services/dataMapper');
const { deduplicate } = require('../server/services/deduplicator');
const { SECTORS, REGIONS } = require('./data.cjs');
const fs = require('fs');
const path = require('path');

const importAll = async () => {
  console.log('Starting import...');
  
  const googleListings = [];
  const foursquareListings = [];
  
  // Iterate all combinations
  for (const region of REGIONS) {
    console.log(`Processing region: ${region.name}`);
    
    for (const sector of SECTORS) {
      console.log(`  - Sector: ${sector.name}`);
      
      // Foursquare import
      try {
        const fsqResults = await getAllResults(sector.name, region.name);
        const mapped = fsqResults.map(place => mapFoursquareToListing(place, sector.name, region.name));
        foursquareListings.push(...mapped);
        console.log(`    Foursquare: ${mapped.length} results`);
      } catch (err) {
        console.error(`    Foursquare error:`, err.message);
      }
      
      // Google import (placeholder)
      // In real implementation, this would call Google Places API
      
      // Add small delay between requests
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  
  console.log('\n=== Import Summary ===');
  console.log(`Google results: ${googleListings.length}`);
  console.log(`Foursquare results: ${foursquareListings.length}`);
  
  // Deduplicate
  const { listings: uniqueListings, duplicatesRemoved } = deduplicate([...googleListings, ...foursquareListings]);
  console.log(`Duplicates removed: ${duplicatesRemoved}`);
  console.log(`Final unique listings: ${uniqueListings.length}`);
  
  // Save to file
  const outputPath = path.join(__dirname, 'imported_listings.json');
  fs.writeFileSync(outputPath, JSON.stringify(uniqueListings, null, 2));
  console.log(`\nResults saved to: ${outputPath}`);
};

importAll().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
