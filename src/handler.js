const fs = require('fs');
const path = require('path');
function request(url, cb) {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return cb(data);
    });
}

const homeHandler = (request, response) => {
	const filePath = path.join(__dirname, '..', 'public', 'index.html');
	console.log('filepath', filePath);

	fs.readFile(filePath, (error, file) => {
		if (error) {
			console.log('notdone');
			response.writeHead(500, {
				'Content-Type': 'text/html'
			});
			response.end('<h1>server error</h1>');
		} else {
			console.log('done');
			response.writeHead(200, {
				'Content-Type': 'text/html'
			});
			response.end(file);
		}
	});
};

const publicHandler = (request, response, url) => {
	const extension = url.split('.')[1];
	const extensionType = {
		html: 'text/html',
		css: 'text/css',
		js: 'application/javascript',
		jpg: 'img/jpg',
		txt: 'text/plain',
		ico: 'image/x-icon'
	};

	const filePath = path.join(__dirname, '..', 'public', url);
	fs.readFile(filePath, (error, file) => {
		if (error) {
			response.writeHead(500, {
				'Content-Type': 'text/html'
			});
			response.end('<h1>server error</h1>');
		} else {
			response.writeHead(200, {
				'Content-Type': extensionType[extension]
			});
			response.end(file);
		}
	});
};
const capitalSearch =(request, response)=>{
	let inputValue = request.url.split('/')[2];
	console.log("vvvv");

	console.console(inputValue);
	// `http://api.worldbank.org/v2/country/[${inputValue}]?format=json`;
	request(`http://api.worldbank.org/v2/country/${inputValue}]?format=json`, (error, response, body) => {
		if (error) {
		  res.writeHead(404, {
			"Content-Type": "text/html"
		  });
		  res.end("<h1>Try again</h1>");
		}
	
		res.writeHead(200, {
		  "Content-Type": "application/json"
		});
		const data= json.parse(body); 
		const capitel = data.map(element => 
			{
				return element.capitalCity ; 
			})

		response.end(json.stringify(capitel));
		
	
	}); 
}
const searchHandler = (request, response ) => {
	let inputValue = request.url.split('/')[2];
	console.log('input text', inputValue);
	const filePath = path.join(__dirname, 'country.json');
	console.log('search file path', filePath);
	fs.readFile(filePath, 'utf8', (error, file) => {
		if (error) {
			response.writeHead(500, {
				'Content-Type': 'text/html'
			});
			console.log(error);
			response.end('<h1>server error</h1>');
		} else if (inputValue.length > 0) {
			response.writeHead(200, { 'Content-Type': 'application/json' });
			const allList = JSON.parse(file);
			const capitalizedFirstLetter = inputValue[0].toUpperCase();
			console.log('capital', capitalizedFirstLetter);
			inputValue = capitalizedFirstLetter + inputValue.slice(1);
			console.log('search', inputValue);
			const filteredData = allList.filter((element) => {
				return element.name.indexOf(inputValue) === 0;
			});

			const country = JSON.stringify({ filteredData });
			console.log('filtered data search', filteredData);
			//console.log('file text', text);
			response.end(country);
		} else {
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify(''));
		}
	});
};


module.exports = { homeHandler, publicHandler, searchHandler  ,capitalSearch};
