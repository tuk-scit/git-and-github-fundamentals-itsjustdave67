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

const menu_btn = document.getElementById("menu-btn");
const TGAmenu_container = document.getElementById("TGAmenu-container");
const table_rows = document.querySelectorAll('tr');


table_rows.forEach( table_row => {
    table_row.addEventListener("click",()=> {
        let target = document.querySelectorAll('# > ul > li a');

    });
});

function selectData() {
    const dbref = ref(db);
  
    get(child(dbref,"TheProductss/" + pname.value)).then((snapshot)=>{
      if(snapshot.exists()) {
        alert(snapshot.val().Username);
      }
      else {
        alert ("No data found");
      }
    })
    .catch((error)=>{
      alert("Unsuccessful, Error!<br/>"+error.message);
    })
  }








































menu_btn.addEventListener("click",first);

function first(e){
    e.stopImmediatePropagation();
    TGAmenu_container.style.display = "grid";
    this.removeEventListener("click", first);
    document.onclick = second;
}
function second(e){
    e.stopImmediatePropagation();
    TGAmenu_container.style.display = "none";
    this.removeEventListener("click", second);
    document.onclick = first;
}

