import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorPageComponent } from "./shared/error-page/error-page.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./players/players.module").then((m) => m.playersModule),
  },
  {
    path: "**",
    loadChildren: () =>
      import("./players/players.module").then((m) => m.playersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
