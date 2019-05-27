import isURL from 'validator/lib/isURL';
import axios from 'axios';

export default () => {
  const rssInput = document.getElementById('rss-input');
  const button = document.getElementById('add-rss-button');
  const corsUrl = 'https://cors.io/?';

  rssInput.addEventListener('input', ({ target }) => {
    if (!isURL(target.value)) {
      rssInput.classList.add('is-invalid');
    } else {
      rssInput.classList.replace('is-invalid', 'is-valid');
    }
  });

  button.addEventListener('click', () => {
    axios.get(corsUrl + rssInput.value)
      .then((response) => {
        console.log(response);
      });
  });
};
