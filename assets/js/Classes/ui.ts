import { Fetch } from "./fetch.js";

class UI extends Fetch {
    private itemInputText = "";
    private dataPrevious: Array<any> = [];

    // * ELEMENTS
    private itemsList = document.getElementById('itemsList');
    private removeAllBtn: HTMLElement | null = document.getElementById('removeAllBtn');
    private addItemBtn: HTMLElement | null = document.getElementById('addItemBtn');
    private allDoneBtn: HTMLElement | null = document.getElementById('allDoneBtn');
    private allUndoneBtn: HTMLElement | null = document.getElementById('allUndoneBtn');
    private itemInputElement: HTMLElement | null = document.getElementById('itemNameInput');

    constructor() {
        super();
        this.initialize();

        // * Check changes, fetch data
        // this.liveUpdateUI();
        // this.runSetInterval();
    }

    // * Setup methods
    private initialize(): void {
        this.setupListeners();
    }

    private setupListeners(): void {


        // 📌 Delegated click handler for itemsList - https://www.freecodecamp.org/news/event-delegation-javascript/
        this.itemsList?.addEventListener("click", (event) => {
            const target = event.target as HTMLElement;

            // 🗑 Handle delete button click
            if (target.closest(".deleteItemBtn")) {
                const itemContainer = target.closest(".item") as HTMLElement;
                const itemId = itemContainer?.querySelector(".items")?.id;
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
        this.removeAllBtn?.addEventListener("click", (event) => this.removeAllDoneItemsFromList());

        // Shopping list done
        this.allDoneBtn?.addEventListener("click", (event) => {
            this.changeAllItemsStateDoneFromList();
        });

        // Add Item button
        this.addItemBtn?.addEventListener("click", (event) => {
            const input = document.getElementById('itemNameInput') as HTMLInputElement;
            if (input?.value.trim()) {
                this.addItemToList();

                input.value = ""; // Clear input
            }
        });

        document.getElementById('logout')?.addEventListener('click', (event) => {
            this.logout();
        })

        window.addEventListener('DOMContentLoaded', (event) => {
            this.displayItemsChanges();
        })
    }

    private displayItemsChanges = async () => {
        const data: Array<any> = await this.fetchAllItems();
        
        if (!this.itemsList) return;

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
    }

    private addItemToList = async () => {
        if (this.itemInputElement instanceof HTMLInputElement) {
            this.itemInputText = this.itemInputElement.value;
        }


        await this.fetchAddItem(this.itemInputText);
        await this.displayItemsChanges();
    }

    private removeItemFromList = async (itemId: string) => {
        await this.fetchRemoveItem(itemId);
        await this.displayItemsChanges();
    }

    private changeItemStateFromList = async (itemId: string) => {
        await this.fetchChangeItemState(itemId);
        await this.displayItemsChanges();
    }

    private changeAllItemsStateDoneFromList = async () => {
        await this.fetchAllItemsStateDone();
        await this.displayItemsChanges();
    }

    private removeAllDoneItemsFromList = async () => {
        await this.fetchRemoveAllDoneItems();
        await this.displayItemsChanges();
    }

    private logout = async () => {
        localStorage.removeItem('token');
        window.location.href = 'auth.html';
    }

    // private liveUpdateUI = async () => {
    //     const data = await this.fetchAllItems();

    //     if (data instanceof Array) {
    //         if (JSON.stringify(data) !== JSON.stringify(this.dataPrevious)) {
    //             console.log("its different");

    //             await this.displayItemsChanges();

    //             this.dataPrevious = data;
    //         }
    //     }
    // }

    // private runSetInterval() {
    //     setInterval(() => {
    //         this.liveUpdateUI();
    //     }, 5000);
    // }
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
