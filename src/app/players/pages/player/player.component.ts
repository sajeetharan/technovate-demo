import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";

import { player } from "../../interfaces/player.interface";
import { playersService } from "../../services/players.service";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class playerComponent implements OnInit {
  player!: player;

  constructor(
    private activatedRoute: ActivatedRoute,
    private playersService: playersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.playersService.getplayerById(id)))
      .subscribe((data: any) => {
        this.player = data.data.player_by_pk;
        console.log(this.player);
      });
  }

  comeBack() {
    this.router.navigate(["players/list"]);
  }
}
