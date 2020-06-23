import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';

export interface PeriodicElement {
  ulb: string;
  parcels: string;
  buildings: string;
  portion: string;
  agent: string;
  district?: string;
  day?: string;
  agency?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { ulb: 'ulb 1', parcels: 'parcels 1', buildings: 'buildings 1', portion: 'portion 1', agent: 'agent 1', district: 'District 1', day: 'Today', agency: 'Agency 1' },

  { ulb: 'ulb 2', parcels: 'parcels 2', buildings: 'buildings 2', portion: 'portion 2', agent: 'agent 2', district: 'District 1', day: 'Today', agency: 'Agency 1'  },

  // tslint:disable-next-line: max-line-length
  { ulb: 'ulb 3', parcels: 'parcels 3', buildings: 'buildings 3', portion: 'portion 3', agent: 'agent 3', district: 'District 1', day: 'Today', agency: 'Agency 1'  },

  { ulb: 'ulb 4', parcels: 'parcels 4', buildings: 'buildings 4', portion: 'portion 4', agent: 'agent 4', district: 'District 2', day: 'Yesterday', agency: 'Agency 2'  },
  { ulb: 'ulb 5', parcels: 'parcels 5', buildings: 'buildings 5', portion: 'portion 5', agent: 'agent 5', district: 'District 2', day: 'Yesterday', agency: 'Agency 2'  },
  { ulb: 'ulb 6', parcels: 'parcels 6', buildings: 'buildings 6', portion: 'portion 6', agent: 'agent 6', district: 'District 2', day: 'Yesterday', agency: 'Agency 2'  },
  { ulb: 'ulb 7', parcels: 'parcels 7', buildings: 'buildings 7', portion: 'portion 1', agent: 'agent 7', district: 'District 3', day: 'Day Before Yesterday', agency: 'Agency 2'  },
  { ulb: 'ulb 8', parcels: 'parcels 8', buildings: 'buildings 8', portion: 'portion 8', agent: 'agent 8', district: 'District 3', day: 'Day Before Yesterday', agency: 'Agency 2'  }
];

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-ulb-report',
  templateUrl: './ulb-report.component.html',
  styleUrls: ['./ulb-report.component.scss']
})
export class UlbReportComponent implements OnInit {
  displayedColumns: string[] = ['ulb', 'parcels', 'buildings', 'portion', 'agent'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  ulbFilter = new FormControl();
  parcelsFilter = new FormControl();
  buildingsFilter = new FormControl();
  portionFilter = new FormControl();
  agentFilter = new FormControl();


  agenciesFilter = new FormControl('1');
  districtsFilter = new FormControl('1');
  daysFilter = new FormControl('1');

  globalFilter = '';

  filteredValues = {
    ulb: '', parcels: '', buildings: '',
    portion: '', agent: '', district: '', day: '', agency: ''
  };

  agencies = [
    {
      label: 'All Agencies',
      value: '1'
    },
    {
      label: 'Agency 1',
      value: '2'
    },
    {
      label: 'Agency 2',
      value: '3'
    }
  ];
  districts = [
    {
      label: 'All Districts',
      value: '1'
    },
    {
      label: 'District 1',
      value: '2'
    },
    {
      label: 'District 2',
      value: '3'
    }
  ];
  days = [
    {
      label: 'Today',
      value: '1'
    },
    {
      label: 'Yesterday',
      value: '2'
    },
    {
      label: 'Day Before Yesterday',
      value: '3'
    }
  ];
  ngOnInit() {
     this.dataSource.sort = this.sort;
     this.agenciesFilter.valueChanges.subscribe((ulbFilter) => {
       if (ulbFilter === '1') {
        this.filteredValues['agency'] = '';
       } else {
        this.filteredValues['agency'] = this.agencies.find(e => e.value === ulbFilter).label;
       }
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.districtsFilter.valueChanges.subscribe((df) => {
      if (df === '1') {
        this.filteredValues['district'] = '';
      } else {
        this.filteredValues['district'] = this.districts.find(e => e.value === df).label;
      }
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.daysFilter.valueChanges.subscribe((df) => {
      if (df === '1') {
      this.filteredValues['day'] = '';

      } else {
      this.filteredValues['day'] = this.days.find(e => e.value === df).label;
      }
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.ulbFilter.valueChanges.subscribe((ulbFilter) => {
      this.filteredValues['ulb'] = ulbFilter;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.parcelsFilter.valueChanges.subscribe((parcels) => {
      this.filteredValues['parcels'] = parcels;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.buildingsFilter.valueChanges.subscribe((buildings) => {
      this.filteredValues['buildings'] = buildings;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.portionFilter.valueChanges.subscribe((portion) => {
      this.filteredValues['portion'] = portion;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.agentFilter.valueChanges.subscribe((agent) => {
      this.filteredValues['agent'] = agent;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  applyFilter(filter) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }


  customFilterPredicate() {

    const myFilterPredicate = (data: PeriodicElement, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      return data.ulb.toString().trim().indexOf(searchString.ulb) !== -1 &&
        data.parcels.toString().trim().toLowerCase().indexOf(searchString.parcels.toLowerCase()) !== -1 &&
        data.buildings.toString().trim().toLowerCase().indexOf(searchString.buildings.toLowerCase()) !== -1 &&
        data.portion.toString().trim().toLowerCase().indexOf(searchString.portion.toLowerCase()) !== -1 &&
        data.agent.toString().trim().toLowerCase().indexOf(searchString.agent.toLowerCase()) !== -1 &&
        data.district.toString().trim().indexOf(searchString.district) !== -1 &&
        data.agency.toString().trim().indexOf(searchString.agency) !== -1 &&
        data.day.toString().trim().indexOf(searchString.day) !== -1;
    }
    return myFilterPredicate;
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */