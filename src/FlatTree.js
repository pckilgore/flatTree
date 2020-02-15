// A set of operations for a flat tree data structure.

export function initialize(map, root, init = true) {
  let count = 0;

  function walk(map, root) {
    let list = [];
    let node = map[root];
    let children = node.children;
    let add = { ...node, offset: count++ };
    list.push(add);

    if (children.length === 0) {
      return list;
    }

    children.forEach(child => {
      list.push(...walk(map, child));
    });

    return list;
  }

  return walk(map, root);
}

export function initializeLayer(map, root) {
  return map[root].children.map((child, offset) => ({ ...map[child], offset }));
}
