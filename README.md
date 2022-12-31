# tv-guide
This is a simple TV Guide where information from TVmaze API (https://www.tvmaze.com/api) is showcased in a simple
yet effective UI.

Live Demo: https://yenerunver.github.io/tv-guide/

## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and minifies for production
```
yarn build
```

### Unit tests
```
yarn test:unit
```

### Design documents
Check `docs` directory for the project design.

### Design steps
For this project to be created, below steps are followed in order:
1. Target API is analyzed and Class diagrams are created based on the data returned.
2. Based on Class diagrams, Requirements are finalized.
3. Based on Requirements, Mockup page designs are created.
4. After the implementation of UI components, Unit Tests are added.
5. Finally, the project is connected to GitHub Pages site for live demo.

### Design choices
* The project is built using Vue3, Vite, Vuex, Vuetify, and VueRouter.
  * Vite is selected because it is a light-weight Server Side Rendering framework.
  * Vuex is selected because the system is based on events and states.
    * Event-driven state is selected because it creates one source of data flow to be followed by components.
  * Vuetify is used because it is an easy-to-use design system.
  * VueRouter is used because it is the most commonly used routing framework for Vue.
* The project groups TV Shows based on genre and network, as required.
  * While doing that, "Other" genre is created for shows without a genre assigned.
  * Shows can have either a Network or a WebChannel, but both represent the place to watch the show. They both are
displayed under same UI component.
* The TV Shows provided by the API have timezones. That is why, the system is basing its search on a Country selection.
  * The country selection and the country user is in can be different. In those cases, the times are converted from
the selected country's timezone into user's.
* In order to keep the visible items in a reasonable range, the presented schedules are filtered by a Date selection.
* For demo purposes, a list by Rating is limited with Top 5 shows.
  * Most shows provided by the API do not have ratings assigned. That's why, for some countries, Top 5 lists are
not always available.
