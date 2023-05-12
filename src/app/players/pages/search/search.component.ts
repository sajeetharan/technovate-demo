import { Component, OnInit } from "@angular/core";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { player } from "../../interfaces/player.interface";
import { playersService } from "../../services/players.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styles: [],
})
export class SearchComponent implements OnInit {
  term: string = "";
  players: player[] = [];
  selectedplayer!: player | undefined;
  termChanged = new Subject<string>();

  constructor(private playersService: playersService) {
    this.termChanged.pipe(debounceTime(300)).subscribe((term) => {
      this.search(term);
    });
  }

  changed() {
    this.termChanged.next("test");
  }

  ngOnInit(): void {}

  search(term: string) {
    this.playersService
      .getSuggestions(this.term.trim())
      .subscribe(({ data }) => {
        const players: player[] = data.players.items;
        this.players = players;
      });
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.selectedplayer = undefined;
      return;
    }

    const player: player = event.option.value;
    this.term = player.name;
  }
}
