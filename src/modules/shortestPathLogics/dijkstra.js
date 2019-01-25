export default function dijkstra(graph, startNode, endNode) {
  // const unvisitedNodes = Object.keys(graph);
  let shortestStops = 999;
  const distances = { [startNode]: 0 };
  const prevs = {};
  do {
    const currentNode = findLowestDistanceNode(distances);
    const currentDistance = distances[currentNode];
    if(currentNode === endNode) {
      shortestStops = currentDistance;
    }
    findNeighborNodes(graph, currentNode, prevs).forEach(neighbor => {
      const newNeighborDistance = currentDistance + 1;
      if (newNeighborDistance > distances[neighbor]) {
        // this block intentionaly left empty
        // comparing both (undefined > int) and (undefined < int) will return false
      } else {
        distances[neighbor] = newNeighborDistance;
        // TODO enable prevs to store more than 1 prevs,
        // e.g. I'm from Chinatown and can take  NE-EW or DT-CC to Paya Lebar
        // then Paya Lebar should store 2 (or more) prevs
        // the condition should allow newNeighborDistance
        // with 1-2 more stops than existing stored value
        prevs[neighbor] = currentNode;
      }
    });
    delete distances[currentNode];
  } while(shortestStops === 999 || Object.keys(prevs).length > 100); // TODO
  // return { shortestStops, distances, prevs };
  return tracePath(prevs, endNode);
}

function tracePath(listOfPrevNodes, destination, builtPath = []) {
  console.log(destination)
  const prevNode = listOfPrevNodes[destination];
  return destination
    ? tracePath(listOfPrevNodes, prevNode, builtPath.concat([destination]))
    : builtPath;
}

function findLowestDistanceNode(nodeDistances) {
  return Object
    .keys(nodeDistances)
    .reduce((a, b) => nodeDistances[a] < nodeDistances[b] ? a : b);
}

function findNeighborNodes(graph, currentNodeName, prevs) {
  const { adjacent } = graph[currentNodeName];
  const previousNode = prevs[currentNodeName];
  // return all neighbor, but dont go back to prev node
  return adjacent.filter(station => station !== previousNode);
}
