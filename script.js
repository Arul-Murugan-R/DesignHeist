const parentContainer = document.querySelector(".parent-container");
const mainContainer = document.querySelector(".main");
const innerContainer = document.querySelector(".content-card");
const leftArrow = document.querySelector(".left-arrow-btn");
const rightArrow = document.querySelector(".right-arrow-btn");

const AllInnerCards = document.querySelectorAll(".content-card");
let availableRight = 0;
let availableLeft = 0;
let widValues = [];
let isLast = 0;
leftArrow.style.display = "none";

const setAvailableRight = () => {
    const innerWidth = parentContainer.scrollWidth / AllInnerCards.length;
    const noOfCards = Math.floor( parentContainer.offsetWidth  / innerWidth );
    availableRight = AllInnerCards.length - noOfCards;
    parentContainer.style.right = 0;
    availableLeft = 0;
    leftArrow.style.display = "none";
    rightArrow.style.display = "inline-block";
};

const moveRight = () => {
	let currentRightValue = parentContainer.style.right.slice(0, -2);
	const parentWidth = parentContainer.offsetWidth;
    const innerWidth = parentContainer.scrollWidth / AllInnerCards.length;
    const mainWidth = mainContainer.offsetWidth;
    const widthDifference = mainWidth - parentWidth;
    const noOfCards = Math.floor(parentWidth / innerWidth);
    console.log(noOfCards,availableRight);
    if (availableRight > 0) {
        leftArrow.style.display = "inline-block";
        let setRight = 0
        if (availableLeft == 0 && noOfCards >= availableRight) {
            setRight = (availableRight * innerWidth) + 20 - (mainWidth - (noOfCards * innerWidth) - 20);
            availableLeft += availableRight;
			availableRight = 0;
			rightArrow.style.display = "none";
        }
        else if (availableLeft == 0) {
            setRight = noOfCards * innerWidth + 20 - ((mainWidth - noOfCards * innerWidth) / 2);
            availableLeft += noOfCards;
            availableRight -= noOfCards;
        }
        else if (noOfCards >= availableRight) {
            setRight = (availableRight * innerWidth) + ((mainWidth - (noOfCards * innerWidth)) / 2) - mainWidth + (noOfCards * innerWidth) + 20;
            console.log(setRight);
            availableLeft += availableRight;
            availableRight = 0
            rightArrow.style.display = "none";
        }
        else {
            console.log("2");
            setRight = noOfCards * innerWidth;
            availableLeft += noOfCards;
            availableRight -= noOfCards;
        }
        setRight += +currentRightValue;
        parentContainer.style.right = `${setRight}px`
    }
};

const moveLeft = () => {
	let currentRightValue = parentContainer.style.right.slice(0, -2);
	const parentWidth = parentContainer.offsetWidth;
    const innerWidth = Math.round(parentContainer.scrollWidth / AllInnerCards.length);
    const mainWidth = mainContainer.offsetWidth;
    const widthDifference = mainWidth - parentWidth;
    const noOfCards = Math.floor(parentWidth / (innerWidth));
    rightArrow.style.display = "inline-block";
    if (availableLeft > 0) {
        let setLeft = 0;
        if (availableRight == 0 && noOfCards >= availableLeft) {
            setLeft = +currentRightValue;
			availableRight += availableLeft;
			availableLeft = 0;
			leftArrow.style.display = "none";
        }
        if (availableRight == 0) {
            setLeft = (noOfCards * innerWidth) + 20 - ((mainWidth - noOfCards * innerWidth) / 2);
            availableLeft -= noOfCards;
            availableRight += noOfCards;
        }
        else if (noOfCards >= availableLeft) {
            setLeft = +currentRightValue;
            availableRight += availableLeft;
            availableLeft = 0;
            leftArrow.style.display = "none";
        }
        else {
            setLeft = noOfCards * innerWidth;
            availableLeft -= noOfCards;
			availableRight += noOfCards;
        }
        setLeft = +currentRightValue - setLeft;
        parentContainer.style.right = `${setLeft}px`;
	}
};

window.addEventListener('resize', setAvailableRight);
window.addEventListener('load', setAvailableRight);
