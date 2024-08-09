import { Component, OnInit, output } from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BreakpointService } from "../../services/breakpoint.service";

@Component({
    selector: 'header-app',
    standalone: true,
    imports: [RouterOutlet,
              RouterLink,
              RouterLinkActive,
              MatButtonModule,
              MatIconModule,
              MatToolbarModule],
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit{
    constructor(public breakpointService : BreakpointService) {}

    isMenuToggled = true;
    onMenuToggle = output<boolean>();

    ngOnInit(): void {
        if(this.breakpointService.isMobile()){
            this.isMenuToggled = false;
        }
    }

    toggleMenu(): void {
        this.isMenuToggled = !this.isMenuToggled;
        this.onMenuToggle.emit(this.isMenuToggled);
    }
}