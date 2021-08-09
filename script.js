function onFormSubmit() {
    writeDataInLS();
    resetForm();
}

function writeDataInLS() {
    const employeeData = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            gender: document.getElementById('gender-selector').value,
            birthdate: document.getElementById('birthdate').value,
            picture: document.getElementById('picture-upload').files[0]
        }
        //employeeData.push();
    localStorage.setItem('employeeData', JSON.stringify(employeeData));

}


function getDataFromLC() {
    localStorage.getItem('employeeData')
}
// function readFormData() {
//     var firstName = document.getElementById('first-name').value;
//     var lastName = document.getElementById('last-name').value;
//     var email = document.getElementById('email').value;
//     var gender = document.getElementById('gender-selector').value;
//     var birthdate = document.getElementById('birthdate').value;
//     var picture = document.getElementById('picture-upload').files[0];

//     birthdate = moment(birthdate).format("D MMMM YYYY");
//     var imgURL = () => {
//         if (picture != null) {

//             var reader = new FileReader();
//             reader.onload = (e) => {
//                 imgURL = e.target.result;
//             }
//             reader.readAsDataURL(picture);
//         } else {
//             imgURL = "./images/user.png";
//         }

//     }


//     var formData = {
//         employeeFullName: firstName + " " + lastName,
//         employeeEmail: email,
//         employeeGender: gender,
//         employeeBirthdate: birthdate,
//         employeePicture: imgURL
//     }

//     var jsonData = localStorage.setItem('formData', JSON.stringify(formData));
//     return jsonData;
// }

function deleteEmployee(td) {
    if (confirm("Are you sure you want to delete this employee?")) {
        row = td.parentElement.parentElement;
        document.getElementById('employee-table').deleteRow(row.rowIndex);
    }
}


function resetForm() {
    document.getElementById('first-name').value = "";
    document.getElementById('last-name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('gender-selector').value = " -- select an option -- ";
    document.getElementById('birthdate').value = "";
    document.getElementById('picture-upload').value = "";
}