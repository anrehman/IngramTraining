# Makenai Solutions Inovation and Creative Ideas Weather Bot

This is a bot that is used as a bot specific for gettting weather information and provide rating for usage:

configuration: pass settings either through environment variables on the command line, or by hardcoding some of them in the `.env` file. Note that env variable are priorized over the `env`file if values are found in both places.

healthcheck: check if everything is going well by hitting the `ping` endpoint exposed automatically. 

skills: organize your bot behaviours by placing 'hear commands', 'convos' and 'events' in the [skills directory](skills/README.md). The bot comes with a ".commons", "help", "fallback" and "welcome" skills.

## How to run

Assuming you plan to expose your bot via [ngrok](https://ngrok.com),
you can run this bot in a snatch.

1. Create a Bot Account from the ['Webex Developers' bot creation page](https://developer.ciscospark.com/add-bot.html), and copy your bot's access token.

1. Launch ngrok to expose port 3000 of your local machine to the internet:

    ```sh
    ngrok http 5015
    ```

    Pick the HTTPS address that ngrok is now exposing. Note that ngrok exposes HTTP and HTTPS protocols, make sure to pick the HTTPS address.

1.  Open the `.env` file and modify the settings to accomodate your bot.

    _Note that you can also specify any of these settings via env variables. In practice, the values on the command line or in your machine env will prevail over .env file settings_

    To successfully run your bot, you'll need to specify a PUBLIC_URL for your bot, and a Cisco Spark API token (either in the .env settings or via env variables). In the example below, we do not modify any value in settings and specify all configuration values on the command line.

    where:

    - SPARK_TOKEN is the API access token of your Cisco Spark bot
    - PUBLIC_URL is the root URL at which Cisco Spark can reach your bot
    
## Skills
    1. **help** describing the comands that it listens to
    2. **rating** to rate the bot outt of three options
    3. **weatther** to get the current weather information about a city or Madrid by default

