function onFormSubmit() {
    var formData = readFormData();
    insertNewRow(formData);
    resetForm();
}

function readFormData() {
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var email = document.getElementById('email').value;
    var sex = document.getElementById('sex-selector').value;
    var birthdate = document.getElementById('birthdate').value;

    var formData = {
        employeeFullName: firstName + " " + lastName,
        employeeEmail: email,
        employeeSex: sex,
        employeeBirthdate: birthdate
    }
    return formData;
}

function deleteEmployee(td) {
    if (confirm("Are you sure you want to delete this employee?")) {
        row = td.parentElement.parentElement;
        document.getElementById('employee-table').deleteRow(row.rowIndex);
    }
}

function insertNewRow(data) {
    let table = document.getElementById('employee-table').getElementsByTagName('tbody')[0];
    let row = table.insertRow(-1);
    let nameCell = row.insertCell(0);
    nameCell.innerHTML = data.employeeFullName;
    let emailCell = row.insertCell(1);
    emailCell.innerHTML = data.employeeEmail;
    let sexCell = row.insertCell(2);
    sexCell.innerHTML = data.employeeSex;
    let birthdateCell = row.insertCell(3);
    birthdateCell.innerHTML = data.employeeBirthdate;
    let deleteCell = row.insertCell(4);
    deleteCell.innerHTML = `<button onClick="deleteEmployee(this)">Delete</button>`
}

function resetForm() {
    document.getElementById('first-name').value = "";
    document.getElementById('last-name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('sex-selector').value = "";
    document.getElementById('birthdate').value = ";"
}