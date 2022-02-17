import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'appId'})
export class AppIdPipe implements PipeTransform {
  transform(value: any, ...args: any){
    if(value){
      return "..." + value?.substr(value?.length - 10);
    }
    return '';
  }
}
