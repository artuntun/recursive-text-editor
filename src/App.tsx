import { Wrapper } from "./components/Wrapper";
import { OrgFile2 } from "./components/OrgFile2";
import { Tree } from "./utilities/Tree";
import { randomText } from "./utilities/randomGeneration";
import React from "react";

const subchildren = [
  new Tree({ children: [], value: randomText() }),
  new Tree({ children: [], value: randomText() }),
];
const subchildren2 = [
  new Tree({ children: [], value: randomText() }),
  new Tree({ children: [], value: randomText() }),
];
const children = [
  new Tree({ children: subchildren, value: randomText() }),
  new Tree({ children: subchildren2, value: randomText() }),
];

const tree = new Tree({ children, value: randomText() });

function App() {
  const [root, setRoot] = React.useState(tree);
  return (
    <Wrapper>
      <h1>Infinite Text Editor</h1>
      <OrgFile2 tree={root} setRoot={setRoot} />
    </Wrapper>
  );
}

export default App;
