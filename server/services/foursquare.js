require('dotenv').config();

const searchByCategory = async (query, region) => {
  const url = new URL('https://api.foursquare.com/v3/places/search');
  url.searchParams.set('query', query);
  url.searchParams.set('near', `${region}, Namibia`);
  url.searchParams.set('limit', '50');
  url.searchParams.set('fields', 'fsq_id,name,location,tel,website,rating,stats,geocodes,categories');

  const response = await fetch(url, {
    headers: {
      'Authorization': process.env.FOURSQUARE_API_KEY,
      'Accept': 'application/json'
    }
  });
  if (!response.ok) {
    console.error(`Foursquare search error: ${response.status} ${response.statusText}`);
    return [];
  }
  const data = await response.json();
  return data.results || [];
};

const getPlaceDetails = async (fsqId) => {
  const url = new URL(`https://api.foursquare.com/v3/places/${fsqId}`);
  url.searchParams.set('fields', 'name,location,tel,website,rating,stats,hours,categories,geocodes');

  const response = await fetch(url, {
    headers: {
      'Authorization': process.env.FOURSQUARE_API_KEY,
      'Accept': 'application/json'
    }
  });
  if (!response.ok) {
    console.error(`Foursquare details error: ${response.status} ${response.statusText}`);
    return null;
  }
  return await response.json();
};

const getAllResults = async (query, region) => {
  const allResults = [];
  let cursor = null;
  let pageCount = 0;
  const maxPages = 3;

  while (pageCount < maxPages) {
    pageCount++;
    const url = new URL('https://api.foursquare.com/v3/places/search');
    url.searchParams.set('query', query);
    url.searchParams.set('near', `${region}, Namibia`);
    url.searchParams.set('limit', '50');
    url.searchParams.set('fields', 'fsq_id,name,location,tel,website,rating,stats,geocodes,categories');

    if (cursor) {
      url.searchParams.set('cursor', cursor);
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': process.env.FOURSQUARE_API_KEY,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`Foursquare page ${pageCount} error: ${response.status} ${response.statusText}`);
      break;
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      allResults.push(...data.results);
    }

    cursor = data.context?.geo_bounds?.cursor;
    if (!cursor) break;

    // 200ms delay between pages
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  return allResults;
};

module.exports = {
  searchByCategory,
  getPlaceDetails,
  getAllResults
};
