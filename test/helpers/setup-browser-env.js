'use strict';

const jsdom = require('jsdom');

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

function propagateToGlobal(window) {
  Object.keys(window).forEach((key) => {
    if (key in global === false) {
      global[key] = window[key];
    }
  });
}

const storage = {};

window.localStorage = window.sessionStorage = {
  getItem(key) {
    return storage[key];
  },

  setItem(key, value) {
    storage[key] = value;
  },

  removeItem(key) {
    if (storage[key]) {
      delete storage[key];
    }
  },

  clear() {
    Object.keys(storage).forEach((key) => {
      delete storage[key];
    });
  },
};

propagateToGlobal(win);
