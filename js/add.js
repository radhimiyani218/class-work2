import Navabar from "../components/nav.js";

document.getElementById('navabar').innerHTML=Navabar();

fetch(`http://localhost:3000/cart`)
.then((response)=>response.json())
.then((data)=>{
    console.log(data)
})

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalprice = 0;
cart.map((ele) => {
  totalprice += ele.price * ele.qty * 10;
});


let show = (cart) => {

  cart.map((ele, index) => {

    let maindiv = document.createElement("div");

    let imgdiv = document.createElement("div");
    let image = document.createElement("img");
    image.src = ele.image;

    let texts = document.createElement("div");

    let title = document.createElement("h3");
    title.innerHTML = ele.title;

    let minse = document.createElement("button");
    minse.innerHTML = "-";

    let price1 = document.createElement("p");
    price1.innerHTML = `${ele.price * 10}$`;

    let plusminse = document.createElement("div");

    let noq = document.createElement("button");
    noq.innerHTML = ele.qty;

    let plus = document.createElement("button");
    plus.innerHTML = "+";

    imgdiv.append(image);
    texts.append(title, price1);
    plusminse.append(minse, noq, plus);
    maindiv.append(imgdiv, texts, plusminse);
    document.getElementById("cartpage").append(maindiv);

    price1.setAttribute("class", "price1");
    maindiv.setAttribute("class", "maindiv");
    imgdiv.setAttribute("class", "imgdiv");
    texts.setAttribute("class", "texts");
    plusminse.setAttribute("class", "plusminse");

    minse.addEventListener("click", () => {
      console.log(ele);
      let qty = cart[index].qty;
      if (qty == 1) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));

        console.log(cart);
        window.location.reload();
      } else {
        cart[index].qty -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.reload();
      }
    });
    plus.addEventListener("click", () => {
      console.log("test");
      cart[index].qty += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.reload();
    });
  });
};
show(cart);m  
