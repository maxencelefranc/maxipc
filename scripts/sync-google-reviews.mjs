import fs from 'node:fs/promises';
import path from 'node:path';

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const LANGUAGE = process.env.GOOGLE_PLACES_LANGUAGE || 'fr';
const REVIEWS_PATH = path.resolve('reviews.json');

function createWriteReviewUrl(placeId) {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
}

function mapReview(review) {
  return {
    author_name: review.author_name || 'Client',
    rating: Number(review.rating || 0),
    text: String(review.text || '').trim(),
    relative_time_description: review.relative_time_description || '',
    time: review.time ? new Date(Number(review.time) * 1000).toISOString() : null,
    profile_photo_url: review.profile_photo_url || '',
    author_url: review.author_url || ''
  };
}

async function main() {
  if (!API_KEY || !PLACE_ID) {
    throw new Error('Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID secret.');
  }

  const endpoint = new URL('https://maps.googleapis.com/maps/api/place/details/json');
  endpoint.searchParams.set('place_id', PLACE_ID);
  endpoint.searchParams.set('fields', 'name,rating,user_ratings_total,reviews,url');
  endpoint.searchParams.set('reviews_sort', 'newest');
  endpoint.searchParams.set('language', LANGUAGE);
  endpoint.searchParams.set('key', API_KEY);

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Google Places HTTP error: ${response.status}`);
  }

  const json = await response.json();
  if (json.status !== 'OK') {
    throw new Error(`Google Places API error: ${json.status}${json.error_message ? ` - ${json.error_message}` : ''}`);
  }

  const result = json.result || {};
  const payload = {
    fetched_at: new Date().toISOString(),
    source: 'google_places_api',
    place: {
      place_id: PLACE_ID,
      name: result.name || 'MaxiPC',
      rating: Number(result.rating || 0),
      user_ratings_total: Number(result.user_ratings_total || 0),
      google_maps_url: result.url || ''
    },
    write_review_url: createWriteReviewUrl(PLACE_ID),
    reviews: Array.isArray(result.reviews) ? result.reviews.map(mapReview) : []
  };

  await fs.writeFile(REVIEWS_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`reviews.json updated with ${payload.reviews.length} reviews.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
