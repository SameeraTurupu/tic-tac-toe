class Card {
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
  }
}

//to create cards 
let card1 = new Card("card1", "Joker", 10);

//Deck class
class Deck {
  constructor() {
    //array to hold the cards
    this.cards = [];
  }
  //fill the deck with 52 cards
  createDeck() {
    let suits = ['clubs', 'diamonds', 'hearts', 'spades']
    let ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
    //we would need this value to compare the strength of the cards
    let values = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    for(let i = 0; i < suits.length; i++){
      for(let j = 0; j < ranks.length; j++){
        this.cards.push(new Card(suits[i], ranks[j], values[j]));
      }
    }
  }
  suffleDeck() {
    let index1, index2, temp;
    for (let i = 0; i < 1000; i++){
      index1 = Math.floor((Math.random() * this.cards.length));
      index2 = Math.floor((Math.random() * this.cards.length));
      tmp = this.cards[index1];
      this.cards[index1] = this.cards[index2];
      this.cards[index2] = tmp;
    }
  }
}

class Player{
  constructor(name){
    this.playerName = name;
    //hold the dealt cards
    this.playerCards = [];
  }
}

class Board{
  constructor() {
    this.cardsInMiddle = [];
    this.players = [];
  }
  start(playerOne, playerTwo) {
    this.players.push(new Player(playerOne));
    this.players.push(new Player(playerTwo));
    let d = new Deck();
    d.createDeck();
    d.shuffleDeck();
    this.players[0].playerCards = d.cards.slice(0,26);
    this.players[1].playerCards = d.cards.slice(26,52);
  }
}

let gameBoard = new Board();
gameBoard.start('Sameera', 'Aditya');
console.log(gameBoard.players);
