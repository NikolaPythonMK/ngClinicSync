import { Injectable, computed, signal } from "@angular/core";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
    providedIn: 'root'
})
export class BreakpointService {

    public isMobile = signal(false);
    public isTablet = signal(false);
    public isMobileOrTablet = computed(() => this.isMobile() || this.isTablet())


    constructor(private observer: BreakpointObserver) {
       this.handleMobileBreakpoint();
       this.handleTabletBreakpoint();
    }

    handleMobileBreakpoint(): void {
        this.observer.observe(Breakpoints.HandsetPortrait).subscribe((screenSize) => {
            this.isMobile.set(screenSize.matches);
            console.log('MOBILE: ', screenSize);
        })
    }

    handleTabletBreakpoint(): void {
        this.observer.observe(Breakpoints.Tablet).subscribe((screenSize) => {
            this.isTablet.set(screenSize.matches);
            console.log('TABLET: ', screenSize);
        })
    }
}