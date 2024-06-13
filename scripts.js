let selectedCategory = '';

function selectCategory(category) {
    selectedCategory = category;
    document.getElementById('image-selector').style.display = 'flex';
    loadImages(category);
    document.querySelector('.controls').style.display = 'none';
}

function loadImages(category) {
    const imageSelector = document.getElementById('image-selector');
    imageSelector.innerHTML = `
        <h3>Select an image for ${category.replace('-', ' ')}</h3>
        <button onclick="showSelfieMode()">Include your ${category.replace('-', ' ')} (Selfie)</button>
        <div class="images">
            <!-- Images will be loaded here dynamically -->
        </div>
    `;

    const imagesDiv = imageSelector.querySelector('.images');
    const images = {
        'left-eye': ['path/to/image1.jpg', 'path/to/image2.jpg', 'path/to/image3.jpg'], // replace with actual image paths
        'right-eye': ['path/to/image4.jpg', 'path/to/image5.jpg', 'path/to/image6.jpg'],
        'mouth': ['path/to/image7.jpg', 'path/to/image8.jpg', 'path/to/image9.jpg']
    };

    images[category].forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.classList.add('thumbnail');
        img.onclick = () => selectImage(image);
        imagesDiv.appendChild(img);
    });
}

function showSelfieMode() {
    const imageSelector = document.getElementById('image-selector');
    imageSelector.innerHTML = `
        <video id="video" width="640" height="480" autoplay></video>
        <button id="snap">Snap Photo</
