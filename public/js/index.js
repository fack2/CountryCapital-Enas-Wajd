function request(url, cb) {
	console.log(url);
	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return cb(data);
		})
		.catch((error) => {
			console.log(error);
		});
}

const countryInput = document.getElementById('country');

const countryList = document.getElementById('countrylist');

const button = document.getElementById('m');
//  button.addEventListener('click',function(){ 
// 	var country = countryInput.value;
// 	console.log(country);
// 	console.log("jjjjjjjjjjjjjjjjj");

// 	request(`/capital/${country}`, (data) => {
// 		console.log("vb");

// 			var node = document.createElement('LI');
// 			countryList.style.display = 'block';
// 			var textnode = document.createTextNode(data.capitel);
// 			console.log('data', data);
// 			node.appendChild(textnode);
// 			const br = document.createElement('br'); 
// 			node.appendChild(br);

// 			if (data.capitel!== undefined) {
// 				countryList.appendChild(node);
			
// 		}
// 	});

 // }) ;
countryInput.addEventListener('keyup', function() {
	var country = countryInput.value;
	console.log(country);
	request(`/search/${country}`, (data) => {
		countryList.innerHTML = '';
		countryList.style.display = 'none';
		for (let i = 0; i < 5; i++) { 
			var node = document.createElement('LI');
var codee = data.filteredData[i].code ;  
var capital ; 
request(`/capital/${code}`, (data) => {
			
	if (data.capitel!== undefined) {
		capital = data.capitel;
		
	
}
});
			countryList.style.display = 'block';
			var textnode = document.createTextNode(data.filteredData[i].name + "capitel is :"+ capital);
			console.log('data', data);
			node.appendChild(textnode);
			const br = document.createElement('br'); 
			node.appendChild(br);

			if (data.filteredData[i] !== undefined) {
				countryList.appendChild(node);
			}
		}
	});
});



button.addEventListener('click', function() {
	
	var country = countryInput.value;
		console.log(country);
		console.log("jjjjjjjjjjjjjjjjj");
	
		request(`/capital/${country}`, (data) => {
			
				if (data.capitel!== undefined) {
					
				
			}
		});
});


