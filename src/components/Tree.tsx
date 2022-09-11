import React from "react";
import { uuidv4 } from "../utilities/randomGeneration";

export class Tree {
  id: string;
  children: Tree[];
  parent?: Tree;
  value: string;
  ref: React.RefObject<HTMLSpanElement>;

  constructor({
    children = [],
    value,
    parent,
    id,
  }: {
    children: Tree[];
    value: string;
    parent?: Tree;
    id?: string;
  }) {
    this.id = id || uuidv4();
    children.forEach((child) => {
      child.parent = this;
    });
    this.children = children;
    this.parent = parent;
    this.value = value;
    this.ref = React.createRef();
  }
  static copyTree(tree: Tree, id = tree.id, parent?: Tree) {
    const newTree = new Tree({ children: [], value: tree.value, parent, id });
    tree.children.forEach((child) => {
      newTree.children.push(Tree.copyTree(child, child.id, newTree));
    });
    return newTree;
  }
}

export const findRoot = (leaf: Tree): Tree => {
  if (leaf.parent) {
    return findRoot(leaf.parent);
  }
  return leaf;
};

export const fetchNode = (id: string, tree: Tree): Tree | undefined => {
  let result;
  if (id === tree.id) {
    return tree;
  }
  for (const child of tree.children) {
    result = fetchNode(id, child);
    if (result) {
      return result;
    }
  }

  return result;
};

export const findUpperSibling = (leaf: Tree) => {
  const parentNode = leaf.parent;
  if (!parentNode) {
    return null;
  }
  const childIndex = parentNode.children.findIndex(
    (node) => node.id === leaf.id
  );
  if (childIndex === 0) {
    return null;
  }
  if (parentNode.children.length < 2) {
    return null;
  }
  return parentNode.children[childIndex - 1];
};
