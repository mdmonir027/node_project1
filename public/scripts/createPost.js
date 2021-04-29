$('#postImage').on('change', function (event) {
  const file = event.target.files[0].name;
  $('#postImageLabel').html(file);
});

window.onload = function () {
  tinymce.init({
    selector: '#tiny-mce-post-body',
    plugins: [
      'a11ychecker advcode advlist lists link checklist autolink autosave code ',
      'preview',
      'searchplace',
      'wordcount',
      'media table emotions image imagetools',
    ],
    toolbar:
      'bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | forecolor backcolor emotions | code preview',
    height: 300,
    automatic_uploads: true,
    images_upload_url: '/upload/postImage',
    images_upload_handler: (blobInfo, success, failure) => {
      const headers = new Headers();
      headers.append('Accept', 'Application/JSON');

      const formData = new FormData();
      formData.append('postImage', blobInfo.blob(), blobInfo.filename());

      const req = new Request('/upload/postImage', {
        method: 'post',
        mode: 'cors',
        headers,
        body: formData,
      });

      fetch(req)
        .then((res) => res.json())
        .then((data) => success(data.imageUrl))
        .catch(() => {
          // console.log(e); // todo remove later
          failure('HTTP Error');
        });
    },
  });
};
