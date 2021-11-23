import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

type listSize = 'defult' | 'small';

interface SearchObject{
  id: number,
  name: string,
}

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.less']
})
export class SearchInputComponent implements OnInit {
  @Output() select = new EventEmitter<number>();//возвращает id выбранного элемента

  @Input() initialValue: SearchObject;//начальное значение
  @Input() values: SearchObject[];//переданный список, по которому необходимо провести поиск

  searchList: SearchObject[];// выпадающий список, который соответствует значению в инпуте
  searchControl: FormControl;
  isActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
    //присвоение начального значения
    let startAssigneeValue = this.initialValue ? this.initialValue.name : '';
    this.searchControl = new FormControl(startAssigneeValue);

    //реагирование на изменения в инпуте
    //можно сделать поиск по id
    this.searchControl.valueChanges.subscribe((value) => {
      this.isActive = true;
      if(value.trim().toLowerCase() !== ''){
        if(isNaN(value.trim())){
        // по названию
        this.searchList = this.values.filter(item =>
          item.name.toLowerCase().includes(value.trim().toLowerCase())
      );
        }
        else{
          // по id
          this.searchList = this.values.filter(item =>
            item.id.toString().includes(value.trim())
          )
        }

      }
      else{
        this.searchList = [];
      }
    });
  }

  selectAssignee(event: Event, item: SearchObject){
    event.preventDefault();
    this.select.emit(item.id);
    this.searchControl.setValue(item.name);
    this.isActive = false;
  }

  @Input() size: listSize = 'defult';
  innerSize: listSize = 'defult';

  ngOnChanges(changes: SimpleChanges): void{
    const {size} = changes;
    if(size && size.currentValue){
      this.innerSize = size.currentValue;
    }
  }
}
