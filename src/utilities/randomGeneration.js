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
    "Pues como no me salia el codigo, decidi tirar el ordenador por la ventana",
    "Estaba yo caminando por la calle..",
    "Nunca mas voy a correr detras del autobus",
    "Lisa necesita un aparato",
    "No soy el senior Mongomery, ya se lo dicho muchas veces",
    "Un tonto nunca se recupera del exito",
    "Basta ya de adorar a un mono. Hemos perdido la cabeza?",
    "Cuanto me costaria ese ninio?",
  ];
  return randomChoice(textChoices);
}
