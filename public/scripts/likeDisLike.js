window.onload = function () {
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

  function reqLikeDislike(type, postId) {
    const headers = new Headers();
    headers.append('Accept', 'Application/JSON');
    headers.append('Content-Type', 'Application/JSON');

    const req = new Request(`/api/posts/${postId}/${type}`, {
      method: 'POST',
      headers,
      mode: 'cors',
    });

    return fetch(req).then((res) => res.json());
  }
};
