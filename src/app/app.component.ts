import { Component, ElementRef, ViewChild } from '@angular/core';
import { trigger, transition, query, stagger, style, animate } from '@angular/animations';

import { GameService } from './game.service';
import { Card } from './models/card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('rotateIn', [
      transition(':enter', [
        query('.custom-card', [
          style({ transform: 'scale(0)', opacity: 0 }),
          stagger(80, animate(500, style({ transform: 'scale(1) rotate(360deg)', opacity: 1 })))
        ], { optional: true })
      ])
    ]),
    trigger('gameOver', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('1s ease-in', style({ transform: 'none', opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {
  @ViewChild('board') board: ElementRef<HTMLDivElement>;

  boardSize = '4';
  cards: Card[][] = [];
  isHidden = true;
  year = new Date().getFullYear();
  isGameRunning = false;
  isLoading = false;
  isGameOver = false;
  clickedCard: Card; // this is the first card was clicked (necessary to compare).
  clicks = 0; // count the clicks. (maximum 2)
  delayTimer: any;

  constructor(private gameService: GameService) {}

  start(): void {
    const tempCards = this.gameService.getCards(+this.boardSize);
    this.gameService.shuffleCards(tempCards, +this.boardSize);

    this.isGameOver = false;
    this.isLoading = true;
    this.isGameRunning = true;

    this.delayTimer = setTimeout(() => {
      this.cards = tempCards;
      this.isLoading = false;

      this.board.nativeElement.scrollIntoView({behavior: 'smooth'});
    }, 3000);
  }

  stop(): void {
    this.cards = [];
    this.isGameRunning = this.isLoading = this.isGameRunning = false;
    this.clicks = 0;
    clearTimeout(this.delayTimer);
  }

  click(card: Card): void {
    // if the user click twice and there is no match
    if (this.clicks < 2 && !card.hasMatch) {
      this.clicks++;
      card.isShown = true;

      if (this.clicks === 1) { // in the first click save the card to property 'clickedCard'
        this.clickedCard = card;

      } else if (this.clicks === 2) { // if it's the second click ..

        // if the user clicked on exact the same card (checking by its reference object).
        if (this.clickedCard === card) {
          this.clicks--; // so he will be able to click on another card.
          return;
        }

        if (this.clickedCard.id === card.id) { // on success matches
          setTimeout(() => {
            this.clicks = 0;
            if (this.isHidden) {
              const tempSave = this.clickedCard;
              setTimeout(() => {
                this.hide(tempSave);
                this.hide(card);
              }, 450);
            }
            this.clickedCard.hasMatch = true; // mark the card has a match
            card.hasMatch = true; // mark the second card has a match
            if (this.isGameFinished() === true) { // check every time on success if the game is finished (all cards has matches)
              this.onFinished();
            }
          }, 250);

        } else { // on fail (cards not matches)
          setTimeout(() => {
            this.clicks = 0; // reset the clicks
            this.clickedCard.isShown = false; // reverse the card
            card.isShown = false; // reverse the second card
          }, 500);
        }
      }
    }
  }

  isGameFinished(): boolean {
    if (this.cards[0] === undefined) { // this is to avoid error which happens at the beginning.
      return false;
    }

    for (let i = 0; i < +this.boardSize; i++) { // run on all rows.
      if (this.cards[i].every((card: Card) => { // run every card in that row.
        if (card.hasMatch === false) { // if some card didn't matches yet return false, which mean the game is not over.
          return false;
        }
        return true; // if the card has a match return true and keep checking.
      }) === false) {
        // if the function every return false which means there is some cards which has no match return false and exit from the function.
        return false;
      }
    }

    return true; // if all passed success (no return false happened) return true, which means the game IS Over!
  }

  onFinished(): void {
    this.stop();
    this.isGameOver = true;
  }

  /**
   * Hide the card but keep it on the document flow (visibillity: hidden).
   */
  private hide(card: Card): void {
    card.element.nativeElement.style.visibility = 'hidden';
  }
}
