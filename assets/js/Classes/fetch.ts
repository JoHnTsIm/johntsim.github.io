export class Fetch {
    private file: string = "";
    private action: string  = "";
    private url: string = "https://crane-capital-buck.ngrok-free.app/api/";


    // * ITEMS
    protected async fetchAllItems() {
        this.file = "items.php";
        this.action = "?action=loadItems";
        

        try {
            const response = await fetch(this.url + this.file + this.action, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                }
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            // console.log(result);
            return result
        } catch (error) {
            if (error instanceof Error) { 
                console.error(error.message);
            }
        }
    }

    protected async fetchAddItem(itemInputText: string) {
        this.file = "items.php";
        this.action = "?action=addItem";

        try {
            const response = await fetch(this.url + this.file + this.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },

                body: JSON.stringify({
                    itemName: itemInputText,
                }),
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }


            const result = await response.json();
            return result;
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    protected async fetchRemoveItem(itemId: string) {
        this.file = "items.php";
        this.action = "?action=removeItem";

        try {
            const response = await fetch(this.url + this.file + this.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },

                body: JSON.stringify({
                    itemId: itemId,
                }),
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            // console.log(result);
            return result
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    protected async fetchChangeItemState(itemId: string) {
        this.file = "items.php";
        this.action = "?action=changeState";

        try {
            const response = await fetch(this.url + this.file + this.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },

                body: JSON.stringify({
                    itemId: itemId,
                }),
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            // console.log(result);
            return result
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    protected async fetchAllItemsStateDone() {
        this.file = "items.php";
        this.action = "?action=stateAllDone";

        try {
            const response = await fetch(this.url + this.file + this.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            // console.log(result);
            return result
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    protected async fetchRemoveAllItems() {
        this.file = "items.php";
        this.action = "?action=removeAll";

        try {
            const response = await fetch(this.url + this.file + this.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            // console.log(result);
            return result
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }



    // * USERS
    protected async fetchAddUser(email: string, password: string) {
        this.file = "auth.php";
        this.action = "?action=addUser";

        try {
            const response = await fetch(this.url + this.file + this.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                // credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }


            const result = await response.json();
            return result;
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }
}
