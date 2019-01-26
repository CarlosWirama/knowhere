export default function dijkstra(graph, startNode, endNode) {
  const distances = { [startNode]: 0 };
  const prevs = {};
  let destinationReached = false;
  let shortestDistance = 999; // For testing purpose
  do {
    const currentNodeName = findLowestDistanceNode(distances);
    if(currentNodeName === endNode) {
      destinationReached = true;
      shortestDistance = distances[currentNodeName]; // For testing purpose
    }
    findNeighborNodes(graph, currentNodeName, prevs).forEach(neighbor => {
      const neighborDistance = distances[currentNodeName] + 1;
      if (distances[neighbor.name] !== undefined) {
        // TODO enable prevs to store more than 1 prevs,
        // e.g. I'm from Chinatown and can take  NE-EW or DT-CC to Paya Lebar
        // then Paya Lebar should store 2 (or more) prevs
        // the condition should allow neighborDistance
        // with 1-2 more stops than existing stored value
      } else {
        distances[neighbor.name] = neighborDistance; // TODO: later we wont need distance
        prevs[neighbor.name] = { name: currentNodeName, line: neighbor.line };
      }
    });
    delete distances[currentNodeName];
  } while(!destinationReached && Object.keys(prevs).length < 200);
  if (!destinationReached) throw 'Destination not reached'; // For testing
  // return tracePath(prevs, endNode);
  console.log('prevs', prevs)
  const path = tracePath(prevs, endNode);
  if (shortestDistance !== path.length) throw `the result is different from path : Expected ${shortestDistance}. Path: ${path}`; // For testing
  return path;
}

function tracePath(listOfPrevNodes, destination, builtPath = []) {
  console.log(`tracePath for :${destination}`, builtPath)
  const { name, line } = listOfPrevNodes[destination] || {};
  const updatedPath = builtPath.concat({ destination, line });
  return name
    ? tracePath(listOfPrevNodes, name, updatedPath)
    : builtPath;
}

function findLowestDistanceNode(nodeDistances) {
  return Object
    .keys(nodeDistances)
    .reduce((a, b) => nodeDistances[a] < nodeDistances[b] ? a : b);
}

function findNeighborNodes(graph, currentNodeName, prevs) {
  const { adjacent } = graph[currentNodeName];
  const { name : previousNodeName } = prevs[currentNodeName] || {};
  // return all neighbor, but dont go back to prev node
  return adjacent.filter(station => station.name !== previousNodeName);
}
