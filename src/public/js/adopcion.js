/*function CambiarHeader() {
    for (var i = 0; i < 4; i++) {
        document.getElementsByClassName("nav-link").item(i).setAttribute("class", "nav-link")
    }
    document.getElementsByClassName("nav-link").item(2).setAttribute("class", "nav-link active")

}*/

var main = function(){
    new bootstrap.Modal(document.getElementById('avisoAdopcionModal'), {backdrop: 'static', keyboard: false}).show()

    //$('#avisoAdopcionModal').modal({ show: true, backdrop: 'static', keyboard: false })
    // CambiarHeader();
}

window.addEventListener("load", main)

