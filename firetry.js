// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyBup86geMgrpmK2Dwdue7Re5ZCl5kq8B5o',
    authDomain: 'cms-javascript.firebaseapp.com',
    projectId: 'cms-javascript'
});

//firebase.firestore()

//make table scrollable

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
    employee.id = Math.floor(Math.random() * 10000).toString();

    db.collection("employees").doc(employee.id).set(employee);
    // .then(() => {
    //     alert("Employee added successfully!");
    // })
    // .catch(() => {
    //     alert("Error adding employee!");
    // });
    //  return employee;

    addNewRow(employee);
}

//show all the employees from the local storage

//window.onload = async function() {

db.collection("employees").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //doc.id = doc.data().id;
        // console.log(doc.id, " => ", doc.data().email);

        addNewRow(doc.data());

    });
});
//}

function addNewRow(x) {
    var table = document.querySelector('tbody');
    const row = document.createElement('tr');
    row.setAttribute('id', x.id)
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
        row = td.parentElement.parentElement;
        document.getElementById('employee-table').deleteRow(row.rowIndex);
        console.log(row.id);
        db.collection('employees').doc(row.id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
}

function sortByName() {
    var docRef = db.collection("employees");
    docRef.orderBy("name");
    // db.collection("employees").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         //doc.id = doc.data().id;
    //         // console.log(doc.id, " => ", doc.data().email);

    //         addNewRow(doc.data());

    //     });
    // });
}