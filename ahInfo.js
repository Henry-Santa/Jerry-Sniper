const CONTAINER = document.getElementById("scrollContainer");
const TierToNum = {
    "COMMON" : 0,
    "UNCOMMON" : 1,
    "RARE" : 2,
    "EPIC" : 3,
    "LEGENDARY" : 4,
    "MYTHIC" : 5,
    "SPECIAL" : 5,
    "VERY SPECIAL" : 5,
    "DIVINE" : 6
}
class ahInfo {
    /**
     * 
     * @param {number} price 
     * @param {string} auction_id 
     * @param {string} name 
     * @param {string} rarity
     * @param {string} real
     */

    constructor (price, auction_id, name, rarity, real){
        this.price = price;
        this.auction_id = auction_id;
        this.name = name;
        this.rarity = rarity;
        this.real = real;
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
        var tax = this.target_price * 0.01;
        if (this.target_price > 1_000_000){
            tax += this.target_price * 0.01;
        }
        this.profit -= tax
        
        this.percent = this.profit/price;
    }

    static createButtonListener(button){
        button.addEventListener('click', function() {
            var widget = button.closest('.widget');
            var attributeValue = widget.getAttribute('ah-command');
        
            var tempInput = document.createElement('input');
            tempInput.value = attributeValue;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            button.innerText = 'Copied!';
            setTimeout(function() {
            button.innerText = 'Copy';
            }, 1500);
        });
    }

    createWidget() {

        var wid = `<div class="widget ${this.info.rarity.toLowerCase()}" ah-command="/viewauction ${this.info.auction_id}">
            <img src="${this.image}" alt="Product Image">
            <p>Product Name: ${this.info.name}</p>
            <p>Price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span class="price">$${this.price.toLocaleString()}</span></p>
            <p>Target Price: <span class="sell-price">$${this.target_price.toLocaleString()}</span></p>
            <p>Profit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span class="profit">$${this.profit.toLocaleString()}</span></p>
            <p>Profit Percentage: <span class="profit-percentage">${Math.round(this.percent*100)}%</span></p>
            <br>
            <button class="copy-button" id="${this.info.auction_id}">Copy</button>
        </div>
        `
        if (CONTAINER.innerHTML){
            CONTAINER.innerHTML += wid;
        } else {
            CONTAINER.innerHTML = wid;
        }
        
        
    }
}