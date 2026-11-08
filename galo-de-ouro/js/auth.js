const formularioLogin = document.getElementById("login-form") ; 

formularioLogin.addEventListener("submit",function(evento){
    evento.preventDefault ;
    console.log("Envio Do Formulario OK") ;
}) ;