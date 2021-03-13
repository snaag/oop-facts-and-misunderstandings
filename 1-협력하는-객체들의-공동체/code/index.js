const domOrder = document.querySelector("#order");
const domCoffee = document.querySelector("#coffee");
domOrder.textContent = "...";
domCoffee.textContent = "...";

class Customer {
    constructor(id) {
        this._id = id;
    }

    setMenu(menu) {
        this._menu = menu;
    }

    getId() {
        return this._id;
    }

    getMenu() {
        return this._menu;
    }
}

class Casher {
    constructor() {}

    order(id, menu) {
        this._id = id;
        this._menu = menu;
    }

    sendRequest() {
        return { id: this._id, menu: this._menu };
    }
}

class Barista {
    constructor() {}

    takeRequest({ id, menu }) {
        this._id = id;
        this._menu = menu;
    }

    makeCoffee() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`[${this._menu}]`);
            }, 1500);
        });
    }

    serving(product) {
        return `${this._id}: ${product} complete`;
    }
}

setTimeout(() => {
    (async () => {
        //* casher, barista 는 고객보다 먼저 선언해둔다
        const casher = new Casher();
        const barista = new Barista();
        const customer = new Customer(0);

        customer.setMenu("vanila latte"); //* 고객이 메뉴를 생각해놓는다
        casher.order(customer.getId(), customer.getMenu()); //* 캐셔가 고객에게 주문을 받는다
        domOrder.textContent = customer.getMenu();

        barista.takeRequest(casher.sendRequest()); //* 바리스타는 캐셔로부터 어떤 고객에게 어떤 음료를 만들어주어야 하는지 전달받는다
        const coffee = await barista.makeCoffee(); //* 바리스타는 1초간 음료를 만든다
        domCoffee.textContent = barista.serving(coffee); //* 바리스타가 다 만들고 나면 서빙을 한다
    })();
}, 1000);
