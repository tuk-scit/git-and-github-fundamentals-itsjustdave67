//#region imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
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

getProducts();
getUserInfo ();

const profile_uname = document.getElementById("profile-uname");
const profile_email = document.getElementById("profile-email");

function getProducts() {
  const dbref = ref(db);

  const ID = localStorage.getItem("p_id");
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
  const loginEmail = localStorage.getItem("loginEmail").replace(".","_");

  get(child(dbref, "TheUsers/"+loginEmail))
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