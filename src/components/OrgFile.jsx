/* tslint:disable */

import React from "react";
import TreeNode from "./Tree";
import { ResizableTextArea } from "./ResizableTextArea";
// import TextareaAutosize from 'react-textarea-autosize';
import {
  fetchNode,
  insertNode,
  deleteNode,
  setNodeProperty,
  fetchNodeParent,
} from "./Tree";
import { randomText } from "../utils";

export default class OrgFile extends React.Component {
  constructor(props) {
    super(props);
    // initialization
    const subchildren = [
      new TreeNode([], true, randomText()),
      new TreeNode([], true, randomText()),
    ];
    const subchildren2 = [
      new TreeNode([], true, randomText()),
      new TreeNode([], true, randomText()),
    ];
    const children = [
      new TreeNode(subchildren, true, randomText()),
      new TreeNode(subchildren2, true, randomText()),
    ];
    this.state = {
      refFocus: null,
      root: new TreeNode(children),
      shouldUpdate: true,
    };
  }

  handleKeyDown = (event) => {
    var EnterKey = event.key === "Enter";
    if (EnterKey) {
      event.preventDefault();
    } else if (event.keyCode === 9) {
      event.preventDefault();
      const newRoot = this.state.root;
      setNodeProperty(event.target.id, newRoot, "value", event.target.value);
      const currentNode = fetchNode(event.target.id, this.state.root);
      const parentNode = fetchNodeParent(currentNode.id, this.state.root);
      const idx = parentNode.children.findIndex(
        (node) => node.id === currentNode.id
      );
      if (idx > 0) {
        const prevNode = parentNode.children[idx - 1];
        deleteNode(newRoot, currentNode.id);
        insertNode(newRoot, prevNode.id, currentNode);
        this.setState({
          root: newRoot,
        });
      }
    } else if (event.keyCode === 8 && event.target.value.length === 0) {
      const newRoot = this.state.root;
      const currentNode = fetchNode(event.target.id, this.state.root);
      const parentNode = fetchNodeParent(currentNode.id, this.state.root);
      const idx = parentNode.children.findIndex(
        (node) => node.id === currentNode.id
      );
      var newRefFocus;
      if (idx === 0) {
        newRefFocus = parentNode.id;
      } else {
        newRefFocus = parentNode.children[idx - 1].id;
      }
      deleteNode(newRoot, currentNode.id);
      this.setState({
        root: newRoot,
        refFocus: newRefFocus,
        shouldUpdate: true,
      });
    } else {
      // setNodeProperty(event.target.id, newRoot, 'value', event.target.textContent)
      // this.setState({
      //   root: newRoot
      // });
    }
  };

  handleOnBlur = (event) => {
    const newRoot = this.state.root;
    setNodeProperty(event.target.id, newRoot, "value", event.target.value);
    this.setState({
      root: newRoot,
      shouldUpdate: false,
    });
  };

  handleOnClick = (event) => {
    const currentNode = fetchNode(event.target.id, this.state.root);
    this.setState({
      refFocus: currentNode.id,
      shouldUpdate: true,
    });
  };

  handleKeyUp = (event) => {
    var EnterKey = event.key === "Enter";
    var shiftEnter = EnterKey && event.shiftKey;
    // var enterOnly = event.keyCode == 'Enter' && !event.shiftKey;
    const newRoot = this.state.root;
    if (shiftEnter) {
      // if (event.key === "Enter") {
      const currentNode = fetchNode(event.target.id, this.state.root);
      setNodeProperty(currentNode.id, newRoot, "value", event.target.value);
      const parentNode = fetchNodeParent(currentNode.id, this.state.root);
      const idx = parentNode.children.findIndex(
        (node) => node.id === currentNode.id
      );
      const newElement = new TreeNode();
      insertNode(newRoot, parentNode.id, newElement, idx + 1);
      const newRefFocus = newElement.id;
      this.setState({
        root: newRoot,
        refFocus: newRefFocus,
        shouldUpdate: true,
      });
    }
  };
  //   if (event.keyCode === 8 && event.target.value.length === 0) {
  //     const newRoot = this.state.root;
  //     const currentNode = fetchNode(event.target.id, this.state.root)
  //     const parentNode = fetchNodeParent(currentNode.id, this.state.root)
  //     const idx = parentNode.children.findIndex(node => node.id === currentNode.id)
  //     var newRefFocus;
  //     if (idx === 0) {
  //       newRefFocus = parentNode.id
  //     }
  //     else {
  //       newRefFocus = parentNode.children[idx - 1].id
  //     }
  //     deleteNode(newRoot, currentNode.id)
  //     this.setState({
  //       root: newRoot,
  //       refFocus: newRefFocus
  //     });
  //   }
  // };

  componentDidUpdate() {
    if (this.state.refFocus) {
      const targetNode = fetchNode(this.state.refFocus, this.state.root);
      targetNode.ref.current.focus();
      // var range = document.createRange()
      // range.moveToElementText(targetNode.ref.current)
      // range.collapse(false);
      // range.select();
    }
  }

  colapseElement = (event) => {
    const newRoot = this.state.root;
    const currentNode = fetchNode(
      event.target.id.slice(0, -3),
      this.state.root
    );
    const newDisplayed = !currentNode.displayed;
    setNodeProperty(
      event.target.id.slice(0, -3),
      newRoot,
      "displayed",
      newDisplayed
    );
    this.setState({
      root: newRoot,
      refFocus: null,
      shouldUpdate: true,
    });
  };

  createMarkup(value) {
    return { __html: value };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.shouldUpdate) {
      return true;
    }
    return false;
  }

  renderTree(tree) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {tree.children.map((child, _) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "stretch",
                }}
              >
                <div>
                  <span
                    id={`${child.id}-bu`}
                    onClick={this.colapseElement}
                    style={{
                      display: "flex",
                      width: "6px",
                      height: "6px",
                      alignItems: "center",
                      borderRadius: "50%",
                      backgroundColor:
                        child.children.length > 0 && !child.displayed
                          ? "red"
                          : "black",
                      marginTop: "7px",
                      marginLeft: "5px",
                      marginRight: "4px",
                    }}
                  ></span>
                </div>
                {child.id === this.state.refFocus ? (
                  <ResizableTextArea
                    innerId={child.id}
                    innerRef={child.ref}
                    value={child.value}
                    onBlur={this.handleOnBlur}
                    onKeyUp={this.handleKeyUp}
                    onClick={this.handleOnClick}
                    onKeyDown={this.handleKeyDown}
                  />
                ) : (
                  <div
                    id={child.id}
                    ref={child.ref}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "justify",
                      textJustify: "initial",
                      alignItems: "flex-start",
                      justifyItems: "flex-start",
                    }}
                    onClick={this.handleOnClick}
                    dangerouslySetInnerHTML={this.createMarkup(child.value)}
                  />
                )}
              </div>
              {child.displayed === true ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "stretch",
                    marginLeft: "20px",
                  }}
                >
                  {this.renderTree(child)}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return <div className="OrgFile">{this.renderTree(this.state.root)}</div>;
  }
}
