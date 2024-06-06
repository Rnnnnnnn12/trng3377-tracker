# PIZZALYTICS - Pizza tracking webapp

## Overview 
Pizzalytics is a comprehensive web application designed to help users create, manage, and share pizza recipes. The application provides a user-friendly interface for adding ingredients, instructions, and durations for each step of pizza preparation. Users can save their favorite recipes, generate PDF versions of them, and enjoy a seamless, responsive experience.

### Version control
The project is managed using Git for version control. Clone the repository and manage your versions as follows:

### Features
 **Pizza Creation**: 
  - Add name, description, and photos for each pizza.
  - Customize ingredients with specific quantities and units.
  - Provide detailed instructions and set durations for each stage (base, toppings, and baking).
  
 **Image Cropping**: 
  - Utilize Cropper.js for cropping images before uploading to ensure they meet the required format.
  
 **Recipe Management**: 
  - Save and view favorite recipes in a dedicated section.
  - Edit and save updates to existing recipes.
  
 **Recipe Highlighting**: 
  - Use the 'Favorite' button to highlight and easily access preferred recipes.
  
-**Responsive Design**: 
  - Built with Bootstrap to ensure a consistent and user-friendly experience across all devices.
  
 **PDF Generation**: 
  - Generate PDF versions of pizza recipes using jsPDF for easy sharing and printing.

### Setup

Follow these steps to set up the Pizzalytics web application:
1. Clone the Repository**:
   git clone https://github.com/Rnnnnnnn12/trng3377-tracker
   cd trng3377-tracker

2. Install Dependencies**:
   Ensure you have Node.js and npm installed on your machine. Then, run:
   npm install

3. Run the Development Server**:
   Start the server by running:
   npm run start
   The application should now be running at `http://localhost:8888/`.

4. Accessing the Application**:
   Open your browser and navigate to `http://localhost:8888/` to access the Pizzalytics web app.

## Usage 
    Open the index.html file in your browser to start. When the page is open: 
1. Add a New Pizza:
  Click on the "Add New Pizza" button on the top left.

2. Enter Pizza Details:
  Enter the ingredient name (required), description, and upload a photo.
  When uploading a photo, click "Crop" beneath the crop tool to finish uploading the picture.

3. Enter Base Ingredients:
  Enter servings (required) and quantity for pizza base ingredients.
  If an ingredient in the pre-listed section is not used, leave the quantity blank, and it won't be included.
  Additional pizza base ingredients that are not listed can be added in the "Others" line.
  Data is automatically saved.

4. Add Toppings or Sauce:
  Click the "Add Ingredient" button to add the ingredient to the list.
  To delete an ingredient, click the trash icon (X) button next to the ingredient.

5. Enter Cooking Instructions:
  Enter instructions and duration for making the base, adding toppings or sauce, and baking.

6. Submit Pizza Details:
  Click "Submit" to save pizza details.

7. Access Saved Pizzas:
  Each saved pizza can be accessed via its own card on display.
  Users can edit or delete input.

8. Highlight Favorite Pizza:
  Click on the "Favorite" button to highlight a pizza.
  The pizza will be shown in the "Favorite" tab.

## Limitations 
The Pizzalytics web application has a few limitations that users should be aware of. 

One limitation is that the share function only allows users to download their pizza creations as a PDF document, rather than providing a direct link. While this makes it easy to save and distribute recipes, it does not offer the convenience of sharing via a link, which could be more suitable for social media or messaging platforms. However, users can still share their recipes by sharing the downloaded PDF file through other means, such as email or file-sharing services.

Another limitation is related to the application's use of local storage to store data. Local storage has a restricted capacity, typically around 5-10MB per origin. Storing large amounts of data or media files could easily exceed this capacity. Additionally, local storage operates solely on the client-side, lacking any server interaction. This means that data is not synchronized across devices nor backed up to a server. If a user clears their browser data, all stored information would be lost. These limitations underscore the importance of careful data management and consideration when using local storage in applications that require extensive data persistence.

## Development
The Pizzalytics web application is developed using HTML, CSS, and JavaScript. It leverages the Bootstrap framework for responsive design and the jsPDF library for PDF generation. The application uses Cropper.js for image cropping functionality and is built with a modular, component-based architecture for easy maintenance and scalability.

The development of the Pizzalytics web application involves several key milestones and improvement:
1. Modular Component Architecture: The Pizzalytics web application is built with a modular, component-based architecture, utilizing HTML, CSS, and JavaScript to create reusable and encapsulated components. This architecture enables easy maintenance and scalability of the application. Each component is responsible for a specific functionality, such as displaying pizza details, managing favorite recipes, or generating PDFs. Components are designed to be reusable across different parts of the application, reducing code duplication and improving code maintainability.

2. Performance Optimization: Efforts are made to optimize the performance of the application, ensuring fast load times and smooth user interactions. Techniques such as lazy loading and code splitting are employed to reduce initial loading times and improve overall performance.

3. Accessibility: The Pizzalytics web application prioritizes inclusivity by adhering to WCAG 2 (Web Content Accessibility Guidelines) standards. To ensure a user-friendly experience for all, including those with disabilities, the application maintains sufficient color contrast for readability and ensures predictable, consistent navigation. 

4. Cross-Browser Compatibility: The application is tested and optimized for cross-browser compatibility, ensuring a consistent user experience across different browsers and devices.


## Acknowledgements 

### Sources
1. The Pizzalytics web application utilizes various libraries and frameworks, including Bootstrap, jsPDF, Cropper.js, and jQuery. These libraries and frameworks are instrumental in the development of the application, providing essential functionalities and tools.

2. The website has been built base on the abcd1234-tracker template (https://github.com/hamsall/abcd1234-tracker). 

3. Images have been downloaded from different sources (refer to reference).

### AI usage Acknowledgement 
AI has been utilized to assist in establishing naming conventions for item IDs within the Pizzalytics web application.


## Reference 
1. Ganeshram, C. R. (2021, January 30). Pizza Dough - Chef’s mandala. Chef’s Mandala. https://chefsmandala.com/recipe/pizza-dough/
2. How to make homemade pizza dough. (n.d.). https://www.breville.com/us/en/blog/cooking/how-to-make-homemade-pizza-dough.html
3. Redirect notice. (n.d.). https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fphoto%2F38779143-ai-generated-making-vegan-pizza-pizza-with-tomato-cheese-and-basil-dark-background-generated-by-artificial-intelligence&psig=AOvVaw3BEKBH3Xau_fFbVqnUxnfi&ust=1717736591935000&source=images&cd=vfe&opi=89978449&ved=0CBcQjhxqFwoTCOiEu8-ZxoYDFQAAAAAdAAAAABAE

