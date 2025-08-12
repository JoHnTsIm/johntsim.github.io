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
        this.api_url = "https://crane-capital-buck.ngrok-free.app/api/items.php?action=";
        this.itemsList = document.getElementById('itemsList');
        this.removeAllBtn = document.getElementById('removeAllBtn');
        this.addItemBtn = document.getElementById('addItemBtn');
        this.allDoneBtn = document.getElementById('allDoneBtn');
        this.allUndoneBtn = document.getElementById('allUndoneBtn');
        this.dataPrevious = [];
        this.displayItemsChanges = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.fetchAllItems();
            if (this.itemsList && data.length > 0) {
                this.itemsList.innerHTML = "";
                const fragment = document.createDocumentFragment();
                data.forEach(item => {
                    const newDiv = document.createElement('div');
                    newDiv.classList.add('item', 'pr-2', 'shadow-md', 'focus:brightness-70');
                    const newParagraph = document.createElement('p');
                    if (item.itemState == 0) {
                        newParagraph.classList.add('items', 'text-2xl', 'cursor-pointer', 'item-default', 'w-[100%]', 'p-2', 'select-none');
                    }
                    else {
                        newParagraph.classList.add('items', 'text-2xl', 'cursor-pointer', 'item-erased', 'w-[100%]', 'p-2', 'select-none');
                    }
                    newParagraph.id = item.itemId;
                    newParagraph.textContent = item.itemName;
                    const newTrashButton = document.createElement('button');
                    newTrashButton.classList.add('deleteItemBtn', 'cursor-pointer', 'hover:brightness-70');
                    const newTrashImg = document.createElement('img');
                    newTrashImg.classList.add('icon', 'negative');
                    newTrashImg.src = "assets/images/svgs/solid/trash.svg";
                    newTrashButton.appendChild(newTrashImg);
                    newDiv.appendChild(newParagraph);
                    newDiv.appendChild(newTrashButton);
                    fragment.appendChild(newDiv);
                });
                this.itemsList.appendChild(fragment);
            }
            else {
                this.itemsList.innerHTML = "";
                const newDiv = document.createElement('div');
                newDiv.classList.add('flex', 'flex-row', 'gap-3', 'mb-3', 'justify-center');
                const newParagraph = document.createElement('p');
                newParagraph.classList.add('items', 'text-2xl', 'text-black');
                newParagraph.textContent = "λίστα άδεια";
                newDiv.appendChild(newParagraph);
                this.itemsList.appendChild(newDiv);
            }
        });
        this.addItemToList = () => __awaiter(this, void 0, void 0, function* () {
            // Item Input TEXT
            let itemInputText = "";
            const itemInputElement = document.getElementById('itemNameInput');
            if (itemInputElement instanceof HTMLInputElement) {
                itemInputText = itemInputElement.value;
            }
            yield this.fetchAddItem(itemInputText);
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
        this.removeAllItemsFromList = () => __awaiter(this, void 0, void 0, function* () {
            yield this.fetchRemoveAllItems();
            yield this.displayItemsChanges();
        });
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
        this.liveUpdateUI = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.fetchAllItems();
            if (data instanceof Array) {
                if (JSON.stringify(data) !== JSON.stringify(this.dataPrevious)) {
                    console.log("its different");
                    yield this.displayItemsChanges();
                    this.dataPrevious = data;
                }
            }
        });
        this.initialize();
        // * Check changes, fetch data
        this.liveUpdateUI();
        this.runSetInterval();
    }
    // * Setup methods
    initialize() {
        this.setupListeners();
    }
    setupListeners() {
        var _a, _b, _c, _d;
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
        (_b = this.removeAllBtn) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (event) => this.removeAllItemsFromList());
        // Shopping list done
        (_c = this.allDoneBtn) === null || _c === void 0 ? void 0 : _c.addEventListener("click", (event) => {
            this.changeAllItemsStateDoneFromList();
        });
        // Shopping list undone
        // this.allUndoneBtn?.addEventListener("click", (event) => this.fetchAllUndone());
        // Add Item button
        (_d = this.addItemBtn) === null || _d === void 0 ? void 0 : _d.addEventListener("click", (event) => {
            const input = document.getElementById('itemNameInput');
            if (input === null || input === void 0 ? void 0 : input.value.trim()) {
                this.addItemToList();
                input.value = ""; // Clear input
            }
        });
        window.addEventListener('DOMContentLoaded', (event) => {
            this.displayItemsChanges();
        });
    }
    runSetInterval() {
        setInterval(() => {
            this.liveUpdateUI();
        }, 5000);
    }
}
const ui = new UI();
