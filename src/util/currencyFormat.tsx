const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
});

export default function currencyFormatter(number: number) {
    return formatter.format(number);
}
