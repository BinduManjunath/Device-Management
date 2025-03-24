import { Component, EventEmitter, Output } from '@angular/core';
import { DeviceService } from '../../Services/device.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-device-list',
  standalone: true,
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
  imports: [CommonModule, HttpClientModule],
})
export class DeviceListComponent {
  @Output() deviceClick = new EventEmitter<any>(); // Event to communicate with the parent
  devices: any[] = [];

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
    });
  }

  onDeviceClick(device: any): void {
    this.deviceClick.emit(device); // Emit the clicked device to the parent
  }
}
