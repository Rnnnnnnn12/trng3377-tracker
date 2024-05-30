
function uploadImage() {
    const input = document.getElementById('imageUpload');
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const url = e.target.result;
            const imageDropBox = document.getElementById('imageDropBox');
            imageDropBox.innerHTML = `<img src="${url}" style="width: 100%; height: auto; max-height: 300px;">`; // Replace the contents
        };
        reader.readAsDataURL(file); // Converts the uploaded file into a data URL
    } else {
        alert('Please select an image file.');
    }
}

// Upload and save imag to local storage

document.addEventListener('DOMContentLoaded', function () {
    const savedImageURL = localStorage.getItem('uploadedImage');
    if (savedImageURL) {
        const imageDropBox = document.getElementById('imageDropBox');
        imageDropBox.innerHTML = `<img src="${savedImageURL}" style="width: 100%; height: auto; max-height: 300px;">`;
    }
});

document.getElementById('imageUpload').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const url = e.target.result;
            localStorage.setItem('uploadedImage', url);  // Save the image in Local Storage

            const imageDropBox = document.getElementById('imageDropBox');
            imageDropBox.innerHTML = `<img src="${url}" style="width: 100%; height: auto; max-height: 300px;">`;
        };
        reader.readAsDataURL(file);
    }
});


// Function to save pizza details to local storage
function savePizzaDetails() {
    const pizzaName = document.getElementById('pizzaName').value;
    const pizzaDescription = document.getElementById('pizzaDescription').value;
    const pizzaServing = document.getElementById('pizzaServing').value;
  
    const pizzaData = {
      pizzaName,
      pizzaDescription,
      pizzaServing,
    };
  
    localStorage.setItem('pizzaDetails', JSON.stringify(pizzaData));
    alert('Pizza details saved!');
  }
  
  // Function to load pizza details from local storage and display in modal
  function loadPizzaDetails() {
    const pizzaData = JSON.parse(localStorage.getItem('pizzaDetails'));
  
    if (pizzaData) {
      document.getElementById('modalPizzaName').innerText = pizzaData.pizzaName;
      document.getElementById('modalPizzaDescription').innerText = pizzaData.pizzaDescription;
      document.getElementById('modalPizzaServing').innerText = pizzaData.pizzaServing;
    } else {
      alert('No pizza data found. Please add a pizza first.');
    }
  }
  
  // Event listener for viewing pizza details
  document.querySelector('a[data-bs-target="#viewPizzaModal"]').addEventListener('click', loadPizzaDetails);

  
  
// Input dropdown
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav .nav-link:not(.disabled)');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Optional: prevent the link from following the URL
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Toggle button for the crust type
document.querySelectorAll('.btn-group .btn').forEach(button => {
    button.addEventListener('click', function () {
        let buttons = document.querySelectorAll('.btn-group .btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

// Dropdown button for units
document.addEventListener('DOMContentLoaded', function () {
    var dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the link from navigating.
            var dropdownButton = this.closest('.input-group').querySelector('.btn.dropdown-toggle');
            dropdownButton.textContent = this.textContent;
        });
    });
});


// Function to load ingredients from localStorage
// Add event listener for DOMContentLoaded to load saved ingredients
document.addEventListener('DOMContentLoaded', function() {
    loadIngredients();
});

// Function to add a new ingredient field
function addField() {
    const container = document.getElementById('ingredientsContainer');
    const newField = document.createElement('div');
    newField.className = 'form-inline';
    newField.innerHTML = `
        <input type="text" class="form-control mb-2 mr-sm-2" placeholder="Ingredient">
        <input type="number" class="form-control mb-2 mr-sm-2" placeholder="Quantity">
        <select class="form-control mb-2 mr-sm-2">
            <option value="grams">Grams</option>
            <option value="cups">Cups</option>
            <option value="ml">Milliliters</option>
        </select>
        <button type="button" class="btn btn-danger mb-2" onclick="removeField(this)">Remove</button>
    `;
    container.appendChild(newField);
    saveIngredients();
}

// Function to remove an ingredient field
function removeField(element) {
    element.parentNode.remove();
    saveIngredients();
}

// Function to save ingredients to localStorage
function saveIngredients() {
    const ingredients = [];
    document.querySelectorAll('#ingredientsContainer .form-inline').forEach(div => {
        const ingredient = div.querySelector('input[type=text]').value;
        const quantity = div.querySelector('input[type=number]').value;
        const unit = div.querySelector('select').value;
        ingredients.push({ ingredient, quantity, unit });
    });
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
}

// Function to load ingredients from localStorage
function loadIngredients() {
    const ingredients = JSON.parse(localStorage.getItem('ingredients'));
    if (ingredients) {
        const container = document.getElementById('ingredientsContainer');
        container.innerHTML = ''; // Clear existing fields
        ingredients.forEach(data => {
            const newField = document.createElement('div');
            newField.className = 'form-inline';
            newField.innerHTML = `
                <input type="text" class="form-control mb-2 mr-sm-2" value="${data.ingredient}" placeholder="Ingredient">
                <input type="number" class="form-control mb-2 mr-sm-2" value="${data.quantity}" placeholder="Quantity">
                <select class="form-control mb-2 mr-sm-2">
                    <option value="grams" ${data.unit === 'grams' ? 'selected' : ''}>Grams</option>
                    <option value="cups" ${data.unit === 'cups' ? 'selected' : ''}>Cups</option>
                    <option value="ml" ${data.unit === 'ml' ? 'selected' : ''}>Milliliters</option>
                </select>
                <button type="button" class="btn btn-danger mb-2" onclick="removeField(this)">Remove</button>
            `;
            container.appendChild(newField);
        });
    }
}

