require('isomorphic-fetch');

const fetchData = url => fetch(url)
  .then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .catch((error) => {
    console.error(`fetchfail ${url} ${error}`);
  });

module.exports = fetchData;
