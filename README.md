# Recipes-frontend
Frontend for the recipes application.

Access the application [here](https://recipes-frontend-seven.vercel.app)
<br />
**HOX: The application is most likely offline so it will take a couple of minutes to start up when you start the first call to the backend.**

**!! this application is still in the final stages of development, versions in the main branch will pass all the tests and be stable versions, other branches might not pass all the tests!!**

[backend](https://github.com/nnross/recipes-backend)

## About
This is the frontend and also the main repository for this project. This is an application that is built around recipes. It includes pages for searching recipes that we get from a third-party API and then you can interact with these recipes: you can add them to your favorites, to a list of recipes to do later, or to your calendar for a specific date. To use these you need to be logged in but otherwise, you can search the recipes without logging in.

## Prerequisites
To run and test you will need node installed

## Configuration
This project has the application.properties file that is not included in GitHub as it holds sensitive information.
To get the file you can contact iiro.s.partanen@gmail.com

When you have the file just add it to the main/resources where the application-test.properties are located.

The tests can be run without this file.

## Running
### Build
To run this application you will need to fulfill the configuration, prerequisites, and clone the repository.

You can run the application from the command line. You just need to run from the root directory `npm install` in the terminal. Then run `npm start`
### Test
To run the tests you just need to clone the repository and from the root directory at the terminal run `npm run test`. If you want specific tests run for example `npm run test -- settings`

## Technologies
The framework is React with JavaScript. For styling I use plain CSS with SaSS. React and JS are chosen for their relativity in the frontend space. Not using for example Bootstrap is because we feel that it is important to learn the fundamentals of CSS before using those.
