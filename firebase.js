const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyBup86geMgrpmK2Dwdue7Re5ZCl5kq8B5o',
    authDomain: 'cms-javascript.firebaseapp.com',
    projectId: 'cms-javascript'
});

//firebase.firestore()

var db = firebase.firestore();

function onFormSubmit() {
    getData();
    document.getElementById('employee-data').reset();
    //forEachKey();
}


document.getElementById('picture-upload').addEventListener('change', convertPicture, false);
var image = './images/user.png';

function convertPicture() {
    var picture = document.getElementById('picture-upload').files[0];
    if (picture != null) {
        const reader = new FileReader();
        reader.onload = (e) => {
            image = e.target.result;
        }
        reader.readAsDataURL(picture)
    }
}

function getData() {
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var email = document.getElementById('email').value;
    var gender = document.getElementById('gender-selector').value;
    var birthdate = document.getElementById('birthdate').value;
    // var picture = document.getElementById('picture-upload').files[0];

    birthdate = moment(birthdate).format("D MMMM YYYY");

    var employee = new Object();
    employee.name = firstName + ' ' + lastName;
    employee.email = email;
    employee.gender = gender;
    employee.birthdate = birthdate;
    employee.picture = image;

    localStorage.setItem(email, JSON.stringify(employee));
    //  return employee;

    addNewRow(employee);
}

//show all the employees from the local storage
for (const key in localStorage) {
    //  console.log(`${key}: ${localStorage.getItem(key)}`);
    var y = JSON.parse(localStorage.getItem(key));
    addNewRow(y);
}

function addNewRow(x) {
    var table = document.querySelector('tbody');
    const row = document.createElement('tr');

    row.innerHTML = `<td><img src="${x.picture}" /></td>
        <td>${x.name}</td>
        <td>${x.email}</td>
        <td>${x.gender}</td>
        <td>${x.birthdate}</td>
        <td><button class="btn btn-danger" onClick="deleteEmployee(this)">Delete</button></td>`;

    table.appendChild(row);
}

function deleteEmployee(td) {
    if (confirm("Are you sure you want to delete this employee?")) {
        // JSON.parse(localStorage.removeItem(employeeObj.email));
        row = td.parentElement.parentElement;
        document.getElementById('employee-table').deleteRow(row.rowIndex);
    }
}