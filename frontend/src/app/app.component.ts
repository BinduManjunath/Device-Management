import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceListComponent } from './Pages/device-list/device-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { DeviceDetailsComponent } from './Pages/device-details/device-details.component';

export interface Device {
  id: string;
  model: string;
  dataSource: string;
  status: string;  // e.g., "Active" or "Inactive"
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DeviceListComponent, DeviceDetailsComponent, HttpClientModule, MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Device Dashboard';
  selectedDevice?: any;
  constructor(private cdr: ChangeDetectorRef) { }

  @ViewChild('drawer', { static: true }) drawer?: MatDrawer;

  openDeviceDrawer(device: Device): void {
    // this.selectedDevice = device;
    this.selectedDevice = { id: '1', name: 'Mobile', status: 'Active', telemetrySource: 'GPS', lastCommunicationTime: '2025-03-24 14:00', model: 'XYZ-1', dataSource: 'API-1' }
    if (this.drawer) {
      this.drawer.open();
      this.cdr.detectChanges();
    }
  }

  onDrawerClosed(): void {
    // Optionally clear the device when the drawer is closed.
    this.selectedDevice = null;
  }

}
