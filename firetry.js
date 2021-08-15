// const { default: axios } = require("axios");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBup86geMgrpmK2Dwdue7Re5ZCl5kq8B5o",
    authDomain: "cms-javascript.firebaseapp.com",
    projectId: "cms-javascript",
});

// import 'regenerator-runtime/runtime';
// import axios from 'axios';
//make table scrollable
//add reset button for the form data

const getTodoItems = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/todos?_limit=5`);

        const todoItems = response.data;

        console.log(`GET: Here's the list of todos`, todoItems);

        return todoItems;
    } catch (errors) {
        console.error(errors);
    }
};

var db = firebase.firestore().collection("employees");

async function onFormSubmit() {
    if (document.getElementById("add-button").value == "Submit") {
        var data = await getData();
        addNewRow(data);
        //addNewRow(data);
        document.getElementById("employee-data").reset();
        document.getElementById("picture-upload").value = "";
        sortTableByName(1);
    } else {
        await editData();
        document.getElementById("employee-data").reset();
        document.getElementById("picture-upload").value = "";
        //sortTableByName(1);
    }
}

document
    .getElementById("picture-upload")
    .addEventListener("change", convertPicture, false);
var image = "./images/user.png";

function convertPicture() {
    var picture = document.getElementById("picture-upload").files[0];
    if (picture != null) {
        const reader = new FileReader();
        reader.onload = (e) => {
            image = e.target.result;
        };
        reader.readAsDataURL(picture);
    }
}

async function editData() {
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var email = document.getElementById("email").value;
    var gender = document.getElementById("gender-selector").value;
    var birthdate = document.getElementById("birthdate").value;
    var employee = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        birthdate: birthdate,
        picture: image,
    };

    await db.doc(employee.email).set(employee);

    //convert the date after is stored in firebase
    var date = moment(employee.birthdate).format("D MMMM YYYY");

    if (employeeID == employee.email) {
        row.innerHTML = `<td><img src="${employee.picture}" /></td>
        <td>${employee.firstName} ${employee.lastName}</td>
        <td>${employee.email}</td>
        <td>${employee.gender}</td>
        <td>${date}</td>
        <td>
            <button class="btn btn-danger btn-extra" onClick="deleteEmployee(this)">Delete</button>
            <button type="button" class="btn btn-primary btn-extra" onClick="editEmployee(this)">Edit</button>
        </td>`;
    }
}

async function getData() {
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var email = document.getElementById("email").value;
    var gender = document.getElementById("gender-selector").value;
    var birthdate = document.getElementById("birthdate").value;
    var employee = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        birthdate: birthdate,
        picture: image,
    };
    await db.doc(employee.email).set(employee);

    return employee;
}

// window.onload = async function() {
function fillTable() {
    db.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                addNewRow(doc.data());
                sortTableByName(1);
            });
        })
        .catch((error) => {
            alert("Error getting employees ", error);
        });
}

function addNewRow(x) {
    var table = document.querySelector("tbody");
    const row = document.createElement("tr");
    row.setAttribute("id", x.email);
    var date = x.birthdate;

    row.innerHTML = `<td><img src="${x.picture}" /></td>
        <td>${x.firstName} ${x.lastName}</td>
        <td>${x.email}</td>
        <td>${x.gender}</td>
        <td>${moment(date).format("D MMMM YYYY")}</td>
        <td>
            <button class="btn btn-danger btn-extra" onClick="deleteEmployee(this)">Delete</button>
            <button type="button" class="btn btn-primary btn-extra" onClick="editEmployee(this)">Edit</button>
        </td>`;
    table.appendChild(row);
}

async function deleteEmployee(td) {
    if (confirm("Are you sure you want to delete this employee?")) {
        row = td.parentElement.parentElement;
        document.getElementById("employee-table").deleteRow(row.rowIndex);
        console.log(row.id);
        await db.doc(row.id).delete();
    }
}

var employeeID;

function editEmployee(td) {
    row = td.parentElement.parentElement;
    console.log(row.id);
    db.doc(row.id)
        .get()
        .then((doc) => {
            if (doc.exists) {
                document.getElementById("first-name").value = doc.data().firstName;
                document.getElementById("last-name").value = doc.data().lastName;
                document.getElementById("email").value = doc.data().email;
                document.getElementById("gender-selector").value = doc.data().gender;
                document.getElementById("birthdate").value = doc.data().birthdate;
                document.getElementById("picture-upload").files[0] = doc.data().picture;
                employeeID = doc.data().email;
            }
        });
    var button = document.getElementById("add-button");
    button.innerHTML = "Update employee";
    button.value = "edit";
}

// search bar
function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-bar");
    filter = input.value.toUpperCase();
    table = document.querySelector("tbody");
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
    var table,
        rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0;
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
        for (i = 1; i < rows.length - 1; i++) {
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
    var table = document.querySelector("tbody");
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }
}

function filterGender() {
    clearTable();
    var gender = document.getElementById("gender-filter").value;
    if (gender != "null") {
        db.where("gender", "==", gender)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    addNewRow(doc.data());
                });
                sortTableByName(1);
            })
            .catch((error) => {
                alert("Error filtering by gender", error);
            });
    }
}

function filterPicture() {
    clearTable();
    var picture = document.getElementById("picture-filter").value;
    if (picture == "no-picture") {
        db.where("picture", "==", image)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    addNewRow(doc.data());
                });
                sortTableByName(1);
            })
            .catch((error) => {
                alert("Error sorting by picture", error);
            });
    } else if (picture == "picture") {
        db.where("picture", "!=", image)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    addNewRow(doc.data());
                });
                sortTableByName(1);
            })
            .catch((error) => {
                alert("Error filtering by picture", error);
            });
    }
}

function filterByDate() {
    clearTable();
    var startDate = document.getElementById("start-date").value;
    var endDate = document.getElementById("end-date").value;
    if (startDate != null && endDate != null) {
        db.where("birthdate", ">=", startDate)
            .where("birthdate", "<=", endDate)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    addNewRow(doc.data());
                });
                sortTableByName(1);
            })
            .catch((error) => {
                alert("Error filtering by date", error);
            });
    }
}

function resetFilters() {
    document.getElementById("gender-filter").value = "null";
    document.getElementById("picture-filter").value = "null";
    document.getElementById("start-date").value = "";
    document.getElementById("end-date").value = "";
    clearTable();
    fillTable();
}

const bitcoinURL = "https://api.coindesk.com/v1/bpi/currentprice/EUR.json";
const ethereumURL = "https://api.coinbase.com/v2/prices/ETH-USD/spot";

var bitcoinPrice, ethereumPrice;

async function getBitcoinPrice() {
    try {
        const response = await axios({
            url: bitcoinURL,
            method: "GET",
        });
        console.log(response.data);
        bitcoinPrice = await response.data.bpi.USD.rate;
        return bitcoinPrice;
    } catch (error) {
        console.error(error);
    }
}

// async function renderBitcoinPrice() {
//     const price = await getBitcoinPrice();
//     var bitcoin = "Bitcoin";
//     var crypto = document.getElementById("crypto");
//     crypto.innerHTML = `<br>
//     <div class="bitcoin">${name} price is: '${data}' EUR </div>`;
//     // createCrypto(bitcoin, bitcoinPrice);
//     // console.log(price);
//     // return price;
// }

async function getEthereumPrice() {
    try {
        const response = await axios({
            url: ethereumURL,
            method: "GET",
        });
        console.log(response.data);
        ethereumPrice = await response.data.data.amount;

        console.log(ethereumPrice);
        return ethereumPrice;
    } catch (error) {
        console.error(error);
    }
}
async function renderCryptoPrice() {
    var ethPrice = await getEthereumPrice();
    var btcPrice = await getBitcoinPrice();
    var bitcoin = "Bitcoin";
    var ethereum = "Ethereum";
    var crypto = document.getElementById("crypto");
    crypto.innerHTML = `<br>
    <div>${bitcoin} price is: ${btcPrice} USD </div><br>
    <div>${ethereum} price is: ${ethPrice} USD </div>`;
    // createCrypto(ethereum, price);
    // console.log(price);
    // return price;
}

function createCrypto(name, data) {
    var crypto = document.getElementById("crypto");
    crypto.innerHTML = `<br>
    <div class="bitcoin">${name} price is: '${data}' EUR </div>`;
}

renderCryptoPrice();
// renderBitcoinPrice();
fillTable();