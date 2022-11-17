
const menu_btn = document.getElementById("menu-btn");
const TGAmenu_container = document.getElementById("TGAmenu-container");
const table_rows = document.querySelectorAll('tr');



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

table_rows.forEach( table_row => {
    table_row.addEventListener("click",()=> {
        const yes = table_row.style.setProperty("background","white");
    //    #f6f6e9

    });
});