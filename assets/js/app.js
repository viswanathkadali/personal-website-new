$(document).ready(function() {
    var headerHeight = $(".navbar").height();
    $(".staffpage").css("min-height", $(window).height() - headerHeight);
    // Logout function
    $("#logout").on("click", function() {
        window.location.href = window.origin + '/index.html';
        localStorage.removeItem("UserId");
        localStorage.removeItem("password");
        localStorage.removeItem("jobrole");
        localStorage.removeItem("firstname");
        localStorage.removeItem("lastname");
        localStorage.removeItem("fullname");
        localStorage.removeItem("empcode");
        localStorage.removeItem("city");
        localStorage.removeItem("mobilenumber");
        localStorage.removeItem("email");
        localStorage.removeItem("userimage");
        localStorage.removeItem("qrimgPath");
    });


    $(".userimage-block").append("<div class='img-inner'><img class='img-fluid rounded-circle' src='" + localStorage.getItem("userimage") + "'></div><h2 class='text-uppercase'>" + localStorage.getItem("fullname") + "</h2><h3 class='text-uppercase'>" + localStorage.getItem("jobrole") + "</h3>");
    $(".emp-details").append("<p><i><b>FirstName:</b> " + localStorage.getItem("firstname") + "</i></p><p><i><b>LastName:</b> " + localStorage.getItem("lastname") + "</i></p><p><i><b>EmployeeId:</b> " + localStorage.getItem("empcode") + "<i></p><p><i><b>City:</b> " + localStorage.getItem("city") + "<i></p><p><i><b>MobileNumber:</b> " + localStorage.getItem("mobilenumber") + "<i></p><p><i><b>Email:</b> " + localStorage.getItem("email") + "</i></p>");
    $(".qrcode-block").append("<div class='qrcode-inner'><img class='img-fluid' src=" + localStorage.getItem("userqrimage") + "></div>");

    //Display world news
    var newsxhttp = new XMLHttpRequest();
    newsxhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var newsobj = JSON.parse(this.response).articles;
            var newsdiv = document.getElementById("news-block");
            for (var i = 0; i < newsobj.length; i++) {
                $("#news-block").append("<div class='news-list'><div class='row'><div class='col-sm-4'><div class='news-img'><img class='img-fluid' src='" + newsobj[i].urlToImage + "'></div></div><div class='col-sm-8 right-block'><h4 class='title'>" + newsobj[i].title + "</h4><h6 class='author'>" + newsobj[i].author + "</h6><p class='content'>" + newsobj[i].content + "</p><p class='description'>" + newsobj[i].description + "</p><p class='publishat'>" + newsobj[i].publishedAt + "</p><p class='source'>Source:" + newsobj[i].source.name + "</p><a class='url'target='_blank' href='" + newsobj[i].url + "'>" + newsobj[i].url + "</a></div></div></div>");
            }
            $(".news-list .right-block").mCustomScrollbar({
                axis: "y",
            });
        }
    }
    newsxhttp.open("GET", 'https://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        'apiKey=e2017ace4f254114859bc0ffaea2708c', true);
    newsxhttp.send();

    // Display india news
    var indnewsxhttp = new XMLHttpRequest();
    indnewsxhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var indnewsobj = JSON.parse(this.response).articles;
            for (var i = 0; i < indnewsobj.length; i++) {
                $("#india-news").append("<div class='news-list'><div class='row'><div class='col-sm-4'><div class='news-img'><img class='img-fluid' src='" + indnewsobj[i].urlToImage + "'></div></div><div class='col-sm-8 right-block'><h4 class='title'>" + indnewsobj[i].title + "</h4><h6 class='author'>" + indnewsobj[i].author + "</h6><p class='content'>" + indnewsobj[i].content + "</p><p class='description'>" + indnewsobj[i].description + "</p><p class='publishat'>" + indnewsobj[i].publishedAt + "</p><p class='source'>Source:" + indnewsobj[i].source.name + "</p><a class='url'target='_blank' href='" + indnewsobj[i].url + "'>" + indnewsobj[i].url + "</a></div></div></div>");
            }
            $(".news-list .right-block").mCustomScrollbar({
                axis: "y",
            });
        }
    }
    indnewsxhttp.open("GET", 'https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=e2017ace4f254114859bc0ffaea2708c', true);
    indnewsxhttp.send();

    //Display employee table data 
    var staffdata = new XMLHttpRequest();
    staffdata.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var staffobj = JSON.parse(this.response);
            var list = "<table class='staff-table table table-dark table-hover'>";
            list += "<thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Salary</th></tr></thead>";
            for (var i = 0; i < staffobj.length; i++) {
                list += "<tr><td>" + staffobj[i].id + "</td><td class='name'>" + staffobj[i].employee_name + "</td><td>" + staffobj[i].employee_age + "</td><td>" + staffobj[i].employee_salary + "</td></tr>"
            }
            list += "</table>";
            document.getElementById("staff-table").innerHTML = list;
            $("#staff-table").mCustomScrollbar({
                axis: "y",
            });
        }
    }
    staffdata.open("GET", "http://dummy.restapiexample.com/api/v1/employees", true);
    staffdata.send();

    // $('.navbar-nav li').click(function() {
    //     $('.navbar-nav li').removeClass('active');
    //     $(this).addClass('active');
    // });

});


// function submit() {
//     var userid = document.getElementById("email").value.toLowerCase();
//     var password = document.getElementById("pwd").value;
//     var emailerr = document.getElementById("emailerr");
//     var pwderr = document.getElementById("pwderr");
//     var loginerror = document.getElementById("loginerr");
//     if (userid == "" || userid == null) {
//         emailerr.innerHTML = "Please enter userid";
//     } else {
//         emailerr.innerHTML = "";
//     }
//     if (password == "" || password == null) {
//         pwderr.innerHTML = "Please enter password";
//         return;
//     } else if (password.length < 6) {
//         pwderr.innerHTML = "Password must contain 6 digits";
//     } else {
//         pwderr.innerHTML = "";
//     }
//     setTimeout(function() {
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//             if (this.readyState == 4 && this.status == 200) {
//                 var myobj = JSON.parse(this.responseText).Employees;
//                 var count = 0;
//                 for (var i = 0; i < myobj.length; i++) {
//                     var uid = myobj[i].userId;
//                     var upwd = myobj[i].password;
//                     var job_title = myobj[i].jobTitleName;
//                     var fname = myobj[i].firstName;
//                     var lname = myobj[i].lastName;
//                     var fullname = myobj[i].preferredFullName;
//                     var emp_code = myobj[i].employeeCode;
//                     var city = myobj[i].city;
//                     var mobile_number = myobj[i].phoneNumber;
//                     var email = myobj[i].emailAddress;
//                     var user_img = myobj[i].imgPath;
//                     var user_qr = myobj[i].qrimgPath;

//                     if (userid == uid && password == upwd) {
//                         count++;
//                         localStorage.setItem("UserId", uid);
//                         localStorage.setItem("password", upwd);
//                         localStorage.setItem("jobrole", job_title);
//                         localStorage.setItem("firstname", fname);
//                         localStorage.setItem("lastname", lname);
//                         localStorage.setItem("fullname", fullname);
//                         localStorage.setItem("empcode", emp_code);
//                         localStorage.setItem("city", city);
//                         localStorage.setItem("mobilenumber", mobile_number);
//                         localStorage.setItem("email", email);
//                         localStorage.setItem("userimage", user_img);
//                         localStorage.setItem("userqrimage", user_qr);
//                     }
//                 }
//                 if (count > 0 && password.length >= 6) {
//                     window.location.reload();
//                     window.location.href = window.origin + "/home.html";
//                 } else if (email != "" && password != "" && password.length >= 6) {
//                     loginerror.innerHTML = "Invalid username or password";
//                 }
//             }
//         };
//         xhttp.open("GET", "assets/js/employee.json", true);
//         xhttp.send();
//         if (email != "" && password != "" && password.length > 6) {
//             document.getElementById("email").value = "";
//             document.getElementById("pwd").value = "";
//         }
//     }, 4000);
//     $('.login-loader').show();
//     $('.wait-text').css('display', 'block');
// }

// Create employee function
function psubmit() {
    var pname = document.getElementById("name").value;
    var psalary = document.getElementById("salary").value;
    var page = document.getElementById("age").value;

    var data = {
        "name": pname,
        "salary": psalary,
        "age": page
    };
    var pxhttp = new XMLHttpRequest();
    pxhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $("#ignismyModal").modal("show");
            setTimeout(function() {
                $("#ignismyModal").modal("hide");
                document.getElementById("name").value = "";
                document.getElementById("salary").value = "";
                document.getElementById("age").value = "";
            }, 2000);
        }
    };
    var udata = JSON.stringify(data);
    pxhttp.open("POST", "http://dummy.restapiexample.com/api/v1/create", true);
    pxhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    pxhttp.send(udata);
}