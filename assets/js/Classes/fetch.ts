export class Fetch {
    private file: string = "";
    private action: string = "";
    private url: string = "https://crane-capital-buck.ngrok-free.app/test/public/api/";


    // * ITEMS
    protected async fetchAllItems() {
        this.file = "items.php";
        this.action = "?action=loadItems";

        const token = localStorage.getItem('token');
        const headers: Record<string, string> = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        };
        if (token) {
            headers["Authorization"] = "Bearer " + token;
        }

        try {
            const response = await fetch(this.url + this.file + this.action, {
                method: 'GET',
                headers
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();

            return result.items;
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    protected async fetchAddItem(itemInputText: string) {
        this.file = "items.php";
        this.action = "?action=addItem";

        const token = localStorage.getItem('token');
        const headers: Record<string, string> = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        };
        if (token) {
            headers["Authorization"] = "Bearer " + token;
        }

        try {
            const response = await fetch(this.url + this.file + this.action, {
                method: 'POST',
                headers,

                body: JSON.stringify({
                    itemName: itemInputText,
                }),
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }


            const result = await response.json();
            // console.log(result);
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

        const token = localStorage.getItem('token');
        const headers: Record<string, string> = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        };
        if (token) {
            headers["Authorization"] = "Bearer " + token;
        }

        try {
            const response = await fetch(this.url + this.file + this.action, {
                method: 'POST',
                headers,

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

        const token = localStorage.getItem('token');
        const headers: Record<string, string> = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        };
        if (token) {
            headers["Authorization"] = "Bearer " + token;
        }

        try {
            const response = await fetch(this.url + this.file + this.action, {
                method: 'POST',
                headers,

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

        const token = localStorage.getItem('token');
        const headers: Record<string, string> = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        };
        if (token) {
            headers["Authorization"] = "Bearer " + token;
        }

        try {
            const response = await fetch(this.url + this.file + this.action, {
                method: 'POST',
                headers
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

    protected async fetchRemoveAllDoneItems() {
        this.file = "items.php";
        this.action = "?action=removeAllDone";

        const token = localStorage.getItem('token');
        const headers: Record<string, string> = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        };
        if (token) {
            headers["Authorization"] = "Bearer " + token;
        }

        try {
            const response = await fetch(this.url + this.file + this.action, {
                method: 'POST',
                headers
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.text();
            // console.log(result);
            return result
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }



    // * USERS
    protected async fetchCheckUserExists(email: string) {
        this.file = "auth.php";
        this.action = "?action=checkUserExists";

        try {
            const response = await fetch(this.url + this.file + this.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json', // important for POST
                    'ngrok-skip-browser-warning': 'true',
                },

                body: JSON.stringify({
                    email: email,
                }),
                // credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();

            if (result.exists) {
                return true;
            } else if (!result.exists) {
                return false;
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    protected async fetchSignupUser(email: string, password: string) {
        this.file = "auth.php";
        this.action = "?action=signupUser";

        try {
            const response = await fetch(this.url + this.file + this.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json', // important for POST
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
            // console.log(result);

            return result;
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    protected async fetchLoginUser(email: string, password: string) {
        this.file = "auth.php";
        this.action = "?action=loginUser";

        try {
            const response = await fetch(this.url + this.file + this.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json', // important for POST
                    'ngrok-skip-browser-warning': 'true',
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            // console.log(result);
            
            if (result.success) {
                localStorage.setItem('token', result.jwtoken);
            }

            return result.success

        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }
}
