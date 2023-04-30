function addPasswordLengths() {
    var password_length_select = document.getElementById("password_length")
    for (let i = 8; i < 101; i++) {
        var option = document.createElement("option");
        option.text = i;
        password_length_select.appendChild(option)
      }
}
addPasswordLengths()


function generatePassword() {
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

function copyPassword() {
    var password_input = document.getElementById("password_input");

    // Select the text field
    password_input.select();
    password_input.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(password_input.value);
}