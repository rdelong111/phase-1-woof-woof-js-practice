document.addEventListener('DOMContentLoaded', () => {
	const filterbtn = document.getElementById('good-dog-filter');
	getdogs(filterbtn.textContent);

	// displays the dogs based on good or bad
	filterbtn.addEventListener('click', () => {
		if (filterbtn.textContent === 'Filter good dogs: OFF') {
			filterbtn.textContent = 'Filter good dogs: ON';
			document.getElementById('dog-bar').innerHTML = '';
			getdogs(filterbtn.textContent);
		}
		else {
			filterbtn.textContent = 'Filter good dogs: OFF';
			document.getElementById('dog-bar').innerHTML = '';
			getdogs(filterbtn.textContent);
		}
	})
});

// fetches the dogs and displays the names in the bar based on is good/bad
function getdogs(btnstatus) {
	fetch('http://localhost:3000/pups')
	.then((r) => r.json())
	.then((dogs) => {
		for (dog of dogs) {
			if (btnstatus === 'Filter good dogs: OFF') {
				addDog(dog);
			}
			else {
				if (dog.isGoodDog === true) {
					addDog(dog);
				}
			}
		}
	});
}

// adds the dog names, displays dog info when clicks, 
function addDog(x) {
	const dogbar = document.getElementById('dog-bar');
	const dogname = document.createElement('span');
	dogname.textContent = x.name;

	dogbar.appendChild(dogname);

	dogname.addEventListener('click', () => {
		const doginfo = document.getElementById('dog-info');
		doginfo.innerHTML = '';
		const img = document.createElement('img');
		img.setAttribute('src', x.image);
		const imgname = document.createElement('h2');
		imgname.textContent = x.name;
		const btn = document.createElement('button');
		btn.setAttribute('id', x.id);
		if (x.isGoodDog === true) {
			btn.textContent = 'Bad Dog!';
		}
		else {
			btn.textContent = 'Good Dog!';
		}

		doginfo.appendChild(img);
		doginfo.appendChild(imgname);
		doginfo.appendChild(btn);

		btn.addEventListener('click', goodbad);
	});
}

// when the good/bad dog button is clicked
function goodbad() {
	const btn = document.querySelector('#dog-info button');
	const filterbtn = document.getElementById('good-dog-filter');

	let patchOb;

	if (filterbtn.textContent === 'Filter good dogs: OFF') {
		patchOb = patchObject(btn);
		fetch(`http://localhost:3000/pups/${btn.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(patchOb)
		});
	}
	else {
		patchOb = patchObject(btn);
		fetch(`http://localhost:3000/pups/${btn.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(patchOb)
		});
		document.getElementById('dog-bar').innerHTML = '';
		getdogs(filterbtn.textContent);
	}
}

function patchObject(btn) {
	if (btn.textContent === 'Good Dog!') {
		btn.textContent = 'Bad Dog!'
		return {isGoodDog: true};
	}
	else {
		btn.textContent = 'Good Dog!'
		return {isGoodDog: false};
	}
}