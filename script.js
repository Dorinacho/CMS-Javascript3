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
    var picture = document.getElementById('picture-upload').files[0];

    birthdate = moment(birthdate).format("D MMMM YYYY");

    var formData = {
        employeeFullName: firstName + " " + lastName,
        employeeEmail: email,
        employeeSex: sex,
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
    }

    let nameCell = row.insertCell(1);
    nameCell.innerHTML = data.employeeFullName;
    let emailCell = row.insertCell(2);
    emailCell.innerHTML = data.employeeEmail;
    let sexCell = row.insertCell(3);
    sexCell.innerHTML = data.employeeSex;
    let birthdateCell = row.insertCell(4);
    birthdateCell.innerHTML = data.employeeBirthdate;
    let deleteCell = row.insertCell(5);
    deleteCell.innerHTML = `<button onClick="deleteEmployee(this)">Delete</button>`
}

function resetForm() {
    document.getElementById('first-name').value = "";
    document.getElementById('last-name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('sex-selector').value = " -- select an option -- ";
    document.getElementById('birthdate').value = "";
    document.getElementById('picture-upload').value = "";
}

// function getBase64Image() {
//     var img = document.getElementById('picture-upload');
//     //create an empty canvas
//     var canvas = document.createElement('canvas');
//     canvas.width = img.width;
//     canvas.height = img.height;

//     //copy the image to the canvas
//     var imgCopy = canvas.getContext('2d');
//     imgCopy.drawImage(img, 0, 0);

//     //get the data-URL from the canvas
//     var imgURL = canvas.toDataURL('image/png')

//     return imgURL.replace(/^data:image\/(png|jpg);base64,/, "");
// }

// function readFile() {
//     var file = document.getElementById('picture-upload').files[0];
//     row.insertCell(0);
//     let pictureCell = document.createElement('img')
//     pictureCell.setAttribute('id', 'picture');
//     //  pictureCell = data.picture;
//     var reader = new FileReader();

//     reader.onload = (e) => {
//         document.getElementById('picture').src = e.target.result;
//     }

//     reader.readAsDataURL(file);
// }


// function getPictureURL() {
//     document.createElement('img');
//     var pictureURL = document.querySelector('img');
//     var file = document.getElementById('picture-upload').files[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//         pictureURL.src = reader.result;
//     }
//     console.log(pictureURL);
//     if (file) {
//         reader.readAsDataURL(file);
//     }
// }


// function previewFile() {
//     const preview = document.querySelector('img');
//     const file = document.querySelector('input[type=file]').files[0];

//     const reader = new FileReader();

//     reader.addEventListener("load", function() {
//         // convert image file to base64 string
//         preview.src = reader.result;
//     }, false);

//     if (file) {
//         reader.readAsDataURL(file);
//     }
// }

// const moment = require('moment');
// const today = moment();
// today.format('DD-MMMM-YYYY');