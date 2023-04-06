import { Component } from "@angular/core";

@Component({
    selector: 'co-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['menu.component.scss']
})
export class MenuComponent { 

    isShown = false;

    toggle() {
        this.isShown = !this.isShown;
    }
}