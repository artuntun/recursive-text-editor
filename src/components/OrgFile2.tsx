import React from "react";
import styles from "./OrgFile2.module.css";
import { Tree, findRoot, fetchNode, findUpperSibling } from "./Tree";
import { uuidv4 } from "../utilities/randomGeneration";

interface OrgFile2Props {
  tree: Tree;
  setRoot: (newTree: Tree) => void;
}

export const OrgFile2: React.FC<OrgFile2Props> = ({ tree, setRoot }) => {
  const [leaf, setLeaf] = React.useState(tree);
  const [isChildrenVisible, setIsChildrenVisible] = React.useState(true);

  React.useEffect(() => {
    setLeaf(tree);
  }, [tree]);

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
          onBlur={(event) => {
            const realRoot = findRoot(leaf);
            const copiedTree = Tree.copyTree(realRoot, uuidv4());
            const newLeaf = fetchNode(leaf.id, copiedTree);
            if (!newLeaf) {
              return;
            }
            newLeaf.value = event.target.innerText;
            setLeaf(newLeaf);
            setRoot(copiedTree);
          }}
          onKeyDown={(event) => {
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
          }}
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
