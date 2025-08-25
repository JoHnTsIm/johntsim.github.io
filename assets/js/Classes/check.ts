export class Check {
    public validEmail = (email: string) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email)
    };

    public allMatch = (inputs: Array<string>): boolean => {
        let AreAllTheSame = true;

        for (let index = 0; index < inputs.length; index++) {
            if (inputs[index] != inputs[0]) {
                AreAllTheSame = false;
            }
        }

        return AreAllTheSame;
    }

    public emptyInput = (inputs: Array<string>): boolean => {
        let isEmpty = false;

        inputs.forEach(inputText => {
            if (inputText.length == 0) {
                isEmpty = true;
            }
        });

        return isEmpty;
    }
}
