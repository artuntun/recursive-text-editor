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
    "typesetting industry. Lorem Ipsum has been the industry's ",
    "standard dummy text ever since the 1500s, when an unknown ",
    "printer took a galley of type and scrambled it to make a type ",
    "specimen book. It has survived not only five centuries, but ",
    "also the leap into electronic typesetting, remaining essentially ",
    "unchanged. It was popularised in the 1960s with the release of ",
    "Letraset sheets containing Lorem Ipsum passages, and more recently ",
    "with desktop publishing software like Aldus PageMaker including versions ",
    "of Lorem Ipsum.",
  ];
  return randomChoice(textChoices);
}
