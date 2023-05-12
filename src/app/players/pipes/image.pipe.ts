import { Pipe, PipeTransform } from "@angular/core";
import { player } from "../interfaces/player.interface";

@Pipe({
  name: "image",
})
export class ImagePipe implements PipeTransform {
  transform(player: player): string {
    if (player.id == undefined && player.picture_link == " ") {
      return "assets/no-image.png";
    } else if (player.picture_link) {
      return player.picture_link;
    } else {
      return `assets/players/${player.id}.jpg`;
    }
  }
}
