import { uuidv4 } from "../utilities/randomGeneration";
import React from "react";

export default class TreeNode {
  constructor(children = [], display = true, value = "") {
    this.id = uuidv4();
    this.ref = React.createRef();
    this.children = children;
    this.value = value;
    this.displayed = display;
  }
}

export const fetchNode = (id, tree) => {
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

export const fetchNodeParent = (id, tree, parent = null) => {
  let result;
  if (id === tree.id) {
    return parent;
  }
  for (const child of tree.children) {
    result = fetchNodeParent(id, child, tree);
    if (result) {
      return result;
    }
  }
  return result;
};

export const setNodeProperty = (id, tree, propertyName, propertyValue) => {
  if (id === tree.id) {
    tree[propertyName] = propertyValue;
  } else {
    for (const child of tree.children) {
      setNodeProperty(id, child, propertyName, propertyValue);
    }
  }
};

export const insertNode = (tree, parentId, node, position = -1) => {
  if (parentId === tree.id) {
    tree.children.splice(position, 0, node);
  } else {
    for (const child of tree.children) {
      insertNode(child, parentId, node, position);
    }
  }
};

export const deleteNode = (tree, nodeId, parent = null) => {
  if (nodeId === tree.id) {
    const idx = parent.children.findIndex((node) => node.id === nodeId);
    parent.children.splice(idx, 1);
  } else {
    for (const child of tree.children) {
      deleteNode(child, nodeId, tree);
    }
  }
};
