function addUser() {

    let table = document.getElementById('user-table');
    let row = table.insertRow(-1);
    let nameCell = row.insertCell(0);
    let emailCell = row.insertCell(1);
    let sexCell = row.insertCell(2);
    let birthDateCell = row.insertCell(3);

    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let email = document.getElementById('email').value;
    let sex = document.getElementById('sex-selector').value;
    let birthDate = document.getElementById('birth-date').value;

    if (typeof firstName === 'string' || firstName instanceof String) {
        if (typeof lastName === 'string' || lastName instanceof String) {
            nameCell.innerHTML = firstName + " " + lastName;
        } else {
            alert('Wrong input');
        }
    } else {
        alert('Wrong input');
    }



    emailCell.innerHTML = email;
    sexCell.innerHTML = sex;
    birthDateCell.innerHTML = birthDate;
}