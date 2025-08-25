export class Check {
    constructor() {
        this.validEmail = (email) => {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(email);
        };
        this.allMatch = (inputs) => {
            let AreAllTheSame = true;
            for (let index = 0; index < inputs.length; index++) {
                if (inputs[index] != inputs[0]) {
                    AreAllTheSame = false;
                }
            }
            return AreAllTheSame;
        };
        this.emptyInput = (inputs) => {
            let isEmpty = false;
            inputs.forEach(inputText => {
                if (inputText.length == 0) {
                    isEmpty = true;
                }
            });
            return isEmpty;
        };
    }
}
