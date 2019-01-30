import dijkstra from './dijkstra';
import stationMap from './initializeData';
import { Weight } from '../../constants/heuristicValue';

export default function findShortestRoute(startingStation, destinationStation) {
  const paths = dijkstra(stationMap, startingStation, destinationStation);
  /**
   * paths is an array of possible routes
   * routes is an array of stations forming a path
   * station is an object contains destination and which line we should take
   * paths: [
      0: [
        0: { destination: "Khatib", line: "NS" },
        1: { destination: "Yishun", line: "NS" },
        2: { destination: "Canberra", line: "NS" },
      ],
      1: [ ...etc ],
    ]
   **/
  const restructuredPaths = paths.map( path => {
    const route = {
      lines: [],
      stopCount: path.length,
      interchangeCount: -1,
      steps: [],
      heuristicValue: 0,
    };
    let previousLine = '';
    while(path.length) {
      let { destination, line } = path.pop();
      // somehow i feel we can simplify this nested conditions but just havn't find it
      if (line !== previousLine) {
        if (line.indexOf('/') > 1 || previousLine.indexOf('/') > 1) {
          const splittedCurrentLine = line.split('/');
          const splittedPreviousLine = previousLine.split('/');
          // find intersection between 2 arrays
          const intersects = splittedCurrentLine
            .filter(line => -1 !== splittedPreviousLine.indexOf(line));
          if (intersects.length) { // still in the same line, no need to interchange
            addSteps(route, destination);
            // update the recorded lines to match only 1 line
            route.lines[route.lines.length -1] = intersects[0];
            route.steps[route.steps.length - 1].line = intersects[0];
            previousLine = intersects[0];
          } else {
            addNewInterchange(route, destination, line);
            previousLine = line;
          }
        } else {
          addNewInterchange(route, destination, line);
          previousLine = line;
        }
      } else {
        addSteps(route, destination);
      }
    }
    // count overall heuristicValue based on weights in heuristicValue.js
    route.heuristicValue = route.stopCount * Weight.STOP
      + route.interchangeCount * Weight.INTERCHANGE;
    return route;
  });
  // sort by heuristicValue
  return restructuredPaths.sort((a, b) => a.heuristicValue - b.heuristicValue);
}

function addSteps(route, destination) {
  const currentSteps = route.steps[route.steps.length - 1];
  currentSteps.destination = destination;
  currentSteps.stopCount++;
}

function addNewInterchange(route, destination, line) {
  route.lines.push(line);
  route.steps.push({
    line,
    destination,
    stopCount: 1,
  });
  route.interchangeCount++;
}
