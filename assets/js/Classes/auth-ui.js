var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Fetch } from "./fetch.js";
class AuthUI extends Fetch {
    constructor() {
        super();
        // * ELEMENTS
        this.signupForm = document.getElementById('signup-form');
        this.loginForm = document.getElementById('login-form');
        this.checkEmptyInput = (inputs) => {
            let isEmpty = false;
            inputs.forEach(inputText => {
                if (inputText.length == 0) {
                    isEmpty = true;
                }
            });
            return isEmpty;
        };
        this.checkAllTheSame = (inputs) => {
            let AreAllTheSame = true;
            for (let index = 0; index < inputs.length; index++) {
                if (inputs[index] != inputs[0]) {
                    AreAllTheSame = false;
                }
            }
            return AreAllTheSame;
        };
        this.updateLoginUserUI = () => __awaiter(this, void 0, void 0, function* () {
            let email = this.signupForm.querySelectorAll('input')[0].value;
            let password = this.signupForm.querySelectorAll('input')[1].value;
            let retype_password = this.signupForm.querySelectorAll('input')[2].value;
            if (this.checkEmptyInput([email, password, retype_password])) {
                console.log('fill in all the inputs');
            }
            else if (!this.checkAllTheSame([password, retype_password])) {
                console.log("the password don't match");
            }
            else {
                // console.log("Email: " + email);
                // console.log("Password: " + password);
                yield this.fetchAddUser(email, password);
                this.signupForm.querySelectorAll('input')[0].value = "";
                this.signupForm.querySelectorAll('input')[1].value = "";
                this.signupForm.querySelectorAll('input')[2].value = "";
            }
        });
        this.initialize();
    }
    // * Setup methods
    initialize() {
        this.setupListeners();
    }
    setupListeners() {
        var _a, _b;
        const formBtns = document.querySelector('div').querySelectorAll('button');
        formBtns[0].addEventListener('click', (event) => {
            formBtns[0].classList.replace('bg-white', 'bg-[#3f58c7]');
            formBtns[0].classList.add('text-white');
            formBtns[0].classList.remove('hover:brightness-70');
            formBtns[1].classList.replace('bg-[#3f58c7]', 'bg-white');
            formBtns[1].classList.add('hover:brightness-70');
            formBtns[1].classList.remove('text-white');
            this.loginForm.style.display = "none";
            this.signupForm.style.display = "block";
        });
        formBtns[1].addEventListener('click', (event) => {
            formBtns[1].classList.replace('bg-white', 'bg-[#3f58c7]');
            formBtns[1].classList.add('text-white');
            formBtns[1].classList.remove('hover:brightness-70');
            formBtns[0].classList.replace('bg-[#3f58c7]', 'bg-white');
            formBtns[0].classList.add('hover:brightness-70');
            formBtns[0].classList.remove('text-white');
            this.signupForm.style.display = "none";
            this.loginForm.style.display = "block";
        });
        (_b = (_a = this.signupForm) === null || _a === void 0 ? void 0 : _a.querySelector('button')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (event) => {
            // console.log("SIGNUP FORM");
            this.updateLoginUserUI();
        });
    }
}
const ui = new AuthUI();
