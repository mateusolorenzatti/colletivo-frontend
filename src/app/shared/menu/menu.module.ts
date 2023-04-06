import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu.component";
import { CommonModule } from "@angular/common";
import { MenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
    declarations: [MenuComponent, MenuItemComponent],
    exports: [MenuComponent, MenuItemComponent],
    imports: [CommonModule]
})
export class MenuModule { }