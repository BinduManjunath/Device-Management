import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'; // Import the toolbar module

export interface Device {
  id: number;
  model: string;
  dataSource: string;
  status: string;  // e.g., "Active" or "Inactive"
}

@Component({
  selector: 'app-device-details',
  standalone: true,
  imports: [MatToolbarModule, MatSidenavModule, MatDrawer],
  templateUrl: './device-details.component.html',
  styleUrl: './device-details.component.css'
})
export class DeviceDetailsComponent implements OnInit {
  // Receive a device object from a parent component.
  @Input() device?: Device;

  // Optionally, emit an event when the drawer closes.
  @Output() drawerClosed = new EventEmitter<void>();
  // Emit an event to update the APN for a device.
  @Output() updateAPNofDevice = new EventEmitter<number>();


  // Get a reference to the drawer so we can close it programmatically.
  @ViewChild('drawer', { static: true }) drawer?: MatDrawer;

  ngOnInit() {
    console.log('Device details component initialized with device:', this.device);
  }

  ngOnChanges() {
    console.log("Device changes:", this.device);
  }

  // Called when the "Update APN" button is clicked.
  updateAPN(): void {
    if (this.device)
      this.updateAPNofDevice.emit(this.device.id)
  }

  // Close the drawer and optionally notify the parent component.
  closeDrawer(): void {
    this.drawerClosed.emit();
  }

}
