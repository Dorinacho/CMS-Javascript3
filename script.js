// function addUser() {

//     let table = document.getElementById('user-table');
//     let row = table.insertRow(-1);
//     let nameCell = row.insertCell(0);
//     let emailCell = row.insertCell(1);
//     let sexCell = row.insertCell(2);
//     let birthDateCell = row.insertCell(3);

function readFormData() {
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var email = document.getElementById('email').value;
    var sex = document.getElementById('sex-selector').value;
    var birthDate = document.getElementById('birth-date').value;

    var formData = {
        userFullName: firstName + " " + lastName,
        userEmail: email,
        userSex: sex,
        userBirthDate: birthDate
    }

    // formData.userFullName = document.getElementById('first-name').value + " " + document.getElementById('last-name').value;
    // formData.userEmail = document.getElementById('email').value;
    // formData.userSex = document.getElementById('sex-selector').value;
    // formData.userBirthDate = document.getElementById('birth-date').value;
    return formData;
}



//     if (typeof firstName !== 'string' || firstName == "") {
//         alert("Please provide your name!");

//         return false;
//     } else if (typeof lastName !== 'string' || lastName == "") {
//         alert("Please provide your name!");

//         return false;
//     } else {
//         nameCell += firstName + " " + lastName;
//     }



//     emailCell.innerHTML = email;
//     sexCell.innerHTML = sex;
//     birthDateCell.innerHTML = birthDate;
// }

var selectedRow = null;

// let's validate some data

// function validateData() {
//     var isValid = true;
//     // if (typeof firstName !== 'string') {
//     //     isValid = false;
//     //     alert("Please don't introduce numbers in your")
//     // } else {
//     //     isValid = true;
//     // }
//     return isValid;
// }

function onFormSubmit() {
    // if (validateData()) {
    var formData = readFormData();

    insertNewRow(formData);


    // }
}

function insertNewRow(data) {
    var table = document.getElementById('user-table').getElementsByTagName('tbody')[0];
    var row = table.insertRow(-1);
    let nameCell = row.insertCell(0);
    nameCell.innerHTML = data.userFullName;
    var emailCell = row.insertCell(1);
    emailCell.innerHTML = data.userEmail;
    var sexCell = row.insertCell(2);
    sexCell.innerHTML = data.userSex;
    var birthDateCell = row.insertCell(3);
    birthDateCell.innerHTML = data.userBirthDate;
}