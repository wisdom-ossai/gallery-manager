$(document).ready(function() {
  $('#post-comment').hide();
  $('#btn-comment').on('click', function(event) {
    event.preventDefault();
    $('#post-comment').show();
  });

  $('#btn-like').on('click', function(event) {
    event.preventDefault();
    var imgId = $(this).data('id');
    $.post('/images/' + imgId + '/like').done(function(data) {
      $('.likes-count').text(data.likes);
    });
  });

  $('#submit-button').on('click', function(event) {
    var fileInput = $('input:file').val();
    if (!fileInput || fileInput.length == 0) {
      event.preventDefault();
      console.log('Submit button clicked!!!');
    }
  });
});
