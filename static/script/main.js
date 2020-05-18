function exit() {
  mywindow = window.open('about: blank', '_self');
  mywindow.close();
}

function resizeText(multiplier) {
  if (document.body.style.fontSize == '') {
    document.body.style.fontSize = '1em';
  }
  document.body.style.fontSize = parseFloat(document.body.style.fontSize) + multiplier * 0.1 + 'em';
  $('h1,h2,h3').css({
    fontSize: parseFloat($('h1,h2,h3').css('font-size')) + multiplier * 2 + 'px',
  });
  $('.btn').css({
    fontSize: parseFloat($('.btn').css('font-size')) + multiplier * 2 + 'px',
  });
}

$('#fontChooser').change(function () {
  $('body').css('font-family', $(this).val());
});
