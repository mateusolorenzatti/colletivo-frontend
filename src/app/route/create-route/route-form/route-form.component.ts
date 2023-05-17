import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Agency } from 'src/app/core/entities/agency/agency';
import { AgencyService } from 'src/app/core/entities/agency/agency.service';
import { RouteCreate } from 'src/app/core/entities/route/route-create';

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
      serviceId: '',
      selectAgency: ''
    });
  }

  ngOnInit() {
    this.agencyService.findAll().subscribe(list => {
      this.agency = list
    });
  }

  submitRouteData(): RouteCreate{
    const route = {
      agency: this.form.get('selectAgency')?.value,
      short_name: this.form.get('tituloCurto')?.value,
      long_name: this.form.get('titulo')?.value,
      desc: this.form.get('descricao')?.value
    } satisfies RouteCreate
  
    return route
  }

  getServiceId(): string {
    return this.form.get('serviceId')?.value
  }

}
