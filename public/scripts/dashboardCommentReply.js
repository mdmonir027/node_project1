window.onload = function () {
  // comment section start
  const commentHolder = document.getElementById('comment-holder');

  // comment reply
  commentHolder.addEventListener('keypress', (e) => {
    if (commentHolder.hasChildNodes(e.target)) {
      if (e.key === 'Enter') {
        const value = e.target.value;
        if (value) {
          const replyData = { body: value };
          const commentId = e.target.dataset.comment;
          const req = generateRequest(
            `/api/comment/${commentId}/reply`,
            'POST',
            replyData
          );

          fetch(req)
            .then((res) => res.json())
            .then((data) => {
              const replyElement = createCommentReplyElement(data);
              const parent = e.target.parentElement;
              parent.insertBefore(replyElement, parent.children[0]);
              e.target.value = '';
            })
            .catch((e) => console.log(e.message));
        } else {
          alert('Enter a valid reply');
        }
      }
    }
  });
};

//  comments functions
function generateRequest(url, method, body) {
  const headers = new Headers();
  headers.append('Accept', 'Application/JSON');
  headers.append('Content-Type', 'Application/JSON');

  const req = new Request(url, {
    method,
    headers,
    mode: 'cors',
    body: JSON.stringify(body),
  });

  return req;
}

function createCommentReplyElement(reply) {
  const innerHTML = `
    <img src="${reply.profilePic} " class="mr-3 rounded-circle" style="width: 40px;">
    <div class="media-body">
        <div class="d-flex align-items-center">
          <h5 class="mt-0 mb-0"> <a href="/author/${reply.user}" target="_blank"> ${reply.username}</a> </h5>
          <small class="ml-3 text-primary">A few Seconds ago </small>
      </div>
        <p class="m-0">${reply.body} </p>
    </div>`;

  const div = document.createElement('div');
  div.className = 'media mb-1 mt-2';
  div.innerHTML = innerHTML;
  return div;
}

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
}
