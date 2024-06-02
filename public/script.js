// NOTE: CHECK RECOMMENDATION IN CHAT

document.addEventListener('DOMContentLoaded', function () {
    // Load saved image from local storage
    const savedImageURL = localStorage.getItem('uploadedImage');
    if (savedImageURL) {
        const imageDropBox = document.getElementById('imageDropBox');
        imageDropBox.innerHTML = `<img src="${savedImageURL}" style="width: 100%; height: auto; max-height: 300px;">`;
    }

    // Event listeners for dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            var dropdownButton = this.closest('.input-group').querySelector('.btn.dropdown-toggle');
            dropdownButton.textContent = this.textContent;
        });
    });

    // Event listener for crust type buttons
    document.querySelectorAll('.btn-group .btn').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('.btn-group .btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Event listener for image upload
    document.getElementById('imageUpload').addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const url = e.target.result;
                localStorage.setItem('uploadedImage', url); // Save the image in Local Storage
                const imageDropBox = document.getElementById('imageDropBox');
                imageDropBox.innerHTML = `<img src="${url}" style="width: 100%; height: auto; max-height: 300px;">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Load ingredients from local storage
    getIngredients();

    // Display saved pizzas
    displaySavedPizzas();

    // Event listener for submit button
    document.getElementById('submitButton').addEventListener('click', function () {
        savePizzaDetails();
        alert('Data is saved!');
        console.log('Data is saved!')
    });

    // Event listener for close button
    document.getElementById('closeButton').addEventListener('click', function () {
        if (confirm('Do you really want to close without saving?')) {
            $('#viewPizzaModal').modal('hide');
        }
    });


});

// Variables
const ingredientInput = document.querySelector('.ingredient-input');
const quantityInput = document.querySelector('.quantity-input');
const ingredientBtn = document.querySelector('.ingredient-btn');
const ingredientList = document.querySelector('.ingredient-list');
let selectedUnit = '';
let currentPizzaIndex = -1; // Track the index of the pizza being viewed/edited

// Event listeners
ingredientBtn.addEventListener('click', addIngredient);
ingredientList.addEventListener('click', deleteCheck);

// Event listeners for dropdown items
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const dropdownButton = this.closest('.input-group').querySelector('.btn.dropdown-toggle');
        dropdownButton.textContent = this.textContent;
        selectedUnit = this.textContent;
    });
});

function addIngredient(event) {
    event.preventDefault();

    if (ingredientInput.value === '' || quantityInput.value === '' || selectedUnit === '') {
        alert("You must complete all fields!");
        return;
    }

    const ingredientDiv = document.createElement("div");
    ingredientDiv.classList.add('ingredient', 'list-group-item');

    const newIngredient = document.createElement('li');
    newIngredient.innerText = `${ingredientInput.value} - ${quantityInput.value} ${selectedUnit}`;
    newIngredient.classList.add('ingredient-item');
    ingredientDiv.appendChild(newIngredient);

    saveLocal(ingredientInput.value, quantityInput.value, selectedUnit);

    const checked = document.createElement('button');
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add('check-btn', 'btn', 'btn-success', 'ml-2');
    ingredientDiv.appendChild(checked);

    const deleted = document.createElement('button');
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add('delete-btn', 'btn', 'btn-danger', 'ml-2');
    ingredientDiv.appendChild(deleted);

    ingredientList.appendChild(ingredientDiv);

    ingredientInput.value = '';
    quantityInput.value = '';
    selectedUnit = '';
    document.querySelector('.dropdown-toggle').innerText = 'Unit';
}

function deleteCheck(event) {
    const item = event.target;

    if (item.classList.contains('delete-btn')) {
        item.parentElement.classList.add("fall");

        removeLocalIngredients(item.parentElement);

        item.parentElement.addEventListener('transitionend', function () {
            item.parentElement.remove();
        });
    }

    if (item.classList.contains('check-btn')) {
        item.parentElement.classList.toggle("completed");
    }
}

function saveLocal(ingredient, quantity, unit) {
    let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    ingredients.push({ ingredient, quantity, unit });
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
}

function getIngredients() {
    let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    ingredients.forEach(ingredientObj => {
        const ingredientDiv = document.createElement("div");
        ingredientDiv.classList.add("ingredient", "list-group-item");

        const newIngredient = document.createElement('li');
        newIngredient.innerText = `${ingredientObj.ingredient} - ${ingredientObj.quantity} ${ingredientObj.unit}`;
        newIngredient.classList.add('ingredient-item');
        ingredientDiv.appendChild(newIngredient);

        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn", 'btn', 'btn-success', 'ml-2');
        ingredientDiv.appendChild(checked);

        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn", 'btn', 'btn-danger', 'ml-2');
        ingredientDiv.appendChild(deleted);

        ingredientList.appendChild(ingredientDiv);
    });
}

function removeLocalIngredients(ingredient) {
    let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    const ingredientText = ingredient.children[0].innerText;
    const ingredientIndex = ingredients.findIndex(item => `${item.ingredient} - ${item.quantity} ${item.unit}` === ingredientText);
    ingredients.splice(ingredientIndex, 1);
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
}


function savePizzaDetails() {
    const pizzaName = document.getElementById('pizzaName').value;
    const pizzaDescription = document.getElementById('pizzaDescription').value;
    const pizzaServing = document.getElementById('pizzaServing').value;
    const ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    const imageUrl = localStorage.getItem('uploadedImage');

    const pizzaData = {
        pizzaName,
        pizzaDescription,
        pizzaServing,
        ingredients,
        imageUrl
    };

    let pizzas = JSON.parse(localStorage.getItem('pizzas')) || [];
    pizzas.push(pizzaData);
    localStorage.setItem('pizzas', JSON.stringify(pizzas));
    alert('Pizza details saved!');

    displaySavedPizzas();
}


function displaySavedPizzas() {
    const cardsContainer = document.getElementById('cardsContainer');
    if (!cardsContainer) {
        console.error('Element with ID "cardsContainer" not found.');
        return;
    }
    cardsContainer.innerHTML = '';
    const pizzas = JSON.parse(localStorage.getItem('pizzas')) || [];

    pizzas.forEach((pizza, index) => {
        const card = document.createElement('div');
        card.classList.add('col-sm-4', 'mb-3');
        const imageUrl = pizza.imageUrl || 'default-image.jpg'; // Use default image if imageUrl is empty
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <img src="${imageUrl}" class="img-fluid" alt="Pizza Image">
                    <h5 class="card-title">${pizza.pizzaName}</h5>
                    <p class="card-text">${pizza.pizzaDescription}</p>
                    <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#viewPizzaModal" onclick="loadPizzaDetails(${index})">View Pizza</a>
                </div>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
}


function loadPizzaDetails(index) {
    const pizzas = JSON.parse(localStorage.getItem('pizzas'));
    const pizza = pizzas[index];
    currentPizzaIndex = index;

    if (pizza) {
        const modalContent = `
        <div class="modal fade" id="viewPizzaModal" tabindex="-1" aria-labelledby="viewPizzaModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="viewPizzaModalLabel">Pizza Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h3 id="modalPizzaName">${pizza.pizzaName}</h3>
                    <p id="modalPizzaDescription">${pizza.pizzaDescription}</p>
                            <p id="modalPizzaDescription">${pizza.pizzaDescription}</p>
                            <p><strong>Serving Size:</strong> <span id="modalPizzaServing">${pizza.pizzaServing}</span></p>
                            <h5>Ingredients:</h5>
                            <ul id="modalPizzaIngredients">
                                ${pizza.ingredients.map(ingredient => `<li>${ingredient.ingredient} - ${ingredient.quantity} ${ingredient.unit}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="editButton" onclick="editPizzaDetails()">Edit</button>
                            <button type="button" class="btn btn-danger" id="deleteButton" onclick="deletePizzaDetails()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        createAndShowModal(modalContent);
    }
}



function editPizzaDetails() {
    const pizzas = JSON.parse(localStorage.getItem('pizzas'));
    const pizza = pizzas[currentPizzaIndex];

    if (pizza) {
        document.getElementById('pizzaName').value = pizza.pizzaName;
        document.getElementById('pizzaDescription').value = pizza.pizzaDescription;
        document.getElementById('pizzaServing').value = pizza.pizzaServing;
        localStorage.setItem('ingredients', JSON.stringify(pizza.ingredients));
        $('#fullscreenModal').modal('show');
    }
}

function deletePizzaDetails() {
    const pizzas = JSON.parse(localStorage.getItem('pizzas'));

    if (currentPizzaIndex > -1) {
        pizzas.splice(currentPizzaIndex, 1);
        localStorage.setItem('pizzas', JSON.stringify(pizzas));
        alert('Pizza deleted!');
        displaySavedPizzas();
        $('#viewPizzaModal').modal('hide');
    }
}


function createAndShowModal(modalContent) {
    // Create a new div for the modal
    var modalDiv = document.createElement('div');
    modalDiv.setAttribute("id", "partialView");

    // Set the inner HTML to the provided modal content
    modalDiv.innerHTML = modalContent;

    // Append the modal to the body
    document.body.appendChild(modalDiv);

    // Remove the modal from the DOM when it's hidden
    $(modalDiv).find("#viewPizzaModal").on('hidden.bs.modal', function () {
        $(this).remove();
    });

    // Show the modal
    $(modalDiv).find("#viewPizzaModal").modal('show');
}

