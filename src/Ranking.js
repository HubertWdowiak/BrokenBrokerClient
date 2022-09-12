import { useState } from 'react';
import { useEffect } from 'react';

export default function RankingTable(){

    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        fetch('http://brokenbroker-env.eba-nhi4mdhu.eu-central-1.elasticbeanstalk.com/Player/ranking')
        .then(response => {return response.json()})
        .then(response => {setRanking(response)})},
        [])
    
    const rows = [];
    ranking.forEach((person, idx) => {
        rows.push(<RankingRow 
            rank={idx+1}
            person={person}
            key={idx} />)
    });

    return(
        <table>
        <thead>
            <tr><th className='topRow' colSpan={3}>PLAYER RANKING</th></tr>
            <tr>
                <th>RANKING</th>
                <th>NAME</th>
                <th>TOTAL BALANCE</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
        </table>
    )
}

function RankingRow({rank, person}){
    return(
        <tr>
            <td>{rank}</td>
            <td>{person.name}</td>
            <td>{"$" + person.balance}</td>
        </tr>
    )
}