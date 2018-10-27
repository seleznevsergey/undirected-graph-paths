process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    const input = String(chunk).split('\\n');
    const { A, B, graph } = createDataFromInput(input);
    findAllWays(B, graph, [], A - 1);
  }
});

function createDataFromInput(input) {
  const nodes = input[1].split(' ');
  const A = nodes[0];
  const B = nodes[1];
  const rawGraph = input.slice(2);
  const graph = rawGraph
    .filter(row => row !== '\r\n' && row !== '')
    .map((row, index) => ({ nodes: getNodes(row, index), visited: false }));
  return { A, B, graph };
}

function getNodes(row, index) {
  return row.split(' ').reduce((acc, key, i) => {
    if (key === '1' && index !== i) {
      return [...acc, i];
    }
    return acc;
  }, []);
}

function findAllWays(B, graph, path, vertex) {
  if (vertex === B - 1) {
    path.push(vertex + 1);
    console.log(path.join(' '));
    return;
  }
  graph[vertex].visited = true;
  graph[vertex].nodes.forEach(nextVertex => {
    if (!graph[nextVertex].visited) {
      findAllWays(B, { ...graph }, [...path, vertex + 1], nextVertex);
    }
  });
}
