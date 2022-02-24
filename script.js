const parentContainer = document.querySelector(".parent-container");
const innerContainer = document.querySelector(".content-card");
const leftArrow = document.querySelector(".left-arrow-btn");
const rightArrow = document.querySelector(".right-arrow-btn");

const AllInnerCards = document.querySelectorAll(".content-card");
let availableRight = AllInnerCards.length;
let availableLeft = 0;
let widValues = [];
leftArrow.style.display = "none";

const setAvailableRight = () => {
    const noOfCards = Math.floor(
        parentContainer.offsetWidth / (innerContainer.offsetWidth + 4)
	);
    availableRight = AllInnerCards.length - noOfCards;
    console.log(availableRight);
};

const moveRight = () => {
	let currentRightValue = parentContainer.style.right.slice(0, -2);
	const parentWidth = parentContainer.offsetWidth;
	const innerWidth = innerContainer.offsetWidth;
	const noOfCards = Math.floor(parentWidth / (innerWidth + 4 ));
	if (availableRight > 0) {
        console.log(noOfCards, availableRight);
		if (availableRight) {
			let setRight = 0;
            if (noOfCards >= availableRight) {
                setRight = ((availableRight - 1) * innerWidth) + (innerWidth + 4 - (parentWidth - (noOfCards * (innerWidth + 4)))) + 10;
                console.log("set",setRight);
                availableLeft += Math.floor((setRight-5) / innerWidth) + 1;
                availableRight = 0;
                rightArrow.style.display = "none";
            } else {
                setRight = noOfCards * (innerWidth + 4);
                console.log(setRight);
                availableLeft += Math.floor(setRight / innerWidth);
                availableRight -= noOfCards;
            };
            console.log(setRight);
            console.log("left: ", availableLeft);
            console.log("right: ", availableRight);
            parentContainer.style.right = `${+currentRightValue + setRight}px`;
            widValues.push(parentContainer.style.right);
            leftArrow.style.display = "inline-block";
		}
	}
};

const moveLeft = () => {
	let currentRightValue = parentContainer.style.right.slice(0, -2);
	const parentWidth = parentContainer.offsetWidth;
    const innerWidth = innerContainer.offsetWidth;
	const noOfCards = Math.floor(parentWidth / (innerWidth + 4));
    if (availableLeft >= 0) {
        console.log("left-: ",availableLeft);
        availableRight += noOfCards;
		if (availableLeft) {
            let setLeft = 0;
            console.log(availableLeft);
			if (noOfCards >= availableLeft) {
                console.log(setLeft);
				availableLeft = 0;
                setAvailableRight();
                parentContainer.style.right = `0px`;
                console.log(availableLeft, setLeft, noOfCards);
                leftArrow.style.display = "none";
			} else {
                setLeft = noOfCards * (innerWidth + 4);
                availableLeft -= noOfCards;
                availableRight = AllInnerCards.length - noOfCards - availableLeft;
                parentContainer.style.right = `${+currentRightValue - setLeft}px`;
            }
            console.log(currentRightValue);
            console.log(parentContainer.style.right);
            console.log("avail: ", availableLeft);
            console.log("right: ", availableRight);
            rightArrow.style.display = "inline-block";
		}
	}
};

window.addEventListener('resize', setAvailableRight);
window.addEventListener('load', setAvailableRight);
