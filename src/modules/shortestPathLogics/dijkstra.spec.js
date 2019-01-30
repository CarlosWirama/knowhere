import dijkstra from './dijkstra';
import stationMap from './initializeData';

describe('Dijkstra logic', () => {
  it('return correct routes Bedok -> Eunos', () => {
    const expected = [
      [
        { line: 'EW', destination: 'Eunos' },
        { line: 'EW', destination: 'Kembangan' }
      ]
    ];
    const actual = dijkstra(stationMap, 'Bedok', 'Eunos');
    expect(actual).toEqual(expected);
  });

  it('return correct routes Ang Mo Kio -> Chinatown', () => {
    const expected = [[{"destination":"Chinatown","line":"NE"},{"destination":"Clarke Quay","line":"NE"},{"destination":"Dhoby Ghaut","line":"NE"},{"destination":"Little India","line":"DT"},{"destination":"Newton","line":"NS"},{"destination":"Novena","line":"NS"},{"destination":"Toa Payoh","line":"NS"},{"destination":"Braddell","line":"NS"},{"destination":"Bishan","line":"NS"}],[{"destination":"Chinatown","line":"NE"},{"destination":"Outram Park","line":"TE"},{"destination":"Havelock","line":"TE"},{"destination":"Great World","line":"TE"},{"destination":"Orchard","line":"NS"},{"destination":"Newton","line":"NS"},{"destination":"Novena","line":"NS"},{"destination":"Toa Payoh","line":"NS"},{"destination":"Braddell","line":"NS"},{"destination":"Bishan","line":"NS"}],[{"destination":"Chinatown","line":"NE"},{"destination":"Clarke Quay","line":"NE"},{"destination":"Dhoby Ghaut","line":"NS"},{"destination":"Somerset","line":"NS"},{"destination":"Orchard","line":"NS"},{"destination":"Newton","line":"NS"},{"destination":"Novena","line":"NS"},{"destination":"Toa Payoh","line":"NS"},{"destination":"Braddell","line":"NS"},{"destination":"Bishan","line":"NS"}]];
    const actual = dijkstra(stationMap, 'Ang Mo Kio', 'Chinatown');
    expect(actual).toEqual(expected);
  });
});
