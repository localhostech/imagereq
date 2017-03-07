var pastec = require ('pastecapi') ({
  endpoint: 'http://localhost:4444',
});

const inputFolder = './input/';
const fs = require('fs');

let images = [];

let i = 0;

fs.readdir(inputFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
    let name = file.replace('.jpg', '').split('@')[0]
    let painter = file.replace('.jpg', '').split('@')[1]

    let image = {
    	id: i,
    	name: name,
    	painter: painter
    }

    console.log(image)

    images[i] = image;

    // Add image signature to index
	pastec.addImage ('./input/'+file, i, console.log);

	if (files.length-1 == i) {
		console.log(images);
		fs.writeFile("./database.json", JSON.stringify(images), function(err) {
		    if(err) {
		        return console.log(err);
		    }

		    console.log("The file was saved!");
		});
	}
	i++;
  });
});