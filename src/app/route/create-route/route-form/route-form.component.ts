import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Agency } from 'src/app/core/entities/agency/agency';
import { AgencyService } from 'src/app/core/entities/agency/agency.service';
import { Route } from 'src/app/core/entities/route/route';

@Component({
  selector: 'co-route-form',
  templateUrl: './route-form.component.html'
})
export class RouteFormComponent {
  form: FormGroup
  agency!: Agency[]

  constructor(
    private agencyService: AgencyService,
    private formBuilder: FormBuilder
  ){
    this.form = this.formBuilder.group({
      tituloCurto: '',
      titulo: '',
      descricao: '',
      selectAgency: ''
    });
  }

  ngOnInit() {
    this.agencyService.findAll().subscribe(list => {
      this.agency = list
    });
  }

  submitRouteData(): Route{
    const route = {
      agency: this.form.get('selectAgency')?.value,
      short_name: this.form.get('tituloCurto')?.value,
      long_name: this.form.get('titulo')?.value,
      desc: this.form.get('descricao')?.value
    } satisfies Route
  
    return route
  }
}
