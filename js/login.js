import Navabar from "../components/nav.js";

document.getElementById('navabar').innerHTML=Navabar();

const login=(e)=>{
    e.preventDefault();
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value
    fetch(`http://localhost:3000/email=${email}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0){
        if(data[0].password === password){
          localStorage.setItem("loggedIn",true)
            alert("login success")
        }
        else{
            alert("login invalid")
        }
    }
      else{
        alert("user not found")
      }
    })
}

document.getElementById("form").addEventListener("submit",login)