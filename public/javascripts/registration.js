
    //according to loftblog tut
    if ($('.menu-trigger').length) {
        $(".menu-trigger").on('click', function () {
            $(this).toggleClass('active');
            $('.header-area .nav').slideToggle(200);
        });
    }


    // Menu elevator animation
    $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                var width = $(window).width();
                if (width < 991) {
                    $('.menu-trigger').removeClass('active');
                    $('.header-area .nav').slideUp(200);
                }
                $('html,body').animate({
                    scrollTop: (target.offset().top) - 80
                }, 700);
                return false;
            }
        }
    });

    document.getElementById("age").addEventListener("input", function () {
            let age = parseInt(this.value);
            let message = document.getElementById("message");

            if (isNaN(age) || age < 10 || age > 18) {
                message.innerHTML = "Invalid age, age must be between 10 and 18.";
            } else {
                message.innerHTML = "";
            }
    });

        

    $(document).ready(function () {
        $('form.requires-validation').submit(function (event) {
            var validateCheck = false

            var recaptcha = $("#g-recaptcha-response").val();
            const messageBox = document.getElementById('messageBox');
            const closeMessageBtn = document.getElementById('closeMessageBtn');
            const successmessage = document.getElementById('successmessage');
            childage = document.getElementById("age").value
            age_int = parseInt(childage)

            if (!this.checkValidity() || age_int < 10) {
                event.preventDefault();
                event.stopPropagation();
                
            } else {
                event.preventDefault();
                validateCheck = true

                var form = $(this);
                var formData = form.serialize();
                $.ajax({
                    type: "POST",
                    url: "/registration/register",
                    data: formData,
                    success: function (response) {
                        if (recaptcha) {

                            $("#cform")[0].reset();

                            grecaptcha.reset();

                            
                            // window.location.href = "/success";
                            successmessage.innerHTML = 'Form submitted successfully';
                            messageBox.style.display = 'block';
                        } else {
                            grecaptcha.reset();
                            alert("Recaptcha failed. Please try again.");
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.error(textStatus, errorThrown);
                    }
                });
            }
            if(validateCheck == true) {
                this.classList.remove('was-validated')


            }else {
                this.classList.add('was-validated');

            }
        });

          closeMessageBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            messageBox.style.display = 'none';
            this.classList.remove('was-validated')

        });
    });