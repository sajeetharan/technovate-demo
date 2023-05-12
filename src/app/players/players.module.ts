import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { playersRoutingModule } from "./players-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";

import { AddComponent } from "./pages/add/add.component";
import { SearchComponent } from "./pages/search/search.component";
import { playerComponent } from "./pages/player/player.component";
import { HomeComponent } from "./pages/home/home.component";
import { ListComponent } from "./pages/list/list.component";
import { playerCardComponent } from "./components/player-card/player-card.component";
import { ImagePipe } from "./pipes/image.pipe";
import { ConfirmComponent } from "./components/confirm/confirm.component";
@NgModule({
  declarations: [
    AddComponent,
    SearchComponent,
    playerComponent,
    HomeComponent,
    ListComponent,
    playerCardComponent,
    ImagePipe,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    playersRoutingModule,
    MaterialModule,
  ],
})
export class playersModule {}
