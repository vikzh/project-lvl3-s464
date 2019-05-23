import isURL from 'validator/lib/isURL';

export default () => {
  const rssInput = document.getElementById('rss-input');

  rssInput.addEventListener('input', ({ target }) => {
    console.log(isURL(target.value));

    if (!isURL(target.value)) {
      rssInput.classList.add('is-invalid');
    } else {
      rssInput.classList.replace('is-invalid', 'is-valid');
    }
  });
};
