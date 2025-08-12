var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Fetch {
    constructor() {
        this.url = "https://crane-capital-buck.ngrok-free.app/api/items.php?action=";
    }
    fetchAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.url + "loadItems", {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                    }
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = yield response.json();
                // console.log(result);
                return result;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        });
    }
    fetchAddItem(itemInputText) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.url + "addItem", {
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
                const result = yield response.json();
                return result;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        });
    }
    fetchRemoveItem(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.url + "removeItem", {
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
                const result = yield response.json();
                // console.log(result);
                return result;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        });
    }
    fetchChangeItemState(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.url + "changeState", {
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
                const result = yield response.json();
                // console.log(result);
                return result;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        });
    }
    fetchAllItemsStateDone() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.url + "stateAllDone", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = yield response.json();
                // console.log(result);
                return result;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        });
    }
    fetchRemoveAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.url + "removeAll", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = yield response.json();
                // console.log(result);
                return result;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        });
    }
}
