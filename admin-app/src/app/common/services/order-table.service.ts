import { Injectable } from '@angular/core';
import { TableRow } from '../models/table-row';

@Injectable({
  providedIn: 'root'
})

export class OrderTableService {

  getColumns(): string[] {
    return [ 'user', 'createdAt', 'sum', 'status', 'actions' ];
  }

  getRows(): TableRow[] {
    return [
      { key: 'user', title: 'Tilaaja', value: 'user.firstName'  },
      { key: 'createdAt', title: 'Tilauksen pvm', value: 'createdAt' },
      { key: 'sum', title: 'Tila', value: 'status' },
      { key: 'status', title: 'Summa', value: 'sum' }
    ];
  }

  constructor() { }
}
