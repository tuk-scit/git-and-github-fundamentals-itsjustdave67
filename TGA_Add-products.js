//#region imports for the firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

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

const user = auth.currentUser;

//#region extraction of required html elements
const submit = document.getElementById("submit-btn");
const category = document.getElementById("category");
const pname = document.getElementById("pname");
const description = document.getElementById("description");
const img_file = document.getElementById("img_file");
const min_bid = document.getElementById("min-bid");

const bid_deadline = document.getElementById("bid-deadline");
const input = document.getElementsByTagName("input");
const myimg = document.getElementById("myimg");
const extname = document.getElementById("extname");
const selbtn = document.getElementById("selbtn");
const profile_uname = document.getElementById("profile-uname");
const profile_email = document.getElementById("profile-email");
const proglab = document.getElementById("proglab");
const back_btn = document.getElementById("back-btn");
const alert_overlay = document.getElementById("alert-overlay");
const alert_title = document.getElementById("alert-title");
const alert_text = document.getElementById("alert-text");
const alert_logon_btn = document.getElementById("alert-logon-btn");
const alert_btn = document.getElementById("alert-btn");
var current_high
var currentCounterId;
var loginEmail;
var signedIn;

let title, message;

var imgURL = null;

onAuthStateChanged(auth, function (user) {
  if (user) {
    //User is signed in
    loginEmail = user.email;
    console.log()
    signedIn = true;
    getUserInfo(signedIn);

  } else {
    // User isn't signed in
    title = "Login Alert!";
  message = "No user is logged in. Kindly login to access Top G Auctions Full features"
  displayMessage(title,message);
    loginEmail = "noemail@gmail.com"
    signedIn = false;
    getUserInfo(signedIn);
  }
});


    // #region testvalues
    category.setAttribute("value","Sports Car")
    pname.setAttribute("value","The Bugatti Chiron")
    description.setAttribute("value","It is a very fast car")
    min_bid.setAttribute("value","$ 3,700,000")
    bid_deadline.setAttribute("value","23/02/2023")
    img_file.setAttribute("value","No file chosen")
    //#endregion testvalues

//#endregion

//#region submit and back button functionality
submit.addEventListener("click", () => {
  if ((input.value == "")) {
    alert("Please fill in all the fields required before submission!");
  } else {
    getProductId();
  
  UploadProcess()
  .then(() => {
    console.log("heya")
    console.log(proglab.innerHTML)
    if(proglab.innerHTML == 100) {
    console.log("result ---------- "+imgURL);
    insertProductsDetails(imgURL);
    }
  })
  .catch((error) => {
    displayError(error);
  });
    
  }
});

alert_btn.addEventListener("click", () => {
  alert_overlay.style.display = "none";
});

back_btn.addEventListener("click", function(){
  window.location.href = "http://127.0.0.1:5500/Top_G_Auctions.html"
})
//#endregion submit and back button functionality

//#region Choice of the file
var files = [];
var reader = new FileReader();

var input1 = document.createElement("input");
input1.type = "file";
input1.style.visibility = "hidden";

selbtn.addEventListener("click", function () {
  input1.click();
});

input1.onchange = (e) => {
  files = e.target.files;

  var extension = GetFileExtension(files[0]);
  var name = GetFileName(files[0]);

  img_file.value = name;
  extname.innerHTML = extension;

  reader.readAsDataURL(files[0]);
};

reader.onload = function () {
  myimg.src = reader.result;
  myimg.style.display = "flex"
};

function GetFileExtension(file) {
  var temp = file.name.split(".");
  var ext = temp.slice(temp.length - 1, temp.length);
  return "." + ext[0];
}
function GetFileName(file) {
  var temp = file.name.split(".");
  var fname = temp.slice(0, -1).join(".");
  return fname;
}
//#endregion

//#region UploadProcess
async function UploadProcess() {
  var ImgToUpload = files[0];

  var ImgName = img_file.value + extname.innerHTML;

  const metaData = {
    contentType: ImgToUpload.type,
  };

  const storage = getStorage();
  const storageRef = sRef(storage, "Images/" + ImgName);
  const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);

  UploadTask.on(
    "state-changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      proglab.innerHTML = Math.round(progress);
    },
    (error) => {
      displayError(error)
    },
    () => {
      getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
        setDownloadURL(downloadURL);
        console.log(proglab.innerHTML);
        if (proglab.innerHTML == 100) {
        insertProductsDetails(imgURL);
        
        }
      });
    }
  );
}
//#endregion

//#region getter-function for downloadURL
function setDownloadURL(downloadURL) {
  imgURL = downloadURL;
}
function gettingDownloadURL() {
  console.log("second -----"+imgURL);
  return imgURL;
}

//#endregion

//#region extraction of products id
function getProductId() {
  const dbref = ref(db);

  get(child(dbref, "Counter_id")).then((snapshot) => {
    if (snapshot.val().Counter_id == 0) {
      var currentCounterId = snapshot.val().Counter_id;
      currentCounterId++;
      console.log("crtid "+currentCounterId);
      console.log("counter "+snapshot);
   try {
      set(ref(db, "/"), {
        Counter_id: currentCounterId
      });}
      catch (err) {
        displayError(err.message);
      }
      
    }
  });
}
//#endregion

//#region insert Product details on realtime database
function insertProductsDetails(imgURL) {
  console.log("Insert ---------- "+imgURL);
  const dbref = ref(db);
  var loginEmail = localStorage.getItem("loginEmail");

  get(child(dbref, "Counter_id"))
  .then((snapshot) => {
    currentCounterId = snapshot.val().Counter_id;
    console.log("the value:"+currentCounterId);
    var name = img_file.value;
    var extension = extname.innerHTML;
    current_high = parseInt(min_bid.value.replace(/,/g, '').replace("$",'').trim())

    set(ref(db, "TheProducts/" + currentCounterId), {
      p_id: currentCounterId,
      name: pname.value,
      category: category.value,
      description: description.value,
      image_file: (name + extension),
      image_URL: imgURL,
      minimum_bid: min_bid.value,
      bid_deadline: bid_deadline.value,
      Uploaded_by_email: loginEmail,
      delete_state: "false"
    })
  })
  .then(() => {
        title = "Submitted successfully!";
        message = "Data has been stored successfully!";
        displayMessage(title, message);
        console.log(currentCounterId)

        set(ref(db, "Counter_id"), {
          Counter_id: currentCounterId,
        });
  })
  .then(()=> {
      const idVal = currentCounterId - 1;

      set(ref(db, "Bids/" + idVal), {
        Current_high: current_high,
        Current_high_name: profile_uname.innerHTML
         
      })
  })
  .catch((error) => {
        displayError(error)
  });
  
}
//#endregion

//#region Fil profile
function getUserInfo (signIn_status) {
  const dbref = ref(db);
  const userLoginEmail = loginEmail.replace(".","_");

  if (signIn_status == true) {
  get(child(dbref, "TheUsers/"+userLoginEmail))
  .then((snapshot)=> {
    var Username = snapshot.val().Username;
    var Email = snapshot.val().Email;
    fillProfile(Username,Email);
  })
  .catch(error => {
    var errorMessage = error.message;
    displayError(errorMessage);
  })
}
}
function fillProfile (username, email) {
  profile_uname.innerHTML = username;
  profile_email.innerHTML = email;
}
//#endregion

// #region alert display functions
function displayError(error) {
  let errorMessage = error.message;
    alert_overlay.style.display = "block"
    console.log(error.stack)
    alert_text.innerHTML = "Error: " + errorMessage + "</br> [ " + error.stack +" ]"
    alert_logon_btn.style.display = "none"
}

function displayMessage(title, message) {
  alert_overlay.style.display = "block"
  alert_logon_btn.style.display = "none"
  alert_title.innerHTML = title
  alert_text.innerHTML = message
}
// #endregion alert display functions

// The CHIRON is the fastest, most powerful,
// and exclusive production super sports car
// in BUGATTI’s history. Its sophisticated design,
// innovative technology, and iconic, performance-oriented
// form make it a unique masterpiece of art, form and
// technique, that pushes boundaries beyond imagination.
