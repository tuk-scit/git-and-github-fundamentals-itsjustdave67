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

getProducts();

table_rows.forEach( table_row => {
    table_row.addEventListener("click",()=> {
        let target = table_row.children[0].value;
        console.log(target);
    });
});

function getProducts () {
    const dbref = ref(db);
  
    get(child(dbref,"Counter_id")).then((snapshot)=>{
        if(snapshot.val().Counter_id > 1) {
           var tableId = snapshot.val().Counter_id;
           for(var i=1; i<tableId; i++) {
                get(child(dbref,"TheProducts/" + i)).then((snapshot)=>{
                    var p_id = snapshot.val().p_id
                    var category = snapshot.val().category
                    var pname = snapshot.val().name
                    var description = snapshot.val().description
                    var image_file = snapshot.val().image_file
                    var minimum_bid = snapshot.val().minimum_bid
                    var bid_deadline = snapshot.val().bid_deadline

                    fillTable(p_id,category,pname,description,image_file,minimum_bid,bid_deadline)
                });
           }
        }
        else {
            alert ("No data found");
        }
    }); 
}

function fillTable (p_id,category,pname,description,image_file,minimum_bid,bid_deadline) {
    var tbody = document.getElementById("tbody");
    var trow = document.createElement("tr");
    trow.className = 'product-row';

    var p0 = document.createElement("p");
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    var p3 = document.createElement("p");
    var p4 = document.createElement("p");
    var p5 = document.createElement("p");

    p0.innerHTML = p_id;
    p1.innerHTML = category;
    p2.innerHTML = pname;
    p3.innerHTML = image_file;
    p4.innerHTML = minimum_bid;
    p5.innerHTML = bid_deadline; 

    var td0 = document.createElement("td");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");

    td0.className = 'product-id';
    td1.className = 'product-img-con';
    td2.className = 'product-category';
    td3.className = 'product-name';
    td4.className = 'product-min-bid';
    td5.className = 'product-bid-deadline';

    td0.appendChild(p0);
    td1.appendChild(p1);
    td2.appendChild(p2);
    td3.appendChild(p3);
    td4.appendChild(p4);
    td5.appendChild(p5);
    
    trow.appendChild(td0);
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);

    tbody.appendChild(trow);

}

function selectData() {
    const dbref = ref(db);
    

    get(child(dbref,"TheProducts/" + pname.value)).then((snapshot)=>{
      if(snapshot.exists()) {
        alert(snapshot.val().Username);
      }
      else {
        alert ("No data found");
      }
    })
    .catch((error)=>{
      alert("Unsuccessful, Error!<br/>"+error.message);
    });
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
