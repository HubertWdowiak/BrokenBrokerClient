import RankingTable from './Ranking'
import CoinPairTable from './CoinPairs'
import TransactionTable from './Transactions';
import NavigationBar from './NavigationBar';
import { useState } from 'react';

  export default function App() {
    const [transactions, setTransactions] = useState([]);

    return <div>
        <NavigationBar/>
        <div id={'wrapper'}>
            <div id='pairs'><CoinPairTable className='container' setTransactions={setTransactions}/></div>
            <div id='ranking'><RankingTable/></div>
        </div>
        <div id='transactions'>
            <TransactionTable transactions={transactions} setTransactions={setTransactions}/>
        </div>
    </div>
  }
  