export function FormatMoney(amountCents){
    return `₹${amountCents.toLocaleString('en-IN')}`;
}