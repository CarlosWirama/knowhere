import dijkstra from './dijkstra';
import stationMap from './initializeData';

console.log(stationMap)
export default function findShortestRoute(startingStation, destinationStation) {
  const paths = dijkstra(stationMap, startingStation, destinationStation);
  console.log('result paths', [...paths]);
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
      const { destination, line } = path.pop();
      if (line !== previousLine) {
        route.lines.push(line);
        route.steps.push({
          line,
          destination,
          stopCount: 1,
        });
        route.interchangeCount++;
        previousLine = line;
      } else {
        const currentSteps = route.steps[route.steps.length - 1];
        currentSteps.destination = destination;
        currentSteps.stopCount++;
      }
    }
    return route;
  });
  console.log(c)
  return c;
}
