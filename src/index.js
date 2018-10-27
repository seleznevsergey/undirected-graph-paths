process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    const input = String(chunk).split('\\n');
    const { N, A, B, graph } = createDataFromInput(input);
    findAllWays(N, A, B, graph, [], A - 1);
  }
});

function createDataFromInput(input) {
  const N = Number(input[0]);
  const nodes = input[1].split(' ');
  const A = nodes[0];
  const B = nodes[1];
  const rawGraph = input.slice(2);
  const graph = rawGraph.filter(row => row !== '\r\n' && row !== '').map((row, index) => {
    return row.split(' ').reduce(
      (acc, key, i) => {
        if (key === '1' && index !== i) {
          acc.nodes.push(i);
        }
        return acc;
      },
      { nodes: [], visited: false },
    );
  });
  return { N, A, B, graph };
}

function findAllWays(N, A, B, graph, path, vertex) {
  if (vertex === B - 1) {
    path.push(Number(vertex) + 1);
    console.log(path.join(' '));
    return;
  }
  graph[vertex].visited = true;
  const nodes = graph[vertex].nodes;
  for (let i = 0; i < nodes.length; i++) {
    const nextVertex = nodes[i];
    if (graph[nextVertex].visited === true) {
      continue;
    }
    findAllWays(N, A, B, graph, [...path, vertex + 1], nextVertex);
  }
}
