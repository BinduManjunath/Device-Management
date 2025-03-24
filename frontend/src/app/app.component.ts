import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceListComponent } from './Pages/device-list/device-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { DeviceDetailsComponent } from './Pages/device-details/device-details.component';
import { DeviceService } from './Services/device.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Device } from './Shared/models/device';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DeviceListComponent, DeviceDetailsComponent, HttpClientModule, MatSidenavModule, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Device Dashboard';
  selectedDevice?: any;
  isLoading: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private deviceService: DeviceService,
    private snackBar: MatSnackBar
  ) { }

  @ViewChild('drawer', { static: true }) drawer?: MatDrawer;

  openDeviceDrawer(device: Device): void {
    this.selectedDevice = device;
    this.deviceService.getDeviceById(device?.id).subscribe((data) => {
      this.selectedDevice = data;
      if (this.drawer) {
        this.drawer.open();
        this.cdr.detectChanges();
      }
    });
  }

  onDrawerClosed(): void {
    // Optionally clear the device when the drawer is closed.
    this.selectedDevice = null;
    if (this.drawer) {
      this.drawer.close();
    }
  }

  /**
* Calls the update-APN API for a given device id.
* @param deviceId The ID of the device to update APN.
*/
  updateAPN(deviceId: number): void {
    this.isLoading = true; // show loader
    // POST request with an empty object as the request body (customize as needed)
    this.deviceService.updateAPN(deviceId).subscribe({
      next: () => {
        this.isLoading = false;  // Hide loader
        // Display a success notification
        this.snackBar.open('APN updated successfully!', 'Close', {
          duration: 3000,
        });
      },
      error: (error) => {
        this.isLoading = false;  // Hide loader
        // Log the error (optional) and display a failure notification
        console.error('APN update failed:', error);
        this.snackBar.open('Failed to update APN.', 'Close', {
          duration: 3000,
        });
      }
    });
  }

}
