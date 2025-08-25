var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Check } from "./check.js";
import { Fetch } from "./fetch.js";
class AuthUI extends Fetch {
    constructor() {
        super();
        // * ELEMENTS
        this.signupForm = document.getElementById('signup-form');
        this.loginForm = document.getElementById('login-form');
        this.signupLoginMsg = document.getElementById('signup-login-msg');
        this.createErrorORSuccessMessage = (success, message) => {
            if (success) {
                this.signupLoginMsg.innerHTML = "";
                const div = document.createElement('div');
                div.classList.remove('error');
                div.classList.add('success');
                const paragraph = document.createElement('p');
                paragraph.textContent = message;
                div.appendChild(paragraph);
                this.signupLoginMsg.appendChild(div);
            }
            else {
                this.signupLoginMsg.innerHTML = "";
                const div = document.createElement('div');
                div.classList.remove('success');
                div.classList.add('error');
                const paragraph = document.createElement('p');
                paragraph.textContent = message;
                div.appendChild(paragraph);
                this.signupLoginMsg.appendChild(div);
                this.loginForm.querySelectorAll('input')[1].value = "";
            }
        };
        this.callCheckUserExists = ($email) => __awaiter(this, void 0, void 0, function* () {
            return yield this.fetchCheckUserExists($email);
        });
        this.callSignupUser = () => __awaiter(this, void 0, void 0, function* () {
            const check = new Check();
            let email = this.signupForm.querySelectorAll('input')[0].value;
            let password = this.signupForm.querySelectorAll('input')[1].value;
            let retype_password = this.signupForm.querySelectorAll('input')[2].value;
            if (check.emptyInput([email, password, retype_password])) {
                this.createErrorORSuccessMessage(false, 'Πρέπει να συμπληρώσεις όλα τα πεδία');
            }
            else if (!check.validEmail(email)) {
                this.createErrorORSuccessMessage(false, 'Μη έγκυρη διεύθυνση email');
            }
            else if (yield this.callCheckUserExists(email)) {
                this.createErrorORSuccessMessage(false, 'Αυτό το email χρησιμοποιείται ήδη');
            }
            else if (!check.allMatch([password, retype_password])) {
                this.createErrorORSuccessMessage(false, 'Οι κωδικοί πρόσβασης διαφέρουν');
            }
            else {
                // console.log("Email: " + email);
                // console.log("Password: " + password);
                yield this.fetchSignupUser(email, password);
                this.signupForm.querySelectorAll('input')[0].value = "";
                this.signupForm.querySelectorAll('input')[1].value = "";
                this.signupForm.querySelectorAll('input')[2].value = "";
                this.createErrorORSuccessMessage(true, 'Ο λογαριασμός σου δημιουργήθηκε με επιτυχία');
            }
        });
        this.callLoginUser = () => __awaiter(this, void 0, void 0, function* () {
            const check = new Check();
            let email = this.loginForm.querySelectorAll('input')[0].value;
            let password = this.loginForm.querySelectorAll('input')[1].value;
            if (check.emptyInput([email, password])) {
                this.createErrorORSuccessMessage(false, 'Πρέπει να συμπληρώσεις όλα τα πεδία');
            }
            else if (!check.validEmail(email)) {
                this.createErrorORSuccessMessage(false, 'Μη έγκυρη διεύθυνση email');
            }
            else if (!(yield this.fetchLoginUser(email, password))) {
                this.createErrorORSuccessMessage(false, 'Ο κωδικός ή το email που δώσατε δεν ταιριάζουν');
                console.log('fail');
            }
            else {
                yield this.fetchLoginUser(email, password);
                window.location.href = "index.html";
            }
        });
        this.initialize();
    }
    // * Setup methods
    initialize() {
        this.setupListeners();
    }
    setupListeners() {
        var _a, _b, _c, _d;
        const formBtns = document.querySelector('div').querySelectorAll('button');
        formBtns[0].addEventListener('click', (event) => {
            this.signupLoginMsg.innerHTML = "";
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
            this.signupLoginMsg.innerHTML = "";
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
            this.callSignupUser();
        });
        (_d = (_c = this.loginForm) === null || _c === void 0 ? void 0 : _c.querySelector('button')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', (event) => {
            // console.log("SIGNUP FORM");
            this.callLoginUser();
        });
    }
}
const ui = new AuthUI();
