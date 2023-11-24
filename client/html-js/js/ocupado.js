   function ocupado(){

swal({
   // title: "¿Estás seguro?",
   text: "Busy date, choose another",
   icon: "warning",
   showConfirmButton: true,
  confirmButtonText: 'Aceptar',
  buttons: {
    confirm: {
      text: 'Accept',
      value: true,
      visible: true,
      className: 'btn-primary',
      closeModal: true
    }
}
//    buttons: true,
//    dangerMode: true,
//    showCancelButton:false
 })

}
// ocupado();