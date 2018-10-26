process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    const input = String(chunk).split('\\n');
    const { N, A, B, graph } = createDataFromInput(input)
    findAllWays(N, A, B, graph, [], 0);
  }
});

function createDataFromInput(input) {
  const N = Number(input[0]);
  const nodes = input[1].split(' ');
  const A = nodes[0];
  const B = nodes[1];
  const rawGraph = input.slice(2);
  const graph = rawGraph.filter(row => row !== '').map(row => {
    return row.split(' ').reduce((acc, key, i) => {
      if (key === '1') {
        return { ...acc, [i]: false }
      }
      return acc;
    }, {})
  });
  return { N, A, B, graph};
}

function findAllWays(N, A, B, graph, path, vertex) {
  if (Number(vertex) === B - 1) {
    path.push(Number(vertex) + 1);
    console.log(path.join(' '));
    return false;
  }
  const nodes = Object.keys(graph[vertex]);
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (graph[vertex][node] === true) {
      continue;
    }
    if (Number(node) <= vertex) {
      graph[vertex][node] = true;
      continue;
    }
    graph[vertex][node] = true;
    findAllWays(N, A, B, graph, [...path, Number(vertex) + 1], node);
  }
}
