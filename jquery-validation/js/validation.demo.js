$('#validation').validate({
    rules : {
        email : {
            required : true,
            email : true
        },
        emailAgain : {
            equalTo : '#email'
        },
        termsAndConditions : {
            required : true
        }
    },
    messages : {
        termsAndConditions : {
            required : "你必须同意我们的协议"
        }
    }
});
