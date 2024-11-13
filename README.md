# StyleSage

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

## Database file
Download the "database" and "dump" file. Open the "database" file in intelliJ. 

## Build the database
Run `mvn install`

## Run the database
Change password of mysql in application.yml. Run `mvn spring-boot:run`.

## mySQL
After running the database, open mySQL and import the "Dump" folder. The data should be visible after.

## StyleSage - frontend
Download the StyleSage project and open it in VS Code

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Development server
Run `ng serve --port 4200 --open` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Enabling AI
For the AI to work, go to Service folder under StyleSage project. Put google API key on nlp.service.ts
