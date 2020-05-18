////ACCESSBILITY NAVIGATION FUNCTIONS

////change font size
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
////change font
$('#fontChooser').change(function () {
  $('body').css('font-family', $(this).val());
});

/////////function to load in main page on conditions for cookies
///check for level cookie
function level() {
  var level = $.cookie('level');
  if (level != null) {
    if (level === 'ok') {
      $('#info-tab').addClass('active').addClass('recomended');
      $('#info').addClass('show').addClass('active');
    }
    if (level === 'low') {
      $('#forum-tab').addClass('active').addClass('recomended');
      $('#forum').addClass('show').addClass('active');
    }
    if (level === 'mid') {
      $('#chat-tab').addClass('active').addClass('recomended');
      $('#chat').addClass('show').addClass('active');
    }
    if (level === 'moderate') {
      $('#locate-tab').addClass('active').addClass('recomended');
      $('#locate').addClass('show').addClass('active');
    }
    if (level === 'high') {
      $('#lines-tab').addClass('active').addClass('recomended');
      $('#lines').addClass('show').addClass('active');
    }
  }
}

//// function for multiple options and display its weightage field for each option//////
function createQuestion() {
  var output = '';
  output +=
    '<div class="form-group"><label for="question">Question</label> <input data-bv-stringlength-min="6" data-bv-stringlength-message="The detail must be more than 6 characters long" class="form-control" type="text" name="question" placeholder="Enter Question"></div> <div class="help-block with-errors"></div>';
  output +=
    '<div class="form-group"><label for="service">Service Required for Question</label><select name="selectservice"><option value=""></option>';
  storedServices.forEach(
    (storedservice) =>
      (output += '<option value="' + storedservice + '">' + storedservice + '</option>')
  );
  output +=
    '</select><label for="service">If Service is not mentioened above </label><input class="form-control" data-bv-stringlength-min="3" data-bv-stringlength-message="The detail must be more than 3 characters long" type="text" name="inputservice"  placeholder="Enter Service required for Question"></br>';
  $('#choices').append(output);
}

///password
var password = document.getElementById('password'),
  confirm_password = document.getElementById('password2');
var changepassword = document.getElementById('changepassword'),
  changeconfirm_password = document.getElementById('changepassword2');
if (password) {
  password.onchange = validatePassword;
  confirm_password.onkeyup = validatePassword;
}
if (changepassword) {
  changepassword.onchange = validatechangePassword;
  changeconfirm_password.onkeyup = validatechangePassword;
}

function validatePassword() {
  if (password.value != confirm_password.value) {
    $('#alert').html("Passwords do not match. <i class='fas fa-times-circle'></i>" + '</br>');
    $('#userbutton').prop('disabled', true);
  } else {
    $('#userbutton').prop('disabled', false);
    $('#alert').html('');
  }
}
function validatechangePassword() {
  if (changepassword.value != changeconfirm_password.value) {
    $('#alert-password').html(
      "Passwords do not match. <i class='fas fa-times-circle'></i>" + '</br>'
    );
    $('#passwordbutton').prop('disabled', true);
  } else {
    $('#passwordbutton').prop('disabled', false);
    $('#alert-password').html('');
  }
}

////document on ready
$(document).ready(function () {
  //check cookie
  $('#level .col-md-4').click(function () {
    var number = $(this).attr('data-number');
    var level = $(this).attr('data-value');
    $('.material-icons').removeClass('Yelselected');
    $('.caption').removeClass('Yelselected');
    const current = document.getElementById('level' + number);
    $(current).find('.material-icons').addClass('Yelselected');
    $(current).find('.caption').addClass('Yelselected');
    document.cookie = 'level=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    $.cookie('level', level, { expires: 1, path: '/services' });
  });
  level();

  //reason details start with null
  $('#AddReason').on('hidden.bs.modal', function () {
    $('#choices').html('');
  });

  //form validations
  $('#registrationForm').bootstrapValidator();
  $('#loginForm').bootstrapValidator();
  $('#userForm').bootstrapValidator();
  $('#updateForm').bootstrapValidator();
  $('#passwordForm').bootstrapValidator();
  $('#reasonForm').bootstrapValidator();
  $('#serviceForm').bootstrapValidator();

  ////modals

  $('.button').click(function () {
    var url = $(this).attr('data-url');
    $('#submit').attr('data-url', url);
  });

  $('.submit').click(function () {
    var url = $(this).attr('data-url');
    window.location.href = url;
  });

  $('#submit').click(function () {
    var url = $(this).attr('data-url');
    window.location.href = url;
  });

  //delete modal
  $('#delete').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var id = button.data('id'); // Extract info from data-* attributes
    var name = $(button).data('name');
    $('#ModalDelete').html(`Delete ${name}`);
    var modal = $(this);
    modal.find('.modal-body a').attr('href', id);
  });
  //update user
  $('#UpdateUser').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var link = button.data('link'); // Extract info from data-* attributes
    $('#updateForm').attr('action', link);
    var id = button.data('id'); // Extract info from data-* attributes
    var name = $(button).data('name');
    var createduser = $(button).data('createduser');
    var role = $(button).data('role');
    var email = $(button).data('email');
    //var image = $(button).data('image');
    $('#UpdateUserheading').html(`Update ${name}'s Detail`);
    //$(`<input type="hidden" id="updateid" name="updateid" value="" />`).insertBefore('#createduser');
    $('#updateid').val(id);
    $('#updatecreateduser').val(createduser);
    $('#updateusername').val(name);
    $('#updaterole').val(role);
    $('#updateemail').val(email);
    //$('#updateimage').val(image);
  });
  //update password
  $('#passwordModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var link = button.data('link'); // Extract info from data-* attributes
    $('#passwordForm').attr('action', link);
    var name = $(button).data('name');
    $('#passwordModalheading').html(`Update ${name}'s Password`);
    var id = button.data('id'); // Extract info from data-* attributes
    var password = $(button).data('password');
    var createduser = $(button).data('createduser');
    $('#changeid').val(id);
    $('#changepassword').val(password);
    $('#changepassword2').val(password);
    $('#changecreateduser').val(createduser);
  });
  //update reason
  $('#AddReason').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var link = button.data('link'); // Extract info from data-* attributes
    $('#reasonForm').attr('action', link);
    var id = button.data('id'); // Extract info from data-* attributes
    if (id != null) {
      var name = $(button).data('name');
      var symbol = $(button).data('symbol');
      var createduser = $(button).data('createduser');
      var option = $(button).data('option');
      var question = $(button).data('question');
      var service = $(button).data('service');
      var questions = question.split(',');
      var services = service.split(',');
      $('#ModalReason').html(`Update ${name}'s Detail`);
      $(`<input type="hidden" id="id" name="id" value="" />`).insertBefore('#createduser');
      $('#id').val(id);
      $('#createduser').val(createduser);
      $('#symbol').val(symbol);
      $('#reason').val(name);
      $('#options').val(questions.length);
      var output = '';
      for (i = 0; i < option; i++) {
        output +=
          '<div class="form-group"><label for="question">Question </label> <input  data-bv-stringlength-min="6" data-bv-stringlength-message="The detail must be more than 6 characters long" class="form-control" type="text" name="question" value="' +
          questions[i] +
          '"></div><div class="help-block with-errors"></div>';
        output +=
          '<div class="form-group"><label for="service">Service Required for Question </label><select name="selectservice">  <option> </option> ';
        storedServices.forEach((storedservice) => {
          output += '<option value="' + storedservice + '">' + storedservice + '</option>';
        });
        output +=
          '</select><label for="service">If Service is not mentioened above </label><input class="form-control" data-bv-stringlength-min="3" data-bv-stringlength-message="The detail must be more than 3 characters long" type="text" name="inputservice"  id="inputservice" placeholder="Enter Service required for Question" value="' +
          services[i] +
          '"></br>';
      }
      document.getElementById('choices').innerHTML += output;
      $('#reason').val(name);
    } else {
      $('#ModalReason').html('Add Reason');
    }
  });

  //update service
  $('#AddService').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var link = button.data('link'); // Extract info from data-* attributes
    $('#serviceForm').attr('action', link);
    var id = button.data('id'); // Extract info from data-* attributes
    if (id != null) {
      var name = $(button).data('name');
      var createduser = $(button).data('createduser');
      var phone = $(button).data('phone');
      var website = $(button).data('website');
      var body = $(button).data('body');
      var note = $(button).data('note');
      var street = $(button).data('street');
      var subrub = $(button).data('subrub');
      var postcode = $(button).data('postcode');
      var state = $(button).data('state');
      var mode = $(button).data('mode');
      var services = $(button).data('services');
      mode = mode.split(',');
      services = services.split(',');
      $('#ModalService').html(`Update ${name}'s Detail`);
      $(`<input type="hidden" id="id" name="id" value="" />`).insertBefore('#createduser');
      $('#id').val(id);
      $('#createduser').val(createduser);
      $('#organization').val(name);
      $('#phone').val(phone);
      $('#body').val(body);
      $('#note').val(note);
      $('#street').val(street);
      $('#subrub').val(subrub);
      $('#state').val(state);
      $('#postcode').val(postcode);
      $('#website').val(website);
      $('#mode').val(mode);
      $('#moreservices').val(services);
    } else {
      $('#ModalService').html('Add Service');
    }
  });
});
