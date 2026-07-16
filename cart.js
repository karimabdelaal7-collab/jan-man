// ==========================
// ⚠️ غيّر رقم الواتساب بتاع البيزنس هنا (بصيغة دولية بدون + أو أصفار زيادة)
// مثال: لو الرقم 01012345678 يبقى تكتبه 201012345678
// ==========================
const WHATSAPP_NUMBER = "201151217799";

// ==========================
// ⚠️ حط رابط Google Apps Script (Web app URL) هنا بعد الـ Deploy
// شكله هيكون زي: https://script.google.com/macros/s/AKfycb.../exec
// ==========================
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyE7AY6-A2viIP5xH183ROh8XigGU3HvhQUr8RwKmDw8S7Ka4OKbL1iUXi-47xBLyP37g/exec";

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {

    const cart = getCart();
    const itemsContainer = document.getElementById("cart-items");
    const summary = document.getElementById("cart-summary");
    const totalEl = document.getElementById("cart-total");

    if (cart.length === 0) {
        itemsContainer.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
        summary.style.display = "none";
        updateCartCount();
        return;
    }

    summary.style.display = "flex";

    let html = "";
    let total = 0;

    cart.forEach((item, index) => {

        const lineTotal = item.price * item.qty;
        total += lineTotal;

        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Size: ${item.size}</p>
                    <p>${item.price} EGP</p>
                </div>
                <div class="cart-item-qty">
                    <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
                </div>
                <div class="cart-item-total">${lineTotal} EGP</div>
                <button class="remove-btn" data-index="${index}">✕</button>
            </div>
        `;
    });

    itemsContainer.innerHTML = html;
    totalEl.textContent = total;

    document.querySelectorAll(".qty-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const index = Number(this.dataset.index);
            const action = this.dataset.action;
            const cart = getCart();

            if (action === "increase") {
                cart[index].qty += 1;
            } else if (action === "decrease") {
                cart[index].qty -= 1;
                if (cart[index].qty <= 0) {
                    cart.splice(index, 1);
                }
            }

            saveCart(cart);
            renderCart();
        });
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const index = Number(this.dataset.index);
            const cart = getCart();
            cart.splice(index, 1);
            saveCart(cart);
            renderCart();
        });
    });

    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const counter = document.getElementById("cart-count");
    if (counter) {
        counter.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    }
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

// ==========================
// Checkout Modal
// ==========================

const checkoutBtn = document.getElementById("checkout-btn");
const modal = document.getElementById("checkout-modal");
const cancelBtn = document.getElementById("cancel-checkout");
const sendBtn = document.getElementById("send-order");

checkoutBtn.addEventListener("click", () => {
    if (getCart().length === 0) return;
    modal.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

sendBtn.addEventListener("click", () => {

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    if (!name || !phone || !address) {
        alert("Please fill in all fields.");
        return;
    }

    const cart = getCart();
    let message = `*New Order - JAN MAN*%0A%0A`;
    message += `*Name:* ${encodeURIComponent(name)}%0A`;
    message += `*Phone:* ${encodeURIComponent(phone)}%0A`;
    message += `*Address:* ${encodeURIComponent(address)}%0A%0A`;
    message += `*Order Details:*%0A`;

    let plainOrderDetails = "";
    let total = 0;

    cart.forEach(item => {
        const lineTotal = item.price * item.qty;
        total += lineTotal;
        message += `- ${encodeURIComponent(item.name)} (${encodeURIComponent(item.size)}) x${item.qty} = ${lineTotal} EGP%0A`;
        plainOrderDetails += `${item.name} (${item.size}) x${item.qty} = ${lineTotal} EGP | `;
    });

    message += `%0A*Total: ${total} EGP*`;

    // تسجيل الأوردر في Google Sheet
    sendOrderToSheet(name, phone, address, plainOrderDetails, total);

    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(waLink, "_blank");

    modal.classList.add("hidden");
    showToast("✔ Order sent! We'll contact you shortly.");
});

function sendOrderToSheet(name, phone, address, orderDetails, total) {

    if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL === "PASTE_YOUR_WEB_APP_URL_HERE") {
        return; // لسه الرابط متحطش
    }

    fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
            name: name,
            phone: phone,
            address: address,
            orderDetails: orderDetails,
            total: total
        })
    }).catch(err => {
        console.error("Failed to log order to Google Sheet:", err);
    });
}

renderCart();
