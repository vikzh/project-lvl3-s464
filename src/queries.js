import axios from 'axios';
import { uniqueId } from 'lodash';

const parse = (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  const title = doc.querySelector('title').textContent;
  const items = [...doc.querySelectorAll('item')];
  const feeds = items.map((item) => {
    const id = uniqueId();
    const href = item.querySelector('link').textContent;
    const feedTitle = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const pubDate = item.querySelector('pubDate').textContent;
    const feed = {
      href, feedTitle, description, id, pubDate,
    };
    return feed;
  });
  return { title, feeds };
};

export default (url, state) => {
  axios.get(url)
    .then(({ data }) => {
      // eslint-disable-next-line no-param-reassign
      state.processState = 'init';
      const doc = parse(data);
      const { title, feeds } = doc;
      // eslint-disable-next-line no-param-reassign
      state.channelTitles = [title, ...state.channelTitles];
      // eslint-disable-next-line no-param-reassign
      state.feedLinks = [...state.feedLinks, url];
      // eslint-disable-next-line no-param-reassign
      state.feeds = [...feeds, ...state.feeds];
    })
    .catch(() => {
      // eslint-disable-next-line no-param-reassign
      state.processState = 'error';
    });
};
