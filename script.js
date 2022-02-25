const parentContainer = document.querySelector(".parent-container");
const mainContainer = document.querySelector(".main");
const innerContainer = document.querySelector(".content-card");
const leftArrow = document.querySelector(".left-arrow-btn");
const rightArrow = document.querySelector(".right-arrow-btn");

const AllInnerCards = document.querySelectorAll(".content-card");
let availableRight = AllInnerCards.length;
let availableLeft = 0;
let widValues = [];
let isLast = 0;
// leftArrow.style.display = "none";

const setAvailableRight = () => {
    const noOfCards = Math.floor(
        parentContainer.offsetWidth / (innerContainer.offsetWidth)
	);
    availableRight = AllInnerCards.length - noOfCards;
    console.log(availableRight);
    console.log(parentContainer.scrollWidth);
    availableLeft = 0;
    // leftArrow.style.display = "none";
};

const moveRight = () => {
	let currentRightValue = parentContainer.style.right.slice(0, -2);
	const parentWidth = parentContainer.offsetWidth;
    const innerWidth = parentContainer.scrollWidth / AllInnerCards.length;
    const mainWidth = mainContainer.offsetWidth;
	const noOfCards = Math.floor(parentWidth / innerWidth);
	// if (availableRight > 0) {
    //     console.log(noOfCards, availableRight);
	// 	if (availableRight) {
	// 		let setRight = 0;
    //         if (noOfCards >= availableRight) {
    //             isLast = +currentRightValue;
    //             setRight = ((availableRight - 1) * innerWidth) + (innerWidth - (parentWidth - (noOfCards * innerWidth ))) + 10;
    //             // setRight = parentContainer.scrollWidth - (availableRight * 204);
    //             // setRight = (AllInnerCards.length - noOfCards) * innerWidth - 20;
    //             console.log("set", setRight);
    //             parentContainer.style.right = `${+currentRightValue + setRight}px`;
    //             availableLeft += Math.floor(setRight / innerWidth) + 1;
    //             availableRight = 0;
    //             rightArrow.style.display = "none";
    //             widValues.push(setRight);
    //         } else {
    //             setRight = noOfCards * (innerWidth );
    //             console.log(setRight);
    //             availableLeft += Math.floor(setRight / innerWidth);
    //             availableRight -= noOfCards;
    //             parentContainer.style.right = `${+currentRightValue + setRight}px`;
    //             widValues.unshift(setRight);
    //         };
    //         console.log(setRight);
    //         console.log("left: ", availableLeft);
    //         console.log("right: ", availableRight); 
    //         leftArrow.style.display = "inline-block";
	// 	}
	// }
    if (availableRight > 0) {
        let setRight = 0
        if (availableLeft == 0) {
            console.log("1");
            setRight = noOfCards * innerWidth + 20 - ((mainWidth - noOfCards * innerWidth) / 2);
            availableLeft += noOfCards;
            availableRight -= noOfCards
        }
        else if (noOfCards >= availableRight) {
            console.log("2");
            setRight = (availableRight * innerWidth) + ((mainWidth - (noOfCards * innerWidth)) / 2) - mainWidth + (noOfCards * innerWidth) + 20;
            availableLeft += availableRight;
            availableRight = 0
        }
        else {
            console.log("3");
            setRight = noOfCards * innerWidth;
            availableLeft += noOfCards;
            availableRight -= noOfCards;
        }
        setRight += +currentRightValue;
        parentContainer.style.right = `${setRight}px`
        console.log(Math.round(setRight));
        console.log("left: ",availableLeft);
        console.log("right: ",availableRight);
    }
};

const moveLeft = () => {
	let currentRightValue = parentContainer.style.right.slice(0, -2);
	const parentWidth = parentContainer.offsetWidth;
    const innerWidth = Math.round(parentContainer.scrollWidth / AllInnerCards.length);
    const mainWidth = mainContainer.offsetWidth;
	const noOfCards = Math.floor(parentWidth / (innerWidth));
    if (availableLeft > 0) {
        console.log("left-: ", availableLeft);
        let setLeft = 0;
        if (availableRight == 0) {
            setLeft = (noOfCards * innerWidth) + 20 - ((mainWidth - noOfCards * innerWidth) / 2);
            availableLeft -= noOfCards;
            availableRight += noOfCards;
        }
        else if (noOfCards >= availableLeft) {
            setLeft = +currentRightValue;
            availableRight += availableLeft;
            availableLeft = 0;
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
