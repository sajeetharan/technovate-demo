import { Component, OnInit } from "@angular/core";
import { playersService } from "../../services/players.service";
import { player } from "../../interfaces/player.interface";
import { ActivatedRoute } from "@angular/router";
import { FADEINOUT } from "../../services/fade-in-fade-out.animation";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  animations: [FADEINOUT],
  styles: [],
})
export class ListComponent implements OnInit {
  players: player[] = [];

  constructor(private playersService: playersService) {}

  ngOnInit(): void {
    this.loadplayers();
  }
  logAnimation(_event: any) {
    console.log(_event);
  }
  loadplayers() {
    this.players = [];
    this.playersService.getplayers().subscribe((data: any) => {
      this.players = data.data.players.items;
      console.log("data loaded");
      console.log(data.data.players.items.length);
    });
  }
}
