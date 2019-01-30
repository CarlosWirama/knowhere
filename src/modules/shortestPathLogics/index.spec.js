import findShortestRoute from './index';

describe('findShortestRoute logic', () => {
  it('return correct routes Bedok -> Eunos', () => {
    const expected = [
      {
        lines: ["EW"],
        stopCount: 2,
        interchangeCount: 0,
        steps: [
          { line: "EW", destination: "Eunos", stopCount: 2 }
        ],
        heuristicValue: 2
      }
    ];
    const actual = findShortestRoute('Bedok', 'Eunos');
    expect(actual).toEqual(expected);
  });

  it('return correct routes Ang Mo Kio -> Chinatown', () => {
    const expected = [{"lines":["NS","NE"],"stopCount":10,"interchangeCount":1,"steps":[{"line":"NS","destination":"Dhoby Ghaut","stopCount":8},{"line":"NE","destination":"Chinatown","stopCount":2}],"heuristicValue":11.6},{"lines":["NS","DT","NE"],"stopCount":9,"interchangeCount":2,"steps":[{"line":"NS","destination":"Newton","stopCount":5},{"line":"DT","destination":"Little India","stopCount":1},{"line":"NE","destination":"Chinatown","stopCount":3}],"heuristicValue":12.2},{"lines":["NS","TE","NE"],"stopCount":10,"interchangeCount":2,"steps":[{"line":"NS","destination":"Orchard","stopCount":6},{"line":"TE","destination":"Outram Park","stopCount":3},{"line":"NE","destination":"Chinatown","stopCount":1}],"heuristicValue":13.2}];
    const actual = findShortestRoute('Ang Mo Kio', 'Chinatown');
    expect(actual).toEqual(expected);
  });
});
