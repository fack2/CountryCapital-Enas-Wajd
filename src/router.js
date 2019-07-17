const { homeHandler, publicHandler, searchHandler } = require('./handler');
const router = (request, response) => {
	const url = request.url;
	if (url === '/') {
		homeHandler(request, response);
	} else if (url.split('.')[1]) {
		// console.log("hello");
		publicHandler(request, response, url);
	} else if (url.indexOf('/search/') !== -1) {
		searchHandler(request, response, url);
	} 
	else if (url.indexOf('/capital/') !== -1) {
		console.log("her");
		capitalSearch(request, response, url);
	} 
	else {
		response.writeHead(404, {
			'Content-Type': 'text/html'
		});
		response.end('<h1>404 not found</h1>');
	}
};
module.exports = router;