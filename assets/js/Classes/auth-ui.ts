import { Check } from "./check.js";
import { Fetch } from "./fetch.js";

class AuthUI extends Fetch {
    // * ELEMENTS
    private signupForm: HTMLElement | null = document.getElementById('signup-form');
    private loginForm: HTMLElement | null = document.getElementById('login-form');
    private signupLoginMsg: HTMLElement | null = document.getElementById('signup-login-msg');

    constructor() {
        super();
        this.initialize();
    }

    // * Setup methods
    private initialize(): void {
        this.setupListeners();
    }

    private setupListeners(): void {
        const formBtns = document.querySelector('div')!.querySelectorAll('button');

        formBtns[0].addEventListener('click', (event) => {
            this.signupLoginMsg!.innerHTML = "";

            formBtns[0].classList.replace('bg-white', 'bg-[#3f58c7]');
            formBtns[0].classList.add('text-white');
            formBtns[0].classList.remove('hover:brightness-70');

            formBtns[1].classList.replace('bg-[#3f58c7]', 'bg-white');
            formBtns[1].classList.add('hover:brightness-70');
            formBtns[1].classList.remove('text-white');

            this.loginForm!.style.display = "none";
            this.signupForm!.style.display = "block";
        })

        formBtns[1].addEventListener('click', (event) => {
            this.signupLoginMsg!.innerHTML = "";

            formBtns[1].classList.replace('bg-white', 'bg-[#3f58c7]');
            formBtns[1].classList.add('text-white');
            formBtns[1].classList.remove('hover:brightness-70');

            formBtns[0].classList.replace('bg-[#3f58c7]', 'bg-white');
            formBtns[0].classList.add('hover:brightness-70');
            formBtns[0].classList.remove('text-white');

            this.signupForm!.style.display = "none";
            this.loginForm!.style.display = "block";
        })

        this.signupForm?.querySelector('button')?.addEventListener('click', (event) => {
            // console.log("SIGNUP FORM");
            this.callSignupUser();
        })

        this.loginForm?.querySelector('button')?.addEventListener('click', (event) => {
            // console.log("SIGNUP FORM");
            this.callLoginUser();
        })
    }

    private createErrorORSuccessMessage = (success: boolean, message:string) => {
        if (success) {
            this.signupLoginMsg!.innerHTML = "";

            const div = document.createElement('div');
            div.classList.remove('error');
            div.classList.add('success');

            const paragraph = document.createElement('p');
            paragraph.textContent = message;

            div.appendChild(paragraph);

            this.signupLoginMsg!.appendChild(div);
        } else {
            this.signupLoginMsg!.innerHTML = "";

            const div = document.createElement('div');
            div.classList.remove('success');
            div.classList.add('error');

            const paragraph = document.createElement('p');
            paragraph.textContent = message;

            div.appendChild(paragraph);

            this.signupLoginMsg!.appendChild(div);
            this.loginForm!.querySelectorAll('input')[1].value = "";
        }
    }

    private callCheckUserExists = async ($email: string) => {
        return await this.fetchCheckUserExists($email);
    }

    private callSignupUser = async () => {
        const check = new Check();

        let email = this.signupForm!.querySelectorAll('input')[0].value;
        let password = this.signupForm!.querySelectorAll('input')[1].value;
        let retype_password = this.signupForm!.querySelectorAll('input')[2].value

        if (check.emptyInput([email, password, retype_password])) {
            this.createErrorORSuccessMessage(false, 'Πρέπει να συμπληρώσεις όλα τα πεδία');

        } else if (!check.validEmail(email)) {
            this.createErrorORSuccessMessage(false, 'Μη έγκυρη διεύθυνση email');

        } else if (await this.callCheckUserExists(email)) {
            this.createErrorORSuccessMessage(false, 'Αυτό το email χρησιμοποιείται ήδη');

        } else if (!check.allMatch([password, retype_password])) {
            this.createErrorORSuccessMessage(false, 'Οι κωδικοί πρόσβασης διαφέρουν');

        } else {
            // console.log("Email: " + email);
            // console.log("Password: " + password);
            await this.fetchSignupUser(email, password);

            this.signupForm!.querySelectorAll('input')[0].value = "";
            this.signupForm!.querySelectorAll('input')[1].value = "";
            this.signupForm!.querySelectorAll('input')[2].value = "";

            this.createErrorORSuccessMessage(true, 'Ο λογαριασμός σου δημιουργήθηκε με επιτυχία');
        }
    }

    private callLoginUser = async () => {
        const check = new Check();

        let email = this.loginForm!.querySelectorAll('input')[0].value;
        let password = this.loginForm!.querySelectorAll('input')[1].value;
        
        if (check.emptyInput([email, password])) {
            this.createErrorORSuccessMessage(false, 'Πρέπει να συμπληρώσεις όλα τα πεδία');
        } else if (!check.validEmail(email)) {
            this.createErrorORSuccessMessage(false, 'Μη έγκυρη διεύθυνση email');
        } else if (!await this.fetchLoginUser(email, password)) {
            this.createErrorORSuccessMessage(false, 'Ο κωδικός ή το email που δώσατε δεν ταιριάζουν');
            console.log('fail');
        } else {
            await this.fetchLoginUser(email, password)
            window.location.href = "index.html";
        }
    }
}

const ui = new AuthUI();
