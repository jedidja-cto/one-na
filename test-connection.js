require('dotenv').config({ path: '.env' });
const testConnection = async () => {
  console.log('Testing Foursquare API connection...');
  console.log('API Key (first 10 chars):', (process.env.FOURSQUARE_API_KEY || '').substring(0, 10) + '...');
  
  try {
    const response = await fetch('https://places-api.foursquare.com/places/search?query=Tourism&near=Erongo,Namibia', {
      headers: {
        'Authorization': `Bearer ${process.env.FOURSQUARE_API_KEY}`,
        'Accept': 'application/json',
        'X-Places-Api-Version': '2025-06-17'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Foursquare API connection successful!');
      console.log('Number of results:', data.results?.length || 0);
    } else {
      console.error('❌ Foursquare API connection failed:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
    }
  } catch (err) {
    console.error('❌ Foursquare API connection error:', err);
  }
};

testConnection();
