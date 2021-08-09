function onFormSubmit() {
    writeDataInLS()
        // saveData();
        // debug();
        //  resetForm();
}

var myForm = [];

// function saveData() {
//     $('form input').each(function() {
//         myForm.push({
//             id: this.id,
//             value: this.value
//         })
//     })
//     localStorage.setItem(localStorage.rowIndex, JSON.stringify(myForm));
// }

// function debug() {
//     // Loop through our array and output the values.  These values should reflect what form inputs we have above and what their current values are.
//     for (var i = 0; i < myForm.length; i++) {
//         console.log(myForm[i].id + ': ' + myForm[i].value);
//     }
// }
var employee = () => {

    // if (document.getElementById('add-button').clicked == true) {
    const employeeData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        gender: document.getElementById('gender-selector').value,
        birthdate: document.getElementById('birthdate').value,
        picture: document.getElementById('picture-upload').files[0]
    }
    localStorage.setItem(localStorage.key + 1, JSON.stringify(employeeData));
    // }
}

function writeDataInLS() {

    employee();

    //employeeData.push();
    // var formIdentifier = employeeData.email;
}


// function displayData() {

//     for (i = 0; i <= localStorage.length - 1; i++) {
//         // var formIdentifier = employeeData.email;
//         var table = document.getElementById('employee-table');
//         const row = document.createElement('tr');
//         var employee = JSON.parse(localStorage.getItem(employee.email));

//         if (employee.picture != null) {

//             var reader = new FileReader();
//             reader.onload = (e) => {
//                 employee.picture = e.target.result;
//             }
//             reader.readAsDataURL(employeeData.picture);
//         } else {
//             employee.picture = "./images/user.png";
//         }

//         row.innerHTML = `<td><img src="${employee.picture}" /></td>
//         <td>${employee.firstName} ${employee.lastName}</td>
//         <td>${employee.email}</td>
//         <td>${employee.gender}</td>
//         <td>${employee.birthdate}</td>
//         <td><button class="btn btn-danger" onClick="deleteEmployee(this)">Delete</button></td>`;

//         table.appendChild(row);
//     }
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