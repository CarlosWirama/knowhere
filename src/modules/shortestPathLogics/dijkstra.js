export default function dijkstra(graph, startNode, endNote) {
  const distances = { [startNode]: 0 };

  // while(unvisitedNodes.length) {

    const currentNode = findNearestNode(distances);
    findNeighborNodes(graph, currentNode).forEach(node => {
      const distance = 'a';
    });
    
  // }
}

function findNearestNode(nodeDistances) {
  return Object
    .keys(nodeDistances)
    .reduce((a, b) => nodeDistances[a] < nodeDistances[b] ? a : b);
}

function findNeighborNodes(currentNodeIndex) {
  // const currentNode = stations[currentNodeIndex];
  return [];
}
