let selectedCategory = '';

function selectCategory(category) {
    selectedCategory = category;
    document.getElementById('image-selector').style.display = 'flex';
    loadImages(category);
}

function loadImages(category) {
    const imageSelector = document.getElementById('image-selector');
    imageSelector.innerHTML = `
        <h3>Select an image for ${category.replace('-', ' ')}</h3>
        <div class="images">
            <!-- Images will be loaded here dynamically -->
        </div>
    `;

    const imagesDiv = imageSelector.querySelector('.images');
    const images = {
        'left-eye': ['image1.jpg', 'image2.jpg', 'image3.jpg'], // replace with actual image paths
        'right-eye': ['image4.jpg', 'image5.jpg', 'image6.jpg'],
        'mouth': ['image7.jpg', 'image8.jpg', 'image9.jpg']
    };

    images[category].forEach(image => {
        const img = document.createElement('img');
        img.src = image; // Ensure these paths are correct based on your upload
        img.classList.add('thumbnail');
        img.onclick = () => selectImage(image);
        imagesDiv.appendChild(img);
    });
}

function selectImage(imageSrc) {
    document.getElementById(selectedCategory).style.backgroundImage = `url(${imageSrc})`;
    document.getElementById('image-selector').style.display = 'none';
}
