import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="error-wrap">
      <h1 class="error-title">404 ERROR</h1>
      <p class="error-text">Page Not Found</p>
    </div>
  `,
  styles: [`
  
  .error-wrap{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .error-title{
    font-size: 40px;
    font-weight: bold;
  }
  `]
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
