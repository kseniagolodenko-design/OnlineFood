let recipesDatabase = [];
let cart = [];

/* LOAD JSON */
async function initApp() {
    const res = await fetch('./recipse.json'); // FIX: було recipse.json
    recipesDatabase = await res.json();

    renderMenu(recipesDatabase);
}

/* RENDER MENU */
function renderMenu(meals) {

    const container = document.querySelector('.home');
    container.innerHTML = '';

    meals.forEach(meal => {

        const card = document.createElement('div');
        card.className = 'food';

        card.innerHTML = `
            <img src="${meal.image}" alt="${meal.title}">
            
            <div class="item">
                <h2>${meal.title}</h2>
                <h2>${meal.price}</h2>
                <h3>${meal.ingredients}</h3>

                <div class="card-buttons">
                    <button class="order-btn" data-id="${meal.id}">
                        Як готувати
                    </button>

                    <button class="cart-btn" data-id="${meal.id}">
                        ➕ В кошик
                    </button>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

/* CLICK EVENTS (DELEGATION) */
document.addEventListener('click', (e) => {

    if (e.target.classList.contains('order-btn')) {
        openRecipe(e.target.dataset.id);
    }

    if (e.target.classList.contains('cart-btn')) {
        addToCart(e.target.dataset.id);
    }
});

/* ADD TO CART */
function addToCart(id) {

    const meal = recipesDatabase.find(m => m.id == id);
    if (!meal) return;

    const existing = cart.find(item => item.id == id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({
            id: meal.id,
            title: meal.title,
            price: parseInt(meal.price),
            qty: 1
        });
    }

    renderCart();
}

/* RENDER CART */
function renderCart() {

    const items = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");
    const countEl = document.getElementById("cartCount");

    items.innerHTML = '';

    let total = 0;
    let count = 0;

    cart.forEach(item => {

        total += item.price * item.qty;
        count += item.qty;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <span>${item.title} x${item.qty}</span>
            <span>${item.price * item.qty} грн</span>
        `;

        items.appendChild(div);
    });

    totalEl.textContent = "Разом: " + total + " грн";
    countEl.textContent = count;
}

/* CLEAR CART */
function clearCart() {
    cart = [];
    renderCart();
}

/* TOGGLE CART DROPDOWN */
document.getElementById("cartIcon").addEventListener("click", () => {
    document.getElementById("cartDropdown").classList.toggle("active");
});

/* OPEN RECIPE */
function openRecipe(id) {

    const meal = recipesDatabase.find(m => m.id == id);
    if (!meal) return;

    document.getElementById('modalTitle').textContent = meal.title;
    document.getElementById('modalPrice').textContent = meal.price;
    document.getElementById('modalImage').src = meal.image;
    document.getElementById('modalIngredients').textContent = meal.ingredients;
    document.getElementById('modalInstructions').textContent = meal.instructions;

    document.getElementById('recipeModal').style.display = 'flex';
}

/* CLOSE MODAL */
document.getElementById('closeModalBtn').onclick = () => {
    document.getElementById('recipeModal').style.display = 'none';
};

document.getElementById('recipeModal').onclick = (e) => {
    if (e.target.id === 'recipeModal') {
        document.getElementById('recipeModal').style.display = 'none';
    }
};

/* NAV ACTIVE */
document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", (e) => {
        e.preventDefault();

        document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
        link.classList.add("active");
    });
});

/* SEARCH */
const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        const value = searchInput.value.toLowerCase();

        const filtered = recipesDatabase.filter(item =>
            item.title.toLowerCase().includes(value)
        );

        renderMenu(filtered);
    }
});

document.addEventListener('DOMContentLoaded', initApp);