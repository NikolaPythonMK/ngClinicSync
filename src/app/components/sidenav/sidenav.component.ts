import { Component, Input, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { BreakpointService } from "../../services/breakpoint.service";
import { animate, state, style, transition, trigger } from "@angular/animations";

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
    styleUrls: ['sidenav.component.scss'],
    animations: [
        trigger('openClose', [
            state('open', style({
                width: '220px',
            })),
            state('closed', style({
                width: '0px',
                overflow: 'hidden'
            })),
            transition('open <=> closed', [
                animate('300ms ease-in-out')
            ])
        ])
    ]
})
export class SidenavComponent implements OnInit{

    constructor(public breakpointService : BreakpointService){}

    @Input() isOpen = true;

    ngOnInit(): void {
        if(this.breakpointService.isMobile()){
            this.isOpen = false;
        }
    }
}