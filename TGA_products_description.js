//#region imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
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

// References for the firebase connection
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();

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
const loginEmail = localStorage.getItem("loginEmail")


getProducts();
getUserInfo ();
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
    .catch((err) => {});
}

function fillDetails(pname,description,category,minimum_bid,bid_deadline,image_URL,Uploaded_by_email) {
    const product_title = document.getElementById("TGA-product-title");
    const product_description = document.getElementById("description-data");
    const product_category = document.getElementById("category-data");
    const product_min_bid = document.getElementById("min-bid-data");
    const product_bid_deadline = document.getElementById("bid-deadline-data");
    const product_img = document.getElementById("img-data");
    const product_uploaded_by = document.getElementById("uploaded-by-data");
    

    product_title.innerHTML = pname;
    product_description.innerHTML = description;
    product_category.innerHTML = category;
    product_min_bid.innerHTML = minimum_bid;
    product_bid_deadline.innerHTML = bid_deadline;
    product_img.src = image_URL;
    product_uploaded_by.innerHTML = Uploaded_by_email;


}

function getUserInfo () {
  const dbref = ref(db);
  var newloginEmail = loginEmail.replace(".","_");
  

  get(child(dbref, "TheUsers/"+newloginEmail))
  .then((snapshot)=> {
    var Username = snapshot.val().Username;
    var Email = snapshot.val().Email;
    
    fillProfile(Username,Email);
  })
  .catch(error => {
    var errorMessage = error.message;
    alert("Error no user retrievals: --- "+errorMessage);
  })
}

function fillProfile (username, email) {
  profile_uname.innerHTML = username;
  profile_email.innerHTML = email;
}

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


