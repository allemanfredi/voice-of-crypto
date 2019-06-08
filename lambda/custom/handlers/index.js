const { phrases } = require('../phrases');
const CoinMarketCap = require('coinmarketcap-api');
 
const apiKey = 'be3a4589-047a-43ad-9a35-726b654b5ba1';
const client = new CoinMarketCap(apiKey)


module.exports.AskingByNameIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'AskingByNameIntent';
    },
    async handle(handlerInput) {
        let speechText = '';

        const currency = handlerInput.requestEnvelope.request.intent.slots.CryptoSlot.value;
        const cryptos =  await client.getTickers();

        const res = Object.entries(cryptos.data).map( ([key]) => {
            if ( cryptos.data[key].name.toLowerCase() === currency )
                return cryptos.data[key];
        });

        if ( res.length > 0 )
            speechText = 'The current price of ' + res[0].name + ' is ' + res[0].quote.USD.price + ' dollars';
        else
            speechText = currency + ' does not exists';


        return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt('')
                .withSimpleCard(phrases["en-US"].card, speechText)
                .getResponse();
    }
}

module.exports.AskingByLimitFromFirstIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'AskingByLimitFromFirstIntent';
    },
    async handle(handlerInput) {
        let speechText = '';

        const limit = handlerInput.requestEnvelope.request.intent.slots.LimitSlot.value;
        
        try{
            const cryptos =  await client.getTickers({start: 1, limit});
            cryptos.data.forEach( crypto => {
                speechText += "the " + crypto.name + 's price is ' + crypto.quote.USD.price + ' dollars .\n'
            })
        }catch(err){
            speechText = 'Limit not valid';
        }

        return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt('')
                .withSimpleCard(phrases["en-US"].card, speechText)
                .getResponse();
    }
}