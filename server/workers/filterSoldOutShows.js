const filterSoldOutShows = (concerts) => {
  return concerts.reduce((concerts, concert) => {
    if (concert.cost !== -1) {
      concerts.push(concert);
    }
    return concerts;
  }, []);
}

module.exports = filterSoldOutShows;
