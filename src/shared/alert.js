import Swal from "sweetalert2";

export const alertNew = (text, callback=()=>{}) => {
    Swal.fire({
        text: text,
        confirmButtonText: '확인',    
        customClass: {
          container: 'alert-container',
          popup: 'alert-popup',
          htmlContainer: 'alert-content',
          confirmButton: 'alert-confirm',
        },
        showClass: {
          popup: 'opacity-in',
          icon: 'opacity-in'
        },
        hideClass: {
          popup: 'opacity-out',
          icon: 'opacity-out'
        },
      }).then(()=>{
        setTimeout(()=>{
            callback();
        },200)
      })
  };
  
  export const alertNewWhite = (text, callback=()=>{}) => {
    Swal.fire({
        text: text,
        confirmButtonText: '확인',    
        customClass: {
          container: 'alert-container',
          popup: 'alert-popup-white',
          htmlContainer: 'alert-content',
          confirmButton: 'alert-confirm',
        },
        showClass: {
          popup: 'opacity-in',
          icon: 'opacity-in'
        },
        hideClass: {
          popup: 'opacity-out',
          icon: 'opacity-out'
        },
      }).then(()=>{
        setTimeout(()=>{
            callback();
        },200)
      })
  };

  export const confirmNew = (text, callback=()=>{}, secondCallback=()=>{}) => {
    Swal.fire({
        text: text,
        confirmButtonText: '확인',
        cancelButtonText: '취소',   
        showCancelButton: true,    
        customClass: {
          container: 'alert-container',
          popup: 'alert-popup',
          htmlContainer: 'alert-content',
          confirmButton: 'alert-confirm',
          cancelButton: 'alert-cancel',
        },
        showClass: {
          popup: 'opacity-in',
          icon: 'opacity-in'
        },
        hideClass: {
          popup: 'opacity-out',
          icon: 'opacity-out'
        },
      }).then((result)=>{
        if (result.isConfirmed){
            setTimeout(()=>{
                callback();
            },200)
        }else{
            setTimeout(()=>{
                secondCallback();
            },200)
        }
      })
  };

  export const confirmNewWhite = (text, callback=()=>{}, secondCallback=()=>{}) => {
    Swal.fire({
        text: text,
        confirmButtonText: '확인',
        cancelButtonText: '취소',   
        showCancelButton: true,
        customClass: {
          container: 'alert-container',
          popup: 'alert-popup-white',
          htmlContainer: 'alert-content',
          confirmButton: 'alert-confirm',
          cancelButton: 'alert-cancel',
        },
        showClass: {
          popup: 'opacity-in',
          icon: 'opacity-in'
        },
        hideClass: {
          popup: 'opacity-out',
          icon: 'opacity-out'
        },
      }).then((result)=>{
        if (result.isConfirmed){
            setTimeout(()=>{
                callback();
            },200)
        }else{
            setTimeout(()=>{
                secondCallback();
            },200)
        }
      })
  };