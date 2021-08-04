// var firstName = document.getElementById('first-name').value;
// var lastName = document.getElementById('last-name').value;
// var password = document.getElementById('password').value;
// var sex = document.getElementById('sex-selector').value;
// var birthDate = document.getElementById('birth-date').value;



function addUser() {

    var table = document.getElementById('user-table');
    var row = table.insertRow(-1);
    var nameCell = row.insertCell(0);
    var passwordCell = row.insertCell(1);
    var sexCell = row.insertCell(2);
    var birthDateCell = row.insertCell(3);

    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var password = document.getElementById('password').value;
    var sex = document.getElementById('sex-selector').value;
    var birthDate = document.getElementById('birth-date').value;

    nameCell.innerHTML = firstName + " " + lastName;
    passwordCell.innerHTML = password;
    sexCell.innerHTML = sex;
    birthDateCell.innerHTML = birthDate;
}