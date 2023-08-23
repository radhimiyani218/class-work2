import Navabar from "../components/nav.js";

document.getElementById('navabar').innerHTML=Navabar();


const display=(data)=>{
    data.map((product)=>{
        console.log(product);
        let img=document.createElement("img");
        img.src=product.image
        let title=document.createElement("h3");
        title.innerHTML=product.title;
        let price=document.createElement("p");
        price.innerHTML=product.price;
        let category=document.createElement("p");
        category.innerHTML=product.category;
        let rating=document.createElement("span");
        rating.innerHTML=6;
        if(product.rating.rate > 4){
            rating.style.color="green"
            
        }
        else{
            rating.style.color="red"
        }
        let btn=document.createElement('button');
        btn.innerHTML="BUY NOW"
        btn.addEventListener("click",()=>{
        let loggedIn=localStorage.getItem("loggedIn");
        if(loggedIn){
            fetch("http://localhost:3000/cart", {
            method: "POST",
            headers: { "content-type": "application/product"},
            body: JSON.stringify(user),
          });
        }
        else{
            alert("you have to login first")
            setTimeout(()=>{
                window.location.href='/pages/login.html'
            },1000)
        }
        })
        let div=document.createElement('div');
        div.append(img,title,price,category,rating,btn)
        console.log(div);
        document.getElementById("box-2").append(div)



    })
}


const get=()=>{
    fetch("http://localhost:3000/products")
    .then((response)=>response.json())
    .then((response)=>display(response))
}
get()