const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const product = products.find(p => p.id === productId);

const container = document.getElementById("product-details");

function showToast(message, isWarning) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.toggle("warning", !!isWarning);
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

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
        <a href="${product.category.toLowerCase()}.html" class="back-link">← Back to ${product.category}</a>

        <div class="product-page">

            <div class="product-image">
                <img id="main-image" src="${product.colors[0].image}" alt="${product.name}">
            </div>

            <div class="product-info">

                <h2>${product.name}</h2>

                <h3>${product.price} EGP</h3>

                <p>${product.description}</p>

                <div class="sizes-header">
                    <h4>Sizes</h4>
                    ${product.sizeGuide ? `<button type="button" class="size-guide-btn">📏 Size Guide</button>` : ""}
                </div>

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

// Size Guide modal
const sizeGuideBtn = document.querySelector(".size-guide-btn");
if (sizeGuideBtn && product.sizeGuide) {

    const modal = document.createElement("div");
    modal.className = "size-guide-modal hidden";
    modal.innerHTML = `
        <div class="size-guide-box">
            <button type="button" class="size-guide-close">✕</button>
            <img src="${product.sizeGuide}" alt="Size Guide">
        </div>
    `;
    document.body.appendChild(modal);

    sizeGuideBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.classList.contains("size-guide-close")) {
            modal.classList.add("hidden");
        }
    });
}

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
        showToast("⚠ Please select a size first", true);
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
showToast("✔ Product added to cart");

});

}