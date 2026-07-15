const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const product = products.find(p => p.id === productId);

const container = document.getElementById("product-details");

if (!product) {
    container.innerHTML = "<h2>Product Not Found</h2>";
} else {

    let colorsHTML = "";

    product.colors.forEach(color => {
        colorsHTML += `
            <button
                class="color-btn"
                data-image="${color.image}">
                ${color.name}
            </button>
        `;
    });

    container.innerHTML = `
        <div class="product-page">

            <div class="product-image">
                <img id="main-image" src="${product.colors[0].image}" alt="${product.name}">
            </div>

            <div class="product-info">

                <h2>${product.name}</h2>

                <h3>${product.price} EGP</h3>

                <p>${product.description}</p>

                <h4>Sizes</h4>

                <div class="sizes">
                    ${product.sizes.map(size => `
                        <button class="size-btn">${size}</button>
                    `).join("")}
                </div>

                <h4>Colors</h4>

                <div class="colors">
                    ${colorsHTML}
                </div>

                <button class="add-cart">
                    Add To Cart
                </button>

            </div>

        </div>
    `;

    const image = document.getElementById("main-image");

    // تحديث عداد السلة عند فتح صفحة المنتج
    const cartCounter = document.getElementById("cart-count");
    if (cartCounter) {
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        cartCounter.innerText = currentCart.reduce((sum, item) => sum + item.qty, 0);
    }

document.querySelectorAll(".color-btn").forEach(btn => {

    btn.addEventListener("click", function () {

        image.src = this.dataset.image;

    });

});

let selectedSize = null;

document.querySelectorAll(".size-btn").forEach(btn => {

    btn.addEventListener("click", function(){

        document.querySelectorAll(".size-btn").forEach(b=>{
            b.style.background="#eee";
            b.style.color="#000";
        });

        this.style.background="#000";
        this.style.color="#fff";

        selectedSize = this.innerText;

    });

});

document.querySelector(".add-cart").addEventListener("click", ()=>{

    if(!selectedSize){
        alert("Please select a size.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: image.src,
        size: selectedSize,
        qty: 1
    });

   localStorage.setItem("cart", JSON.stringify(cart));

// تحديث عداد السلة
if (cartCounter) {
    cartCounter.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
}

// إظهار رسالة احترافية
const toast = document.getElementById("toast");

toast.textContent = "✔ Product added to cart";
toast.classList.add("show");

setTimeout(() => {
    toast.classList.remove("show");
}, 2000);

});

}