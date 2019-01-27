import dijkstra from './dijkstra';
import stationMap from './initializeData';

console.log(stationMap)
export default function findShortestRoute(startingStation, destinationStation) {
  // currently can't connect all MRT line to Jurong lines and all LRTs
  const paths = dijkstra(stationMap, startingStation, destinationStation);
  console.log('result paths', JSON.parse(JSON.stringify(paths)));
  // return paths.map( path => {
  const c =  paths.map( path => {
  const route = {
      lines: [],
      stopCount: path.length,
      interchangeCount: -1,
      steps: [],
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
            // it works for current MRT line,
            // unless if there's another wierd overlapping lines in the future
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
    return route;
  });
  console.log(c)
  return c;
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
