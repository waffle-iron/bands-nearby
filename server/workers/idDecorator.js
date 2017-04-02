const idDecorator = (concertObj) => {
  let id = 0;
  return function generateId(concertObj) {
    concertObj.id = `${concertObj.venue}-${id++}`
    return concertObj;
  }
  return generateId(concertObj);
}

module.exports = idDecorator();
