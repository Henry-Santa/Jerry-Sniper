const REFORGES = ["Festive","Snowy","Blooming","Pitchin","Rooted","Raggedy","Strengthened","Waxed","Fortunate","Excellent","Bustling","Honed","Hardened","Blooming","Glistening","NotSo","Dull","Hyper","Fair","Renowned","Loving","Gentle","Odd","Fast","Fair","Epic","Sharp","Heroic","Spicy","Legendary","Dirty","Fabled","Suspicious","Gilded","Warped","Withered","Bulky","Salty","Treacherous","Stiff","Lucky","Very","Highly","Extremely","Thicc","Absolutely","Even More", "Wise","Strong","Superior","Heavy","Light","Perfect","Refined","Deadly","Fine","Grand","Hasty","Neat","Rapid","Unreal","Awkward","Rich","Precise","Spiritual","Headstrong","Clean","Fierce","Mythic","Pure","Smart","Titanic","Necrotic","Ancient","Spiked","Cubic","Reinforced","Loving","Ridiculous","Empowered","Giant","Submerged","Jaded","Bizarre","Itchy","Ominous","Pleasant","Pretty","Shiny","Simple","Strange","Vivid","Godly","Demonic","Forceful","Hurtful","Keen","Strong","Unpleasant","Zealous","Silky","Bloody","Shaded","Sweet","Moil","Toil","Blessed","Bountiful","Magnetic","Fruitful","Refined","Stellar","Mithraic","Auspicious","Fleet","Heated","Ambered"]
const ALPHA = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const ding = new Audio("ding.mp3")

const STATUS = document.getElementById("status-display-text");
const API = "https://api.hypixel.net/skyblock/auctions?page=0"
const ITEMSAPI = "https://api.hypixel.net/resources/skyblock/items"
const CUSTOMITEMSAPI = "https://jerrry-server-1k0g8xr3c-henrysantas-projects.vercel.app/api/prices"
const SHORTENRARITY = {
    "legendary" : "leg",
    "epic"      : "epic"
}


let pages = 50;

var itemTable = new Map()

numberSort = function (a,b) {
    return a - b;
};



async function getItemTable(){
    

    var resp = await fetch(CUSTOMITEMSAPI);
    var json = await resp.json()
    for(item of Object.keys(json)) {
        itemTable.set(item, json[item]);
    }
    for(item of itemTable.keys()){
        if (itemTable.get(item).price){
            itemTable.get(item).price = Math.round(itemTable.get(item).price)
        }
    }
    /*
    json.items.forEach(item => {
        let real_name = ""
        for (let char of item.name){
            if (ALPHA.includes(char)) {
                real_name += char;
            }
        }
        REFORGES.forEach(reforge => {
            real_name = real_name.replace(reforge, "")
        })
        var image_link = "https://henry-santa.github.io/auction-manipulation/images/" + item.material.toLowerCase() + ".png"
        if (item.material == "SKULL_ITEM"){
            if (item.skin == undefined){

            } else{
                var hash = JSON.parse(atob(item.skin)).textures.SKIN.url.split("/")
                hash = hash[hash.length-1]
                image_link = "https://nmsr.nickac.dev/headiso/" + hash
                
            }
        }

        itemTable.set(real_name, {name : item.name, id : item.id, image : image_link})
    })
    for (let pet of Object.keys(PET_DATA)){
        
        pet = pet.toLowerCase();
        var words = pet.split("_");
        var new_words = []

        for (let word of words){
            let nword = word.charAt(0).toUpperCase()
            + word.slice(1)
            new_words.push(nword)

        }
        var final = new_words.join("")
        itemTable.set("Lvl"+final, {name : new_words.join(" "), id : pet.toUpperCase(), image: PET_DATA[pet.toUpperCase()].head})
    }
    let promises = []
    for (let item of itemTable.keys()){
        
        promises.push(new Promise(async (resolve, reject) => {
            setTimeout(
                async () => {
                    if (item.startsWith("Lvl")){

                        // level 1 cost legendary
                        let resp = await fetch(PROXY + encodeURIComponent("https://sky.coflnet.com/api/item/price/" + itemTable.get(item).id + "_PET" + "?Rarity=Legendary&PetLevel=1"))
                        let json = await resp.json()
                        itemTable.get(item)["leg1"] = json.mode;
                        // level 100 cost legendary
                        resp = await fetch(PROXY + encodeURIComponent("https://sky.coflnet.com/api/item/price/" + itemTable.get(item).id + "_PET" + "?Rarity=Legendary&PetLevel=100"))
                        json = await resp.json()
                        itemTable.get(item)["leg100"] = json.mode;
                        // level 1 cost epic
                        resp = await fetch(PROXY + encodeURIComponent("https://sky.coflnet.com/api/item/price/" + itemTable.get(item).id + "_PET" + "?Rarity=Epic&PetLevel=1"))
                        json = await resp.json()
                        itemTable.get(item)["epic1"] = json.mode;
                        // level 100 cost epic
                        resp = await fetch(PROXY + encodeURIComponent("https://sky.coflnet.com/api/item/price/" + itemTable.get(item).id + "_PET" + "?Rarity=Epic&PetLevel=100"))
                        json = await resp.json()
                        itemTable.get(item)["epic100"] = json.mode;
                    } else {
                        let resp = await fetch(PROXY + encodeURIComponent("https://sky.coflnet.com/api/item/price/" + itemTable.get(item).id))
                        let json = await resp.json()
                        itemTable.get(item)["price"] = json.mode;
                    }
                    resolve()
                }, Math.random()*30000
            )
            // https://sky.coflnet.com/api/item/price/SHEEP_PET?Rarity=LEGENDARY&PetLevel=1
            // https://sky.coflnet.com/api/item/price/SHEEP_PET
            
            
        }));

    }
    await Promise.all(promises)
    */
    console.log(itemTable)
}

async function findFlips(HIDE_FURNITURE, HIDE_PET_SKINS, HIDE_DUNGEON_ITEMS, HIDE_DRAGON_ITEMS, PROFITMIN, PERMIN, STOCKMIN, SORTTYPE, pages){
    //

    var items = new Map()
    var promises = []
    STATUS.innerText = "Finding Flips...";
    for (let i = 0; i < pages; i++){
        promises.push(new Promise(async (resolve, reject) => {
            
        
        var response = await fetch(`https://api.hypixel.net/skyblock/auctions?page=${i}`);
        var j = await response.json();
        j.auctions.forEach(auction => {

            if (!auction.bin) { }
            else if (auction["item_lore"].toLowerCase().includes("furniture") && HIDE_FURNITURE) { }
            else if (auction["item_lore"].toLowerCase().includes("pet skin") && HIDE_PET_SKINS) { }
            else if (auction["item_name"].toLowerCase().includes("minion skin")) { }
            else if (auction["item_name"].toLowerCase().includes("potion")) { }
            else if (auction["item_lore"].toLowerCase().includes("cosmetic") && !auction["item_lore"].toLowerCase().includes("pet skin")) {  }
            else if (auction["item_name"].toLowerCase().includes("rune")) { }
            else if (auction["item_lore"].toLowerCase().includes("dungeon") && HIDE_DUNGEON_ITEMS) { }
            else if (auction["item_name"].toLowerCase().includes("dragon") && HIDE_DRAGON_ITEMS) { }
            else if (auction["item_lore"] == "§f§lCOMMON") {}
            else if (auction["item_lore"] == "§a§lUNCOMMON") {}
            else {
                let real_name = ""
                for (let char of auction["item_name"]){
                    if (ALPHA.includes(char)) {
                        real_name += char;
                    }
                }
                REFORGES.forEach(reforge => {
                    real_name = real_name.replace(reforge, "")
                })
                if (real_name == "HurricaneBowx") {
                    real_name = "HurricaneBow"
                }
                b_real = real_name;
                if (real_name.includes("Lvl")){
                    real_name += auction['tier'];
                }
                if (auction["item_name"].includes("100")){
                    real_name += "100";
                }
                
                if (!(items.has(real_name))){
                    items.set(real_name, [])
                }

                items.get(real_name).push(new ahInfo(auction["starting_bid"], auction.uuid, auction["item_name"], auction['tier'], b_real))
            }
        });
        console.log("Page loaded", i)
        resolve()
    }))
    }
    await Promise.all(promises)
    STATUS.innerText = "Calculating Flips...";
    profitable_flips = []
    promises = []
    console.log(items.size)
    items.forEach (async (item, name) => {
        promises.push(
            new Promise( (resolve, reject) => {
                item.sort((a, b) => a.price - b.price)
                if (item.length < STOCKMIN){} else{
                    let im;
                    try {im = itemTable.get(item[0].real).image} catch {im = "https://nmsr.nickac.dev/headiso/b341f7f22c7a4a2d9c50816a8e6759e8"}
                    let price;

                    if (name.startsWith("Lvl")){
                        let level = "1"
                        if (name.endsWith("100")){level = "100"}
                        try{
                            //console.log(SHORTENRARITY[item[0].rarity.toLowerCase()] + level, item[0].real)
                            price = itemTable.get(item[0].real)[SHORTENRARITY[item[0].rarity.toLowerCase()] + level]
                        } catch{
                            price = 1000000000;
                        }
                        
                    } else { try{price = itemTable.get(name).price} catch {price = 1000000000}}
                    var flip = new ahFlip(item[0], item[0].price, Math.min(item[1].price, price), im)
                    if (flip.profit >= PROFITMIN && flip.percent >= PERMIN && TierToNum[item[0].rarity] >= TierToNum[item[1].rarity]){
                        profitable_flips.push(flip)
                    }
                    
            } resolve()
                
        })
        )
        
    })
    await Promise.all(promises)

    CONTAINER.innerHTML = "";
    console.log(profitable_flips.length)
    profitable_flips.sort((a, b) => {if (SORTTYPE == "profit"){return b.profit - a.profit}if (SORTTYPE == "margin"){return b.percent - a.percent}else {var textA = a.info.name.toUpperCase();var textB = b.info.name.toUpperCase();return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;}})
    for (flip of profitable_flips){
        flip.createWidget();
    }
    var buttons = document.querySelectorAll('.copy-button');
    buttons.forEach(function(button) {
        ahFlip.createButtonListener(button);
    });
    if (profitable_flips.length == 0){
        CONTAINER.innerHTML = "<p>No Snipe Flips Found :(</p>"
    } else {
        ding.play()
    }
    STATUS.innerText = "Waiting...";
}

async function useParams(){
    const furn = document.getElementById("hide-furniture").checked;
    const pet_skins = document.getElementById("hide-furniture").checked;
    const dungeon = document.getElementById("hide-furniture").checked;
    const dragon = document.getElementById("hide-furniture").checked;

    const mprof = document.getElementById("minimum-profit").value;
    const mper = document.getElementById("minimum-percentage").value;
    const mstock = document.getElementById("minimum-stock").value;

    const sort = document.getElementById("dropdown-select").value;

    findFlips(furn, pet_skins, dungeon, dragon, mprof, mper/100, mstock, sort, pages)
}

async function main(){
    STATUS.innerText = "Loading item data..."
    await getItemTable()
    STATUS.innerText = "Waiting..."
    

    let last = 0;
    
    setInterval(async () => {
        let resp = await fetch(API)
        let json = await resp.json()
        console.log(json.lastUpdated != last, document.getElementById("toggle-button").checked, json.lastUpdated, last, "RELOADING")
        if (json.lastUpdated != last && document.getElementById("toggle-button").checked){
            last = json.lastUpdated;
            pages = json.totalPages;
            STATUS.innerText = "Getting total page count...";
            
            useParams()
        }
    }, 400)
    
}

main();
