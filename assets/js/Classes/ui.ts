import { Fetch } from "./fetch.js";

class UI extends Fetch {
    private itemInputText = "";
    private dataPrevious: Array<any> = [];

    // * ELEMENTS
    private itemsList = document.getElementById('itemsList');
    private removeAllBtn = document.getElementById('removeAllBtn');
    private addItemBtn = document.getElementById('addItemBtn');
    private allDoneBtn = document.getElementById('allDoneBtn');
    private allUndoneBtn = document.getElementById('allUndoneBtn');
    private itemInputElement = document.getElementById('itemNameInput');

    constructor() {
        super();
        this.initialize();

        // * Check changes, fetch data
        this.liveUpdateUI();
        this.runSetInterval();
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
        this.removeAllBtn?.addEventListener("click", (event) => this.removeAllItemsFromList());

        // Shopping list done
        this.allDoneBtn?.addEventListener("click", (event) => {
            this.changeAllItemsStateDoneFromList();
        });

        // Shopping list undone
        // this.allUndoneBtn?.addEventListener("click", (event) => this.fetchAllUndone());

        // Add Item button
        this.addItemBtn?.addEventListener("click", (event) => {
            const input = document.getElementById('itemNameInput') as HTMLInputElement;
            if (input?.value.trim()) {
                this.addItemToList();

                input.value = ""; // Clear input
            }
        });

        window.addEventListener('DOMContentLoaded', (event) => {
            this.displayItemsChanges();
        })
    }

    private displayItemsChanges = async () => {
        const data: Array<any> = await this.fetchAllItems();


        if (this.itemsList && data.length > 0) {
            this.itemsList.innerHTML = "";

            const fragment = document.createDocumentFragment();

            data.forEach(item => {
                const newDiv = document.createElement('div');
                newDiv.classList.add('item', 'pr-2', 'shadow-md', 'focus:brightness-70');

                const newParagraph = document.createElement('p');

                if (item.itemState == 0) {
                    newParagraph.classList.add('items', 'text-2xl', 'cursor-pointer', 'item-default', 'w-[100%]', 'p-2', 'select-none');
                } else {
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
        } else {
            this.itemsList!.innerHTML = "";

            const newDiv = document.createElement('div');
            newDiv.classList.add('flex', 'flex-row', 'gap-3', 'mb-3', 'justify-center');

            const newParagraph = document.createElement('p');

            newParagraph.classList.add('items', 'text-2xl', 'text-black');

            newParagraph.textContent = "λίστα άδεια";
            newDiv.appendChild(newParagraph);

            this.itemsList!.appendChild(newDiv);
        }
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

    private changeAllItemsStateDoneFromList = async() => {
        await this.fetchAllItemsStateDone();
        await this.displayItemsChanges();
    }

    private removeAllItemsFromList = async () => {
        await this.fetchRemoveAllItems();
        await this.displayItemsChanges();
    }

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

    private liveUpdateUI = async () => {
        const data = await this.fetchAllItems();

        if (data instanceof Array) {
            if (JSON.stringify(data) !== JSON.stringify(this.dataPrevious)) {
                console.log("its different");

                await this.displayItemsChanges();

                this.dataPrevious = data;
            }
        }
    }

    private runSetInterval() {
        setInterval(() => {
            this.liveUpdateUI();
        }, 5000);
    }
}

const ui = new UI();
