const FOURSQUARE_BASE_URL = 'https://api.foursquare.com/v3';

/**
 * Foursquare API helper functions
 */

// Helper to make API requests
async function fetchFoursquare(endpoint, params = {}) {
  const apiKey = import.meta.env.VITE_FOURSQUARE_API_KEY;
  if (!apiKey || apiKey === 'your_foursquare_api_key_here') {
    console.warn('Foursquare API key is not set. Please set VITE_FOURSQUARE_API_KEY in .env');
    return null;
  }

  const url = new URL(`${FOURSQUARE_BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': apiKey,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Foursquare API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error calling Foursquare API:', err);
    return null;
  }
}

/**
 * Search for places near a location or in Namibia
 * @param {Object} options - Search options
 * @param {string} options.query - Search query
 * @param {string} options.near - Location to search near (e.g., "Windhoek, Namibia")
 * @param {number} options.limit - Maximum results to return
 * @returns {Promise<Object|null>}
 */
export async function searchPlaces({ query, near = 'Namibia', limit = 20 }) {
  const params = {
    query,
    near,
    limit
  };

  return await fetchFoursquare('/places/search', params);
}

/**
 * Get detailed information about a specific place
 * @param {string} placeId - Foursquare place ID
 * @returns {Promise<Object|null>}
 */
export async function getPlaceDetails(placeId) {
  return await fetchFoursquare(`/places/${placeId}`);
}

/**
 * Get photos for a specific place
 * @param {string} placeId - Foursquare place ID
 * @param {number} limit - Maximum photos to return
 * @returns {Promise<Object|null>}
 */
export async function getPlacePhotos(placeId, limit = 10) {
  return await fetchFoursquare(`/places/${placeId}/photos`, { limit });
}
