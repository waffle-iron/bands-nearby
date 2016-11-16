require('isomorphic-fetch');

const fetchData = (url) => {
  return fetch(url)
  .then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(function(data) {
    return data;
  })
  .catch(function(error) {
    //TODO: implement catch
    console.log('fetchfail' + url)
  })
}

module.exports = fetchData;
