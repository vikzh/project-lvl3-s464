import WatchJs from 'melanke-watchjs';
import addEventListeners from './listeners';
import { renderFeeds, renderEvents } from './renderers';
import { updateFeedsQuery } from './queries';

export default () => {
  const rssInput = document.getElementById('rss-input');
  const button = document.getElementById('add-rss-button');
  const eventsTag = document.getElementById('events');

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
      eventsTag.innerHTML = '';
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
      renderEvents('success', 'Loading...', eventsTag);
    },

    error: () => {
      button.disabled = false;
      rssInput.classList.remove('is-valid', 'is-invalid');
      rssInput.removeAttribute('readonly', 'readonly');
      eventsTag.innerHTML = '';
      renderEvents('danger', 'Error! Address is not RSS or link is not correct!', eventsTag);
      setTimeout(() => {
        eventsTag.innerHTML = '';
      }, 3000);
    },
  };

  updateFeedsQuery(state);
  addEventListeners(state, rssInput, button);

  WatchJs.watch(state, 'processState', () => {
    stateActions[state.processState]();
  });
  WatchJs.watch(state, 'feeds', () => renderFeeds(state));
};
