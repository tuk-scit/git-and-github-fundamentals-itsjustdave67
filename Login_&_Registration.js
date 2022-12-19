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

const proceed_btn_con = document.getElementById("proceed-btn-con");
const LRsub_title_con = document.getElementById("LRsub-title-con");
const LRmain_title_con = document.getElementById("LRmain-title-con");
const LRmain_title = document.getElementById("LRmain-title");
const Registration_form_container = document.getElementById("Registration_form_container");
const Login_form_container = document.getElementById("Login_form_container");
const Register_btn = document.getElementById("Register-btn");
const Login_btn = document.getElementById("Login-btn");
const back_icon_btn =  document.getElementById("back-icon-btn");


// proceed_btn_con.onclick = function () {
//   localStorage.clear();
// }

Register_btn.addEventListener("click", function() {
    document.documentElement.style.setProperty('--ff-maintitle', 'Bahianita');
    LRmain_title_con.style.marginBottom = "25px";
    LRsub_title_con.style.display = "none";
    proceed_btn_con.style.display = "none";
    Login_btn.style.display = "none";
    Registration_form_container.style.display = "inline-block";
    Register_btn.style.display = "none";
});

Login_btn.addEventListener("click", function() {
    document.documentElement.style.setProperty('--ff-maintitle', 'Bahianita');
    LRmain_title_con.style.marginBottom = "25px";
    LRsub_title_con.style.display = "none";
    proceed_btn_con.style.display = "none";
    Register_btn.style.display = "none";
    Login_btn.style.display = "none";
    Login_form_container.style.display = "inline-block";
})

back_icon_btn.addEventListener("click", function() {
    window.location.href = "http://127.0.0.1:5500/Login_&_Registration.html";
})
document.getElementById("reg-btn").addEventListener("click",function() {
    Registration_form_container.style.display="inline-block";
    Login_form_container.style.display="none";
});

document.getElementById("Reg-login-btn").addEventListener("click",function() {
    document.getElementById("Registration_form_container").style.display="none";
    document.getElementById("Login_form_container").style.display="inline-block";
});





document.getElementById("Log-btn").addEventListener("click", function () {
  const loginEmail = document.getElementById("login-email").value;
  const loginPassword = document.getElementById("login-pwd").value;


  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById("result-box").style.display = "inline";
      document.getElementById("Login_form_container").style.display = "none";
      document.getElementById("result").innerHTML =
        "Welcome Back!<br>" + loginEmail + " was logged in Successfully";
        setTimeout(function() {
          localStorage.setItem("loginEmail",loginEmail);
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
  set(ref(db, "TheUsers/" + reg_email.value.replace(".","_")),{
    Username: username.value,
    Email: reg_email.value,
    user_status: "user"
  })
  .then(()=>{
    alert("data stored successfully!");
  })
  .catch((error)=>{
    alert("Unsuccessful, Error occured!<br/>" +error.message);
  }) 
}

// function selectData() {
//   const dbref = ref(db);

//   get(child(dbref,"TheUsers/" + username.value)).then((snapshot)=>{
//     if(snapshot.exists()) {
//       var Uname = snapshot.val().Username;
//       unamedisplay.value = Uname;
//       localStorage.setItem("uname",Uname)
//     }
//     else {
//       alert ("No data found");
//     }
//   })
//   .catch((error)=>{
//     alert("Unsuccessful, Error!<br/>"+error.message);
//   })
// }

// function updateData() {
//   update(ref(db, "TheUsers/" + username.value),{
//     Username: username.value
//   })
//   .then(()=>{
//     alert("data updated successfully!");
//   })
//   .catch((error)=>{
//     alert("Unsuccessful, Error occured!<br/>" +error.message);
//   }) 
// }

// function deleteData() {
//   update(ref(db, "TheUsers/" + username.value))
//   .then(()=>{
//     alert("data removed successfully!");
//   })
//   .catch((error)=>{
//     alert("Unsuccessful, Error occured!<br/>" +error.message);
//   })
// }

document.getElementById("Reg-btn").addEventListener("click", function () {
if (uname.length||reg_email.length||reg_pwd.length||reg_cpwd.length < 8){
  document.getElementById("error-con").style.display = "inline";
  document.getElementById("pwd-error").innerHTML = "One of the entries is too short!";
}

if (reg_cpwd.value !== reg_pwd.value) {
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
        insertUserName();
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

    
    
};
});



