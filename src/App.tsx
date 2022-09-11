import { Tree } from "./utilities/Tree";
import { randomText } from "./utilities/randomGeneration";
import { Wrapper } from "./components/Wrapper";
import { RecursiveTextEditor } from "./components/RecursiveTextEditor";
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
      <h1>Recursive Text Editor</h1>
      <RecursiveTextEditor tree={root} setRoot={setRoot} />
    </Wrapper>
  );
}

export default App;
