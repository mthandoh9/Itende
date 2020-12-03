function alphaOnly(event) {
    var key = event.keyCode;
    return ((key >= 65 && key <= 90) || key == 8);
}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
$(document).ready(function () {

    $("#submit").click(function (event) {

        var name = $("#name").val();
        var surname = $("#surname").val();
        var Email = $("#email").val();
        var Password = $("#password").val();
        var cPassword = $("#c_password").val();

        if (name == "" || surname == "" || Email == "" || Password == "" || cPassword == "") {
            alert("Fill-in Missing fields");
        } else if (Password != cPassword) {
            alert("Passwords Do Not Match");

        } else if (Password.length < 6) {
            alert("Passwords too short");
        } else if (!validateEmail(Email)) {
            alert("Not Valid Email Address !");
        } else {
            event.preventDefault();
            $('#submit').prop('disabled', true);
            $.ajax({

                url: "https://techforest.co.za/Itende/create_account.php",
                method: "POST",
                data: { name: name, surname: surname, Email: Email, Password: Password },
                dataType: "json",
                success: function (mess) {
                    //console.log(mess);
                    if (mess.resMess == "Success") {
                        window.plugins.toast.showLongBottom(mess.resMess, function (a) { console.log('toast success: ' + a) }, function (b) { alert('toast error: ' + b) });
                        window.localStorage.setItem("vNumber", mess.resCode);
                        window.localStorage.setItem("userEmail", mess.Email);
                        window.location.href = "verify.html";
                    } else {
                        //console.log(mess);
                        $('#submit').prop('disabled', false);
                        window.plugins.toast.showLongBottom(mess.resMess, function (a) { console.log('toast success: ' + a) }, function (b) { alert('toast error: ' + b) });
                    }
                    //$('#submit').prop('disabled',true);
                },
                error: function (err) {
                    //alert(err.responseText);
                    $('#submit').prop('disabled', false);
                    //alert("Registration Unsuccessful");
                    window.plugins.toast.showLongBottom(err.responseText, function (a) { console.log('toast success: ' + a) }, function (b) { alert('toast error: ' + b) });
                }
            });
        }
    })
    window.localStorage.clear();
    $("#log_submit").click(function (event) {

        var Email = $("#log_email").val();
        var Password = $("#log_password").val();

        if (Email == "" || Password == "") {
            alert("Fill-in Missing fields");
        } else {
            event.preventDefault();
            $('#log_submit').prop('disabled', true);
            $.ajax({

                url: "https://techforest.co.za/Itende/login.php",
                method: "POST",
                data: { Email: Email, Password: Password },
                dataType: "json",
                success: function (mess) {
                    if (mess.resCode == 0) {
                        //alert(mess.resMess);
                        window.localStorage.clear();
                        window.localStorage.setItem("vNumber", mess.vNumber);
                        window.localStorage.setItem("userEmail", mess.Email);
                        window.location.href = "verify.html";
                        window.plugins.toast.showLongBottom(mess.resMess, function (a) { console.log('toast success: ' + a) }, function (b) { alert('toast error: ' + b) });

                    } else if (mess.resCode == 1) {
                        //alert(mess.resMess);
                        $('#log_submit').prop('disabled', false);
                        window.plugins.toast.showLongBottom(mess.resMess, function (a) { console.log('toast success: ' + a) }, function (b) { alert('toast error: ' + b) });

                    } else {
                        window.localStorage.clear();
                        window.localStorage.setItem("Name", mess.Name);
                        window.localStorage.setItem("Surname", mess.Surname);
                        window.localStorage.setItem("userEmail", mess.Email);
                        window.location.href = "userPosts.html";
                    }
                },
                error: function (err) {

                    window.plugins.toast.showLongBottom(err.responseText.toString(), function (a) { console.log('toast success: ' + a) }, function (b) { alert('toast error: ' + b) });
                    //alert(err.responseText);
                    $('#log_submit').prop('disabled', false);
                    //window.location.href = "signup.html";


                }
            });
        }
    })
    return false;
})