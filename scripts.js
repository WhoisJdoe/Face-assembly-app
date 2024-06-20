let selectedCategory = '';

function selectCategory(category) {
    selectedCategory = category;
    document.getElementById('category-name').innerText = category.replace('-', ' ');
    document.getElementById('selfie-category-name').innerText = category.replace('-', ' ');
    document.getElementById('image-selector').style.display = 'flex';
    loadImages(category);
}

function loadImages(category) {
    const imageContainer = document.getElementById('image-options');
    imageContainer.innerHTML = '';
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Replace with actual image file names

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = `./${category}/${image}`;
        imgElement.classList.add('thumbnail');
        imgElement.onclick = () => selectImage(category, imgElement.src);
        imageContainer.appendChild(imgElement);
    });
}

function selectImage(category, src) {
    document.getElementById(category).style.backgroundImage = `url(${src})`;
    document.getElementById('image-selector').style.display = 'none';
}

function takeSelfie() {
    document.getElementById('selfie-input').click();
}

function handleSelfieInput(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('selfie-image').src = e.target.result;
        document.getElementById('cropper-container').style.display = 'block';
        document.getElementById('image-selector').style.display = 'none';
        initializeCropper();
    }
    reader.readAsDataURL(file);
}

function initializeCropper() {
    const image = document.getElementById('selfie-image');
    const cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 0.5,
        responsive: true,
        background: false,
        zoomable: false,
        crop(event) {
            // Logic to handle the crop
        },
    });
}

function saveSelfie() {
    const canvas = cropper.getCroppedCanvas();
    const dataURL = canvas.toDataURL('image/png');
    document.getElementById(selectedCategory).style.backgroundImage = `url(${dataURL})`;
    document.getElementById('cropper-container').style.display = 'none';
}
