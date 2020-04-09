$(document).ready(function() {
    $(".pageheight, .loginoverlay").css("min-height", $(window).height());

    //Login submit function
    $("#submitbtn").on("click", function() {
        var userid = document.getElementById("email").value.toLowerCase();
        var password = document.getElementById("pwd").value;
        var emailerr = document.getElementById("emailerr");
        var pwderr = document.getElementById("pwderr");
        var loginerror = document.getElementById("loginerr");
        if (userid == "" || userid == null) {
            emailerr.innerHTML = "Please enter userid";
        } else {
            emailerr.innerHTML = "";
        }
        if (password == "" || password == null) {
            pwderr.innerHTML = "Please enter password";
            return;
        } else if (password.length < 6) {
            pwderr.innerHTML = "Password must contain 6 digits";
        } else {
            pwderr.innerHTML = "";
        }
        setTimeout(function() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var myobj = JSON.parse(this.responseText).Employees;
                    var count = 0;
                    for (var i = 0; i < myobj.length; i++) {
                        var uid = myobj[i].userId;
                        var upwd = myobj[i].password;
                        var job_title = myobj[i].jobTitleName;
                        var fname = myobj[i].firstName;
                        var lname = myobj[i].lastName;
                        var fullname = myobj[i].preferredFullName;
                        var emp_code = myobj[i].employeeCode;
                        var city = myobj[i].city;
                        var mobile_number = myobj[i].phoneNumber;
                        var email = myobj[i].emailAddress;
                        var user_img = myobj[i].imgPath;
                        var user_qr = myobj[i].qrimgPath;

                        if (userid == uid && password == upwd) {
                            count++;
                            localStorage.setItem("UserId", uid);
                            localStorage.setItem("password", upwd);
                            localStorage.setItem("jobrole", job_title);
                            localStorage.setItem("firstname", fname);
                            localStorage.setItem("lastname", lname);
                            localStorage.setItem("fullname", fullname);
                            localStorage.setItem("empcode", emp_code);
                            localStorage.setItem("city", city);
                            localStorage.setItem("mobilenumber", mobile_number);
                            localStorage.setItem("email", email);
                            localStorage.setItem("userimage", user_img);
                            localStorage.setItem("userqrimage", user_qr);
                        }
                    }
                    if (count > 0 && password.length >= 6) {
                        window.location.reload();
                        window.location.href = window.origin + "/personal-website-new" + "/home.html";
                    } else if (email != "" && password != "" && password.length >= 6) {
                        loginerror.innerHTML = "Invalid username or password";
                        $('.login-loader').hide();
                        $('.wait-text').css('display', 'none');
                    }
                }
            };
            xhttp.open("GET", "assets/js/employee.json", true);
            xhttp.send();
            if (email != "" && password != "" && password.length > 6) {
                document.getElementById("email").value = "";
                document.getElementById("pwd").value = "";
            }
        }, 4000);
        $('.login-loader').show();
        $('.wait-text').css('display', 'block');
    });

    $(window).resize(function() {
        $(".pageheight, .loginoverlay").css("min-height", $(window).height());
    });
});