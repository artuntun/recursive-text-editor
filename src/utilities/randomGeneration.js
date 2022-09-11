export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const randomChoice = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export function randomText() {
  var textChoices = [
    "Lorem Ipsum is simply dummy text of the printing and ",
    "Typesetting industry. Lorem Ipsum has been the industry's ",
    "Standard dummy text ever since the 1500s, when an unknown ",
    "Printer took a galley of type and scrambled it to make a type ",
    "Specimen book. It has survived not only five centuries, but ",
    "Also the leap into electronic typesetting, remaining essentially ",
    "Unchanged. It was popularised in the 1960s with the release of ",
    "Letraset sheets containing Lorem Ipsum passages, and more recently ",
    "With desktop publishing software like Aldus PageMaker including versions ",
  ];
  return randomChoice(textChoices);
}
