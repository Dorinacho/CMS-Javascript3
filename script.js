function onFormSubmit() {
    var formData = readFormData();
    insertNewRow(formData);
    resetForm();
}

function readFormData() {
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var email = document.getElementById('email').value;
    var gender = document.getElementById('gender-selector').value;
    var birthdate = document.getElementById('birthdate').value;
    var picture = document.getElementById('picture-upload').files[0];

    birthdate = moment(birthdate).format("D MMMM YYYY");

    var formData = {
        employeeFullName: firstName + " " + lastName,
        employeeEmail: email,
        employeeGender: gender,
        employeeBirthdate: birthdate,
        employeePicture: picture
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
    let pictureCell = row.insertCell(0);
    let imgTag = document.createElement('img');
    pictureCell.appendChild(imgTag);

    if (data.employeePicture != null) {

        var reader = new FileReader();
        reader.onload = (e) => {
            imgTag.src = e.target.result;
        }
        reader.readAsDataURL(data.employeePicture);
    } else {
        imgTag.src = "./images/user.png";
    }

    let nameCell = row.insertCell(1);
    nameCell.innerHTML = data.employeeFullName;
    let emailCell = row.insertCell(2);
    emailCell.innerHTML = data.employeeEmail;
    let genderCell = row.insertCell(3);
    genderCell.innerHTML = data.employeeGender;
    let birthdateCell = row.insertCell(4);
    birthdateCell.innerHTML = data.employeeBirthdate;
    let deleteCell = row.insertCell(5);
    deleteCell.innerHTML = `<button class="btn btn-danger" id="delete-button" onClick="deleteEmployee(this)">Delete</button>`
}

function resetForm() {
    document.getElementById('first-name').value = "";
    document.getElementById('last-name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('gender-selector').value = " -- select an option -- ";
    document.getElementById('birthdate').value = "";
    document.getElementById('picture-upload').value = "";
}