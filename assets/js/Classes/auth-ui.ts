import { Fetch } from "./fetch.js";

class AuthUI extends Fetch {
    // * ELEMENTS
    private signupForm: HTMLElement | null = document.getElementById('signup-form');
    private loginForm: HTMLElement | null = document.getElementById('login-form');

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
            this.updateLoginUserUI();
        })
    }

    private checkEmptyInput = (inputs: Array<string>): boolean => {
        let isEmpty = false;

        inputs.forEach(inputText => {
            if (inputText.length == 0) {
                isEmpty = true;
            }
        });

        return isEmpty;
    }
    
    private checkAllTheSame = (inputs: Array<string>): boolean => {
        let AreAllTheSame = true;

        for (let index = 0; index < inputs.length; index++) {
            if (inputs[index] != inputs[0]) {
                AreAllTheSame = false;
            }
        }

        return AreAllTheSame;
    }

    private updateLoginUserUI = async () => {
        let email = this.signupForm!.querySelectorAll('input')[0].value;
        let password = this.signupForm!.querySelectorAll('input')[1].value;
        let retype_password = this.signupForm!.querySelectorAll('input')[2].value

        if (this.checkEmptyInput([email, password, retype_password])) {
            console.log('fill in all the inputs');
        } else if (!this.checkAllTheSame([password, retype_password]))
        { 
            console.log("the password don't match");
        } else {
            // console.log("Email: " + email);
            // console.log("Password: " + password);
            await this.fetchAddUser(email, password);

            this.signupForm!.querySelectorAll('input')[0].value = "";
            this.signupForm!.querySelectorAll('input')[1].value = "";
            this.signupForm!.querySelectorAll('input')[2].value = "";

        }
    }


}

const ui = new AuthUI();
