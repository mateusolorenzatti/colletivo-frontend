import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'co-menu-item',
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent implements OnInit {

  @Input('nomeItem') nomeItem?: string | undefined;
  @Input('icon') icon?: string | undefined;

  @Output() onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickButton() {
    this.onClick.emit();
  }
}
