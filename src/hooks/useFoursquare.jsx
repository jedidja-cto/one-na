import { useState, useCallback } from 'react';
import { searchPlaces, getPlaceDetails, getPlacePhotos } from '../services/foursquare.js';

export function useFoursquare() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const search = useCallback(async (options) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchPlaces(options);
      setData(results);
      return results;
    } catch (err) {
      setError(err.message || 'Error fetching from Foursquare');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getDetails = useCallback(async (placeId) => {
    setLoading(true);
    setError(null);
    try {
      const details = await getPlaceDetails(placeId);
      return details;
    } catch (err) {
      setError(err.message || 'Error fetching place details');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPhotos = useCallback(async (placeId, limit) => {
    setLoading(true);
    setError(null);
    try {
      const photos = await getPlacePhotos(placeId, limit);
      return photos;
    } catch (err) {
      setError(err.message || 'Error fetching place photos');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    data,
    search,
    getDetails,
    getPhotos
  };
}
