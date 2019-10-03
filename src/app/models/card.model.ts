import { ElementRef } from '@angular/core';

export class Card {
  public element: ElementRef<HTMLDivElement>;

  constructor(
      public id: number,
      public imagePath: string,
      public isShown = false,
      public hasMatch = false) {
  }

  /**
   * Initialize card to html element.
   */
  // public initialize(element: ElementRef<HTMLImageElement>): void {
  //   this.element = element;
  // }

  // public hide(): void {
  //   this.element.nativeElement.hidden = true;
  // }
}
