let selectedCategory = '';

function selectCategory(category) {
    selectedCategory = category;
    document.getElementById('image-selector').style.display = 'flex';
    loadImages(category);
}

function loadImages(category) {
    const imageSelector = document.getElementById('image-selector');
    imageSelector.innerHTML = `
        <h3>Select an image for ${category}</h3>
        <input type="file" accept="image/*" onchange="uploadImage(event)">
        <div class="images">
            <!-- Images will be loaded here dynamically -->
        </div>
    `;

    // Load predefined images (this is just a placeholder, you should replace it with actual images)
    const imagesDiv = imageSelector.querySelector('.images');
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // replace with actual image paths
    images.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.classList.add('thumbnail');
        img.onclick = () => selectImage(image);
        imagesDiv.appendChild(img);
    });
}

function uploadImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        cropImage(e.target.result);
    };
    reader.readAsDataURL(file);
}

function cropImage(imageSrc) {
    // Display the image cropping interface (you can use a library like Cropper.js)
    const imageSelector = document.getElementById('image-selector');
    imageSelector.innerHTML = `
        <img id="image-to-crop" src="${imageSrc}" alt="Image to crop">
        <button onclick="confirmCrop()">Crop</button>
    `;
    const image = document.getElementById('image-to-crop');
    const cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
    });

    window.confirmCrop = () => {
        const canvas = cropper.getCroppedCanvas();
        const croppedImage = canvas.toDataURL('image/png');
        document.getElementById(selectedCategory).style.backgroundImage = `url(${croppedImage})`;
        document.getElementById('image-selector').style.display = 'none';
        cropper.destroy();
    };
}

function selectImage(imageSrc) {
    document.getElementById(selectedCategory).style.backgroundImage = `url(${imageSrc})`;
    document.getElementById('image-selector').style.display = 'none';
}
