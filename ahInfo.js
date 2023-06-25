const CONTAINER = document.getElementById("scrollContainer");

class ahInfo {
    /**
     * 
     * @param {number} price 
     * @param {string} auction_id 
     * @param {string} name 
     */

    constructor (price, auction_id, name){
        this.price = price;
        this.auction_id = auction_id;
        this.name = name;
    }
}

class ahFlip {
    /**
     * 
     * @param {ahInfo} info 
     * @param {number} price 
     * @param {number} target_price 
     * @param {string} image
     * 
     */
    constructor (info, price, target_price, image){
        this.info = info;
        this.price = price;
        this.image = image;
        this.target_price = target_price;
        this.profit = target_price - price;
        this.percent = this.profit/price;
    }



    async createWidget() {

        var wid = `<div class="widget" ah-command="/viewauction ${this.info.auction_id}">
            <img src="${this.image}" alt="Product Image">
            <p>Product Name: ${this.info.name}</p>
            <p>Price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span class="price">$${this.price.toLocaleString()}</span></p>
            <p>Target Price: <span class="sell-price">$${this.target_price.toLocaleString()}</span></p>
            <p>Profit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span class="profit">$${this.profit.toLocaleString()}</span></p>
            <p>Profit Percentage: <span class="profit-percentage">${Math.round(this.percent*100)}%</span></p>
            <br>
            <button class="copy-button">Copy</button>
        </div>
        `
        if (CONTAINER.innerHTML){
            CONTAINER.innerHTML += wid;
        } else {
            CONTAINER.innerHTML = wid;
        }
        
        
    }
}