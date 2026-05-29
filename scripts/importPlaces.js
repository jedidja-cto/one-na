require('dotenv').config({ path: '.env' });
const { getAllResults } = require('../server/services/foursquare');
const { mapFoursquareToListing } = require('../server/services/dataMapper');
const { SECTORS, REGIONS } = require('./data.cjs');
const fs = require('fs');
const path = require('path');

const importAll = async () => {
  console.log('Starting import...');
  
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
      
      // Add small delay between requests
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  
  console.log('\n=== Import Summary ===');
  console.log(`Foursquare results: ${foursquareListings.length}`);
  console.log(`Final listings: ${foursquareListings.length}`);
  
  // Save to file
  const outputPath = path.join(__dirname, 'imported_listings.json');
  fs.writeFileSync(outputPath, JSON.stringify(foursquareListings, null, 2));
  console.log(`\nResults saved to: ${outputPath}`);
};

importAll().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
