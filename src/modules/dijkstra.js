export default function findShortestRoute(startingStation, destinationStation) {
  console.log(startingStation, destinationStation);
  return [
    {
      lines: 'EW-NS-CC',
      stopCount: 8,
      interchangeCount: 2,
      steps: [
        {
          line: 'EW',
          destination: 'City Hall',
          stopCount: 1, 
        },
        {
          line: 'NS',
          destination: 'Bishan',
          stopCount: 5, 
        },
        {
          line: 'CC',
          destination: 'Caldecott',
          stopCount: 2, 
        }
      ]
    },
    {
      lines: 'EW',
      stopCount: 10,
      steps: [
        {
          line: 'EW',
          destination: 'Clementi',
          stopCount: 10, 
        },
      ]
    }
  ];
}
