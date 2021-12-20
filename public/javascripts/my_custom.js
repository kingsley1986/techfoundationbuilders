
 $('#post-comment').on('click', function (event) {
    event.preventDefault();
    var name = document.getElementById("name-input").value;
    var email = document.getElementById("email-input").value;
    var message = document.getElementById("message-input").value;
    var phone = document.getElementById("phone-input").value;
    var subject = document.getElementById("subject-input").value;
    var response = grecaptcha.getResponse();
    
    var name_passed = false
    var email_passed = false
    var message_passed = false
    var phone_passed = false
    var subject_passed = false
    var response_passed = false


    if(name == ""){

        var the_value = document.getElementById("name-error")

        the_value.innerHTML = "Please enter your name"
        name_passed = true
   
    }else if (email == "") {

      var the_value = document.getElementById("email-error")

        the_value.innerHTML == "" ? the_value.innerHTML = "Please enter your email address" : the_value.innerHTML = ""
      email_passed = true

      }else if (phone == "") {
        var the_value = document.getElementById("phone-error")
  
        the_value.innerHTML == "" ? the_value.innerHTML = "Please enter a pohoe number" : the_value.innerHTML = "" 
        phone_passed = true
  
      }
      else if (subject == "") {
        var the_value = document.getElementById("subject-error")
  
        the_value.innerHTML == "" ? the_value.innerHTML = "Please enter a subject" : the_value.innerHTML = "" 
        subject_passed = true
  
      }else if (message == "") {

      var the_value = document.getElementById("message-error")

      the_value.innerHTML == "" ? the_value.innerHTML = "Please enter a message " : the_value.innerHTML = ""
      message_passed = true

    }else if (response == "") {
      var the_value = document.getElementById("recaptcha-error")

      the_value.innerHTML == "" ? the_value.innerHTML = "Please verify that you are not a robot" : the_value.innerHTML = "" 
      response_passed = true

    }
    console.log(name_passed)
    if(name_passed != true) {
      var the_value = document.getElementById("name-error")

      the_value.innerHTML = ""
    }
    if (email_passed != true) {
      var the_value = document.getElementById("email-error")

      the_value.innerHTML = ""
    }
    if (message_passed != true) {
      var the_value = document.getElementById("message-error")

      the_value.innerHTML = ""
    }
    if(phone_passed != true) {
      var the_value = document.getElementById("phone-error")

      the_value.innerHTML = ""
    }
    if(subject_passed != true) {
      var the_value = document.getElementById("subject-error")

      the_value.innerHTML = ""
    }
    if (response_passed != true) {
      var the_value = document.getElementById("recaptcha-error")

      the_value.innerHTML = ""
    }
    if(name_passed != true && email_passed != true && message_passed != true && phone_passed != true  && subject_passed != true && response_passed != true) {

        var f = $("#send-request");
    $.ajax({
        url: "/contacts/send",
        method: 'POST',
        data: f.serialize(),
        success: function (result) {
           
            $("#name-input").val('');
            $("#email-input").val('');
            $("#phone-input").val('');
            $("#subject-input").val('');
            $("textarea#message-input").val('');
            grecaptcha.reset();

            $("#success-delivey-message").show(() => {
              setTimeout(() => {
                $("#success-delivey-message").fadeTo(500, 1).slideUp(500, () => {

                  $("#success-delivey-message").hide();
                })
              }, 10000)
            });


            
        }
    });
    }
    
  
});