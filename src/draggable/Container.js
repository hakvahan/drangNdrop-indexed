import React, { Component } from 'react'
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './Card'

const style = {
    width: '33vw',
    height: '48vw',
}

class Container extends Component {
	constructor(props) {
		super(props)

		this.moveCard = this.moveCard.bind(this);
		this.onBoardShow = this.onBoardShow.bind(this);

		this.state = {
			showBoard: false,
			cards: [],
		}
	}

    onBoardShow(){
	    let inputField = document.getElementById('input-field');
	    let button = document.getElementById('button');
	    let boards = this.state.cards;

	    if(inputField.value !== '' && !isNaN(inputField.value) &&  inputField.value > '1'){
	      let multiplied = inputField.value * inputField.value;
	      let arr = [];

		 while(arr.length < multiplied){
		    var randomnumber = Math.floor(Math.random()*multiplied) + 1;
		    if(arr.indexOf(randomnumber) > -1) continue;
		    arr[arr.length] = randomnumber;
		 }
		
	      for (var i = 0; i < arr.length; i++) {
	          boards.push({ id: arr[i] });  
	      }

	      this.setState({
	          showBoard: true,
	          cards: boards
	      });

	      inputField.value = '';
	      button.setAttribute("disabled", true);
	    };
    }


	moveCard(dragIndex, hoverIndex) {
		const { cards } = this.state
		const dragCard = cards[dragIndex]

		this.setState(
			update(this.state, {
				cards: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				},
			}),
		)		
	}

	render() {
		const { cards, showBoard, setWelcome} = this.state;

		 for (var i = 0; i < cards.length; i++) {

			if(cards[i].id !== i + 1){
				continue;
			}
			else {
				cards[i].inPlace = 'done';
			}
		 }
		 
		 let indexed = [];
 		 for (var i = 0; i < cards.length ; i++) {
			if(cards[i].hasOwnProperty('inPlace')){
				indexed.push(cards[i]);
			}
			else {
				continue;
			}
		 }

		 if(cards.length == indexed.length && indexed.length > 0){
		 	
		 	let containerDiv = document.getElementsByClassName('container')[0];
			let el = document.createElement("h3");

			el.innerHTML = "Welcome to the team :)";
			containerDiv.parentNode.insertBefore(el, containerDiv.previousSibling);
		 }

		return (
			<div>
        		<p>
		            <span className="input">
		                <input id='input-field' ref='boardsNumber' type="text" placeholder="Only numbers accepted :)" />
		                <span></span>   
		            </span><br />
		            <button id='button' onClick={this.onBoardShow}>Run the Boards</button> 
        		</p>
        	<div className='container' style={style}>	
				{showBoard && cards.map((card, i) => (
					<Card
						key={card.id}
						index={i}
						id={card.id}
						moveCard={this.moveCard}
					/>
				))
			}
			</div>
			</div>
		)
	}
}

export default DragDropContext(HTML5Backend)(Container);