import { HttpHeaders } from '@angular/common/http';

export const apiURI = 'http://localhost:3001/api';
export const baseHttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};