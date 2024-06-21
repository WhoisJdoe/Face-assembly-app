const leftEyes = [
  'images/left-eye1.jpg',
  'images/left-eye2.jpg',
  // ... more left eye images
];

const rightEyes = [
  'images/right-eye1.jpg',
  'images/right-eye2.jpg',
  // ... more right eye images
];

const mouths = [
  'images/mouth1.jpg',
  'images/mouth2.jpg',
  // ... more mouth images
];

function loadImages(partType) {
  const container = document.getElementById(partType);
  container.innerHTML = ''; // Clear existing content
  
  let images;
  if (partType === 'left-eye') images = leftEyes;
  else if (partType === 'right-eye') images = rightEyes;
  else if (partType === 'mouth') images = mouths;
  
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.onclick = () => selectImage(partType, src);
    container.appendChild(img);
  });
}

function selectImage(partType, src) {
  document.getElementById(partType).style.backgroundImage = `url(${src})`;
}
