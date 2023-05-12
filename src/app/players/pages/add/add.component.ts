import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { player, Type } from "../../interfaces/player.interface";
import { playersService } from "../../services/players.service";
import { ConfirmComponent } from "../../components/confirm/confirm.component";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styles: [
    `
      mat-icon {
        margin-right: 5px;
        margin-bottom: 5px;
      }
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AddComponent implements OnInit {
  types = [
    {
      id: "Medieval",
      desc: "Medieval",
    },
    {
      id: "Civil",
      desc: "Civil",
    },
  ];

  player: player = {
    name: " ",
    type: Type.Contract,
    country: " ",
    city: "",
    picture_link: " ",
  };

  constructor(
    private playersService: playersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes("edit")) {
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.playersService.getplayerById(id)))
      .subscribe((data: any) => {
        this.player = data.data.player_by_pk;
        console.log(this.player);
      });
  }

  save() {
    if (this.player.name.trim().length === 0) {
      return;
    }

    if (this.player.id) {
      this.playersService.updateplayer(this.player).subscribe((resp) => {
        this.player = resp;
        this.showSnackbar("The player was updated");
      });
    } else {
      this.playersService.addplayer(this.player).subscribe(({ data }: any) => {
        this.router.navigate(["/players/list"]);
        this.showSnackbar("The player was created");
      });
    }
  }

  delete() {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: "250px",
      data: this.player,
    });

    dialog.afterClosed().subscribe((resp) => {
      if (resp) {
        if (this.player.id) {
          this.playersService.deleteplayer(this.player).subscribe((resp) => {
            this.router.navigate(["/players/list"]);
            this.showSnackbar("The player was deleted");
          });
        }
      }
    });
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 2500,
    });
  }
}
