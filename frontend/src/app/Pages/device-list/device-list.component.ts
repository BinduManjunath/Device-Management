import { Component, EventEmitter, Output } from '@angular/core';
import { DeviceService } from '../../Services/device.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

export interface Device {
  id: number;
  name: string;
  status: string;
  telemetrySource: string;
  lastCommunicationTime: string;
}

@Component({
  selector: 'app-device-list',
  standalone: true,
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
  imports: [CommonModule, HttpClientModule, MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule],
})

export class DeviceListComponent {
  @Output() deviceClick = new EventEmitter<any>(); // Event to communicate with the parent
  devices: Device[] = [];
  displayedColumns: string[] = ['name', 'status', 'telemetrySource', 'lastCommunicationTime'];
  dataSource?: any;
  selectedStatus: string = '';
  selectedDevice: any;

  constructor(private deviceService: DeviceService, ) { }

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
      this.dataSource = new MatTableDataSource<Device>(this.devices);
      this.dataSource.filterPredicate = (data: Device, filter: string) => {
        return filter ? data.status.toLowerCase() === filter : true;
      };
    });
  }

  applyFilter(filterValue: string): void {
    // Normalize the filter text to lowercase.
    this.dataSource.filter = filterValue ? filterValue.toLowerCase() : '';
  }

  onDeviceClick(device: any): void {
    this.selectedDevice = device; // Set the clicked device as selected
    this.deviceClick.emit(device); // Emit the clicked device to the parent
  }

}
