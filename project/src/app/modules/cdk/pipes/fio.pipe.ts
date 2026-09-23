import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'appFio'})
export class AppFioPipe implements PipeTransform {
  transform(value: any, ...args: any){
    if(value){
      return value?.surname+' '+value?.name?.charAt(0)+'. '+value?.lastname?.charAt(0);
    }
    return '';
  }
}
