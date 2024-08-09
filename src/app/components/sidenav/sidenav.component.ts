import { Component, Input, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { BreakpointService } from "../../services/breakpoint.service";

@Component({
    selector: 'main-sidenav',
    standalone: true,
    imports: [RouterOutlet,
              RouterLink,
              RouterLinkActive,
              MatButtonModule,
              MatIconModule,
              MatSidenavModule,
              MatListModule],
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.css']
})
export class SidenavComponent implements OnInit{

    constructor(public breakpointService : BreakpointService){}

    @Input() toggleMenu = true;

    ngOnInit(): void {
        if(this.breakpointService.isMobile()){
            this.toggleMenu = false;
        }
    }
}