export default function dijkstra(graph, startNode, endNode) {
  const distances = { [startNode]: 0 };
  const prevs = {};
  let destinationReached = false;
  let shortestDistance = 999; // For testing purpose
  do {
    // TODO: instead of relying on lowest distance,
    // we can just iterate all the neighbor we have from source node
    // and then change distances const to be a list of visited nodes (?)
    const currentNodeName = findLowestDistanceNode(distances);
    if(currentNodeName === endNode) {
      // TODO make threshold to allow searching for less efficient routes
      // e.g. ~3 stops
      destinationReached = true;
      shortestDistance = distances[currentNodeName]; // For testing purpose
    }
    findNeighborNodes(graph, currentNodeName, prevs).forEach(neighbor => {
      // If you're from Chinatown , you can take either NE-EW or DT-CC to Paya Lebar
      // then Paya Lebar should store 2 (or more) prevs
      if (prevs[neighbor.name] === undefined) prevs[neighbor.name] = [];
      const neighborsPreviousStations = prevs[neighbor.name];
      const newNeighborsPreviousStation = { name: currentNodeName, line: neighbor.line };
      const neighborDistance = distances[currentNodeName] + 1;
      distances[neighbor.name] = neighborDistance; // TODO: later we wont need distance
      neighborsPreviousStations.push(newNeighborsPreviousStation);
    });
    delete distances[currentNodeName]; // dont do this if we want to have some less efficient routes
  } while(!destinationReached && Object.keys(prevs).length < 200);
  if (!destinationReached) throw 'Destination not reached'; // For testing
  const builtRoutes = [];
  const initialPath = [];
  builtRoutes.push(initialPath);
  tracePath(prevs, endNode, builtRoutes, initialPath);
  // if (shortestDistance !== path.length) throw `the result is different from path : Expected ${shortestDistance}. Path: ${path}`; // For testing
  return builtRoutes;
}

function tracePath(listOfAllPrevNodes, destination, builtRoutes, builtPath) {
  const prevs = listOfAllPrevNodes[destination];
  // if there's no prev left, end the loop;
  if(!prevs) return;
  // make a new path for each prev except #1 prev
  for(let i = 1; i < prevs.length; i++) { // iterate from index = 1
    const newPath = [...builtPath];
    const { name, line } = prevs[i];
    newPath.push({ destination, line });
    builtRoutes.push(newPath);
    tracePath(listOfAllPrevNodes, name, builtRoutes, newPath);
  }
  // push 1st prev last, to avoid affecting the remaining path
  const { name, line } = prevs[0];
  builtPath.push({ destination, line });
  tracePath(listOfAllPrevNodes, name, builtRoutes, builtPath);
}

function findLowestDistanceNode(nodeDistances) {
  return Object
    .keys(nodeDistances)
    .reduce((a, b) => nodeDistances[a] < nodeDistances[b] ? a : b);
}

function findNeighborNodes(graph, currentNodeName, prevs) {
  const { adjacent } = graph[currentNodeName];
  // return all neighbor, but dont go back to prev node
  const previousNodes = prevs[currentNodeName] || [];
  return adjacent.filter(station => // can't use Array.prototype.includes :(
    previousNodes.filter(prev => prev.name === station.name).length === 0
    // previousNodes.reduce((result, prev) => result && prev.name !== station.name, true)
  );
}
