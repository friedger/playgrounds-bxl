// Copyright 2016 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { getData } from './data';
import { updateCard } from './ui.js';
import { initialiseSubs, subscribeUser } from './notifications.js';
import { registerUser } from './webauthn.js';

let swRegistration;

(function () {
  'use strict';

  var app = {
    isLoading: true,
    visibleCards: {},
    initialPlayground: [],
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    debug: document.querySelector('.debug'),
    addDialog: document.querySelector('.dialog-container'),
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  

  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  document.getElementById('butRefresh').addEventListener('click', function () {
    // Refresh all of the forecasts
    console.log('butRefresh');
    registerUser("friedger");
    // app.updatePlaygrounds();
  });


  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

  // Toggles the visibility of the add new city dialog.
  app.toggleAddDialog = function (visible) {
    if (visible) {
      app.addDialog.classList.add('dialog-container--visible');
    } else {
      app.addDialog.classList.remove('dialog-container--visible');
    }
  };

  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

  /*
   * Gets details for a specific playground and updates the card with the data.
   * getPlayground() first checks if the details are in the cache. If so,
   * then it gets that data and populates the card with the cached data.
   * Then, getPlayground() goes to the network for fresh data. If the network
   * request goes through, then the card gets updated a second time with the
   * freshest data.
   */
  app.getPlayground = function (recordid, label) {
    getData().then(data => {
      data.records
        .map(record => updateCard(record, app.visibleCards, app.cardTemplate, app.container, 'fr'));
      app.isLoading = false;
      app.spinner.setAttribute('hidden', true);
    });

  };

  // Iterate all of the cards and attempt to get the latest forecast data
  app.updatePlaygrounds = function () {
    var keys = Object.keys(app.visibleCards);
    keys.forEach(function (key) {
      app.getPlayground(key);
    });
  };

  app.saveSelectedCities = function () {
    var selectedCities = JSON.stringify(app.initialPlayground);
    localStorage.selectedCities = selectedCities;
  };

  /*
   * Fake weather data that is presented when the user first uses the app,
   * or when the user has not saved any cities. See startup code for more
   * discussion.
   */
  var initialPlayground = {
    "datasetid": "playgrounds",
    "recordid": "359be7807d0108e540717123b3ca3920caa451c0",
    "fields": {
      "nom": "Jardins de la vallée du Maalbeek",
      "code_postal": "1000",
      "description": "3 Jeux sur ressort 1 bascule 1 mur d’escalade 2 combinaisons de grimpe et de glisse",
      "adres": "Jozef II-straat ingang tegenover nr 108",
      "naam": "Maalbeekdalhof",
      "adresse": "Rue Jozef II - entrée face au n°108",
      "tranche_d_age": "3>12",
      "beschrijving": "3 veertoestellen 1 wip 1 klimmuur 2 glij-klim-combinatie"
    },
    "record_timestamp": "2015-06-22T12:11:25+00:00"
  };

  updateCard(initialPlayground, app.visibleCards, app.cardTemplate, app.container, 'fr');

  app.initialPlayground = localStorage.selectedCities;

  if (app.initialPlayground) {
    app.initialPlayground = JSON.parse(app.initialPlayground);
    app.initialPlayground.forEach(function (playground) {
      app.getPlayground(playground.recordid, playground.label);
    });
  } else {
    updateCard(initialPlayground, app.visibleCards, app.cardTemplate, app.container, 'fr');
    app.initialPlayground = [
      { key: initialPlayground.recordid, label: initialPlayground.label }
    ];
    app.saveSelectedCities();
  }

  navigator.credentials.get({password:true}).then(result=> console.log("auth r:", result), error => console.log("error", error))
  // S E R V I C E   W O R K E R

  // if ('serviceWorker' in navigator && 'PushManager' in window) {
  //   navigator.serviceWorker
  //     .register('./service-worker.js')
  //     .then((swReg) => {
  //       swRegistration = swReg;
  //       console.log('Service Worker Registered', swReg);

  //       // Setup push notifications
  //       initialiseSubs(swRegistration)
  //         .then(sub => {
  //           app.debug.textContent = JSON.stringify(sub);
  //         });
  //     });
  // }
})();

