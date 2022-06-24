export const formatAddress = (address: string) => {
    return `${address.substring(0, 5)}...${address.substring(address.length - 5)}`
}

export const formatBalance = (amount: string) => {
    return amount
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")  // separate each 3 numbers by comma
        .replace(/\.(\d{1,2}).*$/g, '.$1');      // 2 decimals after dot
}
