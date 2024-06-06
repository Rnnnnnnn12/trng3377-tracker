document.addEventListener('DOMContentLoaded', function () {
    let cropper;
    const imageUpload = document.getElementById('imageUpload');
    const imageDropBox = document.getElementById('imageDropBox');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const cropButton = document.getElementById('cropButton');

    // Initialize Bootstrap popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })

    // Event listener for image upload
    imageUpload.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreviewContainer.style.display = 'block';
                imageDropBox.style.display = 'none';

                // Initialize Cropper.js
                if (cropper) {
                    cropper.destroy();
                }
                cropper = new Cropper(imagePreview, {
                    aspectRatio: 2 / 1,
                    viewMode: 1,
                    autoCropArea: 1,
                    responsive: true,
                    background: false,
                });
            };
            reader.readAsDataURL(file);
        }
    });

    // Event listener for crop button
    cropButton.addEventListener('click', function () {
        if (cropper) {
            const canvas = cropper.getCroppedCanvas();
            const url = canvas.toDataURL('image/jpeg');
            localStorage.setItem('uploadedImage', url); // Save the cropped image in Local Storage
            imageDropBox.innerHTML = `<img src="${url}" style="width: 100%; height: auto; max-height: 300px;">`;
            imagePreviewContainer.style.display = 'none';
            imageDropBox.style.display = 'inline-flex';
        }
    });


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

    // Event listener for submit/save button
    document.getElementById('submitButton').addEventListener('click', function () {
        savePizzaDetails();
    });

    // Event listener for close button
    document.getElementById('closeButton').addEventListener('click', function () {
        if (confirm('Do you really want to close without saving?')) {
            $('#fullscreenModal').modal('hide');
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

    // Create a container div for the text and button
    const textButtonContainer = document.createElement("div");
    textButtonContainer.style.display = 'flex';
    textButtonContainer.style.alignItems = 'center';
    textButtonContainer.style.justifyContent = 'space-between';

    const newIngredient = document.createElement('li');
    newIngredient.innerText = `${ingredientInput.value} - ${quantityInput.value} ${selectedUnit}`;
    newIngredient.classList.add('ingredient-item');
    textButtonContainer.appendChild(newIngredient);

    saveLocal(ingredientInput.value, quantityInput.value, selectedUnit);

    const deleted = document.createElement('button');
    deleted.innerHTML = '<i class="fas fa-trash"></i> X';
    deleted.classList.add('delete-btn', 'btn', 'btn-danger', 'ml-2');
    textButtonContainer.appendChild(deleted);

    ingredientDiv.appendChild(textButtonContainer);
    ingredientList.appendChild(ingredientDiv);

    ingredientInput.value = '';
    quantityInput.value = '';
    selectedUnit = '';
    document.querySelector('.dropdown-toggle').innerText = 'Unit';
}


function deleteCheck(event) {
    const item = event.target;

    if (item.classList.contains('delete-btn')) {
        const ingredientDiv = item.closest('.ingredient'); // Select the closest parent with the 'ingredient' class
        ingredientDiv.classList.add("fall");

        removeLocalIngredients(ingredientDiv);

        ingredientDiv.addEventListener('transitionend', function () {
            ingredientDiv.remove();
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

        // Create a container div for the text and button
        const textButtonContainer = document.createElement("div");
        textButtonContainer.style.display = 'flex';
        textButtonContainer.style.alignItems = 'center';
        textButtonContainer.style.justifyContent = 'space-between';

        const newIngredient = document.createElement('li');
        newIngredient.innerText = `${ingredientObj.ingredient} - ${ingredientObj.quantity} ${ingredientObj.unit}`;
        newIngredient.classList.add('ingredient-item');
        textButtonContainer.appendChild(newIngredient);

        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i> X';
        deleted.classList.add("delete-btn", 'btn', 'btn-danger', 'ml-2');
        textButtonContainer.appendChild(deleted);

        ingredientDiv.appendChild(textButtonContainer);
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

    const baseIngredients = {
        flour: { amount: document.getElementById('flourAmount').value, unit: document.querySelector('#flourAmount + .dropdown-toggle').textContent },
        yeast: { amount: document.getElementById('yeastAmount').value, unit: document.querySelector('#yeastAmount + .dropdown-toggle').textContent },
        salt: { amount: document.getElementById('saltAmount').value, unit: document.querySelector('#saltAmount + .dropdown-toggle').textContent },
        water: { amount: document.getElementById('waterAmount').value, unit: document.querySelector('#waterAmount + .dropdown-toggle').textContent },
        oil: { amount: document.getElementById('oilAmount').value, unit: document.querySelector('#oilAmount + .dropdown-toggle').textContent },
        others: document.getElementById('otherIngredients').value.split(',').map(ingredient => ({
            ingredient: ingredient.trim(),
            unit: selectedUnit
        }))
    };

    const crustType = document.querySelector('.btn-group .btn.active').textContent;

    const instructions = {
        base: {
            instructions: document.getElementById('baseInstructions').value,
            duration: document.getElementById('baseDuration').value
        },
        toppings: {
            instructions: document.getElementById('toppingsInstructions').value,
            duration: document.getElementById('toppingsDuration').value
        },
        baking: {
            instructions: document.getElementById('bakingInstructions').value,
            duration: document.getElementById('bakingDuration').value
        }
    };

    const pizzaData = {
        pizzaName,
        pizzaDescription,
        pizzaServing,
        ingredients,
        baseIngredients,
        crustType,
        instructions,
        imageUrl
    };

    let pizzas = JSON.parse(localStorage.getItem('pizzas')) || [];
    if (currentPizzaIndex > -1) {
        pizzas[currentPizzaIndex] = pizzaData;
        document.getElementById('submitButton').textContent = 'Submit'; // Reset button text to Submit
        currentPizzaIndex = -1;
    } else {
        pizzas.push(pizzaData);
    }
    localStorage.setItem('pizzas', JSON.stringify(pizzas));
    alert('Pizza details saved!');

    displaySavedPizzas();
}

function loadPizzaDetails(index) {
    const pizzas = JSON.parse(localStorage.getItem('pizzas'));
    const pizza = pizzas[index];
    currentPizzaIndex = index;

    if (pizza) {
        const baseIngredients = pizza.baseIngredients;
        const baseIngredientList = Object.keys(baseIngredients).filter(key => baseIngredients[key].amount).map(key => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${baseIngredients[key].amount} ${baseIngredients[key].unit}`);

        const otherIngredients = baseIngredients.others.filter(ingredient => ingredient.ingredient).map(ingredient => `Other: ${ingredient.ingredient} - ${ingredient.unit}`);

        const modalContent = `
        <div class="modal fade" id="viewPizzaModal" tabindex="-1" aria-labelledby="viewPizzaModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="viewPizzaModalLabel">Pizza Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div id="displayModal" class="modal-body">
                        <h3 id="modalPizzaName">${pizza.pizzaName}</h3>
                        <p id="modalPizzaDescription">${pizza.pizzaDescription}</p>
                        <p><strong>Serving Size:</strong> <span id="modalPizzaServing">${pizza.pizzaServing}</span></p>
                        <h5>Base Ingredients:</h5>
                        <ul id="modalBaseIngredients">
                            ${baseIngredientList.map(ingredient => `<li>${ingredient}</li>`).join('')}
                            ${otherIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                        </ul>
                        <h5>Toppings:</h5>
                        <ul id="modalPizzaIngredients">
                            ${pizza.ingredients.map(ingredient => `<li>${ingredient.ingredient} - ${ingredient.quantity} ${ingredient.unit}</li>`).join('')}
                        </ul>
                        <h5>Crust Type:</h5>
                        <p>${pizza.crustType}</p>
                        <h5>Instructions:</h5>
                        <h6>Base</h6>
                        <p>${pizza.instructions.base.instructions}</p>
                        <p><strong>Duration:</strong> ${pizza.instructions.base.duration}</p>
                        <h6>Toppings</h6>
                        <p>${pizza.instructions.toppings.instructions}</p>
                        <p><strong>Duration:</strong> ${pizza.instructions.toppings.duration}</p>
                        <h6>Baking</h6>
                        <p>${pizza.instructions.baking.instructions}</p>
                        <p><strong>Duration:</strong> ${pizza.instructions.baking.duration}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closeButton">Close</button>
                        <button type="button" class="btn btn-primary" id="editButton" onclick="editPizzaDetails()">Edit</button>
                        <button type="button" class="btn btn-success" id="shareButton" onclick="shareRecipe()">Share</button>
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
        $('#viewPizzaModal').modal('hide'); // Hide the view modal
        document.getElementById('fullscreenModalLabel').textContent = 'Edit Pizza'; // Change heading to Edit Pizza
        document.getElementById('pizzaName').value = pizza.pizzaName;
        document.getElementById('pizzaDescription').value = pizza.pizzaDescription;
        document.getElementById('pizzaServing').value = pizza.pizzaServing;
        localStorage.setItem('ingredients', JSON.stringify(pizza.ingredients));

        const baseIngredients = pizza.baseIngredients;
        document.getElementById('flourAmount').value = baseIngredients.flour.amount;
        document.querySelector('#flourAmount + .dropdown-toggle').textContent = baseIngredients.flour.unit;
        document.getElementById('yeastAmount').value = baseIngredients.yeast.amount;
        document.querySelector('#yeastAmount + .dropdown-toggle').textContent = baseIngredients.yeast.unit;
        document.getElementById('saltAmount').value = baseIngredients.salt.amount;
        document.querySelector('#saltAmount + .dropdown-toggle').textContent = baseIngredients.salt.unit;
        document.getElementById('waterAmount').value = baseIngredients.water.amount;
        document.querySelector('#waterAmount + .dropdown-toggle').textContent = baseIngredients.water.unit;
        document.getElementById('oilAmount').value = baseIngredients.oil.amount;
        document.querySelector('#oilAmount + .dropdown-toggle').textContent = baseIngredients.oil.unit;
        document.getElementById('otherIngredients').value = baseIngredients.others.map(ingredient => ingredient.ingredient).join(', ');

        const instructions = pizza.instructions;
        document.getElementById('baseInstructions').value = instructions.base.instructions;
        document.getElementById('baseDuration').value = instructions.base.duration;
        document.getElementById('toppingsInstructions').value = instructions.toppings.instructions;
        document.getElementById('toppingsDuration').value = instructions.toppings.duration;
        document.getElementById('bakingInstructions').value = instructions.baking.instructions;
        document.getElementById('bakingDuration').value = instructions.baking.duration;

        // Set the crust type button
        document.querySelectorAll('.btn-group .btn').forEach(btn => {
            if (btn.textContent === pizza.crustType) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        document.getElementById('submitButton').textContent = 'Save'; // Change button text to Save
        $('#fullscreenModal').modal('show'); // Show the edit modal
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

// Function to show all pizzas
function showAllPizzas(element) {
    document.getElementById('cardsContainer').innerHTML = '';
    displaySavedPizzas();
    switchActiveTab(element);
}

// Function to show favorite pizzas
function showFavoritePizzas(element) {
    document.getElementById('cardsContainer').innerHTML = '';
    displayFavoritePizzas();
    switchActiveTab(element);
}

function switchActiveTab(element) {
    // Remove 'active' class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    // Add 'active' class to the clicked nav link
    element.classList.add('active');
}

// Function to toggle favorite status
function toggleFavorite(index) {
    let pizzas = JSON.parse(localStorage.getItem('pizzas')) || [];
    pizzas[index].isFavorite = !pizzas[index].isFavorite;
    localStorage.setItem('pizzas', JSON.stringify(pizzas));
    displaySavedPizzas();
}

// Function to display saved pizzas
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
        const favoriteClass = pizza.isFavorite ? 'btn btn-warning' : 'btn btn-outline-warning';
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <img src="${imageUrl}" class="img-fluid" alt="Pizza Image">
                    <h5 class="card-title">${pizza.pizzaName}</h5>
                    <p class="card-text">${pizza.pizzaDescription}</p>
                    <a id="viewPizzaButton" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#viewPizzaModal" onclick="loadPizzaDetails(${index})">View Pizza</a>
                    <button class="${favoriteClass}" onclick="toggleFavorite(${index})">${pizza.isFavorite ? 'Unfavorite' : 'Favorite'}</button>
                </div>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
}

// Function to display favorite pizzas
function displayFavoritePizzas() {
    const cardsContainer = document.getElementById('cardsContainer');
    if (!cardsContainer) {
        console.error('Element with ID "cardsContainer" not found.');
        return;
    }
    cardsContainer.innerHTML = '';
    const pizzas = JSON.parse(localStorage.getItem('pizzas')) || [];

    pizzas.forEach((pizza, index) => {
        if (pizza.isFavorite) {
            const card = document.createElement('div');
            card.classList.add('col-sm-4', 'mb-3');
            const imageUrl = pizza.imageUrl || 'default-image.jpg'; // Use default image if imageUrl is empty
            const favoriteClass = pizza.isFavorite ? 'btn btn-warning' : 'btn btn-outline-warning';
            card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <img src="${imageUrl}" class="img-fluid" alt="Pizza Image">
                        <h5 class="card-title">${pizza.pizzaName}</h5>
                        <p class="card-text">${pizza.pizzaDescription}</p>
                        <a id="viewPizzaButton" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#viewPizzaModal" onclick="loadPizzaDetails(${index})">View Pizza</a>
                        <button class="${favoriteClass}" onclick="toggleFavorite(${index})">${pizza.isFavorite ? 'Unfavorite' : 'Favorite'}</button>
                    </div>
                </div>
            `;
            cardsContainer.appendChild(card);
        }
    });
}

// Initial display of all pizzas
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.nav-link.active').click();
});

// Share recipe function
function shareRecipe() {
    const pizzaName = document.getElementById('modalPizzaName')?.textContent || 'No Name';
    const pizzaDescription = document.getElementById('modalPizzaDescription')?.textContent || 'No Description';
    const pizzaServing = document.getElementById('modalPizzaServing')?.textContent || 'No Serving Size';
    const baseIngredientsList = document.getElementById('modalBaseIngredients')?.innerText || 'No Base Ingredients';
    const toppingsList = document.getElementById('modalPizzaIngredients')?.innerText || 'No Toppings';
    const crustType = document.getElementById('modalPizzaCrustType')?.textContent || 'No Crust Type';
    const instructionsBase = document.getElementById('modalPizzaInstructionsBase')?.textContent || 'No Base Instructions';
    const instructionsToppings = document.getElementById('modalPizzaInstructionsToppings')?.textContent || 'No Toppings Instructions';
    const instructionsBaking = document.getElementById('modalPizzaInstructionsBaking')?.textContent || 'No Baking Instructions';

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;

    doc.setFontSize(16);
    doc.text(`Pizza Recipe: ${pizzaName}`, 10, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(`Description: ${pizzaDescription}`, 10, y);
    y += 10;
    doc.text(`Serving Size: ${pizzaServing}`, 10, y);
    y += 10;
    doc.text(`Crust Type: ${crustType}`, 10, y);
    y += 10;

    doc.setFontSize(14);
    doc.text('Base Ingredients:', 10, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(baseIngredientsList, 10, y);
    y += 10 + baseIngredientsList.split('\n').length * 10;

    doc.setFontSize(14);
    doc.text('Toppings:', 10, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(toppingsList, 10, y);
    y += 10 + toppingsList.split('\n').length * 10;

    doc.setFontSize(14);
    doc.text('Instructions:', 10, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(`Base: ${instructionsBase}`, 10, y);
    y += 10 + instructionsBase.split('\n').length * 10;
    doc.text(`Toppings: ${instructionsToppings}`, 10, y);
    y += 10 + instructionsToppings.split('\n').length * 10;
    doc.text(`Baking: ${instructionsBaking}`, 10, y);

    doc.save(`${pizzaName}_Recipe.pdf`);
}

