import * as FlatTree from "./FlatTree";
import shuffle from "shuffle-array";

let structure = [
  { id: "ROOT", parent: undefined, children: ["A", "B", "C"] },
  { id: "A", parent: "ROOT", children: ["A_1", "A_2"] },
  { id: "A_1", parent: "A", children: [] },
  { id: "A_2", parent: "A", children: ["A_2_i", "A_2_ii"] },
  { id: "A_2_i", parent: "A_2", children: [] },
  { id: "A_2_ii", parent: "A_2", children: [] },
  { id: "B", parent: "ROOT", children: [] },
  { id: "C", parent: "ROOT", children: ["C_1", "C_2", "C_3"] },
  { id: "C_1", parent: "C", children: [] },
  { id: "C_2", parent: "C", children: ["C_2_i"] },
  { id: "C_2_i", parent: "C_2", children: [] },
  { id: "C_3", parent: "C", children: [] }
];

let map = structure.reduce((map, node) => ({ ...map, [node.id]: node }), {});

describe("initialization", () => {
  it("initialized a single layer with the right offsets", () => {
    expect(FlatTree.initializeLayer(map, "ROOT")).toEqual([
      { id: "A", parent: "ROOT", children: ["A_1", "A_2"], offset: 0 },
      { id: "B", parent: "ROOT", children: [], offset: 1 },
      { id: "C", parent: "ROOT", children: ["C_1", "C_2", "C_3"], offset: 2 }
    ]);
  });

  it("initializes a whole tree with the right offsets", () => {
    let shuffledAndMapped = shuffle(structure, { copy: true }).reduce(
      (map, node) => ({ ...map, [node.id]: node }),
      {}
    );

    expect(FlatTree.initialize(map, "ROOT")).toEqual(
      structure.map((node, offset) => ({ ...node, offset }))
    );

    expect(FlatTree.initialize(shuffledAndMapped, "ROOT")).toEqual(
      structure.map((node, offset) => ({ ...node, offset }))
    );
  });
});
