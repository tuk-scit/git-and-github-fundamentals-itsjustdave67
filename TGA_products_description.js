//#region imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,set,
  child,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCb-eEfNFF6mWl1P-d8_xZDIPqCswJgnsM",
  authDomain: "top-g-auctions.firebaseapp.com",
  projectId: "top-g-auctions",
  storageBucket: "top-g-auctions.appspot.com",
  messagingSenderId: "48516919285",
  appId: "1:48516919285:web:5c7304341cf391a4bafabc",
};
//#endregion

// #region References for the firebase connection
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();
// #endregion References for the firebase connection

// #region elements extractions
const profile_uname = document.getElementById("profile-uname");
const profile_email = document.getElementById("profile-email");
const confirm_btn = document.getElementById("confirm-btn");
const ID = localStorage.getItem("p_id");
const dbref = ref(db);
const current_high_amount = document.getElementById("current-high-amount");
const current_high_name = document.getElementById("current-high-name");
const place_bid_input = document.getElementById("place-bid-input");
const alert_overlay = document.getElementById("alert-overlay")
const alert_text = document.getElementById("alert-text")
const alert_btn = document.getElementById("alert-btn")
const alert_title = document.getElementById("alert-title")
const email_btn = document.getElementById("email-btn")
var loginEmail;
var signedIn;

// #endregion elements extractions

onAuthStateChanged(auth, function (user) {
  if (user) {
    loginEmail = user.email;
    signedIn = true;
    getUserInfo(signedIn);
  } else {
    title = "Login Alert!";
    message =
      "No user is logged in. Kindly login to access Top G Auctions Full features";
    displayMessage(title, message);
    loginEmail = "noemail@gmail.com";
    
    
    signedIn = false;
    getUserInfo(signedIn);
  }
  
});

getProducts();
fillCurrentHighAmount()

function fillCurrentHighAmount () {

  get(child(dbref, "Bids/" + ID))
  .then((snapshot) => {
    var currentHigh = snapshot.val().Current_high
    current_high_amount.innerHTML = "$ " + numberWithCommas(currentHigh)
    current_high_name.innerHTML = snapshot.val().Current_high_name
})
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getProducts() {
 
const uname = localStorage.getItem("uname");
//   get(child(dbref,"TheUsers/"+))
  get(child(dbref, "TheProducts/" + ID))
    .then((snapshot) => {
      var category = snapshot.val().category;
      var pname = snapshot.val().name;
      var description = snapshot.val().description;
      var image_URL = snapshot.val().image_URL;
      var minimum_bid = snapshot.val().minimum_bid;
      var bid_deadline = snapshot.val().bid_deadline;
      var Uploaded_by_email = snapshot.val().Uploaded_by_email;

      fillDetails(pname,description,category,minimum_bid,bid_deadline,image_URL,Uploaded_by_email);
      
    })
    .catch((err) => {
      displayError(err)
    });
}

function fillDetails(pname,description,category,minimum_bid,bid_deadline,image_URL,Uploaded_by_email) {
    var product_title = document.getElementById("TGA-product-title");
    var product_description = document.getElementById("description-data");
    var product_category = document.getElementById("category-data");
    var product_min_bid = document.getElementById("min-bid-data");
    var product_bid_deadline = document.getElementById("bid-deadline-data");
    var product_img = document.getElementById("img-data");
    var product_uploaded_by = document.getElementById("uploaded-by-data");
    

    product_title.innerHTML = pname;
    product_description.innerHTML = description;
    product_category.innerHTML = category;
    product_min_bid.innerHTML = minimum_bid;
    product_bid_deadline.innerHTML = bid_deadline;
    product_img.src = image_URL;
    product_uploaded_by.innerHTML = Uploaded_by_email;

    email_btn.onclick = sendingEmailSetup(Uploaded_by_email)

}

function getUserInfo (signIn_status) {
  const dbref = ref(db);
  var newloginEmail = loginEmail.replace(".","_");
  
  if (signIn_status == true) {
  get(child(dbref, "TheUsers/"+newloginEmail))
  .then((snapshot)=> {
    var Username = snapshot.val().Username;
    var Email = snapshot.val().Email;
    
    fillProfile(Username,Email);
  })
  .catch(error => {
    displayError(error);
  });
} else {
  displayError("not signed in")
}
}

function fillProfile (username, email) {
  profile_uname.innerHTML = username;
  profile_email.innerHTML = email;
}



function sendingEmailSetup (uploadEmail) {
  console.log("it works --- " + uploadEmail);
  email_btn.href = "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to="+uploadEmail;
  
}

// #region alert display functions
function displayError(error) {
  let errorMessage = error.message;
  alert_overlay.style.display = "block";
  console.log(error.stack);
  alert_text.innerHTML =
    "Error: " + errorMessage + "</br> [ " + error.stack + " ]";
  alert_logon_btn.style.display = "none";
  console.log(error.stack);
}

function displayMessage(title, message) {
  alert_overlay.style.display = "block";
  alert_title.innerHTML = title;
  alert_text.innerHTML = message;
}
// #endregion alert display functions

confirm_btn.addEventListener("click", () => {
  
  var placed_bid = parseInt(place_bid_input.value)
  var valinput = current_high_amount.innerHTML.replace(/,/g, '').replace("$",'').trim()
  var currentTestHigh = parseInt(valinput)
  console.log(placed_bid)
  console.log(currentTestHigh)

if (typeof(placed_bid) !== "number") {
  alert_overlay.style.display = "block"
  alert_text.innerHTML = "Wrong input: Please input only numbers in the field provided"
  place_bid_input.value = ""

} else {
  
  if(placed_bid < currentTestHigh) {
    alert_overlay.style.display = "block"
    alert_text.innerHTML = "The bid you have placed is lower than the current High. Please place a higher amount to have a chance in winning the bid"
  } else {
    alert_overlay.style.display = "block"
    alert_title.innerHTML = "One Step Closer!"
    alert_text.innerHTML = "Thank you, Bid has been placed Successfully"

    set(ref(db, "Bids/" + ID), {
      Current_high: place_bid_input.value,
      Current_high_name: profile_uname.innerHTML
    });
     fillCurrentHighAmount()

  }
}

  
  
})

alert_btn.addEventListener("click", () => {
  alert_overlay.style.display = "none"
})



