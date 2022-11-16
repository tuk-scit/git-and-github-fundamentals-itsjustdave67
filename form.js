



const proceed_btn_con = document.getElementById("proceed-btn-con");
const LRsub_title_con = document.getElementById("LRsub-title-con");
const LRmain_title_con = document.getElementById("LRmain-title-con");
const LRmain_title = document.getElementById("LRmain-title");
const Registration_form_container = document.getElementById("Registration_form_container");
const Login_form_container = document.getElementById("Login_form_container");
const Register_btn = document.getElementById("Register-btn");
const Login_btn = document.getElementById("Login-btn");
const back_icon_btn =  document.getElementById("back-icon-btn");

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

