export function showSelect(elements, container) {
  elements.forEach((element) => {
    const { name, id } = element;
    const option = document.createElement("OPTION");
    option.textContent = name;
    option.setAttribute("id", id);
    option.setAttribute("value", id);
    container.appendChild(option);
  });
}
