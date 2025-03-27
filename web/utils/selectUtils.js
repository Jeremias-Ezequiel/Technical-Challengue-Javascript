export function showSelect(elements, container) {
  const option = document.createElement("OPTION");
  option.selected = true;
  option.setAttribute("value", "-");
  option.textContent = "Select a product";
  container.appendChild(option);

  elements.forEach((element) => {
    const { name, id } = element;
    const option = document.createElement("OPTION");
    option.textContent = name;
    option.setAttribute("value", id);
    container.appendChild(option);
  });
}
