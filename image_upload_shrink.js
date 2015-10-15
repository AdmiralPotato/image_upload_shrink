var formElement = document.getElementById('form'),
	fileElement = document.getElementById('file'),
	imageShrinker = function(originalImageData){
		var holder = document.createElement('div'),
			originalImage = document.createElement('img'),
			generatedImage = document.createElement('img'),
			imageScaleCanvas = document.createElement('canvas'),
			context = imageScaleCanvas.getContext('2d'),
			rawScaledImageData;
		holder.className = 'yup';
		document.body.appendChild(holder);
		holder.appendChild(originalImage);
		holder.appendChild(imageScaleCanvas);
		holder.appendChild(generatedImage);
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