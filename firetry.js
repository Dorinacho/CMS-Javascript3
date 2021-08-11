// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyBup86geMgrpmK2Dwdue7Re5ZCl5kq8B5o',
    authDomain: 'cms-javascript.firebaseapp.com',
    projectId: 'cms-javascript'
});

//make table scrollable

var db = firebase.firestore().collection("employees");

function onFormSubmit() {
    getData();
    document.getElementById('employee-data').reset();
    document.getElementById('picture-upload').value = "";
    sortTableByName(1);
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

    db.doc(employee.id).set(employee);
    // .then(() => {
    //     alert("Employee added successfully!");
    // })
    // .catch(() => {
    //     alert("Error adding employee!");
    // });
    //  return employee;

    addNewRow(employee);
    // sortTable();
}

// window.onload = async function() {  
function fillTable() {
    db.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            addNewRow(doc.data());
            sortTableByName(1);
        })
    }).catch((error) => {
        alert("Error getting employees ", error);
    })

}

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
        db.doc(row.id).delete().then(() => {
            alert("Employee deleted successfully!");
        }).catch((error) => {
            alert("Error removing document: ", error);
        });
    }
}

// search bar
function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-bar");
    filter = input.value.toUpperCase();
    table = document.querySelector('tbody');
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function sortTableByName(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("employee-table");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}



function clearTable() {
    var table = document.querySelector('tbody');
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }
}

function filterGender() {
    clearTable();
    var gender = document.getElementById('gender-filter').value;
    if (gender != "null") {
        db.where("gender", "==", gender).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                addNewRow(doc.data());
            });
            sortTableByName(1);
        }).catch((error) => {
            alert("Error filtering by gender", error);
        })
    } else {
        fillTable();
    }
}

function filterPicture() {
    clearTable();
    var picture = document.getElementById('picture-filter').value;
    if (picture == "no-picture") {
        db.where("picture", "==", image).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                addNewRow(doc.data());
            });
            sortTableByName(1);
        }).catch((error) => {
            alert("Error sorting by picture", error);
        })
    } else if (picture == "picture") {
        db.where("picture", "!=", image).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                addNewRow(doc.data());
            });
            sortTableByName(1);
        }).catch((error) => {
            alert("Error sorting by picture", error);
        })
    } else if (picture == "null") {
        fillTable();
    }
}

fillTable();