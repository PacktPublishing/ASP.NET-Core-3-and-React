# Chapter 13 - Adding Automated Tests

To restore the frontend code for this chapter, open the `frontend` folder in Visual Studio Code and run `npm install` in the terminal. Enter your Auth0 settings in `AppSettings.ts`. Put your test username and password in the cypress tests.

- `npm start` will then run the app in dev mode. 
- `npm test` will run the Jest tests
- `npm run cy:open` will open the Cypress tests

To restore the backend code for this chapter, open `QandA.sln` in the `backend` folder in Visual Studio. Double check the connection string in `appsettings.json` points to your database and that the Auth0 settings are correct. 
- The tests can be run using the *Test Explorer* window
- The backend can be run by pressing *F5* 