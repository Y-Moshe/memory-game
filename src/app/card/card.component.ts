import { Component, Input, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Card } from '../models/card.model';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('state', [
      state('hidden', style({ transform: 'rotateY(180deg)' })),
      state('shown', style({ transform: 'none' })),

      transition('hidden => shown', animate(250)),
      transition('shown => hidden', animate(150)),
      transition('* => matches', [
        animate('250ms ease-in', style({ transform: 'scale(1.3)' })),
        animate(150, style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class CardComponent implements OnChanges {
  @ViewChild('element') private element: ElementRef<HTMLDivElement>;
  @Input() card: Card;

  constructor() { }

  ngOnChanges(): void {
    this.card.element = this.element;
  }
}
