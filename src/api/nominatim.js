import axios from 'axios';

async function addressByCoordinates(latitude, longitude) {
  const { data } = await axios.get('https://nominatim.openstreetmap.org/reverse', {
    params: {
      format: 'jsonv2',
      lat: latitude,
      lon: longitude,
      limit: 1
    },
  });
  return data
}

async function coordinatesByAdress(address) {
  const { data } = await axios.get('https://nominatim.openstreetmap.org/search', {
    params: {
      format: 'jsonv2',
      q: address
    },
  });
  return data[0]
}

export { addressByCoordinates, coordinatesByAdress}