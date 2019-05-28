import isURL from 'validator/lib/isURL';
import makeQuery from './queries';

const corsUrl = 'https://cors.io/?';

export default (state, rssInput, button) => {
  rssInput.addEventListener('input', ({ target }) => {
    // eslint-disable-next-line no-param-reassign
    state.value = target.value;
    if (state.value.length === 0) {
      // eslint-disable-next-line no-param-reassign
      state.processState = 'init';

      return;
    }
    if (!isURL(state.value)) {
      // eslint-disable-next-line no-param-reassign
      state.processState = 'invalid';
      return;
    }
    // eslint-disable-next-line no-param-reassign
    state.processState = 'valid';
  });

  button.addEventListener('click', () => {
    // eslint-disable-next-line no-param-reassign
    state.processState = 'loading';
    const link = state.value;
    const url = `${corsUrl}${link}`;
    if (!state.feedLinks.includes(url)) {
      makeQuery(url, state);
      return;
    }
    // eslint-disable-next-line no-param-reassign
    state.processState = 'init';
  });
};
