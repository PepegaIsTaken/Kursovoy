import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { ICity } from 'app/shared/model/city.model';
import { CityService } from 'app/entities/city/city.service.ts';
import { IFlight } from 'app/shared/model/flight.model';
import { FlightService } from './flight.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'jhi-flight-chart',
  templateUrl: './flight-chart.component.html',
  styles: []
})
export class FlightChartComponent implements OnInit {
    cities: ICity[];
    flights: IFlight[];
    public barChartOptions: ChartOptions = {
        responsive: true,
        scales: {xAxes: [{}], yAxes: [{}]},
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            }
        }
    };
    public barChartLabels: Label[]= ['Аделаида', 'Минск', 'Лилонгве', 'Брисбен', 'Минск', 'Белфаст', 'Бирмингем'];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [pluginDataLabels];

    public barChartData: ChartDataSets[];

    constructor(protected flightService: FlightService, protected cityService: CityService) {
        this.flights = [];
        this.cities = [];
    }

    ngOnInit() {
         this.loadAll();
         this.fillLabels();
        // this.fillData();
    }

    protected paginateCities(data: ICity[], headers: HttpHeaders) {
        for (let i = 0; i < data.length; i++) {
            this.cities.push(data[i]);
        }
    }

    loadAll() {
        this.cityService
            .query({
            })
            .subscribe(
                (res: HttpResponse<ICity[]>) => this.paginateCities(res.body, res.headers)
            );
    }

    fillLabels() {
        let i: number;
        let names: string[];
        for (i = 0; i < this.cities.length; i++) {
            names.push(this.cities[i].name);
        }
        this.barChartLabels = names;
    }

    fillData() {
        let i: number;
        i = 0;
    }
}
