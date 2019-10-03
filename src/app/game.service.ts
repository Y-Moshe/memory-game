import { Card } from './models/card.model';

export class GameService {
  private cards: Card[] = [
      // id & imagePath are the required!
      new Card(1, '../assets/images/angular.png'),
      new Card(2, '../assets/images/asp.net.png'),
      new Card(3, '../assets/images/bootstrap.png'),
      new Card(4, '../assets/images/c-sharp.png'),
      new Card(5, '../assets/images/C.png'),
      new Card(6, '../assets/images/c++.png'),
      new Card(7, '../assets/images/css.png'),
      new Card(8, '../assets/images/html.png'),
      new Card(9, '../assets/images/java.png'),
      new Card(10, '../assets/images/javascript.png'),
      new Card(11, '../assets/images/jquery.png'),
      new Card(12, '../assets/images/nodejs.png'),
      new Card(13, '../assets/images/php.png'),
      new Card(14, '../assets/images/python.png'),
      new Card(15, '../assets/images/react.png'),
      new Card(16, '../assets/images/sql.png'),
      new Card(17, '../assets/images/visual-basic.png'),
      new Card(18, '../assets/images/vue.png')
  ];

  constructor() { }

  /**
   * Get a new instance of Cards depends on the board size.
   * @param boardSize 4 for 4x4 or 6 for 6x6.
   */
  getCards(boardSize: number): Card[][] {
      let tempArray: Card[] = [];
      let arrayToReturn: Card[][] = [];
      let jsonArray: string;

      if (boardSize === 4) {
          jsonArray = JSON.stringify(this.cards.slice(0, 8));
          // will contain 16 cards with new referance/instance.
          tempArray = (JSON.parse(jsonArray) as Card[]).concat(JSON.parse(jsonArray));
          arrayToReturn = [
            tempArray.slice(0, 4),
            tempArray.slice(4, 8),
            tempArray.slice(8, 12),
            tempArray.slice(12, 16)
          ];
          return arrayToReturn;
      }
      // same as boardSize === 4 just do this for all cards
      jsonArray = JSON.stringify(this.cards);
      tempArray = (JSON.parse(jsonArray) as Card[]).concat(JSON.parse(jsonArray));
      arrayToReturn = [
        tempArray.slice(0, 6),
        tempArray.slice(6, 12),
        tempArray.slice(12, 18),
        tempArray.slice(18, 24),
        tempArray.slice(24, 30),
        tempArray.slice(30, 36)
      ];
      return arrayToReturn;
  }

  /**
   * Shuffle Cards depends on the board size
   * @param cards Cards to Suffle.
   * @param boardSize 4 for 4x4 or 6 for 6x6.
   */
  shuffleCards(cards: Card[][], boardSize: number): void {
    for (let i = 0; i < 50; i++) { // run 50 times to suffle.
      const rowToSave = this.generateRandom(boardSize);
      const indexToSave = this.generateRandom(boardSize);
      const cardToSave: Card = cards[rowToSave][indexToSave];

      const row = this.generateRandom(boardSize);
      const index = this.generateRandom(boardSize);
      const secCard: Card = cards[row][index];

      cards[rowToSave][indexToSave] = secCard;
      cards[row][index] = cardToSave;
    }
  }

  private generateRandom(num: number): number {
    return Math.floor(Math.random() * +num); // will generate a random number which depends on type of board.
    // example: if the boardType was 4 then it will generate a random number between 0-4 (4 not included!).
  }
}
