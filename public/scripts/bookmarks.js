window.onload = function () {
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
};
