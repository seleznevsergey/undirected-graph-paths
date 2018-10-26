process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    const input = String(chunk).split('\\n');
    const { N, A, B, graph } = createDataFromInput(input);
    const paths = findAllWays(N, A, B, graph)
    console.log(paths);
  }
});

function createDataFromInput(input) {
  const N = Number(input[0]);
  const nodes = input[1].split(' ');
  const A = Number(nodes[0]);
  const B = Number(nodes[1]);
  const rawGraph = input.slice(2);
  const graph = rawGraph.filter(row => row !== '').map(row => {
    return row.split(' ').reduce((acc, key, i) => {
      if (key === '1') {
        return [...acc, i]
      }
      return acc;
    }, [])
  });
  return { N, A, B, graph};
}

function findOneWay(N, A, B, graph, firstNode) {
  let currNode = firstNode;
  let path = [A];

  for (let i = 0; i < N - 1; i++) {
    if (currNode === B - 1) {
      path.push(currNode + 1);
      break;
    }
    for (let j = 0; j < graph[currNode].length; j++) {
      const buf = graph[currNode][j];
      if (buf > currNode) {
        currNode = buf;
        path.push(currNode + 1);
        break;
      }
    }
  }
  return path;
}

function findAllWays(N, A, B, graph) {
  const paths = [];
  for (let i = 0; i < graph[0].length; i++) {
    const firstNode = graph[0][i];
    if (firstNode === A) {
      continue;
    }
    const path = findOneWay(N, A, B, graph, firstNode);
    if (path[path.length - 1] === B) {
      paths.push(path.join(' '));
    }
  }
  return paths.join('\n');
}
