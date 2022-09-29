window.onload = function() {
	let functionOn = 30
	let statusBubble;
	let bubbleNeighbour = [];
	let size = 5;
	let bubbleArray = [];
	bubbleArray = document.getElementsByClassName("Lighton");
	winner = document.getElementsByClassName("winner")[0];



	for (let i = 0; i < bubbleArray.length; i++) {
		if (i === 0) {
			bubbleNeighbour[i] = [bubbleArray[i], bubbleArray[i + 1], bubbleArray[i + size]];

		} else if (i === size * size - 1) {
			bubbleNeighbour[i] = [bubbleArray[i], bubbleArray[i - 1], bubbleArray[i - size]];

		} else if (i === size * size - size) {
			bubbleNeighbour[i] = [bubbleArray[i], bubbleArray[i + 1], bubbleArray[i - size]];

		} else if (i === size - 1) {
			bubbleNeighbour[i] = [bubbleArray[i], bubbleArray[i - 1], bubbleArray[i + size]];

		} else if (i % size === 0) {
			bubbleNeighbour[i] = [bubbleArray[i], bubbleArray[i + 1], bubbleArray[i - size], bubbleArray[i + size]];

		} else if (i % size === size - 1) {
			bubbleNeighbour[i] = [bubbleArray[i], bubbleArray[i - 1], bubbleArray[i - size], bubbleArray[i + size]];

		} else if (i < size) {
			bubbleNeighbour[i] = [bubbleArray[i], bubbleArray[i - 1], bubbleArray[i + 1], bubbleArray[i + size]];

		} else if (i >= size * size - size) {
			bubbleNeighbour[i] = [bubbleArray[i], bubbleArray[i - 1], bubbleArray[i + 1], bubbleArray[i - size]];

		} else {
			bubbleNeighbour[i] = [bubbleArray[i], bubbleArray[i - 1], bubbleArray[i + 1], bubbleArray[i - size], bubbleArray[i + size]];
		};
	}

    start();

	function start() {
		for (let j = 0; j < bubbleArray.length; j++) {
			statusBubble = Math.floor(Math.random() * 100);
			if (statusBubble < functionOn) {
				bubbleArray[j].classList.toggle("light-on");
			}

			bubbleArray[j].removeEventListener("click", lightClick);
			bubbleArray[j].addEventListener("click", lightClick);
		}
	}
	

	function lightClick() {
		this.classList.toggle("light-on");
		for (let k = 0; k < bubbleNeighbour.length; k++) {
			if (this === bubbleNeighbour[k][0]) {
				for (let l = 1; l < bubbleNeighbour[k].length; l++) {
					bubbleNeighbour[k][l].classList.toggle("light-on");
				}
			}
		}

	}

	function testWinner() {
		if (document.getElementsByClassName("light-on")[0]) {
			return false;
		};
		return true;
	}
};