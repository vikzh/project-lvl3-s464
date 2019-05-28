import axios from 'axios';

export default (url, state) => {
  axios.get(url)
    .then((response) => {
      console.log(response);
    });
};
