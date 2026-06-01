import { useState } from 'react';
import { BIZ } from '../data/data.js';

export function useFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const clearRegion = () => setSelectedRegion('');
  const clearSector = () => setSelectedSector('');
  const clearSearch = () => setSearchQuery('');
  const clearAll = () => {
    setSearchQuery('');
    setSelectedRegion('');
    setSelectedSector('');
    setSortOrder('newest');
  };

  const filtered = BIZ.filter(b => {
    const matchesSearch = searchQuery === '' || 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRegion = selectedRegion === '' || b.region === selectedRegion;
    const matchesSector = selectedSector === '' || b.sector === selectedSector;
    return matchesSearch && matchesRegion && matchesSector;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'newest') return b.added - a.added;
    if (sortOrder === 'rating') return b.rating - a.rating;
    if (sortOrder === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return {
    searchQuery, setSearchQuery, setSearch: setSearchQuery,
    selectedRegion, setSelectedRegion, setRegion: setSelectedRegion,
    selectedSector, setSelectedSector, setSector: setSelectedSector,
    sortOrder, setSortOrder, setSort: setSortOrder,
    clearRegion, clearSector, clearSearch, clearAll,
    filtered: sorted,
  };
}
