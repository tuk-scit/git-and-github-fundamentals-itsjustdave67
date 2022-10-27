




document.getElementById("reg-btn").addEventListener("click",function() {
    document.getElementById("Registration_form_container").style.display="inline-block";
    document.getElementById("Login_form_container").style.display="none";
});

document.getElementById("Reg-login-btn").addEventListener("click",function() {
    document.getElementById("Registration_form_container").style.display="none";
    document.getElementById("Login_form_container").style.display="inline-block";
});

