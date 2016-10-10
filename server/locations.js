const fs = require('fs');

const locationsP = new Promise((resolve, reject) => {
  fs.readFile('server/locations.json', (err, contents) => {
    if (err) reject(err);
    else {
      try {
        resolve(JSON.parse(contents));
      } catch (e) {
        reject(e);
      }
    }
  });
});

function getLocation(building) {
  return locationsP.then((locations) => {
    if (!{}.hasOwnProperty.call(locations, building)) {
      return null;
    }
    return locations[building];
  });
}

module.exports = getLocation;
