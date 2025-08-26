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
        this.file = "";
        this.action = "";
        this.url = "https://trailhunters.gr/public/api/";
    }
    // * ITEMS
    fetchAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            this.file = "items.php";
            this.action = "?action=loadItems";
            const token = localStorage.getItem('token');
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
            };
            if (token) {
                headers["Authorization"] = "Bearer " + token;
            }
            try {
                const response = yield fetch(this.url + this.file + this.action, {
                    method: 'GET',
                    headers
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = yield response.json();
                return result.items;
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
            this.file = "items.php";
            this.action = "?action=addItem";
            const token = localStorage.getItem('token');
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
            };
            if (token) {
                headers["Authorization"] = "Bearer " + token;
            }
            try {
                const response = yield fetch(this.url + this.file + this.action, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        itemName: itemInputText,
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
    fetchRemoveItem(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.file = "items.php";
            this.action = "?action=removeItem";
            const token = localStorage.getItem('token');
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
            };
            if (token) {
                headers["Authorization"] = "Bearer " + token;
            }
            try {
                const response = yield fetch(this.url + this.file + this.action, {
                    method: 'POST',
                    headers,
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
            this.file = "items.php";
            this.action = "?action=changeState";
            const token = localStorage.getItem('token');
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
            };
            if (token) {
                headers["Authorization"] = "Bearer " + token;
            }
            try {
                const response = yield fetch(this.url + this.file + this.action, {
                    method: 'POST',
                    headers,
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
            this.file = "items.php";
            this.action = "?action=stateAllDone";
            const token = localStorage.getItem('token');
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
            };
            if (token) {
                headers["Authorization"] = "Bearer " + token;
            }
            try {
                const response = yield fetch(this.url + this.file + this.action, {
                    method: 'POST',
                    headers
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
    fetchRemoveAllDoneItems() {
        return __awaiter(this, void 0, void 0, function* () {
            this.file = "items.php";
            this.action = "?action=removeAllDone";
            const token = localStorage.getItem('token');
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
            };
            if (token) {
                headers["Authorization"] = "Bearer " + token;
            }
            try {
                const response = yield fetch(this.url + this.file + this.action, {
                    method: 'POST',
                    headers
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = yield response.text();
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
    // * USERS
    fetchCheckUserExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.file = "auth.php";
            this.action = "?action=checkUserExists";
            try {
                const response = yield fetch(this.url + this.file + this.action, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
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
                const result = yield response.json();
                if (result.exists) {
                    return true;
                }
                else if (!result.exists) {
                    return false;
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        });
    }
    fetchSignupUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.file = "auth.php";
            this.action = "?action=signupUser";
            try {
                const response = yield fetch(this.url + this.file + this.action, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
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
    fetchLoginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.file = "auth.php";
            this.action = "?action=loginUser";
            try {
                const response = yield fetch(this.url + this.file + this.action, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
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
                const result = yield response.json();
                // console.log(result);
                if (result.success) {
                    localStorage.setItem('token', result.jwtoken);
                }
                return result.success;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        });
    }
}
