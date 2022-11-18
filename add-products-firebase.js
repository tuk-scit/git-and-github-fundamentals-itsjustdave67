import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { 
  getDatabase, ref, 
  set, get, child, 
  update, remove
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"

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

const submit = document.getElementById("submit-btn");
const category = document.getElementById("category");
const pname = document.getElementById("pname");
const description = document.getElementById("description");
const img_file = document.getElementById("img_file");
const min_bid = document.getElementById("min-bid");
const bid_deadline = document.getElementById("bid-deadline");
const input = document.getElementsByTagName("input")

submit.addEventListener("click", () => {
    if (input.value = "") {
        alert("Please fill in all the fields required before submission!");
    }
    else {
    getProductId();
    insertProductsDetails();
    }
})

function getProductId () {
  const dbref = ref(db);

  get(child(dbref,'Counter_id')).then((snapshot)=>{
  if(Number(snapshot.val()) == 0) {
    var currentCounterId = Number(snapshot.val());
    currentCounterId++;
    
    set(ref(db,"Counter_id"),{
    Counter_id: currentCounterId
    });

  }});
}


function insertProductsDetails() {
  const dbref = ref(db);

  get(child(dbref,'Counter_id')).then((snapshot)=>{
   var currentCounterId = snapshot.val().Counter_id;
   console.log(currentCounterId);

    set(ref(db, "TheProducts/" + currentCounterId),{
      p_id: currentCounterId,
      name: pname.value,
      category: category.value,
      description: description.value,
      image_file: img_file.value,
      minimum_bid: min_bid.value,
      bid_deadline: bid_deadline.value 
    })
    .then(()=>{
      alert("data stored successfully!");
      currentCounterId++;
    
    set(ref(db,"Counter_id"),{
    Counter_id: currentCounterId
    });
    })
    .catch((error)=>{
      alert("Unsuccessful, Error occured!<br/>" +error.message);
    }) 

    
  });

}


















































