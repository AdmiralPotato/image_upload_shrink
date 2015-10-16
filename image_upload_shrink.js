var formElement = document.getElementById('form'),
	fileElement = document.getElementById('file'),
	//src: https://stackoverflow.com/questions/3971841/how-to-resize-images-proportionally-keeping-the-aspect-ratio/14731922#14731922
	calculateAspectRatioFit = function(srcWidth, srcHeight, maxWidth, maxHeight) {
		var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
		return { width: srcWidth*ratio, height: srcHeight*ratio };
	},
	imageShrinker = function(originalImageData){
		var holder = document.createElement('div'),
			closeBox = document.createElement('a'),
			originalImage = document.createElement('img'),
			generatedImage = document.createElement('img'),
			imageScaleCanvas = document.createElement('canvas'),
			context = imageScaleCanvas.getContext('2d');

		//ref: https://html.spec.whatwg.org/multipage/scripting.html#dom-context-2d-imagesmoothingenabled
		context.webkitImageSmoothingEnabled = true;
		context.mozImageSmoothingEnabled = true;
		context.imageSmoothingEnabled = true;
		//ref: https://html.spec.whatwg.org/multipage/scripting.html#dom-context-2d-imagesmoothingquality
		context.webkitImageSmoothingQuality = 'high';
		context.mozImageSmoothingQuality = 'high';
		context.imageSmoothingQuality = 'high';

		holder.className = 'yup';
		document.body.appendChild(holder);
		holder.appendChild(closeBox);
		holder.appendChild(originalImage);
		holder.appendChild(imageScaleCanvas);
		holder.appendChild(generatedImage);
		closeBox.addEventListener('click', function(){
			document.body.removeChild(holder);
		});
		originalImage.onload = function() {
			var proportionalImageSize = calculateAspectRatioFit(
				originalImage.width,
				originalImage.height,
				256,
				256
			);
			imageScaleCanvas.width = proportionalImageSize.width;
			imageScaleCanvas.height = proportionalImageSize.height;
			context.drawImage(originalImage, 0, 0, imageScaleCanvas.width, imageScaleCanvas.height);
			generatedImage.src = imageScaleCanvas.toDataURL();
		};
		originalImage.src = originalImageData;
	},
	changeHandler = function(event){
		var reader = new FileReader();
		var userSelectedFile = event.target.files[0];

		reader.onloadend = function(upload) {
			imageShrinker(upload.target.result);
		};
		reader.readAsDataURL(userSelectedFile);
	};

if (window.File && window.FileReader && window.FileList && window.Blob) {
	fileElement.addEventListener('change', changeHandler);
} else {
	alert('The File APIs are not fully supported in this browser.');
}
