# Device Management Application

This repository contains a device management application that demonstrates:

- **Device List View:**  
  Displays a list of devices with columns for Device Name, Status, Telemetry Source, and Last Communication Time. Includes an inline filter by status.

- **Device Details Drawer:**  
  Clicking on a device opens a side drawer that displays device details (Device ID, Model, Data Source) along with an "Update APN" button (disabled if the device is inactive).

- **Loader & Notifications:**  
  Shows a loader during API calls and displays success or error notifications (using Angular Material Snackbar) when actions such as updating an APN are performed.

This application uses Angular (frontend) and Node.js with Express (backend) together.

---

## Project Structure

/ ├── frontend/ # Angular application │ ├── e2e/ │ ├── node_modules/ │ ├── src/ │ │ ├── app/ │ │ │ ├── device-list/ # Device list component │ │ │ ├── device-details-drawer/ # Drawer displaying device metadata │ │ │ ├── services/ # Service(s) for API communication │ │ │ └── app.module.ts # Main Angular module │ │ ├── assets/ │ │ └── index.html │ ├── angular.json │ ├── package.json │ └── tsconfig.json │ └── backend/ # Node.js + Express backend ├── node_modules/ ├── server.js # Express server with mock APIs └── package.json


---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later is recommended)
- [npm](https://www.npmjs.com/) (included with Node.js)
- [Angular CLI](https://angular.io/cli) (install via `npm install -g @angular/cli`)

---

## Setup & Running the Application

### 1. Frontend (Angular)

#### a. Setup

1. **Navigate to the Frontend Directory:**
```bash
   cd frontend
```
2. **Install the Dependencies:**
```bash
    npm install
```
3. ***Configure Angular Material (if not already configured):***
    The Angular Material modules for components like mat-table, mat-drawer, mat-toolbar, mat-snack-bar, and others should already be imported in your app.module.ts.

#### b.Running the Frontend

1. **Start the Angular Development Server:**
```bash
    ng serve
```
2. ***Open Your Browser:*** 
    Visit http://localhost:4200 to view the application.


### 2. Backend (Node.js + Express)

#### a. Setup

1. **Navigate to the Backend Directory:**
```bash
    cd backend
```
2. **Install the Dependencies:**
```bash
    npm install
```

#### b. Running the Backend

1. **Start the Backend Server:**
```bash
    node server.js
```

2. **Backend API Endpoints:**

GET /devices – Returns a list of devices (using mock JSON data).

GET /devices/:id – Returns detailed metadata of a single device.

POST /devices/:id/actions/update-apn – Accepts an APN update action and returns success or failure.

The server should be running at http://localhost:3000.

-------------------------------------------------------------------------------

***Usage***
Device List View: Open your browser at http://localhost:4200 to see the list of devices. You can filter devices by status using the inline filter in the table header. Clicking on a device row will open the device details drawer.

Device Details Drawer: The drawer displays metadata such as Device ID, Model, and Data Source. The "Update APN" button is disabled if the device status is "Inactive". When clicked, the button calls the backend API (via a POST to /devices/:id/actions/update-apn), shows a loader during the API call, and displays a success or failure notification.

Notifications & Loader: A Material Snackbar is used to provide immediate feedback about API actions, and a Material progress spinner is overlaid during API calls.

-------------------------------------------------------------------------------

***Troubleshooting***
API Errors / CORS Issues: Ensure that the backend server is running and accessible at http://localhost:3000. If the frontend and backend are on different origins, you may need to enable CORS on your Express server.

Angular Material Components Not Rendering: If you see errors like NG8001: 'mat-toolbar' is not a known element, confirm that the necessary Material modules (e.g., MatToolbarModule, MatButtonModule, etc.) are imported in your Angular module.

Data Not Displaying in Device Drawer: Use a temporary debug block such as <pre>{{ device | json }}</pre> in your device details drawer template to confirm that the correct data is being passed from the parent component.

-------------------------------------------------------------------------------

***Additional Information***
Customization: You can further customize the loader styles, notifications, and overall appearance by modifying the SCSS files in the Angular application.

Testing: The project includes unit tests and/or end-to-end tests (located in the e2e/ directory) if set up—check the Angular testing documentation for more details on running tests.

License: This project is licensed under the MIT License.

-------------------------------------------------------------------------------


---

This README provides all the necessary details to help a developer or user set up and run both the frontend and backend parts of the application. You can further modify or expand the information depending on project specifics or additional features.