import { Component, OnInit, output } from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BreakpointService } from "../../services/breakpoint.service";
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'header-app',
    standalone: true,
    imports: [RouterOutlet,
              RouterLink,
              RouterLinkActive,
              MatButtonModule,
              MatIconModule,
              MatToolbarModule,
              MatMenuModule],
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit{
    constructor(public breakpointService : BreakpointService,
                private authService: AuthService,
                private router: Router){}
    

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

    onLogout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}