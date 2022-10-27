import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { 
  getDatabase, 
  ref, 
  set,
  get, 
  child, 
  update, 
  remove
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"
// let initializeApp = require("https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js");
// let getAuth = require("https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js");
// let signInWithEmailAndPassword = require("https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js");

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

const reg_cpwd = document.getElementById("reg-cpwd");
const reg_pwd = document.getElementById("reg-pwd");
const uname = document.getElementById("uname");
const reg_email = document.getElementById("reg-email");
const togglePassword = document.getElementById("togglePassword1");
const username = document.getElementById("uname");
const unamedisplay = document.getElementById("unamedisplay");






document.getElementById("Log-btn").addEventListener("click", function () {
  const loginEmail = document.getElementById("login-email").value;
  const loginPassword = document.getElementById("login-pwd").value;

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById("result-box").style.display = "inline";
      document.getElementById("Login_form_container").style.display = "none";
      document.getElementById("result").innerHTML =
        "Welcome Back!<br>" + loginEmail + " was Login Successfully";
        setTimeout(function() {
          window.location.href = "http://127.0.0.1:5500/Top_G_Auctions.html";
        },3000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("result-box").style.display = "inline";
      document.getElementById("Login_form_container").style.display = "none";
      document.getElementById("result").innerHTML =
        "Sorry! <br>" + errorCode + "<br>" + errorMessage;
        setTimeout(function() {
          window.location.href = "http://127.0.0.1:5500/Login_&_Registration.html";
        },5000);
    });
});


togglePassword.addEventListener('mousedown', function (e) {
  // toggle the type attribute
  // const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  // console.log(type);
  const val1 = reg_pwd.setAttribute('type', "type");
  const val2 = reg_cpwd.setAttribute('type', "type");
  //console.log(val);
});
togglePassword.addEventListener('mouseup', function (e) {
  // toggle the type attribute
  // const type = password.getAttribute('type') === 'type' ? 'text' : 'type';
  // console.log(type);
  const val1 = reg_pwd.setAttribute('type', "password");
  const val2 = reg_cpwd.setAttribute('type', "password");
  //console.log(val);
});

function insertUserName() {
  set(ref(db, "TheUsers/" + username.value),{
    Username: username.value
  })
  .then(()=>{
    alert("data stored successfully!");
  })
  .catch((error)=>{
    alert("Unsuccessful, Error occured!<br/>" +error.message);
  }) 
}

function selectData() {
  const dbref = ref(db);

  get(child(dbref,"TheUsers/" + username.value)).then((snapshot)=>{
    if(snapshot.exists()) {
      unamedisplay.value = snapshot.val().Username;
    }
    else {
      alert ("No data found");
    }
  })
  .catch((error)=>{
    alert("Unsuccessful, Error!<br/>"+error.message);
  })
}

function updateData() {
  update(ref(db, "TheUsers/" + username.value),{
    Username: username.value
  })
  .then(()=>{
    alert("data updated successfully!");
  })
  .catch((error)=>{
    alert("Unsuccessful, Error occured!<br/>" +error.message);
  }) 
}

function deleteData() {
  update(ref(db, "TheUsers/" + username.value))
  .then(()=>{
    alert("data removed successfully!");
  })
  .catch((error)=>{
    alert("Unsuccessful, Error occured!<br/>" +error.message);
  })
}

document.getElementById("Reg-btn").addEventListener("click", function () {
if (uname.length||reg_email.length||reg_pwd.length||reg_cpwd.length < 8){
  document.getElementById("error-con").style.display = "inline";
  document.getElementById("pwd-error").innerHTML = "One of the entries is too short!";
}
else if (reg_cpwd.innerHTML != reg_pwd.innerHTML) {
  document.getElementById("error-con").style.display = "inline";
}
else {
  const registerEmail = document.getElementById("reg-email").value;
  const registerPassword = document.getElementById("reg-pwd").value;
  createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById("result-box").style.display = "inline";
      document.getElementById("Registration_form_container").style.display = "none";
      document.getElementById("result").innerHTML =
        "Welcome!<br>" + registerEmail + " was Registered Successfully";
        setTimeout(function() {
          window.location.href = "http://127.0.0.1:5500/Login_&_Registration.html";
        },3000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("result-box").style.display = "inline";
      document.getElementById("Registration_form_container").style.display = "none";
      document.getElementById("result").innerHTML =
        "Sorry! <br>" + errorCode + " : " + errorMessage;
        setTimeout(function() {
          window.location.href = "http://127.0.0.1:5500/Login_&_Registration.html";
        },5000);
    });

    inserUserName();
    
};
});



