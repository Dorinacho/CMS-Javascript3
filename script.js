function onFormSubmit() {
    var formData = readFormData();
    insertNewRow(formData);
}

function readFormData() {
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var email = document.getElementById('email').value;
    var sex = document.getElementById('sex-selector').value;
    var birthDate = document.getElementById('birth-date').value;

    var formData = {
        employeeFullName: firstName + " " + lastName,
        employeeEmail: email,
        employeeSex: sex,
        employeeBirthDate: birthDate
    }
    return formData;
}

function deleteEmployee(td) {


    if (confirm("Are you sure you want to delete this employee?")) {
        row = td.parentElement.parentElement;
        document.getElementById('user-table').deleteRow(row.rowIndex);
    }
}

function insertNewRow(data) {
    let table = document.getElementById('user-table').getElementsByTagName('tbody')[0];
    let row = table.insertRow(-1);
    let nameCell = row.insertCell(0);
    nameCell.innerHTML = data.employeeFullName;
    let emailCell = row.insertCell(1);
    emailCell.innerHTML = data.employeeEmail;
    let sexCell = row.insertCell(2);
    sexCell.innerHTML = data.employeeSex;
    let birthDateCell = row.insertCell(3);
    birthDateCell.innerHTML = data.employeeBirthDate;
    let deleteCell = row.insertCell(4);
    deleteCell.innerHTML = `<button onClick="deleteEmployee(this)">Delete</button>`
}