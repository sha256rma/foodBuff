//takes in item price as int and converts to USD

export function intToUSD(price) {
    return price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}