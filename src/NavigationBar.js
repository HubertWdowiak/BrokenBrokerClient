import { useState } from 'react';
import { useEffect } from 'react';


export default function NavigationBar(){
    const [balance, setBalance] = useState([]);
    const [rank, setRank] = useState([]);

    const fetchBalance = () => 
        fetch('http://brokenbroker-env.eba-nhi4mdhu.eu-central-1.elasticbeanstalk.com/Player/balance')
        .then(response => {return response.json()})
        .then(response => {setBalance((Math.round(response * 100) / 100).toFixed(2))})

    const fetchRank = () => 
        fetch('http://brokenbroker-env.eba-nhi4mdhu.eu-central-1.elasticbeanstalk.com/Player/rank')
        .then(response => {return response.json()})
        .then(response => {setRank(response)})
    

    useEffect(() => {
        fetchBalance()
        fetchRank()}, 
        [])

    return(
        <nav className="navMenu">
            <a id='totalBalance'>TOTAL BALANCE: ${balance}</a>
            <a id='rank'>Rank: {rank}</a>
            <a id='logout' href="#">Logout</a>
      </nav>
    )

}