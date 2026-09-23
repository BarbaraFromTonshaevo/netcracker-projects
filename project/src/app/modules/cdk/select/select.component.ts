import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
type selectCondition = 'open'|'close';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {
  @Input() selectList: Array<string> = [];
  @Input() initialValue: string;
  @Output() selectItem = new EventEmitter<string>();
  headerValue: string;
  condition: selectCondition = 'close';

  onHeaderSelect(){
    if(this.condition === 'close'){
      this.condition = 'open';
    }
    else{
      this.condition = 'close';
    }
  }

  onSelect(item: string){
    this.condition = 'close';
    this.headerValue = item;
    this.selectItem.emit(item);
  }

  constructor() { }

  ngOnInit(): void {
    this.headerValue = this.initialValue;
  }

}
