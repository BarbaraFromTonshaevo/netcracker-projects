import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'appName'})
export class AppNamePipe implements PipeTransform {
  transform(value: string, length: number){
    if(value){
      if(value.length < length){
        return value;
      }
      return value?.substr(0, length) + '...';
    }
    return '';
  }
}
