// Jaro-Winkler similarity implementation
const jaroWinkler = (str1, str2) => {
  const m = Math.min(str1.length, str2.length);
  const matchDistance = Math.floor(Math.max(str1.length, str2.length) / 2) - 1;
  const matches1 = new Array(str1.length).fill(false);
  const matches2 = new Array(str2.length).fill(false);
  let matches = 0;
  
  for (let i = 0; i < str1.length; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(i + matchDistance + 1, str2.length);
    for (let j = start; j < end; j++) {
      if (!matches2[j] && str1[i] === str2[j]) {
        matches1[i] = true;
        matches2[j] = true;
        matches++;
        break;
      }
    }
  }
  
  if (matches === 0) return 0;
  
  let transpositions = 0;
  let k = 0;
  for (let i = 0; i < str1.length; i++) {
    if (matches1[i]) {
      while (!matches2[k]) k++;
      if (str1[i] !== str2[k]) transpositions++;
      k++;
    }
  }
  transpositions /= 2;
  
  const jaro = (matches / str1.length + matches / str2.length + (matches - transpositions) / matches) / 3;
  
  const prefixLength = Math.min(str1.length, str2.length, 4);
  let prefix = 0;
  while (prefix < prefixLength && str1[prefix] === str2[prefix]) prefix++;
  
  return jaro + prefix * 0.1 * (1 - jaro);
};

const normalizeName = (name) => {
  if (!name) return '';
  let normalized = name.toLowerCase().trim();
  // Remove common business suffixes
  const suffixes = ['pty', 'pty ltd', 'ltd', 'cc', 'inc', 'co', 'corp', 'limited'];
  suffixes.forEach(suffix => {
    normalized = normalized.replace(new RegExp(`\\b${suffix}\\b`, 'gi'), '');
  });
  // Remove punctuation
  normalized = normalized.replace(/[^\w\s]/g, '');
  // Remove extra spaces
  normalized = normalized.replace(/\s+/g, ' ').trim();
  return normalized;
};

const deduplicate = (listings) => {
  const uniqueListings = [];
  let duplicatesRemoved = 0;
  
  // Group listings by region first to reduce comparison scope
  const byRegion = {};
  listings.forEach(listing => {
    const region = listing.region || 'unknown';
    if (!byRegion[region]) byRegion[region] = [];
    byRegion[region].push(listing);
  });
  
  Object.values(byRegion).forEach(regionListings => {
    const used = new Set();
    
    for (let i = 0; i < regionListings.length; i++) {
      if (used.has(i)) continue;
      
      const current = regionListings[i];
      const currentNorm = normalizeName(current.name);
      
      let bestMatch = current;
      
      // Check all subsequent listings in same region for duplicates
      for (let j = i + 1; j < regionListings.length; j++) {
        if (used.has(j)) continue;
        
        const candidate = regionListings[j];
        const candidateNorm = normalizeName(candidate.name);
        
        const similarity = jaroWinkler(currentNorm, candidateNorm);
        
        if (similarity >= 0.85) {
          duplicatesRemoved++;
          used.add(j);
          
          // Prefer Google source
          if (candidate.source === 'google' && bestMatch.source !== 'google') {
            bestMatch = candidate;
          } else if (bestMatch.source === candidate.source) {
            // Prefer the one with more data (phone, website, rating)
            const currentDataCount = [current.phone, current.website, current.rating].filter(Boolean).length;
            const candidateDataCount = [candidate.phone, candidate.website, candidate.rating].filter(Boolean).length;
            if (candidateDataCount > currentDataCount) {
              bestMatch = candidate;
            }
          }
        }
      }
      
      uniqueListings.push(bestMatch);
      used.add(i);
    }
  });
  
  return {
    listings: uniqueListings,
    duplicatesRemoved
  };
};

module.exports = { deduplicate };
