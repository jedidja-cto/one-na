// For existing Google Places mapping, we'll keep it as a placeholder
const mapPlaceToListing = (place, sector, region) => {
  return {
    id: place.place_id,
    name: place.name,
    sector,
    region,
    address: place.formatted_address || null,
    phone: place.formatted_phone_number || null,
    website: place.website || null,
    rating: place.rating || null,
    reviewCount: place.user_ratings_total || 0,
    location: {
      lat: place.geometry?.location?.lat || null,
      lng: place.geometry?.location?.lng || null
    },
    source: 'google',
    sourceId: place.place_id,
    claimed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

const mapFoursquareToListing = (place, sector, region) => {
  return {
    id: place.fsq_id,
    name: place.name,
    sector,
    region,
    address: place.location?.formatted_address || null,
    phone: place.tel || null,
    website: place.website || null,
    rating: place.rating ? place.rating / 2 : null,
    reviewCount: place.stats?.total_ratings || 0,
    location: {
      lat: place.geocodes?.main?.latitude || null,
      lng: place.geocodes?.main?.longitude || null
    },
    source: 'foursquare',
    sourceId: place.fsq_id,
    claimed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

module.exports = {
  mapPlaceToListing,
  mapFoursquareToListing
};
