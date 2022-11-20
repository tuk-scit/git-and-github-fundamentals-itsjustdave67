//#region imports for the firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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
var imgURL = null;
//#endregion

getUserInfo ();

//#region submit button functionality
submit.addEventListener("click", () => {
  if ((input.value = "")) {
    alert("Please fill in all the fields required before submission!");
  } else {
    getProductId();
    insertProductsDetails();
    UploadProcess();
  }
});
//#endregion

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

  console.log(name);
  img_file.value = name;
  extname.innerHTML = extension;

  reader.readAsDataURL(files[0]);
};

reader.onload = function () {
  myimg.src = reader.result;
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
      proglab.innerHTML = " Upload " + progress + "%";
    },
    (error) => {
      var errmsg = error.message;
      alert("error: Image not uploaded because [" + errmsg + "]");
    },
    () => {
      getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
        setDownloadURL(downloadURL);
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
  return imgURL;
}

//#endregion

//#region extraction of products id
function getProductId() {
  const dbref = ref(db);

  get(child(dbref, "Counter_id")).then((snapshot) => {
    if (Number(snapshot.val()) == 0) {
      var currentCounterId = Number(snapshot.val());
      currentCounterId++;

      set(ref(db, "/"), {
        Counter_id: currentCounterId,
      });
    }
  });
}
//#endregion

//#region save details on realtime database
function insertProductsDetails() {
  const dbref = ref(db);
  var loginEmail = localStorage.getItem("loginEmail");

  get(child(dbref, "Counter_id")).then((snapshot) => {
    var currentCounterId = snapshot.val();
    console.log(currentCounterId);
    var name = img_file.value;
    var extension = extname.value;

    set(ref(db, "TheProducts/" + currentCounterId), {
      p_id: currentCounterId,
      name: pname.value,
      category: category.value,
      description: description.value,
      image_file: name + extension,
      image_URL: gettingDownloadURL(),
      minimum_bid: min_bid.value,
      bid_deadline: bid_deadline.value,
      Uploaded_by_email: loginEmail
    })
      .then(() => {
        alert("data stored successfully!");
        currentCounterId++;

        set(ref(db, "Counter_id"), {
          Counter_id: currentCounterId,
        });
      })
      .catch((error) => {
        alert("Unsuccessful, Error occured!<br/>" + error.message);
      });
  });
}
//#endregion

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


// The CHIRON is the fastest, most powerful,
// and exclusive production super sports car
// in BUGATTI’s history. Its sophisticated design,
// innovative technology, and iconic, performance-oriented
// form make it a unique masterpiece of art, form and
// technique, that pushes boundaries beyond imagination.
