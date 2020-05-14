var error = [];
var msg = [];
var password = '';

//////check name/////
function checkname(input_field) {
  var temp = input_field;
  var tst = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  msg['name'] = '';
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['name'] = 1;
    msg['name'] = 'Name can not be blanked.';
  } else if (tst.test(temp.value)) {
    error['name'] = 0;
    temp.style.borderColor = '#007bff';
  } else {
    temp.style.borderColor = 'darkred';
    error['name'] = 1;
    msg['name'] = 'Name should be characters';
  }
}
//////check organization name/////
function checkorganization(input_field) {
  var temp = input_field;
  var tst = /^[A-Za-z0-9 _-]{3,100}$/;
  msg['organization'] = '';
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['organization'] = 1;
    msg['organization'] = 'Game name can not be blanked';
  } else if (tst.test(temp.value)) {
    error['organization'] = 0;
    temp.style.borderColor = '#007bff';
  } else {
    temp.style.borderColor = 'darkred';
    error['organization'] = 1;
    msg['organization'] =
      'Organization name should be characters or numbers or combination of characters and numbers with  maximum length of 3';
  }
}

//password check/////
function checkpassword(input_field) {
  var temp = input_field;
  password = temp.value;
  var tst = /^[A-Za-z0-9 _-]{8,30}$/;
  msg['password'] = '';
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['password'] = 1;
    msg['password'] = 'Password can not be blanked';
  } else if (tst.test(temp.value)) {
    error['password'] = 0;
    temp.style.borderColor = '#007bff';
  } else {
    temp.style.borderColor = 'darkred';
    error['password'] = 1;
    msg['password'] =
      'Password should be greater than 6 and should include alphbets or numbers or both ';
  }
}

//repassword check/////
function checkrepassword(input_field) {
  var temp = input_field;
  var tst = password;
  msg['repassword'] = '';
  error['repassword'] = 0;
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['repassword'] = 1;
    msg['repassword'] = 'Retype Password again';
  } else if (tst === temp.value) {
    error['password'] = 0;
    temp.style.borderColor = '#007bff';
  } else {
    temp.style.borderColor = 'darkred';
    error['repassword'] = 1;
    msg['repassword'] = 'Passwords does not match. ';
  }
}
//////empty brief/////
function checkimage(input_field) {
  var temp = input_field;
  msg['image'] = '';
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['image'] = 1;
    msg['image'] = 'No image has been selected.';
  } else {
    error['image'] = 0;
    temp.style.borderColor = '#007bff';
  }
}
//url check/////
function checkurl(input_field) {
  var temp = input_field;
  var tst = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
  msg['url'] = '';
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['url'] = 1;
    msg['url'] = 'Url can not be blanked';
  } else if (tst.test(temp.value)) {
    error['url'] = 0;
    temp.style.borderColor = '#007bff';
  } else {
    temp.style.borderColor = 'darkred';
    error['url'] = 1;
    msg['url'] = 'Url is in a wrong pattern';
  }
}

//////check city/////
function checksubrub(input_field) {
  var temp = input_field;
  var tst = /^[A-Za-z\s]+$/;
  msg['subrub'] = '';
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['subrub'] = 1;
    msg['subrub'] = 'Subrub can not be blanked';
  } else if (tst.test(temp.value)) {
    error['subrub'] = 0;
    temp.style.borderColor = '#007bff';
  } else {
    temp.style.borderColor = 'darkred';
    error['subrub'] = 1;
    msg['subrub'] = 'Subrub name is wrong';
  }
}
//////check country/////
function checkcountry(input_field) {
  var temp = input_field;
  var tst = /^[A-Za-z\s]+$/;
  msg['country'] = '';
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['country'] = 1;
    msg['country'] = 'Country can not be blanked';
  } else if (tst.test(temp.value)) {
    error['country'] = 0;
    temp.style.borderColor = '#007bff';
  } else {
    temp.style.borderColor = 'darkred';
    error['country'] = 1;
    msg['country'] = 'Country name is wrong';
  }
}
////addresss///
function checkaddress(input_field) {
  var temp = input_field;
  var tst = /^[-.?!,/;:() A-Za-z0-9]*$/;
  msg['address'] = '';
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['address'] = 1;
    msg['address'] = 'Address is blank';
  } else if (tst.test(temp.value)) {
    error['address'] = 0;
    temp.style.borderColor = '#007bff';
  } else {
    temp.style.borderColor = 'darkred';
    error['address'] = 1;
    msg['address'] = 'Address is wrong';
  }
}
//////empty brief/////
function checkbrief(input_field) {
  var temp = input_field;
  msg['brief'] = '';
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['brief'] = 1;
    msg['brief'] = 'Blank field or Unselected field';
  } else {
    error['brief'] = 0;
    temp.style.borderColor = '#007bff';
  }
}
//////empty des/////
function checkdesciption(input_field) {
  var temp = input_field;
  msg['desciption'] = '';
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['desciption'] = 1;
    msg['desciption'] = 'Blank field or Unselected field';
  } else {
    error['desciption'] = 0;
    temp.style.borderColor = '#007bff';
  }
}
//////empty service/////
function checkservice(input_field) {
  var temp = input_field;
  msg['service'] = '';
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['service'] = 1;
    msg['service'] = 'Blank field or Unselected field';
  } else {
    error['service'] = 0;
    temp.style.borderColor = '#007bff';
  }
}
//////empty role/////
function checkrole(input_field) {
  var temp = input_field;
  msg['role'] = '';
  if (temp.value == '' || temp.value == null || temp.value == 'Select role of user') {
    temp.style.borderColor = 'darkred';
    error['role'] = 1;
    msg['role'] = 'Blank field or Unselected field';
  } else {
    error['role'] = 0;
    temp.style.borderColor = '#007bff';
  }
}
//////empty mode/////
function checkmode(input_field) {
  var temp = input_field;
  msg['mode'] = '';
  if (temp.value == '' || temp.value == null || temp.value == 'Select mode') {
    temp.style.borderColor = 'darkred';
    error['mode'] = 1;
    msg['mode'] = 'Blank field or Unselected field';
  } else {
    error['mode'] = 0;
    temp.style.borderColor = '#007bff';
  }
}
///////check email///////
function checkemail(input_field) {
  var temp = input_field;
  msg['mail'] = '';
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['mail'] = 1;
    msg['mail'] = 'Email is blank';
  } else if (mailformat.test(temp.value)) {
    error['mail'] = 0;
    temp.style.borderColor = '#007bff';
  } else {
    temp.style.borderColor = 'darkred';
    error['mail'] = 1;
    msg['mail'] = 'Email is wrong';
  }
}

///////check reason//////
function checkreason(input_field) {
  var temp = input_field;
  var tst = /^[A-Za-z\s]+$/;
  msg['reason'] = '';
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['reason'] = 1;
    msg['reason'] = 'Reason on card can not be blanked.';
  } else if (tst.test(temp.value)) {
    error['reason'] = 0;
    temp.style.borderColor = '#007bff';
  } else {
    temp.style.borderColor = 'darkred';
    error['reason'] = 1;
    msg['reason'] = 'Reason on card should be characters';
  }
}

/////check symbol name/////
function checksymbol(input_field) {
  var temp = input_field;
  var tst = /^[A-Za-z0-9 _-]{3,100}$/;
  msg['symbol'] = '';
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['symbol'] = 1;
    msg['symbol'] = 'Game name can not be blanked';
  } else if (tst.test(temp.value)) {
    error['symbol'] = 0;
    temp.style.borderColor = '#007bff';
  } else {
    temp.style.borderColor = 'darkred';
    error['symbol'] = 1;
    msg['symbol'] =
      'Symbol class should be characters or numbers or combination of characters and numbers with  maximum length of 3. Please refer to https://fontawesome.com/icons?d=gallery for input.';
  }
}
///////postcode no//////
function checkpostcode(input_field) {
  var temp = input_field;
  var postcode = /^(\d{4})$/;
  msg['postcode'] = '';
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['postcode'] = 1;
    msg['postcode'] = 'Postcode is blank';
  } else if (temp.value.match(postcode)) {
    error['postcode'] = 0;
    temp.style.borderColor = '#007bff';
  } else {
    temp.style.borderColor = 'darkred';
    error['postcode'] = 1;
    msg['postcode'] = 'Postcode should be Australian';
  }
}
///////number//////
function checknumber(input_field) {
  var temp = input_field;
  var number = /^(\d{1.2})$/;
  msg['number'] = '';
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['number'] = 1;
    msg['number'] = 'No of Questions is blank';
  } else if (temp.value.match(number)) {
    error['number'] = 0;
    temp.style.borderColor = '#007bff';
  } else {
    temp.style.borderColor = 'darkred';
    error['number'] = 1;
    msg['number'] = 'No of Questions should be Number';
  }
}

///////number//////
function checkphone(input_field) {
  var temp = input_field;
  var number = /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/;
  msg['phone'] = '';
  if (temp.value == '' || temp.value == null) {
    temp.style.borderColor = 'darkred';
    error['phone'] = 1;
    msg['phone'] = 'Phone is blank';
  } else if (temp.value.match(number)) {
    error['phone'] = 0;
    temp.style.borderColor = '#007bff';
  } else {
    temp.style.borderColor = 'darkred';
    error['phone'] = 1;
    msg['phone'] = 'Phone number should be Australian';
  }
}

//// function for multiple options and display its weightage field for each option//////
function createQuestion() {
  var output = '';
  output +=
    '<div class="form-group"><label for="question">Question</label> <input  onChange="checkbrief(this)" class="form-control" type="text" name="question" placeholder="Enter Question" required></div>';
  output +=
    '<div class="form-group"><label for="service">Service Required for Question</label><select name="selectservice"><option value=""></option>';
  storedServices.forEach(
    (storedservice) =>
      (output += '<option value="' + storedservice + '">' + storedservice + '</option>')
  );
  output +=
    '</select><label for="service">If Service is not mentioened above </label><input class="form-control" type="text" name="inputservice"  placeholder="Enter Service required for Question"></br>';
  $('#choices').append(output);
}

//add submission
function checksubmit() {
  var temp = 0;
  $('.alert-issues').html('<b>Please enter correct input values in red fieldes</b>');
  $('.alert-issues').append('<ul>');
  for (var key in error) {
    if (error[key] == 1) {
      event.preventDefault();
      $('.alert-issues').append('<li>' + msg[key] + '</li>');
      temp = 1;
    }
  }
  $('.alert-issues').append('</ul>');
  if (temp == 1) {
    $('.alert-issues').css('display', 'block');
    return false;
  } else return true;
}

//reset modals
$('.modal').on('hidden.bs.modal', function () {
  $('.alert-issues').html();
  $('.alert-issues').css('display', 'none');
  $('input').css('border', '2px solid #007bff');
  $('select').css('border', '2px solid #007bff');
  for (var key in error) {
    error[key] = 0;
    temp = 0;
  }
});
