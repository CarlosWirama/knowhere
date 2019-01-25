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

const stationNames = Object.keys(stations);

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
  const groupedCode = groupSimilarCodes(stationCode);
  const adjacent = findAdjacent(stationCode);
  stationWithAdjacent[name] = {
    line: Object.keys(groupedCode),
    adjacent,
  };
});

export default stationWithAdjacent;

function findAdjacent(stationCode) {
  const adjacent = [];
  Object.keys(stationCode).forEach(lineCode => {
    const stationNo = stationCode[lineCode];
    adjacent.push(...findAdjacentInLine(lineCode, stationNo));
  });
  // adjacent.push(...findSpecialAdjacent(stationCode));
  return adjacent;
}

function findAdjacentInLine(line, no) {
  const currentLinePtr = lines[line];
  const prevStation = currentLinePtr[no - 1] || currentLinePtr[no - 2];
  const nextStation = currentLinePtr[no + 1] || currentLinePtr[no + 2];
  const ret = [];
  prevStation && ret.push(prevStation);
  nextStation && ret.push(nextStation);
  return ret;
}

// function findSpecialAdjacent() {
//   // TODO: special adjacent, for example:
//   // 'Gek Poh' JW1 is adjacent with 'Bahar Junction' JS7
//   // please see Jurong Area MRT
//   return [];
// }

function groupSimilarCodes(codes) {
  if (codes.CC && codes.CC === codes.CE) {
    // group CC and CE to be CCCE
    const { CC, CE, ...rest } = codes;
    return { ...rest, CCCE: CC };
  } else {
    return { ...codes };
  }
}
