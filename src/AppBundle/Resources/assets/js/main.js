$notificationButton = $('button').attr('id', 'notify');
$('#notifications').append($notificationButton);

$('#notify').click(function() {
  randomId = 'rewrwe21';
  $randomElement = $('<div>').attr('id', randomId).text('test notification').hide();
  $('#messages').append($randomElement);
  $randomElement.fadeIn('slow').fadeOut('slow');
  $randomElement.remove();
});
