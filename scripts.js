let selectedCategory = '';

function selectCategory(category) {
    selectedCategory = category;
    document.getElementById('image-selector').style.display = 'flex';
    loadImages(category);
    document.querySelector('.controls').style.display = 'none';
    updatePlaceholder(category);
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
        'left-eye': ['left-eye/image1.jpg', 'left-eye/image2.jpg', 'left-eye/image3.jpg'], // replace with actual image paths
        'right-eye': ['right-eye/image1.jpg', 'right-eye/image2.jpg', 'right-eye/image3.jpg'],
        'mouth': ['mouth/image1.jpg', 'mouth/image2.jpg', 'mouth/image3.jpg']
    };

    images[category].forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.classList.add('thumbnail');
        img.onclick = () => selectImage(image);
        imagesDiv.appendChild(img);
    });
}

function updatePlaceholder(category) {
    const placeholders = document.querySelectorAll('.face-part');
    placeholders.forEach(placeholder => placeholder.style.display = 'none');
    document.getElementById(category).style.display = 'block';
}

function showSelfieMode() {
    const imageSelector = document.getElementById('image-selector');
    imageSelector.innerHTML = `
        <video id="video" width="640" height="480" autoplay></video>
        <button id="snap">Snap Photo</button>
        <canvas id="canvas" width="640" height="480" style="display:none;"></canvas>
        <button onclick="saveSelfie()">Save Selfie</button>
    `;

    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const snap = document.getElementById('snap');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        });

    snap.addEventListener('click', () => {
        context.drawImage(video, 0, 0, 640, 480);
        canvas.style.display = 'block';
        const cropper = new Cropper(canvas, {
            aspectRatio: 1,
            viewMode: 1,
            autoCropArea: 1,
            crop(event) {
                // Log the cropped region
            }
        });
    });
}

function saveSelfie() {
    const canvas = document.getElementById('canvas');
    const cropper = Cropper.getInstance(canvas);
    const croppedCanvas = cropper.getCroppedCanvas();
    const dataURL = croppedCanvas.toDataURL('image/png');
    selectImage(dataURL);
}

function selectImage(imageSrc) {
    document.getElementById(selectedCategory).style.backgroundImage = `url(${imageSrc})`;
    document.getElementById('image-selector').style.display = 'none';
    document.querySelector('.controls').style.display = 'flex';
}
