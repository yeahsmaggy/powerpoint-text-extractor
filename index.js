const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const pptx2pdf = require('pptx2pdf');
const fs = require('fs');

// const { spawn } = require('child_process');
// const ls = spawn('bash', ['convertppt.sh']);
// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });


fs.readdir('converted/', (err, files) => {
  files.forEach(file => {
    console.log(file);
		document_text_detection(client, file)
  });
})


function document_text_detection(client, file){
		const [name, extension] = file.split('.');

		client
	  .documentTextDetection('converted/' + file)
	  .then(results => {
	    const fullTextAnnotation = results[0].fullTextAnnotation;
	    console.log(`Full text: ${fullTextAnnotation.text}`);

	    write_to_file(name, fullTextAnnotation)

	  })
	  .catch(err => {
	    console.error('ERROR:', err);
	  });

}


function write_to_file(file, fullTextAnnotation){


	 //    fs.open('text_' + file  + ".txt", 'wx', (err, fd) => {
		//   if (err) {
		//     if (err.code === 'EEXIST') {
		//       console.error('myfile already exists');
		//       return;
		//     }

		//     throw err;
		//   }



		// });


		fs.writeFile("textextracted/text_" + file + ".txt",  fullTextAnnotation.text, function(err) {
		    if(err) {
		        return console.log(err);
		    }

		    console.log("The file was saved!");
		}); 


}


// /**
//  * TODO(developer): Uncomment the following line before running the sample.
//  */
// const fileName = 'slide1.jpg';



// // Performs text detection on the local file
// client
//   .textDetection(fileName)
//   .then(results => {
//     const detections = results[0].textAnnotations;
//     // detections.forEach(text => console.log(text));
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });


// client
//   .documentTextDetection(fileName)
//   .then(results => {
//     const fullTextAnnotation = results[0].fullTextAnnotation;
//     console.log(`Full text: ${fullTextAnnotation.text}`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });
