export class Fetch {
    private url: string = "https://crane-capital-buck.ngrok-free.app/api/items.php?action=";

    protected async fetchAllItems() {
        try {
            const response = await fetch(this.url + "loadItems", {
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
        try {
            const response = await fetch(this.url + "addItem", {
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
            // console.log(result);
            return result;
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    protected async fetchRemoveItem(itemId: string) {
        try {
            const response = await fetch(this.url + "removeItem", {
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
        try {
            const response = await fetch(this.url + "changeState", {
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
        try {
            const response = await fetch(this.url + "stateAllDone", {
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
        try {
            const response = await fetch(this.url + "removeAll", {
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
}
