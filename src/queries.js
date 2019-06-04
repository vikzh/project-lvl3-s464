import axios from 'axios';
import { uniqueId, differenceBy } from 'lodash';

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

export const updateFeedsQuery = (state) => {
  const promises = state.feedLinks.map(feedLink => axios.get(feedLink, { timeout: 4000 }));
  axios.all(promises)
    .then((allRssChannels) => {
      const newFeeds = allRssChannels.map(channel => parse(channel.data).feeds)
        .flat();
      const feedsToAdd = differenceBy(newFeeds, state.feeds, 'href');
      state.feeds = [...feedsToAdd, ...state.feeds];
    })
    .finally(() => {
      setTimeout(() => {
        updateFeedsQuery(state);
      }, 5000);
    });
};

export default (url, state) => {
  axios.get(url, { timeout: 5000 })
    .then(({ data }) => {
      state.processState = 'init';
      const doc = parse(data);
      const { title, feeds } = doc;
      state.channelTitles = [title, ...state.channelTitles];
      state.feedLinks = [...state.feedLinks, url];
      state.feeds = [...feeds, ...state.feeds];
    })
    .catch(() => {
      state.processState = 'error';
    });
};
