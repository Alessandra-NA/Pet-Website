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

var main = function(){
    document.getElementById("button_navbar").onclick = OnclickNavbar;
}

window.addEventListener("load", main)