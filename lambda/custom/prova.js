const CoinMarketCap = require('coinmarketcap-api');
 
const apiKey = 'be3a4589-047a-43ad-9a35-726b654b5ba1';
const client = new CoinMarketCap(apiKey)

client.getTickers({start: 1, limit: 5}).then( x => {
    x.data.forEach(y => console.log(y.quote.USD))
}).catch(console.error)
