# VOICE OF CRYPTO

voice of crypto is an application for Alexa that allows you to get information about the prices of cryptocurrencies directly from Coinmarketcap

### Installation
1. **Make sure** you are running the latest version of the CLI

	```bash
	npm update -g ask-cli
	```

2. **Clone** the repository and navigate into the skill's root directory.

	```bash
	git clone https://github.com/allemanfredi/voice-of-crypto 
    cd voice-of-crypto
	```

3. Install npm dependencies by navigating into the `/lambda/custom` directory and running the npm command: `npm install`.

	```bash
	cd lambda/custom
	npm install
	```

### Deployment

ASK CLI **will create the skill and the Lambda function for you**. The Lambda function will be created in ```us-east-1 (Northern Virginia)``` by default.

1. Navigate to the project's root directory. you should see a file named 'skill.json' there.
2. Deploy the skill and the Lambda function in one step by running the following command:

	```bash
	ask deploy
	```