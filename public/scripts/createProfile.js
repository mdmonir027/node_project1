window.onload = function () {
  const baseCropping = $('#croped-image').croppie({
    viewport: {
      width: 200,
      height: 200,
    },
    boundary: {
      width: 300,
      height: 300,
    },
    showZoomer: true,
  });

  function readableFile(file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      baseCropping
        .croppie('bind', {
          url: event.target.result,
        })
        .then(() => {
          $('.cr-slider').attr({
            min: 0.5,
            max: 1.5,
          });
        });
    };
    reader.readAsDataURL(file);
  }

  $('#profilePicFile').on('change', function (event) {
    if (this.files[0]) {
      readableFile(this.files[0]);
      $('#crop-modal').modal({
        backdrop: 'static',
        keyboard: false,
      });
    }
  });

  $('#cancel-croping').on('click', function () {
    $('#crop-modal').modal('hide');
    // setTimeout(() => {
    baseCropping.croppie('destroy');
    // }, 1000);
  });

  $('#upload-image').on('click', function () {
    baseCropping
      .croppie('result', 'blob')
      .then((blob) => {
        const formData = new FormData();
        const file = document.getElementById('profilePicFile').files[0];
        const fileName = generateFileName(file.name);

        formData.append('profilePic', blob, fileName);

        const headers = new Headers();
        headers.append('Accept', 'Application/JSON');

        const req = new Request('/upload/profilePic', {
          method: 'POST',
          mode: 'cors',
          headers,
          body: formData,
        });
        return fetch(req);
      })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById('removeProfilePic').style.display = 'block';
        document.getElementById('profilePic').src = data.profilePic;
        document.getElementById('profilePicForm').reset();

        $('#crop-modal').modal('hide');
        // setTimeout(() => {
        baseCropping.croppie('destroy');
        // }, 1000);
      });
  });
};

function generateFileName(name) {
  const types = /(.jpeg|.jpg|.png|.gif)/;
  return name.replace(types, '.png');
}
