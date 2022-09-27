(function() {

	var probabilityOfOn = 30, cellState;

	var gameSize = 5;


	var cellArray = [];
	cellArray = document.getElementsByClassName("lightit");
	winCont = document.getElementsByClassName("winner-cont")[0];


	var cellNeighborArray = [];
	for(var i = 0, j = cellArray.length; i < j; i++) {

		if(i === 0) {
			cellNeighborArray[i] = [cellArray[i], cellArray[i + 1], cellArray[i + gameSize]];

		} else if(i === gameSize * gameSize - 1) {
			cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i - gameSize]];

		} else if(i === gameSize * gameSize - gameSize) {
			cellNeighborArray[i] = [cellArray[i], cellArray[i + 1], cellArray[i - gameSize]];

		} else if(i === gameSize - 1) {
			cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i + gameSize]];

		} else if(i % gameSize === 0) {
			cellNeighborArray[i] = [cellArray[i], cellArray[i + 1], cellArray[i - gameSize], cellArray[i + gameSize]];

		} else if(i % gameSize === gameSize - 1) {
			cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i - gameSize], cellArray[i + gameSize]];

		} else if(i < gameSize) {
			cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i + 1], cellArray[i + gameSize]];

		} else if(i >= gameSize * gameSize - gameSize) {
			cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i + 1], cellArray[i - gameSize]];

		} else {
			cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i + 1], cellArray[i - gameSize], cellArray[i + gameSize]];
		};
	}


	start();

	function start() {
		for(var ii = 0, jj = cellArray.length; ii < jj; ii++) {
			cellState = Math.floor(Math.random() * 100);
			if(cellState < probabilityOfOn) {
				cellArray[ii].classList.toggle("light-on");
			}

			cellArray[ii].removeEventListener("click", lightClick);
			cellArray[ii].addEventListener("click", lightClick);
		}
	}	

	function lightClick() {
		this.classList.toggle("light-on");
		for(var iii = 0, jjj = cellNeighborArray.length; iii < jjj; iii++) {
			if(this === cellNeighborArray[iii][0]) {
				for(var iiii = 1; iiii < cellNeighborArray[iii].length; iiii++) {
					cellNeighborArray[iii][iiii].classList.toggle("light-on");
				}
			}
		}

		if(testWinner()) {
			winCont.style.display = "block";
			document.getElementsByClassName('reset-btn')[0].addEventListener("click", function() {
				start();
				winCont.style.display = "none";
			});
		};
	}

	function testWinner() {
		if(document.getElementsByClassName("light-on")[0]) {
			return false;
		};
		return true;
	}
})();