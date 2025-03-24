import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = 'http://localhost:3000/devices';

  constructor(private http: HttpClient) {}

  getDevices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDeviceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateAPN(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/actions/update-apn`, {});
  }
}
