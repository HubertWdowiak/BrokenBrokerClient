import { useEffect } from 'react';

export default function TransactionTable({transactions, setTransactions}){

    useEffect(() => {
        fetch('http://brokenbroker-env.eba-nhi4mdhu.eu-central-1.elasticbeanstalk.com/transactions')
        .then(response => {return response.json()}).
        then(response => {setTransactions(response)})},
        [])

    const rows = [];
    transactions.forEach((transaction) => {
        var transactionType = null
        if(transaction.coins >= 0){
            transactionType = "Buy"
        } else {
            transactionType = "Sell"
        }
        rows.push(
            <TransactionRow
            type={transactionType}
            transaction={transaction}
            key={transaction.id} />
        );
    });
    
    return (
        <table>
            <thead>
                <tr><th className='topRow' colSpan={6}>TRANSACTIONS</th></tr>
                <tr>
                    <th>DATE</th>
                    <th>TYPE</th>
                    <th>COIN</th>
                    <th>AMOUNT</th>
                    <th>MARKET PRICE</th>
                    <th>$$$</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}
function TransactionRow({transaction, type}){
    const rows = []
    return(
        <tr className={type}>
            <td>{transaction.time}</td>
            <td>{type}</td>
            <td>{transaction.coinName}</td>
            <td>{(Math.round(transaction.coins * 100) / 100).toFixed(2)}</td>
            <td>{transaction.coinPrice}</td>
            <td>{-(Math.round(transaction.coinPrice * transaction.coins * 100) / 100).toFixed(2)}</td>
        </tr>
    )
} 