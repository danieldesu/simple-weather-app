// Using AccuWeather
// register at their site to get an API key and replace it below (current one is fake)

const key = "XXXXXg1jXXX8jPXXXXXXAXXXvxXXXXXX";

// Get the weather info
const getWeather = async (locationKey) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${locationKey}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();
  // getting an array of 1 object, so just take that
  return data[0];
};

// Get the city info
const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();
  // simply getting the closest match from the provided results, which is presented first in the table
  return data[0];
};
