var formElement = document.getElementById('form'),
	fileElement = document.getElementById('file'),
	imageShrinker = function(originalImageData){
		var originalImage = document.createElement('img'),
			generatedImage = document.createElement('img'),
			imageScaleCanvas = document.createElement('canvas'),
			context = imageScaleCanvas.getContext('2d'),
			rawScaledImageData;
		document.body.appendChild(originalImage);
		document.body.appendChild(imageScaleCanvas);
		document.body.appendChild(generatedImage);
		originalImage.src = originalImageData;
		imageScaleCanvas.width = 200;
		imageScaleCanvas.height = 100;
		context.drawImage(originalImage, 0, 0, imageScaleCanvas.width, imageScaleCanvas.height);
		generatedImage.src = imageScaleCanvas.toDataURL();
	},
	changeHandler = function(event){
		console.log(event);
		var reader = new FileReader();
		var userSelectedFile = event.target.files[0];

		reader.onload = function(upload) {
			console.log(upload.target.result);
			imageShrinker(upload.target.result);
		};
		reader.readAsDataURL(userSelectedFile);
	};

if (window.File && window.FileReader && window.FileList && window.Blob) {
	fileElement.addEventListener('change', changeHandler);
} else {
	alert('The File APIs are not fully supported in this browser.');
}