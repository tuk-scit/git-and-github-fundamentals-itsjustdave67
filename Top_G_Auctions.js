/* #region imports */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";


/*#endregion imports */
const firebaseConfig = {
  apiKey: "AIzaSyCb-eEfNFF6mWl1P-d8_xZDIPqCswJgnsM",
  authDomain: "top-g-auctions.firebaseapp.com",
  projectId: "top-g-auctions",
  storageBucket: "top-g-auctions.appspot.com",
  messagingSenderId: "48516919285",
  appId: "1:48516919285:web:5c7304341cf391a4bafabc",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();
const dbref = ref(db);
const user = auth.currentUser;

// #region exctractions
const searchInput = document.getElementById("searchInput");
const searchSubmitButton = document.getElementById("searchSubmitButton");
const menu_btn = document.getElementById("menu-btn1");
const add_product_btn = document.getElementById("add-product-btn");
const TGAmenu_container = document.getElementById("TGAmenu-container");
const profile_uname = document.getElementById("profile-uname");
const profile_email = document.getElementById("profile-email");
const log_out_btn = document.getElementById("log-out");
const log_on_btn = document.getElementById("log-in");
const alert_overlay = document.getElementById("alert-overlay");
const alert_title = document.getElementById("alert-title");
const alert_text = document.getElementById("alert-text");
const alert_logon_btn = document.getElementById("alert-logon-btn");
const log_out = document.getElementById("log-out");
const alert_btn = document.getElementById("alert-btn");
const log_in = document.getElementById("log-in");
const dropdown_menu = document.getElementById("dropdown-menu");
const my_products_btn = document.getElementById("my-products-btn");
const all_products_btn = document.getElementById("all-products-btn");
const tbody = document.getElementById("tbody");
const no_products_con = document.getElementById("no-products-con");
const delete_products_btn = document.getElementById("delete-products-btn");
var loginEmail;
var emailValue;
var signedIn;
var userStatusVal;
var adminCheck, Status;
var initial_trow, follow_up_trow, single_trow;
var difference;
// #endregion exctractions

let title, message, i;

onAuthStateChanged(auth, function (user) {
  if (user) {
    //User is signed in
    log_out_btn.style.display = "block";
    log_on_btn.style.display = "none";
    add_product_btn.addEventListener("click", () => {
      window.location.href = "http://127.0.0.1:5500/TGA_Add_products.html";
    });
    loginEmail = user.email;
    checkIfAdmin(loginEmail);

    signedIn = true;
    getUserInfo(signedIn);
  } else {
    // User isn't signed in
    log_out_btn.style.display = "none";
    log_on_btn.style.display = "block";
    add_product_btn.addEventListener("click", () => {
      alert_overlay.style.display = "block";
      alert_text.innerHTML = "Kindly Login to access this feature!";
      alert_logon_btn.style.display = "block";
      alert_logon_btn.style.outline = "none";
      alert_btn.style.outline = "none";
      alert_logon_btn.addEventListener("click", () => {
        window.location.href =
          "http://127.0.0.1:5500/Login_&_Registration.html";
      });
    });

    title = "Login Alert!";
    message = "No user is logged in. Kindly login to access Top G Auctions Full features";
    displayMessage(title, message);
    loginEmail = "noemail@gmail.com";
    checkIfAdmin(loginEmail);
    if (Status == true) {
      delete_products_btn.style.display = "block";
    } else {
      delete_products_btn.style.display = "none";
    }
    signedIn = false;
    getUserInfo(signedIn);
  }
});

getProducts();

// #region menu and search buttons
searchInput.addEventListener("keyup", function tableSearch() {
  let searchInput, filter, table, tr, td, txtValue;

  searchInput = document.getElementById("searchInput");
  filter = searchInput.value.toUpperCase();
  table = document.getElementById("products-table");
  tr = document.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue =
        td.children[0].textContent ||
        td.children[0].innerText ||
        td.children[0].innerHTML;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
});

searchSubmitButton.addEventListener("click", function submittedTableSearch() {
  let searchInput, filter, table, tr, td, txtValue;

  searchInput = document.getElementById("searchInput");
  filter = searchInput.value.toUpperCase();
  table = document.getElementById("products-table");
  tr = document.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue =
        td.children[0].textContent ||
        td.children[0].innerText ||
        td.children[0].innerHTML;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
});

menu_btn.addEventListener("click", first);

function first(e) {
  e.stopImmediatePropagation();
  TGAmenu_container.style.display = "inline-block";
  this.removeEventListener("click", first);
  document.onclick = second;
}
function second(e) {
  e.stopImmediatePropagation();
  TGAmenu_container.style.display = "none";
  this.removeEventListener("click", second);
  document.onclick = first;
}

// #endregion menu and search buttons

// #region login,alert and delete eventListeners

log_out.addEventListener("click", () => {
  try {
    auth.signOut();
    window.location.href = "http://127.0.0.1:5500/Login_&_Registration.html";
  } catch (error) {
    displayError(error);
  }
});

log_in.addEventListener("click", () => {
  try {
    window.location.href = "http://127.0.0.1:5500/Login_&_Registration.html";
  } catch (error) {
    displayError(error)
  }
});

alert_btn.addEventListener("click", () => {
  alert_overlay.style.display = "none";
});

my_products_btn.onclick = function () {
  tbody.querySelectorAll("*").forEach((child) => {
    child.remove();
  });
  my_products_btn.style.display = "none";
  all_products_btn.style.display = "block";

  get(child(dbref, "Counter_id")).then((snapshot) => {
    if (snapshot.val().Counter_id > 0) {
      var tableId = snapshot.val().Counter_id;
      var categoryitems = [];

      for (var i = 1; i < tableId; i++) {
        get(child(dbref, "TheProducts/" + i))
          .then((snapshot) => {
            var p_id = snapshot.val().p_id;
            var category = snapshot.val().category;
            var pname = snapshot.val().name;
            var image_URL = snapshot.val().image_URL;
            var minimum_bid = snapshot.val().minimum_bid;
            var bid_deadline = snapshot.val().bid_deadline;
            var uploaded_by_email = snapshot.val().Uploaded_by_email;
            var delete_status = snapshot.val().delete_state;

            if (checkIfOwner(uploaded_by_email, loginEmail) == true) {
              var check = true;

              // console.log(uploaded_by_email+ "----" +loginEmail);
              fillMyProductsTable(
                p_id,
                category,
                pname,
                image_URL,
                minimum_bid,
                bid_deadline,
                check,
                delete_status
              );
            } else {
              alert_overlay.style.display = "block";
              alert_title.innerHTML = "No Products";
              alert_text.innerHTML =
                "You currently have no products on auction!";
            }
            if (categoryitems.includes(category) == false) {
              categoryitems.push(category);
              fillFilterCategoryMenu(category);
            }
          })
          .catch((error) => {
            displayError(error);
          });
      }
    } else {
      alert("No data found");
    }
  });
};

all_products_btn.onclick = () => {
  tbody.querySelectorAll("*").forEach((child) => {
    child.remove();
  });
  my_products_btn.style.display = "block";
  all_products_btn.style.display = "none";

  getProducts();
};

function checkIfAdmin(loginEmail) {
  emailValue = loginEmail.replace(".", "_");
  get(child(dbref, "TheUsers/" + emailValue)).then((snapshot) => {
    userStatusVal = snapshot.val().user_status.toUpperCase();
    adminCheck = "admin";

    if (userStatusVal == adminCheck.toUpperCase()) {
      Status = true;
      delete_products_btn.style.display = "block";
    } else {
      Status = false;
      delete_products_btn.style.display = "none";
    }
  });
}

delete_products_btn.onclick = function () {
  tbody.querySelectorAll("*").forEach((child) => {
    child.remove();
  });
  get(child(dbref, "Counter_id"))
  .then((snapshot) => {
    if (snapshot.val().Counter_id > 0) {
      var tableId = snapshot.val().Counter_id;
      var categoryitems = [];

    for (var i = 1; i < tableId; i++) {
      get(child(dbref, "TheProducts/" + i))
      .then((snapshot) => {
              console.log(snapshot.val())
              var p_id = snapshot.val().p_id;
              var category = snapshot.val().category;
              var pname = snapshot.val().name;
              var image_URL = snapshot.val().image_URL;
              var minimum_bid = snapshot.val().minimum_bid;
              var bid_deadline = snapshot.val().bid_deadline;
              var uploaded_by_email = snapshot.val().Uploaded_by_email;
              var delete_status = snapshot.val().delete_state;

            if (checkIfOwner(uploaded_by_email, loginEmail) == true) {
              var check = true;

              // console.log(uploaded_by_email+ "----" +loginEmail);
              fillDeleteProductsTable(
                p_id,
                category,
                pname,
                image_URL,
                minimum_bid,
                bid_deadline,
                check,
                delete_status
              );
            } else {
              var check = false;
              fillDeleteProductsTable(
                p_id,
                category,
                pname,
                image_URL,
                minimum_bid,
                bid_deadline,
                check,
                delete_status
              );
            }

            if (categoryitems.includes(category) == false) {
              categoryitems.push(category);
              fillFilterCategoryMenu(category);
            }

          })
        .catch((error) => {
            displayError(error);
          });
      }
    } else {
      alert("No data found");
    }
  });
  reconfigureAfterDelete()
};
// #endregion login,alert and delete eventListeners

// #region products table configuration
function getProducts() {
  get(child(dbref, "Counter_id")).then((snapshot) => {
    if (snapshot.val().Counter_id > 0) {
      var tableId = snapshot.val().Counter_id;
      var categoryitems = [];
      
      
      for (i = 1; i < tableId; i++) {
        
        get(child(dbref, "TheProducts/"+i))
          .then((snapshot) => {
              var p_id = snapshot.val().p_id;
              var category = snapshot.val().category;
              var pname = snapshot.val().name;
              var image_URL = snapshot.val().image_URL;
              var minimum_bid = snapshot.val().minimum_bid;
              var bid_deadline = snapshot.val().bid_deadline;
              var uploaded_by_email = snapshot.val().Uploaded_by_email;
              var delete_status = snapshot.val().delete_state;
            


            if (checkIfOwner(uploaded_by_email, loginEmail) == true) {
              var check = true;

              // console.log(uploaded_by_email+ "----" +loginEmail);
              fillTable(
                p_id,
                category,
                pname,
                image_URL,
                minimum_bid,
                bid_deadline,
                check,
                delete_status
              );
            } else {
              var check = false;
              fillTable(
                p_id,
                category,
                pname,
                image_URL,
                minimum_bid,
                bid_deadline,
                check,
                delete_status
              );
            }

            if (categoryitems.includes(category) == false) {
              categoryitems.push(category);
              fillFilterCategoryMenu(category);
            }
            
          })
          .catch((error) => {
            displayError(error);
          });
      }
    } else {
      alert("No data found");
    }
  });
}

function checkIfOwner(uploaded_by_email, loginEmail) {
  if (uploaded_by_email == loginEmail) {
    return true;
  } else {
    return false;
  }
}

function fillMyProductsTable(
  p_id,
  category,
  pname,
  image_URL,
  minimum_bid,
  bid_deadline,
  check,
  delete_status
) {
  if (check == true) {
    // #region tablerow build
    var tbody = document.getElementById("tbody");
    var trow = document.createElement("tr");
    trow.className = "product-row";

    var p0 = document.createElement("p");
    var img1 = document.createElement("img");
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    var p3 = document.createElement("p");
    var p4 = document.createElement("p");

    img1.className = "product-img";

    p0.innerHTML = p_id;
    img1.src = image_URL;
    p1.innerHTML = category;
    p2.innerHTML = pname;
    p3.innerHTML = minimum_bid;
    p4.innerHTML = bid_deadline;

    var td0 = document.createElement("td");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");

    td0.className = "product-id";
    td1.className = "product-img-con";
    td2.className = "product-category";
    td3.className = "product-name";
    td4.className = "product-min-bid";
    td5.className = "product-bid-deadline";

    td0.appendChild(p0);
    td1.appendChild(img1);
    td2.appendChild(p1);
    td3.appendChild(p2);
    td4.appendChild(p3);
    td5.appendChild(p4);

    trow.appendChild(td0);
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);

    tbody.appendChild(trow);
    // #endregion tablerow build

    var selected_table_row;
    const table_rows = document.querySelectorAll(".product-row");

    var elemEventhandler = function viewRowsDescription() {
      var target = selected_table_row.children[0].children[0].innerHTML;
      localStorage.setItem("p_id", target);
      window.location.href =
        "http://127.0.0.1:5500/TGA_products_description.html";
    };

    table_rows.forEach((table_row) => {
      selected_table_row = table_row;
      selected_table_row.addEventListener("click", elemEventhandler);
    });

    if (check == true) {
      var dlt = document.createElement("a");
      dlt.className = "delete-btn";
      dlt.innerHTML = "Delete.";
      dlt.setAttribute("id", "delete-btn");
      dlt.style.color = "black";
      dlt.style.zIndex = "50";
      dlt.style.cursor = "pointer";

      dlt.onclick = function (event) {
        event.stopPropagation();
        var parentElement = dlt.parentNode.parentNode;
        parentElement.removeEventListener("click", elemEventhandler);
        var rowChildElement = parentElement.children[0];
        var overlay = document.createElement("div");
        overlay.className = "product-overlay";
        overlay.innerHTML = "Pending Deletion!";
        var currentID = rowChildElement.children[0].innerHTML;
        console.log(currentID);
        update(ref(db, "TheProducts/" + currentID), {
          delete_state: "true",
        });
        rowChildElement.appendChild(overlay);
      };

      // #region hover functionality in delete button
      dlt.onmouseover = function () {
        dlt.style.background = "#f6f6e9";
        dlt.style.color = "#e95a2c";
      };
      dlt.onmouseout = function () {
        dlt.style.background = "#e95a2c";
        dlt.style.color = "black";
      };
      // #endregion hover functionality in delete button
      td5.appendChild(dlt);
      trow.appendChild(td5);
    } else {
      trow.appendChild(td5);
    }

    if (delete_status == "true") {
      if (signedIn == true) {
        var rootElement = selected_table_row.parentNode;
        rootElement.children[p_id - 1].children[5].children[1].style.display =
          "none";
        var rowChildElement2 = rootElement.children[p_id - 1];
        // rowChildElement2.style.pointerEvents = "none";

        var overlay = document.createElement("div");
        overlay.className = "product-overlay";
        if (check == true) {
          overlay.innerHTML = "Pending Deletion!";
        } else {
          overlay.innerHTML = "Closed item!";
        }

        console.log(rowChildElement2);
        rowChildElement2.appendChild(overlay);

        var old_element = rowChildElement2;
        var new_element = rowChildElement2.cloneNode(true);
        rowChildElement2.parentNode.replaceChild(new_element, old_element);
        // dlt.style.zIndex = "-1"
      } else {
        tbody.removeChild(trow);
      }
    }
  }
}

function fillTable(
  p_id,
  category,
  pname,
  image_URL,
  minimum_bid,
  bid_deadline,
  check,
  delete_status
) {
  // #region tablerow build
  var tbody = document.getElementById("tbody");
  var trow = document.createElement("tr");
  trow.className = "product-row";

  var p0 = document.createElement("p");
  var img1 = document.createElement("img");
  var p1 = document.createElement("p");
  var p2 = document.createElement("p");
  var p3 = document.createElement("p");
  var p4 = document.createElement("p");

  img1.className = "product-img";

  p0.innerHTML = p_id;
  img1.src = image_URL;
  p1.innerHTML = category;
  p2.innerHTML = pname;
  p3.innerHTML = minimum_bid;
  p4.innerHTML = bid_deadline;

  var td0 = document.createElement("td");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");

  td0.className = "product-id";
  td1.className = "product-img-con";
  td2.className = "product-category";
  td3.className = "product-name";
  td4.className = "product-min-bid";
  td5.className = "product-bid-deadline";

  td0.appendChild(p0);
  td1.appendChild(img1);
  td2.appendChild(p1);
  td3.appendChild(p2);
  td4.appendChild(p3);
  td5.appendChild(p4);

  trow.appendChild(td0);
  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);

  tbody.appendChild(trow);
  // #endregion tablerow build

  var selected_table_row;
  const table_rows = document.querySelectorAll(".product-row");

  var elemEventhandler = function viewRowsDescription() {
    var target = selected_table_row.children[0].children[0].innerHTML;
    localStorage.setItem("p_id", target);
    window.location.href =
      "http://127.0.0.1:5500/TGA_products_description.html";
  };

  table_rows.forEach((table_row) => {
    selected_table_row = table_row;
    selected_table_row.addEventListener("click", elemEventhandler);
  });

  if (check == true) {
    var dlt = document.createElement("a");
    dlt.className = "delete-btn";
    dlt.innerHTML = "Delete.";
    dlt.setAttribute("id", "delete-btn");
    dlt.style.color = "black";
    dlt.style.zIndex = "50";
    dlt.style.cursor = "pointer";

    dlt.onclick = function (event) {
      event.stopPropagation();
      var parentElement = dlt.parentNode.parentNode;
      var rowChildElement = parentElement.children[0];
      var overlay = document.createElement("div");
      overlay.className = "product-overlay";
      overlay.innerHTML = "Pending Deletion!";
      var currentID = rowChildElement.children[0].innerHTML;
      console.log(currentID);
      update(ref(db, "TheProducts/" + currentID), {
        delete_state: "true",
      });
      rowChildElement.appendChild(overlay);
    };

    // #region hover functionality in delete button
    dlt.onmouseover = function () {
      dlt.style.background = "#f6f6e9";
      dlt.style.color = "#e95a2c";
    };
    dlt.onmouseout = function () {
      dlt.style.background = "#e95a2c";
      dlt.style.color = "black";
    };
    // #endregion hover functionality in delete button
    td5.appendChild(dlt);
    trow.appendChild(td5);
  } else {
    trow.appendChild(td5);
  }

  if (delete_status == "true") {
    if (signedIn == true) {
      var rootElement = selected_table_row.parentNode;

      var rowChildElement2 = rootElement.children[p_id - 1];
      // rowChildElement2.style.pointerEvents = "none";

      var overlay = document.createElement("div");
      overlay.className = "product-overlay";

      if (check == true) {
        rootElement.children[p_id - 1].children[5].children[1].style.display =
          "none";
        overlay.innerHTML = "Pending Deletion!";
      } else {
        overlay.innerHTML = "Closed item!";
      }

      rowChildElement2.appendChild(overlay);

      var old_element = rowChildElement2;
      var new_element = rowChildElement2.cloneNode(true);
     

      rowChildElement2.parentNode.replaceChild(new_element, old_element);
      // dlt.style.zIndex = "-1"
    } else {
      tbody.removeChild(trow);
    }
  }

  if (tbody.children.length == 0) {
    no_products_con.style.display = "none";
  }
}

function fillDeleteProductsTable(
  p_id,
  category,
  pname,
  image_URL,
  minimum_bid,
  bid_deadline,
  check,
  delete_status
) {
  // #region tablerow build
  var tbody = document.getElementById("tbody");
  var trow = document.createElement("tr");
  trow.className = "product-row";

  var p0 = document.createElement("p");
  var img1 = document.createElement("img");
  var p1 = document.createElement("p");
  var p2 = document.createElement("p");
  var p3 = document.createElement("p");
  var p4 = document.createElement("p");

  img1.className = "product-img";

  p0.innerHTML = p_id;
  img1.src = image_URL;
  p1.innerHTML = category;
  p2.innerHTML = pname;
  p3.innerHTML = minimum_bid;
  p4.innerHTML = bid_deadline;

  var td0 = document.createElement("td");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");

  td0.className = "product-id";
  td1.className = "product-img-con";
  td2.className = "product-category";
  td3.className = "product-name";
  td4.className = "product-min-bid";
  td5.className = "product-bid-deadline";

  td0.appendChild(p0);
  td1.appendChild(img1);
  td2.appendChild(p1);
  td3.appendChild(p2);
  td4.appendChild(p3);
  td5.appendChild(p4);

  trow.appendChild(td0);
  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);

  tbody.appendChild(trow);
  // #endregion tablerow build

  var selected_table_row;
  const table_rows = document.querySelectorAll(".product-row");

  var elemEventhandler = function viewRowsDescription() {
    var target = selected_table_row.children[0].children[0].innerHTML;
    localStorage.setItem("p_id", target);
    window.location.href =
      "http://127.0.0.1:5500/TGA_products_description.html";
  };

  table_rows.forEach((table_row) => {
    selected_table_row = table_row;
    selected_table_row.addEventListener("click", elemEventhandler);
  });

  var apr = document.createElement("a");
  apr.className = "delete-btn";
  apr.innerHTML = "Approve.";
  apr.setAttribute("id", "approve-btn");
  apr.style.color = "black";
  apr.style.zIndex = "50";
  apr.style.cursor = "pointer";

  apr.onclick = function (event) {
    event.stopPropagation();
    console.log(p_id);
    remove(ref(db, "TheProducts/" + p_id))
      .then((snapshot) => {
        update(ref(db, "Counter_id"), {
          Counter_id: snapshot.val().Counter_id - 1,
        });
        title = "Delete Successfull!";
        message = "The following item was deleted successfully";
        displayMessage(title, message);
        window.reload();
      })
      .catch((error) => {
        displayError(error);
      });
  };

  // #region hover functionality in approve button
  apr.onmouseover = function () {
    apr.style.background = "#f6f6e9";
    apr.style.color = "#e95a2c";
  };

  apr.onmouseout = function () {
    apr.style.background = "#e95a2c";
    apr.style.color = "black";
  };
  // #endregion hover functionality in approve button
  td5.appendChild(apr);
  trow.appendChild(td5);

  if (tbody.children.length == 0) {
    no_products_con.style.display = "none";
  }
}

function reconfigureAfterDelete() {
  if (tbody.length == 1) {
    single_trow = parseInt(tbody.children[0].children[0].children[0].innerHTML);
    update(ref(db, "TheProducts/" + single_trow), {
      p_id: "1",
    });
  } else if (tbody.length > 1) {
    for (var i = 0; i < tbody.length; i++) {
      initial_trow = parseInt(
        tbody.children[i].children[0].children[0].innerHTML
      );
      follow_up_trow = parseInt(
        tbody.children[i + 1].children[0].children[0].innerHTML
      );
      difference = follow_up_trow - initial_trow;
      if (difference > 1) {
        update(ref(db, "TheProducts/" + follow_up_trow), {
          p_id: initial_trow + 1,
        });
      }
    }
  }
}
// #endregion products table configuration

// #region dropdown menu configuration
function fillFilterCategoryMenu(category, i) {
  let dropdown_item;

  dropdown_item = document.createElement("a");
  dropdown_item.className = "dropdown-item";
  dropdown_item.href = "#";
  dropdown_item.innerHTML = category;
  addingClickToDropdownitem(dropdown_item);
  dropdown_menu.appendChild(dropdown_item);
}

function addingClickToDropdownitem(dropdown_item_value) {
  dropdown_item_value.addEventListener("click", () => {
    let searchValue, txtValue, table, tr, td;

    searchValue = dropdown_item_value.innerHTML.toUpperCase();
    table = document.getElementById("products-table");
    tr = document.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        txtValue =
          td.children[0].textContent ||
          td.children[0].innerText ||
          td.children[0].innerHTML;

        if (txtValue.toUpperCase().indexOf(searchValue) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  });
}

// #endregion dropdown menu configuration

// #region profile info
function getUserInfo(signIn_status) {
  const dbref = ref(db);
  const userloginEmail = loginEmail.replace(".", "_");

  if (signIn_status == true) {
    get(child(dbref, "TheUsers/" + userloginEmail))
      .then((snapshot) => {
        var Username = snapshot.val().Username;
        var Email = snapshot.val().Email;
        fillProfile(Username, Email);
      })
      .catch((error) => {
        displayError(error);
        console.log(error);
      });
  } else {
    title = "Login Alert!";
    message = "No user is logged in. Kindly login to access Top G Auctions Full features";
    displayMessage(title, message);
  }
}

function fillProfile(username, email) {
  profile_uname.innerHTML = username;
  profile_email.innerHTML = email;
}
// #endregion profile info

// #region additional code tests
// function selectData() {
//     const dbref = ref(db);

//     get(child(dbref,"TheProducts/" + pname.value)).then((snapshot)=>{
//       if(snapshot.exists()) {
//         alert(snapshot.val().Username);
//       }
//       else {
//         alert ("No data found");
//       }
//     })
//     .catch((error)=>{
//       alert("Unsuccessful, Error!<br/>"+error.message);
//     });
// }

// function loopToGetProducts (tableId) {
//   for (var i = 1; i < tableId; i++) {
//     get(child(dbref, "TheProducts/" + i))
//       .then((snapshot) => {
//         var p_id = snapshot.val().p_id;
//         var category = snapshot.val().category;
//         var pname = snapshot.val().name;
//         var description = snapshot.val().description;
//         var image_URL = snapshot.val().image_URL;
//         var minimum_bid = snapshot.val().minimum_bid;
//         var bid_deadline = snapshot.val().bid_deadline;

//         fillTable(
//           p_id,
//           category,
//           pname,
//           description,
//           image_URL,
//           minimum_bid,
//           bid_deadline
//         );
//         fillFilterCategoryMenu(category);

//       })
//       .catch((error) => {
//         displayError(error);
//       });
//   }
// }
// #endregion additional code tests

// #region alert display functions
function displayError(error) {
  let errorMessage = error.message;
  alert_overlay.style.display = "block";
  alert_title.innerHTML = error;
  alert_text.innerHTML = "Error: " + errorMessage + "</br> [ " + error.stack + " ]";
  alert_logon_btn.style.display = "none";
}

function displayMessage(title, message) {
  alert_overlay.style.display = "block";
  alert_text.innerHTML = message;
  alert_title.innerHTML = title;
}
// #endregion alert display functions
