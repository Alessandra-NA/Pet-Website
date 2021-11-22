function ActivarMenuHeader(){
    var myCollapse = document.getElementById('navbarHeader1')
    var boton = document.getElementById('button_navbar')
    myCollapse.setAttribute("class", "navbar-collapse collapse.show")
    boton.setAttribute("aria-expanded", "true")
    boton.setAttribute("class", "navbar-toggler")
}

function DesactivarMenuHeader(){
    var myCollapse = document.getElementById('navbarHeader1')
    var boton = document.getElementById('button_navbar')
    myCollapse.setAttribute("class", "navbar-collapse collapse")
    boton.setAttribute("aria-expanded", "false")
    boton.setAttribute("class", "navbar-toggler collapsed")
}

function OnclickNavbar(){
    var boton = document.getElementById("button_navbar")
    var expandido = boton.getAttribute("aria-expanded")
    if (expandido=="true"){
        DesactivarMenuHeader()
    }else{
        ActivarMenuHeader()
    }
}

function highlightNavbar(index) {
    var navbarList = document.getElementsByClassName("nav-link")
    for (var i = 0; i < navbarList.length; i++) {
        navbarList.item(i).setAttribute("class", "nav-link")
    }
    navbarList.item(index).setAttribute("class", "nav-link active")
}

function Validaciones(){
// Example starter JavaScript for disabling form submissions if there are invalid fields
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated')
        }, false)
    })
}

var main = function(){
    Validaciones()
    document.getElementById("button_navbar").onclick = OnclickNavbar;
    document.querySelectorAll(".listener-report").forEach(element => {
        element.addEventListener("click",function(e){
            var id = element.getAttribute('data-id');
            document.getElementById("idComment").setAttribute("value",id);
        })
    });
}
window.addEventListener("load", main)




