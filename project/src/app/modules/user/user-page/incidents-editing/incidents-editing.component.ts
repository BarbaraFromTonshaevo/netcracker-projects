import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentState } from 'src/app/modules/incident/store/incident.reducer';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Incident } from '../../../incident/model/incident';
import { incidentListSelector } from 'src/app/modules/incident/store/incident.selector';
import { isExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';

interface IncidentObject{
  id: number,
  name: string
}

@Component({
  selector: 'app-incidents-editing',
  templateUrl: './incidents-editing.component.html',
  styleUrls: ['./incidents-editing.component.less']
})
export class IncidentsEditingComponent implements OnInit {
  allIncidents$: Observable<Incident[]> = this.store$.pipe(select(incidentListSelector));
  @Output() newIncidentsArray = new EventEmitter<Array<IncidentObject>|null>();//передача массив инцидентов
  incidentsForSearch: IncidentObject[] = [];//другие инциденты, по которым можно производить поиск
  @Input() incidents: IncidentObject[]|null;//инциденты пользователя
  currentIncidentsArray: IncidentObject[] = [];//инциденты пользователя с изменениями
  isOpenedIncidentSearch = false;
  isDisabled = false;//блокировка кнопки добавить
  selectedIncident: {id: number, name: string};

  getId(id: number){
    this.selectedIncident = this.incidentsForSearch.find(item => item.id === id)!;
  }

  deleteIncident(id: number){
    let incident = this.currentIncidentsArray.find(item => item.id === id);
    if(incident){
      this.incidentsForSearch.push(incident);
    }
    this.currentIncidentsArray = this.currentIncidentsArray.filter(item => item.id !== id);
    this.newIncidentsArray.emit(this.currentIncidentsArray);
    //обновить список поиска
    this.incidentsForSearch.length === 0? this.isDisabled = true: this.isDisabled = false;

  }

  addIncident(){
    this.currentIncidentsArray.push(
      this.selectedIncident
    );
    this.incidentsForSearch = this.incidentsForSearch.filter(item =>{
      item.id !== this.selectedIncident.id;
    });
    this.isOpenedIncidentSearch = !this.isOpenedIncidentSearch;
    this.incidentsForSearch.length === 0? this.isDisabled = true: this.isDisabled = false;
    console.log(this.currentIncidentsArray);
    this.newIncidentsArray.emit(this.currentIncidentsArray);
  }

  changeIsOpenedIncidentSearch(){
    this.isOpenedIncidentSearch = !this.isOpenedIncidentSearch;
  }

  openRoute(route: string){
    console.log(route);
    this.router.navigate(['/', route]);
  }

  constructor(
    private router: Router,
    private store$: Store<IncidentState>,
  ) { }



  ngOnInit(): void {
    this.allIncidents$.subscribe((allIncidents)=>{
      //  в дальнейшем можно добавить проверку на статус и область
      this.incidentsForSearch = allIncidents.filter(item => item.assignee === null);
    });

    this.incidents?.forEach(item =>{
      this.currentIncidentsArray.push(item);
    });
  }

}
