export function showSelect(elements, container) {
  const nameSelect = document.createElement("SELECT");

  elements.forEach((element) => {
    const { name, id } = element;
    const option = document.createElement("OPTION");
    option.textContent = name;
    option.setAttribute("id", id);
    nameSelect.appendChild(option);
  });
  container.appendChild(nameSelect);
}
