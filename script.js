const container = document.getElementById("products-container");

if (container) {
    products.forEach(product => {

        container.innerHTML += `
            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>${product.price} EGP</p>

                <button onclick="viewProduct(${product.id})">
                    View Product
                </button>

            </div>
        `;

    });
}

function viewProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

const shopBtn = document.querySelector(".hero button");

if (shopBtn) {
    shopBtn.onclick = () => {
        document.querySelector(".products").scrollIntoView({
            behavior: "smooth"
        });
    };
}

// ==========================
// Cart Counter
// ==========================

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const counter = document.getElementById("cart-count");

    if (counter) {
        counter.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    }

}

updateCartCount();