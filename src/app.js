import WatchJs from 'melanke-watchjs';
import addEventListeners from './listeners';
import renderFeeds from './renders';
import { updateFeedsQuery } from './queries';

export default () => {
  const rssInput = document.getElementById('rss-input');
  const button = document.getElementById('add-rss-button');


  const state = {
    processState: 'init',
    value: '',
    feedLinks: [],
    feeds: [],
    channelTitles: [],
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

    loading: () => {
      button.disabled = true;
      rssInput.classList.remove('is-valid', 'is-invalid');
      rssInput.setAttribute('readonly', 'readonly');
    },
  };

  updateFeedsQuery(state);
  addEventListeners(state, rssInput, button);

  WatchJs.watch(state, 'processState', () => {
    stateActions[state.processState]();
  });
  WatchJs.watch(state, 'feeds', () => renderFeeds(state));
};
