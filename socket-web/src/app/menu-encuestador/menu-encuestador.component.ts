import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
// import { CrudService } from '../servicios/crud.service';

@Component({
  selector: 'app-menu-encuestador',
  templateUrl: './menu-encuestador.component.html',
  styleUrls: ['./menu-encuestador.component.scss']
})
export class MenuEncuestadorComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    email: string;
    dataUser: any = [];

  constructor(private breakpointObserver: BreakpointObserver) {
     
    // this.email = CrudService.email;
  }

  ngOnInit(): void {
    // this.getPersonEmail()

   }

  // getPersonEmail() {
  //   return this.CrudService.getpersonaEmail(this.email).subscribe(
  //     res => {
  //       this.dataUser = res
  //     },
  //     err => console.error(err)
  //   )
  // }
}
