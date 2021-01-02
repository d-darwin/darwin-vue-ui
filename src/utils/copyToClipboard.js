export default text => {
  const dummyElement = document.createElement("input");

  document.body.appendChild(dummyElement);
  dummyElement.value = text;
  dummyElement.select();
  document.execCommand("copy");
  document.body.removeChild(dummyElement);
};
