const BASE_URL = "http://localhost:3000/api/v1/employee";

function fetchEmployees() {
  fetch("http://localhost:3000/api/v1/employee")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("dataTable");
      tableBody.innerHTML = "";
      const list = data.data;
      list.forEach((item) => {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell);

        tableBody.appendChild(row);
        deleteButton.addEventListener("click", () => deleteEmployee(item.id));
      });
    })
    .catch((error) => console.error(error));
}

// TODO
// add event listener to submit button
const employeeForm = document.getElementById("employeeForm");
employeeForm.addEventListener("submit", (e) => {
  e.preventDefault(); // This line prevernts the refresh of the page
  createEmployee();
});
// TODO
// add event listener to update button
const updateForm = document.getElementById("updateEmployeeForm");

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  updateEmployee();
});
// TODO
// add event listener to delete button

// TODO
function createEmployee() {
  // get data from input field
  const name = document.getElementById("name").value.trim();
  const id = document.getElementById("id").value.trim();
  // send data to BE
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name }),
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Create failed");
      return data;
    })
    .then(() => {
      fetchEmployees();
      document.getElementById("name").value = "";
      document.getElementById("id").value = "";
    })
    .catch((err) => alert(err.message));

  // call fetchEmployees
}

// TODO
function deleteEmployee(id) {
  // get id
  // send id to BE
  // call fetchEmployees
  fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      return data;
    })
    .then(() => fetchEmployees())
    .catch((err) => alert(err.message));
}

// TODO
function updateEmployee() {
  // get data from input field
  // send data to BE
  // call fetchEmployees
  const id = document.getElementById("updateId").value.trim();
  const name = document.getElementById("updateName").value.trim();
  fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      return data;
    })
    .then(() => {
      fetchEmployees();
      document.getElementById("updateId").value = "";
      document.getElementById("updateName").value = "";
    })
    .catch((err) => alert(err.message));
}

fetchEmployees();
