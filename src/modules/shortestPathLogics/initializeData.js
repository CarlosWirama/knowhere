import stations from '../../data/stations.json';

const lines = {
  EW: [],
  NS: [],
  NE: [],
  DT: [],
  CC: [],
  CE: [],
  CG: [],
  TE: [],
  JS: [],
  JW: [],
  JE: [],
  SE: [],
  SW: [],
  PE: [],
  PW: [],
  BP: [],
};

export const stationNames = Object.keys(stations);

// assign every station to their lines
stationNames.forEach(name => {
  Object.keys(stations[name]).forEach(line => {
    const stationLine = lines[line];
    let stationNumber = stations[name][line];
    if (Array.isArray(stationNumber)) {
      stationNumber.forEach(number => {
        stationLine[number] = name;
      });
    } else {
      stationLine[stationNumber] = name;
    }
  });
});

const stationWithAdjacent = {};
stationNames.forEach(name => {
  const stationCode = stations[name];
  stationWithAdjacent[name] = {
    line: Object.keys(stationCode),
    adjacent: findAdjacent(stationCode),
  };
});

export default stationWithAdjacent;

function findAdjacent(stationCode) {
  const adjacent = [];
  Object.keys(stationCode).forEach(lineCode => {
    const stationNo = stationCode[lineCode];
    // note that 'stationNo' params could be an array, e.g. { BP: [1, 14] }
    if (Array.isArray(stationNo)) {
      stationNo.forEach(no => findAdjacentInLine(lineCode, no, adjacent));
    } else {
      findAdjacentInLine(lineCode, stationNo, adjacent);
    }
  });
  findSpecialAdjacent(stationCode, adjacent);
  return adjacent;
}

function findAdjacentInLine(line, no, builtAdjacent) {
  const stationsinLine = lines[line];
  let prevStation = stationsinLine[no - 1] || stationsinLine[no - 2];
  let nextStation = stationsinLine[no + 1] || stationsinLine[no + 2];
  checkDupicateAndPushAdjacent(builtAdjacent, prevStation);
  checkDupicateAndPushAdjacent(builtAdjacent, nextStation);

  function checkDupicateAndPushAdjacent(builtAdjacent, newAdjacent) {
    // before push, check whether we already have this adjacent o'not
    builtAdjacent.forEach(station => {
      if(station.name === newAdjacent) {
        newAdjacent = null;
        station.line = [line, station.line].sort().join('/');
        // make the multiple station.line = 'CC/CE', not 'CE/CC'
      }
    });
    newAdjacent && builtAdjacent.push({ name: newAdjacent, line });
    // if there's no adjacent node, it won't push anything
  }
}

function findSpecialAdjacent(stationCode, builtAdjacent) {
  // 'Gek Poh' JW1 is adjacent with 'Bahar Junction' JS7
  // these adjacent can't be done by logic and must be implemented hardcodedly
  // please see Jurong Area MRT
  if (stationCode.JS === 7) builtAdjacent.push({ line: 'JW', name: 'Gek Poh'});
  if (stationCode.JS === 3) builtAdjacent.push({ line: 'JE', name: 'Tengah Plantation' });
  if (stationCode.JE === 1) builtAdjacent.push({ line: 'JE', name: 'Tengah' });
  if (stationCode.JW === 1) builtAdjacent.push({ line: 'JW', name: 'Bahar Junction' });
}
