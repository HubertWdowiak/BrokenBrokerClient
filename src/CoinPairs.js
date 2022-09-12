import { useState } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';

export default function CoinPairTable({setTransactions}){
    const [pairs, setPairs] = useState([]);
    const rows = []

    const fetchData = () => {
    fetch('http://brokenbroker-env.eba-nhi4mdhu.eu-central-1.elasticbeanstalk.com/pairs')
    .then(response => {return response.json()}).
    then(response => {setPairs(response)})
    
    fetch('http://brokenbroker-env.eba-nhi4mdhu.eu-central-1.elasticbeanstalk.com/transactions')
    .then(response => {return response.json()}).
    then(response => {setTransactions(response)})}

    useEffect(() => {
       fetchData()}, 
       [])    
      
    pairs.forEach((pair) => {
        rows.push(
            <CoinPairRow
            pair={pair}
            key={pair.apiName} 
            update_function={fetchData}/>
        );
    });
    
    return (
        <table>
        <thead>
            <CoinPairHeaderRow/>
        </thead>
        <tbody>{rows}</tbody>
        </table>
    );
}

function CoinPairHeaderRow(){
    return(
        <Fragment>
        <tr>
            <th className='topRow' colSpan={6}>BROKE BROKER MARKET</th>
        </tr>
        <tr>
            <th>COIN</th>
            <th>BALANCE</th>
            <th></th>
            <th></th>
            <th></th>
            <th>MARKET PRICE</th>
        </tr>
        </Fragment>
    )
}

function CoinPairRow({pair, update_function}){

    const [amount, setAmount] = useState([0]);

    if(pair.apiName === 'usdc-usd-coin'){
        return(
        <tr className='usd-row'>
            <td>USDC</td>
            <td>{pair.balance}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>{"$" + (Math.round(pair.marketPrice * 100) / 100).toFixed(2)}</td>
        </tr>
        )
    }

    const buyRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Mode': 'cors'},
        body: JSON.stringify({amount: amount, coinName: pair.apiName})
    };
    const requestBuy = async () => {
        if(amount < 0){
            alert('Value must be positive')
            setAmount(-amount);
        } else {
            const response = await fetch('http://brokenbroker-env.eba-nhi4mdhu.eu-central-1.elasticbeanstalk.com/Transaction/make/', buyRequestOptions);
            update_function()
        }
    }

    const sellRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Mode': 'cors'},
        body: JSON.stringify({amount: -amount, coinName: pair.apiName})
    };
    const requestSell = async () => {
        if(amount < 0){
            alert('Value must be positive')
            setAmount(-amount);
        } else {
            const response = await fetch('http://brokenbroker-env.eba-nhi4mdhu.eu-central-1.elasticbeanstalk.com/Transaction/make/', sellRequestOptions);
            update_function()
        }
    }

    return(
        <tr>
            <td>{pair.apiName}</td>
            <td>{pair.balance}</td>
            <td><input placeholder="$0.00" value={amount} onChange={(e) => setAmount(e.target.value)}/></td>
            <td><button className="buyButton" onClick={requestBuy}>BUY</button></td>
            <td><button className="sellButton" onClick={requestSell}>SELL</button></td>
            <td>{"$" + (Math.round(pair.marketPrice * 100) / 100).toFixed(2)}</td>
        </tr>
    )
} 