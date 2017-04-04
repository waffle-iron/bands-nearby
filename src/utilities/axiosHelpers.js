import axios from 'axios';

const get = (url, cb) => {
  axios.get(url)
  .then((response) => {
    cb(response.data);
  })
  .catch((error) => {
    console.error('axios error', error)
  })
}

export default get;
