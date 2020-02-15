// A set of operations for a flat tree data structure.

export function initialize(map, root, offsetStart = 0) {
  let list = [];
  let node = map[root];
  let children = node.children;
  if (children.length === 0) {
    return list;
  }

  children.forEach((child, index) => {
    let offset = index + offsetStart;
    list.push({ ...node, offset }, ...initialize(map, child, offset));
  });

  return list;
}

export function initializeLayer(map, root) {
  return map[root].children.map((child, offset) => ({ ...map[child], offset }));
}
