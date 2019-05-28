import WatchJs from 'melanke-watchjs';
import addEventListeners from './listeners';

export default () => {
  const rssInput = document.getElementById('rss-input');
  const button = document.getElementById('add-rss-button');


  const state = {
    processState: 'init',
    value: '',
  };

  const stateActions = {
    init: () => {
      rssInput.classList.remove('is-invalid');
      rssInput.classList.remove('is-valid');
      rssInput.value = '';
    },

    invalid: () => {
      rssInput.classList.remove('is-valid');
      rssInput.classList.add('is-invalid');
    },

    valid: () => {
      rssInput.classList.remove('is-invalid');
      rssInput.classList.add('is-valid');
    },
  };

  addEventListeners(state, rssInput, button);

  WatchJs.watch(state, ['processState'], () => {
    stateActions[state.processState]();
  });
};
