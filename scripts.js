const leftEyeFolder = 'https://github.com/WhoisJdoe/Face-assembly-app/tree/main/left-eye/';
const rightEyeFolder = 'https://github.com/WhoisJdoe/Face-assembly-app/tree/main/right-eye/';
const mouthFolder = 'https://github.com/WhoisJdoe/Face-assembly-app/tree/main/mouth/';

function selectCategory(category) {
    const imageSelector = document.getElementById('image-selector');
    imageSelector.style.display = 'flex';
    imageSelector.innerHTML = '';

    const placeholder = document.getElementById(category);
    placeholder.style.display = 'block';

    const categoryFolder = category === 'left-eye' ? leftEyeFolder : category === 'right-eye' ? rightEyeFolder : mouthFolder;

    // Add images
    const imagesContainer = document.createElement('div');
    imagesContainer.classList.add('images');

    fetch(categoryFolder)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const imageLinks = Array.from(doc.querySelectorAll('a')).filter(link => link.href.endsWith('.jpg') || link.href.endsWith('.png'));

            imageLinks.forEach(link => {
                const img = document.createElement('img');
                img.src = link.href;
                img.classList.add('thumbnail');
                img.onclick = () => {
                    placeholder.style.backgroundImage = `url(${link.href})`;
                    placeholder.style.backgroundSize = 'cover';
                };
                imagesContainer.appendChild(img);
            });

            imageSelector.appendChild(imagesContainer);
        });

    // Add selfie button
    const selfieButton = document.createElement('button');
    selfieButton.innerText = `Include your ${category.replace('-', ' ')} (Selfie)`;
    selfieButton.onclick = () => openCamera(category);
    imageSelector.appendChild(selfieButton);
}

function openCamera(category) {
    const imageSelector = document.getElementById('image-selector');
    imageSelector.innerHTML = '';

    const video = document.createElement('video');
    video.autoplay = true;
    video.width = 300;
    video.height = 400;

    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        video.srcObject = stream;
    });

    const cropperContainer = document.createElement('div');
    cropperContainer.appendChild(video);

    const cropper = new Cropper(video, {
        aspectRatio: category === 'mouth' ? 2 / 1 : 1 / 2,
        viewMode: 1,
        ready() {
            croppable = true;
        },
    });

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save Selfie';
    saveButton.onclick = () => {
        const canvas = cropper.getCroppedCanvas();
        const placeholder = document.getElementById(category);
        placeholder.style.backgroundImage = `url(${canvas.toDataURL()})`;
        placeholder.style.backgroundSize = 'cover';
        stream.getTracks().forEach(track => track.stop());
        imageSelector.style.display = 'none';
    };

    cropperContainer.appendChild(saveButton);
    imageSelector.appendChild(cropperContainer);
}
