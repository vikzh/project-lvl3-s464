import isURL from 'validator/lib/isURL';
import makeQuery from './queries';

const corsUrl = 'https://cors.io/?';

export default (state, rssInput, button) => {
  rssInput.addEventListener('input', ({ target }) => {
    state.value = target.value;
    if (state.value.length === 0) {
      state.processState = 'init';

      return;
    }
    if (!isURL(state.value)) {
      state.processState = 'invalid';
      return;
    }
    state.processState = 'valid';
  });

  button.addEventListener('click', () => {
    state.processState = 'loading';
    const link = state.value;
    const url = `${corsUrl}${link}`;
    if (!state.feedLinks.includes(url)) {
      makeQuery(url, state);
      return;
    }
    state.processState = 'init';
  });
};
