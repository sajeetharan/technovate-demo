import { Component, Input } from "@angular/core";
import { player } from "../../interfaces/player.interface";

@Component({
  selector: "app-player-card",
  templateUrl: "./player-card.component.html",
  styles: [
    `
      mat-card {
        margin-top: 20px;
        min-height: 70vh;
      }

      .mat-card-image {
        max-height: 60vh;
        max-width: 20vw;
      }
      .red-text {
        font-size: 20px;
        color: #fa7aa5 !important;
      }

      .blue-text {
        font-size: 20px;
        color: #09b0ec !important;
      }
    `,
  ],
})
export class playerCardComponent {
  @Input() player!: player;
  highlightStart = 30;
  constructor() {}
}
