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



/* NAVIGATION ACTIVE  */

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});

/* ORDER BUTTON  */

const orderButton = document.querySelector("button");

orderButton.addEventListener("click", () => {

    alert("Ваше замовлення прийнято 🍔");

});

/* CART ICON  */

const cartIcon = document.querySelector('img[alt="Cart"]');

cartIcon.addEventListener("click", () => {

    alert("Кошик поки порожній 🛒");

});

/* SEARCH ICON */

const searchIcon = document.querySelector('img[alt="Search"]');

searchIcon.addEventListener("click", () => {

    alert("Пошук скоро буде доступний 🔍");

});