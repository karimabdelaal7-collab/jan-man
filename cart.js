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

// ==========================
// أسعار الشحن حسب المحافظة (بالجنيه المصري)
// ==========================
const SHIPPING_RATES = {
    "القاهرة": 60,
    "الجيزة": 60,
    "الإسكندرية": 75,
    "الدقهلية": 85,
    "الشرقية": 85,
    "المنوفية": 85,
    "القليوبية": 85,
    "الغربية": 85,
    "البحيرة": 85,
    "كفر الشيخ": 85,
    "دمياط": 85,
    "بورسعيد": 85,
    "الإسماعيلية": 85,
    "السويس": 85,
    "الفيوم": 95,
    "بني سويف": 95,
    "المنيا": 95,
    "أسيوط": 95,
    "سوهاج": 95,
    "قنا": 95,
    "الوادي الجديد": 95,
    "مطروح": 95,
    "شمال سيناء": 95,
    "جنوب سيناء": 95,
    "أسوان": 120,
    "الأقصر": 120,
    "البحر الأحمر": 120
};

function getShippingCost(governorate) {
    return SHIPPING_RATES[governorate] ?? null;
}

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

function showToast(message, isWarning) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.toggle("warning", !!isWarning);
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

// ==========================
// Checkout Modal
// ==========================

const checkoutBtn = document.getElementById("checkout-btn");
const modal = document.getElementById("checkout-modal");
const cancelBtn = document.getElementById("cancel-checkout");
const sendBtn = document.getElementById("send-order");
const governorateSelect = document.getElementById("customer-governorate");

function getProductsTotal() {
    return getCart().reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function updateOrderSummary() {
    const productsTotal = getProductsTotal();
    const governorate = governorateSelect.value;
    const shipping = getShippingCost(governorate);

    document.getElementById("summary-products").textContent = `${productsTotal} EGP`;

    if (shipping === null) {
        document.getElementById("summary-shipping").textContent = "— Select governorate";
        document.getElementById("summary-total").textContent = `${productsTotal} EGP`;
    } else {
        document.getElementById("summary-shipping").textContent = `${shipping} EGP`;
        document.getElementById("summary-total").textContent = `${productsTotal + shipping} EGP`;
    }
}

governorateSelect.addEventListener("change", updateOrderSummary);

checkoutBtn.addEventListener("click", () => {
    if (getCart().length === 0) return;
    modal.classList.remove("hidden");
    updateOrderSummary();
});

cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

sendBtn.addEventListener("click", async () => {

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const governorate = document.getElementById("customer-governorate").value.trim();
    const city = document.getElementById("customer-city").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    if (!name || !phone || !governorate || !city || !address) {
        showToast("⚠ Please fill in all fields", true);
        return;
    }

    if (!phone.startsWith("0")) {
        showToast("⚠ Phone number must start with 0", true);
        return;
    }

    const shippingCost = getShippingCost(governorate);
    const cart = getCart();
    const productsTotal = getProductsTotal();
    const grandTotal = productsTotal + (shippingCost || 0);

    let plainOrderDetails = "";
    cart.forEach(item => {
        const lineTotal = item.price * item.qty;
        plainOrderDetails += `${item.name} (${item.size}) x${item.qty} = ${lineTotal} EGP | `;
    });

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";

    // تسجيل الأوردر في Google Sheet والحصول على رقم الطلب التسلسلي
    const orderNumber = await sendOrderToSheet(
        name, phone, governorate, city, address,
        plainOrderDetails, productsTotal, shippingCost, grandTotal
    );

    let message = `*New Order - JAN MAN*%0A%0A`;
    message += `*Order No:* ${orderNumber}%0A`;
    message += `*Name:* ${encodeURIComponent(name)}%0A`;
    message += `*Phone:* ${encodeURIComponent(phone)}%0A`;
    message += `*Governorate:* ${encodeURIComponent(governorate)}%0A`;
    message += `*City:* ${encodeURIComponent(city)}%0A`;
    message += `*Address:* ${encodeURIComponent(address)}%0A%0A`;
    message += `*Order Details:*%0A`;

    cart.forEach(item => {
        const lineTotal = item.price * item.qty;
        message += `- ${encodeURIComponent(item.name)} (${encodeURIComponent(item.size)}) x${item.qty} = ${lineTotal} EGP%0A`;
    });

    message += `%0A*Products Total: ${productsTotal} EGP*`;
    message += `%0A*Shipping: ${shippingCost} EGP*`;
    message += `%0A*Grand Total: ${grandTotal} EGP*`;

    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(waLink, "_blank");

    sendBtn.disabled = false;
    sendBtn.textContent = "Send Order";

    modal.classList.add("hidden");
    showToast("✔ Order sent! We'll contact you shortly.");
});

async function sendOrderToSheet(name, phone, governorate, city, address, orderDetails, productsTotal, shippingCost, grandTotal) {

    const fallbackOrderNumber = "JM-" + Date.now();

    if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL === "PASTE_YOUR_WEB_APP_URL_HERE") {
        return fallbackOrderNumber;
    }

    try {
        const response = await fetch(GOOGLE_SHEET_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({
                name: name,
                phone: phone,
                governorate: governorate,
                city: city,
                address: address,
                orderDetails: orderDetails,
                productsTotal: productsTotal,
                shippingCost: shippingCost,
                total: grandTotal
            })
        });

        const data = await response.json();
        return data.orderNumber || fallbackOrderNumber;

    } catch (err) {
        console.error("Failed to log order to Google Sheet:", err);
        return fallbackOrderNumber;
    }
}

renderCart();
