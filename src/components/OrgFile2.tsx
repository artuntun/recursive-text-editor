import React from "react";
import styles from "./OrgFile2.module.css";
import { Tree, findRoot, fetchNode, findUpperSibling } from "../utilities/Tree";
import { uuidv4 } from "../utilities/randomGeneration";

interface OrgFile2Props {
  tree: Tree;
  setRoot: (newTree: Tree) => void;
}

export const OrgFile2: React.FC<OrgFile2Props> = ({ tree, setRoot }) => {
  const [leaf, setLeaf] = React.useState(tree);
  const [activeCell, setActiveCell] = React.useState<Tree>(tree);
  const [isChildrenVisible, setIsChildrenVisible] = React.useState(true);

  React.useEffect(() => {
    setLeaf(tree);
  }, [tree]);

  React.useEffect(() => {
    if (activeCell) {
      activeCell?.ref.current?.focus();
      console.log(activeCell);
    }
  }, [activeCell]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Tab") {
      event.preventDefault();
      const realRoot = findRoot(leaf);
      const copiedTree = Tree.copyTree(realRoot, uuidv4());
      const newLeaf = fetchNode(leaf.id, copiedTree);
      if (!newLeaf) {
        return;
      }
      const parent = newLeaf.parent;
      if (!parent) {
        return;
      }
      const upperSibling = findUpperSibling(newLeaf);
      if (!upperSibling) {
        return;
      }
      parent.children = parent.children.filter(
        (child) => child.id !== newLeaf.id
      );
      newLeaf.parent = upperSibling;
      upperSibling.children.push(newLeaf);
      setRoot(copiedTree);
    }
  }

  function handleOnBlur(event: React.KeyboardEvent<HTMLSpanElement>) {
    const realRoot = findRoot(leaf);
    const copiedTree = Tree.copyTree(realRoot, uuidv4());
    const newLeaf = fetchNode(leaf.id, copiedTree);
    if (!newLeaf) {
      return;
    }
    newLeaf.value = event.target.innerText;
    setLeaf(newLeaf);
    setRoot(copiedTree);
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      const realRoot = findRoot(leaf);
      const copiedTree = Tree.copyTree(realRoot, uuidv4());
      if (!leaf.parent) {
        return;
      }
      const newLeaf = fetchNode(leaf.id, copiedTree);
      newLeaf.value = event.target.innerText;
      const parent = fetchNode(leaf.parent.id, copiedTree);
      const newNode = new Tree({ children: [], value: "", parent: parent });
      parent?.children.push(newNode);
      setRoot(copiedTree);
      setLeaf(newNode);
      setActiveCell(newNode);
    }
  }

  return (
    <ul>
      <li
        onClick={({ target }) => {
          if (((target as any).tagName as string) !== "LI") {
            return;
          }
          setIsChildrenVisible((oldIsChildrenVisible) => !oldIsChildrenVisible);
        }}
      >
        <span
          suppressContentEditableWarning
          contentEditable
          role="textbox"
          className={styles.typeBox}
          defaultValue={leaf.value}
          ref={leaf.ref}
          onBlur={handleOnBlur}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        >
          {leaf.value}
        </span>
      </li>
      {isChildrenVisible &&
        leaf.children.map((child) => (
          <OrgFile2 key={`${child.id}`} tree={child} setRoot={setRoot} />
        ))}
    </ul>
  );
};
