import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
type selectCondition = 'open'|'close';
type selectDesign = 'default' | 'white';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {
  @Input() selectList: Array<string> = [];
  @Input() initialValue: string;
  @Input() design: selectDesign = 'default';
  @Input() cutLength: number;
  @Output() selectItem = new EventEmitter<string>();
  headerValue: string;
  condition: selectCondition = 'close';
  innerDesign: selectDesign = 'default';

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
    if((this.cutLength)&&(item.length > this.cutLength)){
      this.headerValue = `${item.substring(0,this.cutLength)}...`;
    }
    else{
      this.headerValue = item;
    }
    this.selectItem.emit(item);
  }

  constructor() { }

  ngOnInit(): void {
    if((this.cutLength)&&(this.initialValue.length > this.cutLength)){
      this.headerValue = `${this.initialValue.substring(0,this.cutLength)}...`;
    }
    else{
      this.headerValue = this.initialValue;
    }
  }

  ngOnChanges(changes: SimpleChanges): void{
    const {condition, design} = changes;
    if(design && design.currentValue){
      this.innerDesign = design.currentValue;
    }
  }

}
