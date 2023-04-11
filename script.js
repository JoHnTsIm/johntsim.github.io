function test() {
    var password_length = document.getElementById("password_length").value;
    var password_input = document.getElementById("password_input");
    var password_strength = document.getElementById("password_strength").value;
    var text = "";
    var allPassChars;
    
    if (password_strength == "low") {
        allPassChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    }
    else if (password_strength == "medium") {
        allPassChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    }
    else if (password_strength == "high") {
        allPassChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_-+={[}]|\:;'<,>.?/";
    }

    for (var i = 0; i < password_length; i++) {
        text += allPassChars.charAt(Math.floor(Math.random() * allPassChars.length));
    }
    password_input.setAttribute("type", "text");
    password_input.setAttribute("value", text);
}



// for (var i = 0; i < 5; i++)
// text += possible.charAt(Math.floor(Math.random() * possible.length));

// console.log(text)