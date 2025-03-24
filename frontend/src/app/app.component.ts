import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceListComponent } from './Pages/device-list/device-list.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DeviceListComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Device Dashboard';
  selectedDevice: any = null;

  openDrawer(device: any) {
    this.selectedDevice = device;
  }

  closeDrawer() {
    this.selectedDevice = null;
  }

}
