var activarFotoFile1 = function(){
    var inputFoto1 = document.querySelector("#input_foto1")
    inputFoto1.click();
}


var seleccionarFotoOnClick = function(){
    var boton1 = document.querySelector("#boton_selec_foto1");

    boton1.addEventListener("click", activarFotoFile1);

}





var main = function(){
    seleccionarFotoOnClick();
}

window.addEventListener("load", main)