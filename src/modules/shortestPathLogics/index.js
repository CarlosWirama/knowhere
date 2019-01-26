import dijkstra from './dijkstra';
import stationMap from './initializeData';

console.log(stationMap)
export default function findShortestRoute(startingStation, destinationStation) {
  const shortestPath = dijkstra(stationMap, startingStation, destinationStation);
  console.log('shortestPath', shortestPath);
  const route = {
    lines: [],
    stopCount: shortestPath.length,
    interchangeCount: -1,
    steps: [],
  };
  let previousLine = '';
  const path = [...shortestPath];
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
  return [route];
}
