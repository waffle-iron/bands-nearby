require('isomorphic-fetch');

const fetchData = url => fetch(url)
  .then((response) => {
    if (response.status >= 400) {
      console.error(`Error Handling: Bad response from server: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    console.error(`Error Handling: error in fetch.js ${url} ${error}`);
  });

module.exports = fetchData;
