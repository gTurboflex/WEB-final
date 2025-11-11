const onSubmit = (e) => {
        e.preventDefault();
    
    const name= document.getElementById("name").value.trim();
    const email= document.getElementById("email").value.trim();
    const message= document.getElementById("message").value.trim();
    const error= document.getElementById("error");
    const errorMsgs= [];
    
    if(name.length > 20 ){
        error.innerText = "Name is too long. It should be less than 20 char";
        error.style.color = "red";
        return;
    }
    error.innerText="Запрос успешно отправлен!";
    error.style.color = "limegreen";

  document.getElementById("contact-form").reset();
};
