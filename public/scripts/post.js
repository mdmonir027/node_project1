window.onload = function () {
  // comment section start
  const comment = document.getElementById('comment');
  const commentHolder = document.getElementById('comment-holder');

  comment.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      if (e.target.value) {
        const postId = comment.dataset.post;
        const commentData = { body: e.target.value };
        const req = generateCommentRequest(
          `/api/post/${postId}/comment`,
          'POST',
          commentData
        );

        fetch(req)
          .then((res) => res.json())
          .then((data) => {
            const commentElement = createComment(data);
            commentHolder.insertBefore(
              commentElement,
              commentHolder.children[0]
            );
            e.target.value = '';
            document.getElementById('noComments').style.display = 'none';
          })
          .catch((e) => console.log(e.message));
      } else {
        alert('Please enter valid comment!');
      }
    }
  });

  // comment reply
  commentHolder.addEventListener('keypress', (e) => {
    if (commentHolder.hasChildNodes(e.target)) {
      if (e.key === 'Enter') {
        const value = e.target.value;
        if (value) {
          const replyData = { body: value };
          const commentId = e.target.dataset.comment;
          const req = generateCommentRequest(
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

  // comment section end

  //   like dislike section start
  const likeBtn = document.getElementById('likeBtn');
  const dislikeBtn = document.getElementById('dislikeBtn');

  likeBtn.addEventListener('click', (e) => {
    const postId = likeBtn.dataset.post;
    reqLikeDislike('like', postId)
      .then((data) => {
        const likeElement = `<i class="${
          data.liked ? 'fas' : 'far'
        } fa-thumbs-up"></i> ( ${data.totalLikes} )`;
        const dislikeElement = `<i class="far fa-thumbs-down"></i> ( ${data.totalDislikes} )`;
        likeBtn.innerHTML = likeElement;
        dislikeBtn.innerHTML = dislikeElement;
      })
      .catch((e) => console.log(e.response.data));
  });
  dislikeBtn.addEventListener('click', (e) => {
    const postId = likeBtn.dataset.post;
    reqLikeDislike('dislike', postId)
      .then((data) => {
        const dislikeElement = `<i class="${
          data.disliked ? 'fas' : 'far'
        } fa-thumbs-down"></i> ( ${data.totalDislikes} )`;
        const likeElement = `<i class="far fa-thumbs-up"></i> ( ${data.totalLikes} )`;
        likeBtn.innerHTML = likeElement;
        dislikeBtn.innerHTML = dislikeElement;
      })
      .catch((e) => console.log(e.response.data));
  });
  //   like dislike section end

  //   bookmark section start
  const bookmarks = document.getElementsByClassName('bookmark');
  [...bookmarks].forEach((bookmark) => {
    bookmark.style.cursor = 'pointer';
    bookmark.addEventListener('click', (e) => {
      const target = e.target.parentElement;

      const headers = new Headers();
      headers.append('Accept', 'Application/JSON');

      const req = new Request(`/api/post/${target.dataset.post}/bookmark`, {
        method: 'GET',
        mode: 'cors',
        headers,
      });

      fetch(req)
        .then((res) => res.json())
        .then((data) => {
          if (data.bookmark) {
            target.innerHTML = '<i class="fas fa-bookmark"></i>';
          } else {
            target.innerHTML = '<i class="far fa-bookmark"></i>';
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });
  });
  //   bookmark section end
};

//  comments functions
function generateCommentRequest(url, method, body) {
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

function createComment(comment) {
  const innerHTML = `
          <img src="${comment.user.profilePic}" class="rounded-circle m-3" style="width: 40px;">
          <div class="media-body">
            <h5 class="mt-0 mb-0">${comment.user.username} </h5>
            <p class='m-0'>${comment.body}</p>
              <div class="mt-2">
                  <input type="text" class="form-control commentReply" placeholder="Press enter to reply"  data-comment="${comment._id}">
              </div>
          </div>`;

  const div = document.createElement('div');
  div.className = 'media border mb-1 pr-3 py-2';
  div.innerHTML = innerHTML;
  return div;
}

function createCommentReplyElement(reply) {
  const innerHTML = `
  <img src="${reply.profilePic} " class="mr-3 rounded-circle" style="width: 40px;">
  <div class="media-body">
      <h5 class="mt-0">${reply.username}</h5>
      <p>${reply.body} </p>
  </div>`;

  const div = document.createElement('div');
  div.className = 'media mb-1 mt-2';
  div.innerHTML = innerHTML;
  return div;
}

// likes dislikes functions
function reqLikeDislike(type, postId) {
  const headers = new Headers();
  headers.append('Accept', 'Application/JSON');
  headers.append('Content-Type', 'Application/JSON');

  const req = new Request(`/api/post/${postId}/${type}`, {
    method: 'POST',
    headers,
    mode: 'cors',
  });

  return fetch(req).then((res) => res.json());
}
