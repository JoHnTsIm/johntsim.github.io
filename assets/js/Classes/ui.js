var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Fetch } from "./fetch.js";
class UI extends Fetch {
    constructor() {
        super();
        this.itemInputText = "";
        this.dataPrevious = [];
        // * ELEMENTS
        this.itemsList = document.getElementById('itemsList');
        this.removeAllBtn = document.getElementById('removeAllBtn');
        this.addItemBtn = document.getElementById('addItemBtn');
        this.allDoneBtn = document.getElementById('allDoneBtn');
        this.allUndoneBtn = document.getElementById('allUndoneBtn');
        this.itemInputElement = document.getElementById('itemNameInput');
        this.displayItemsChanges = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.fetchAllItems();
            if (!this.itemsList)
                return;
            this.itemsList.innerHTML = "";
            if (data.length === 0) {
                const emptyDiv = document.createElement('div');
                emptyDiv.classList.add('flex', 'flex-row', 'gap-3', 'mb-3', 'justify-center');
                const emptyMsg = document.createElement('p');
                emptyMsg.classList.add('items', 'text-2xl', 'text-black');
                emptyMsg.textContent = "λίστα άδεια";
                emptyDiv.appendChild(emptyMsg);
                this.itemsList.appendChild(emptyDiv);
                return;
            }
            const fragment = document.createDocumentFragment();
            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item', 'pr-2', 'shadow-md', 'focus:brightness-70');
                const itemText = document.createElement('p');
                itemText.id = item.itemId;
                itemText.textContent = item.itemName;
                const baseClasses = ['items', 'text-2xl', 'cursor-pointer', 'w-[100%]', 'p-2', 'select-none'];
                const stateClass = item.itemState === 0 ? 'item-default' : 'item-erased';
                itemText.classList.add(...baseClasses, stateClass);
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('deleteItemBtn', 'cursor-pointer', 'hover:brightness-70');
                const trashIcon = document.createElement('img');
                trashIcon.classList.add('icon', 'negative');
                trashIcon.src = "assets/images/svgs/solid/trash.svg";
                deleteButton.appendChild(trashIcon);
                itemDiv.appendChild(itemText);
                itemDiv.appendChild(deleteButton);
                fragment.appendChild(itemDiv);
            });
            this.itemsList.appendChild(fragment);
        });
        this.addItemToList = () => __awaiter(this, void 0, void 0, function* () {
            if (this.itemInputElement instanceof HTMLInputElement) {
                this.itemInputText = this.itemInputElement.value;
            }
            yield this.fetchAddItem(this.itemInputText);
            yield this.displayItemsChanges();
        });
        this.removeItemFromList = (itemId) => __awaiter(this, void 0, void 0, function* () {
            yield this.fetchRemoveItem(itemId);
            yield this.displayItemsChanges();
        });
        this.changeItemStateFromList = (itemId) => __awaiter(this, void 0, void 0, function* () {
            yield this.fetchChangeItemState(itemId);
            yield this.displayItemsChanges();
        });
        this.changeAllItemsStateDoneFromList = () => __awaiter(this, void 0, void 0, function* () {
            yield this.fetchAllItemsStateDone();
            yield this.displayItemsChanges();
        });
        this.removeAllDoneItemsFromList = () => __awaiter(this, void 0, void 0, function* () {
            yield this.fetchRemoveAllDoneItems();
            yield this.displayItemsChanges();
        });
        this.logout = () => __awaiter(this, void 0, void 0, function* () {
            localStorage.removeItem('token');
            window.location.href = 'auth.html';
        });
        this.initialize();
        // * Check changes, fetch data
        // this.liveUpdateUI();
        // this.runSetInterval();
    }
    // * Setup methods
    initialize() {
        this.setupListeners();
    }
    setupListeners() {
        var _a, _b, _c, _d, _e;
        // 📌 Delegated click handler for itemsList - https://www.freecodecamp.org/news/event-delegation-javascript/
        (_a = this.itemsList) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
            var _a;
            const target = event.target;
            // 🗑 Handle delete button click
            if (target.closest(".deleteItemBtn")) {
                const itemContainer = target.closest(".item");
                const itemId = (_a = itemContainer === null || itemContainer === void 0 ? void 0 : itemContainer.querySelector(".items")) === null || _a === void 0 ? void 0 : _a.id;
                if (itemId) {
                    this.removeItemFromList(itemId);
                }
            }
            // ✅ Handle item text click (toggle purchased state)
            if (target.classList.contains("items")) {
                const itemId = target.id;
                this.changeItemStateFromList(itemId);
            }
        });
        // Remove All button
        (_b = this.removeAllBtn) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (event) => this.removeAllDoneItemsFromList());
        // Shopping list done
        (_c = this.allDoneBtn) === null || _c === void 0 ? void 0 : _c.addEventListener("click", (event) => {
            this.changeAllItemsStateDoneFromList();
        });
        // Add Item button
        (_d = this.addItemBtn) === null || _d === void 0 ? void 0 : _d.addEventListener("click", (event) => {
            const input = document.getElementById('itemNameInput');
            if (input === null || input === void 0 ? void 0 : input.value.trim()) {
                this.addItemToList();
                input.value = ""; // Clear input
            }
        });
        (_e = document.getElementById('logout')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', (event) => {
            this.logout();
        });
        window.addEventListener('DOMContentLoaded', (event) => {
            this.displayItemsChanges();
        });
    }
}
const ui = new UI();
// Shopping list undone
// this.allUndoneBtn?.addEventListener("click", (event) => this.fetchAllUndone());
// private fetchAllUndone() {
//     fetch(this.api_url + "stateAllUndone", {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'ngrok-skip-browser-warning': 'true',
//         },
//     }).then((response) => {
//         this.displayItemsToUI();
//     }).catch((error) => {
//         console.error("Error fetching or parsing JSON:", error);
//         return null; //
//     })
// }
