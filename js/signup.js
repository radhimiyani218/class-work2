import Navabar from "../components/nav.js";
document.getElementById('navabar').innerHTML=Navabar()

const userdata = (e) => {
  e.preventDefault();
  let user = {
    name: document.getElementById("name").value,
    password: document.getElementById("password").value,
    email: document.getElementById("email").value,
  };
  console.log(user);
  var nameRegex = /^[a-zA-Z ]{2,}$/;
  var password = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  var emailes =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!nameRegex.test(user.name)) {
    document.getElementById("n_err").innerHTML = "not valid name";
  } else {
    document.getElementById("n_err").innerHTML = "valid name";
  }
  if (!password.test(user.password)) {
    document.getElementById("p_err").innerHTML = "not valid password";
  } else {
    document.getElementById("p_err").innerHTML = "valid password";
  }
  if (!emailes.test(user.email)) {
    document.getElementById("e_err").innerHTML = "not valid email";
  } else {
    document.getElementById("e_err").innerHTML = "valid email";
  }

  if (
    nameRegex.test(user.name) &&
    emailes.test(user.email) &&
    password.test(user.password)
  ) {
    fetch(`http://localhost:3000/user?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          alert("user already exit");
          setTimeout(() => {
            window.location.href =
              "/class%20work%20(1)/class%20work/login.html";
          }, 3000);
        }
         else {
          fetch("http://localhost:3000/user", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user),
          });
        }
      });
    // let getuser = finduser(  user.email);
    // console.log(getuser);
  }
};

document.getElementById("userdata").addEventListener("submit", userdata);
