let recipesDatabase = [];

/* LOAD JSON */
async function initApp() {
    const res = await fetch('./recipse.json');
    recipesDatabase = await res.json();

    renderMenu(recipesDatabase);
}

/* RENDER ALL FOOD */
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

                <button class="order-btn" data-id="${meal.id}">
                    Як готувати
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

/* CLICK BUTTON (DELEGATION) */
document.addEventListener('click', (e) => {

    if (e.target.classList.contains('order-btn')) {
        openRecipe(e.target.dataset.id);
    }

});

/* OPEN MODAL */
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
function closeModal() {
    document.getElementById('recipeModal').style.display = 'none';
}

document.getElementById('closeModalBtn').onclick = closeModal;

document.getElementById('recipeModal').onclick = (e) => {
    if (e.target.id === 'recipeModal') closeModal();
};

document.addEventListener('DOMContentLoaded', initApp);



/* NAV SCROLL */
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        navLinks.forEach(a => a.classList.remove("active"));
        link.classList.add("active");

        const category = link.dataset.category;

        // показуємо всі товари перед скролом
        renderMenu(recipesDatabase);

        setTimeout(() => {
            const index = recipesDatabase.findIndex(item => item.category === category);
            const cards = document.querySelectorAll(".food");

            if (index !== -1 && cards[index]) {
                const headerHeight = document.querySelector("header").offsetHeight;

                const position = cards[index].getBoundingClientRect().top + window.scrollY - headerHeight - 20;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });
            }
        }, 100);
    });
});

/* HEADER SEARCH */
const searchInput = document.querySelector("#searchInput");
const searchIcon = document.querySelector("#searchIcon");

function headerSearch() {
    const text = searchInput.value.trim().toLowerCase();

    if (text === "") {
        renderMenu(recipesDatabase);
        return;
    }

    const filtered = recipesDatabase.filter(item => {
        const title = item.title.toLowerCase();
        const ingredients = item.ingredients.toLowerCase();
        const category = item.category.toLowerCase();

        const categoryUa =
            category === "burger" ? "бургер бургери" :
            category === "pizza" ? "піца пица" :
            category === "shawarma" ? "шаурма шаверма" :
            category === "fries" ? "картопля фрі картошка" :
            category === "hotdog" ? "хот дог хот-дог хотдог" :
            "";

        return (
            title.includes(text) ||
            ingredients.includes(text) ||
            category.includes(text) ||
            categoryUa.includes(text)
        );
    });

    renderMenu(filtered);

    if (filtered.length === 0) {
        alert("Нічого не знайдено 😕");
    }
}

searchIcon.addEventListener("click", headerSearch);

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        headerSearch();
    }
});

/* CART DROPDOWN */
const cartIcon = document.querySelector("#cartIcon");
const cartDropdown = document.querySelector("#cartDropdown");

cartIcon.addEventListener("click", () => {
    cartDropdown.classList.toggle("active");
});

/* ORDER BUTTON */
const orderButton = document.querySelector("#orderButton");

orderButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("🛒 Кошик порожній!");
        return;
    }

    alert("✅ Ваше замовлення прийнято!");

    cart = [];
    renderCart();
});