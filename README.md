# Team Details Angular App

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.1 and targets Angular v20.2+.

## Getting Started

### Prerequisites
- Node.js v20.19.0 or newer
- Angular CLI v20.2+

### Development Server
Run `npm start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Project Structure

```
src/
├── app/                    # Main application code
├── core/                   # Core services (logging, caching, HttpClient)
├── shared/                 # Shared components and utilities
├── features/               # Feature-specific components
├── data/                   # Models and data-related files
├── branding.json          # Brand assets, logo, social links, contact details
└── ...
```

### Key Folders
- **Core**: Contains all essential services (logging, caching, HttpClient, etc.)
- **Shared**: Includes reusable components and utilities
- **Features**: Organized by feature modules with lazy loading
- **Data**: All application models and interfaces
- **branding.json**: Brand configuration including logo, colors, social media links

## Development Commands

- `npm start` - Start development server
- `ng build` - Build the project for production
- `ng test` - Run unit tests via Karma
- `ng generate component component-name` - Generate new component

## Technologies Used
- Angular v20.2+ with standalone components
- SCSS for styling
- Bootstrap v5 for responsive design
- Angular Router with lazy loading
- RxJS for reactive programming
- Angular Signals for state management

## Architecture
This application follows Angular best practices including:
- Standalone components with signals
- OnPush change detection strategy
- Reactive programming with RxJS
- Lazy loading for feature modules
- Modern control flow syntax

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
