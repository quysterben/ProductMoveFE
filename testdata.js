

export const lots = [
    {
    id: 1,
    model: "iPhone 12",
    storage_id: 2,
    amount: Math.floor(Math.random() * 100) + 1
    },
    {
    id: 2,
    model: "iPhone 12 promax",
    storage_id: 1,
    amount: Math.floor(Math.random() * 101)
    },
    {
    id: 3,
    model: "iPhone 12 pro",
    storage_id: 1,
    amount: Math.floor(Math.random() * 100) + 1
    },
    {
    id: 4,
    model: "iPhone 13",
    storage_id: 3,
    amount: Math.floor(Math.random() * 100) + 1
    },
    {
    id: 5,
    model: "iPhone 13 pro",
    storage_id: 3,
    amount: Math.floor(Math.random() * 100) + 1
    },
    {
    id: 6,
    model: "iPhone 13 promax",
    storage_id: 2,
    amount: Math.floor(Math.random() * 100) + 1
    },
    {
    id: 7,
    model: "iPhone 14 promax deep purple 1TB",
    storage_id: 1,
    amount: Math.floor(Math.random() * 100) + 1
    },
    {
    id: 8,
    model: "iPad Pro",
    storage_id: 3,
    amount: Math.floor(Math.random() * 100) + 1
    },
    {
    id: 9,
    model: "iPad Air",
    storage_id: 2,
    amount: Math.floor(Math.random() * 100) + 1
    },
    {
    id: 10,
    model: "iPad Gen 9th",
    storage_id: 1,
    amount: Math.floor(Math.random() * 100) + 1
    },
    {
    id: 11,
    model: "iPad Gen 10th",
    storage_id: 1,
    amount: Math.floor(Math.random() * 100) + 1
    },
    {
    id: 12,
    model: "MacBook Air M1",
    storage_id: 3,
    amount: Math.floor(Math.random() * 100) + 1
    },
    {
    id: 13,
    model: "MacBook Air M2",
    storage_id: 1,
    amount: Math.floor(Math.random() * 100) + 1
    },
    {
    id: 14,
    model: "MacBook Pro 13",
    storage_id: 2,
    amount: Math.floor(Math.random() * 100) + 1
    },
    {
    id: 15,
    model: "MacBook Air 13",
    storage_id: 2,
    amount: 15
    },
    {
    id: 16,
    model: "MacBook Air 13",
    storage_id: 2,
    amount: 33
    },
]


const product = () => {
    var ps = []
    for (let i = 0; i < lots.length; i++) {
        var lot_number = lots[i].id
        var model = lots[i].model
        var storage_id = lots[i].storage_id
        var product_line = getProductLine(lots[i].model)
        for (let j = 0; j < lots[i].amount; j++) {
            ps.push({
                id: genRandonString(10),
                lot_number: lot_number,
                name: model,
                product_line: product_line
            })
        }
    }
    // console.log(ps)
    return ps
}
export const products = product()

function getProductLine(model) {
    if (model.includes("MacBook")) {
        return 'macintosh'
    } else if (model.includes('iPad')) {
        return 'ipad'
    } else {
        return 'iphone'
    }
}

function genRandonString(length) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    var charLength = chars.length;
    var result = '';
    for ( var i = 0; i < length; i++ ) {
       result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
 }