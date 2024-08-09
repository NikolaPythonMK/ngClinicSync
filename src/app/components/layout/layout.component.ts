import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { SidenavComponent } from "../sidenav/sidenav.component";
import { Router, RouterOutlet } from "@angular/router";

@Component({
    selector: 'layout-app',
    standalone: true,
    imports: [HeaderComponent,
              SidenavComponent,
              RouterOutlet],
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.scss']
})
export class LayoutComponent {

    toggleMenu = true;

    onMenuToggle(isToggled: boolean): void {
        this.toggleMenu = isToggled;
    }
}