const feedToString = (feed) => {
  const {
    href, feedTitle, description, id, pubDate,
  } = feed;
  return `<div class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <a href="${href}"><h5 class="mb-1">${feedTitle}</h5></a>
                <div>
                    <small>${pubDate}</small>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#feed${id}" aria-hidden="true">
                    Full Feed</button>
                </div>
            </div>
        </div>
        <div class="modal fade" id="feed${id}" tabindex="-1" role="dialog" aria-labelledby="feedModalCenterTitle${id}" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="feedModalCenterTitle${id}">${feedTitle}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ${description}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`;
};

const renderFeeds = (state) => {
  const feedDiv = document.getElementById('feeds');
  feedDiv.innerHTML = state.feeds.map(feedToString).join('');
  state.processState = 'init';
};

const renderEvents = (eventType, message, tag) => {
  tag.innerHTML = `<div class="alert alert-${eventType}" role="alert">
  ${message}
</div>`;
};

export { renderFeeds, renderEvents };
