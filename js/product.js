import Navabar from "../components/nav.js";

document.getElementById("navabar").innerHTML = Navabar();

const display = (data) => {
  data.map((product) => {
    // console.log(product);
    let img = document.createElement("img");
    img.src = product.image;
    let title = document.createElement("h3");
    title.innerHTML = product.title;
    let price = document.createElement("p");
    price.innerHTML = product.price;
    let category = document.createElement("p");
    category.innerHTML = product.category;
    let rating = document.createElement("span");
    rating.innerHTML = 6;
    if (product.rating.rate > 4) {
      rating.style.color = "green";
    } else {
      rating.style.color = "red";
    }
    let btn = document.createElement("button");
    btn.innerHTML = "BUY NOW";
    btn.addEventListener("click", () => {
      let loggedIn = localStorage.getItem("loggedIn");
      if (loggedIn) {
        fetch(`http://localhost:3000/cart?id=${product.id}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              alert("product was sucess cart");
              fetch(`http://localhost:3000/cart/${product.id}`, {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ qty: data[0].qty + 1 }),
              });
            } else {
              console.log("product", product);
              fetch("http://localhost:3000/cart", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ...product, qty: 1 }),
              });
            }
          });

        //
      } else {
        alert("you have to login first");
        setTimeout(() => {
          window.location.href = "/pages/login.html";
        }, 1000);
      }
    });
    let div = document.createElement("div");
    div.append(img, title, price, category, rating, btn);
    // console.log(div);
    document.getElementById("box-2").append(div);
  });
};



let product = [];

document.getElementById("lth").addEventListener("click", () => {
  product.sort((a, b) => a.price - b.price);
  display(product);
});

document.getElementById("htl").addEventListener("click", () => {
  product.sort((a, b) => b.price - a.price);
  display(product);
});

document.getElementById("man").addEventListener("click", () => {
  const temp = product.filter((val) => val.category === "men's clothing");
  display(temp);
});

document.getElementById("woman").addEventListener("click", () => {
  const temp = products.filter((val) => val.category === "women's clothing");
  display(temp);
});

document.getElementById("electronics").addEventListener("click", () => {
  const temp = products.filter((val) => val.category === "electronics");
  display(temp);
});


const get = () => {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((response) => display(response));
};
get();
