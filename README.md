[![Build Status](https://travis-ci.org/binary-com/binary-bot.svg?branch=beta)](https://travis-ci.org/binary-com/binary-bot)		
[![Coverage Status](https://coveralls.io/repos/github/binary-com/binary-bot/badge.svg?branch=beta)](https://coveralls.io/github/binary-com/binary-bot?branch=beta)

# Binary Bot

Visual automation for binary.com [bot.binary.com](https://bot.binary.com)

Visit [wiki](https://github.com/binary-com/binary-bot/wiki) for more info.

## Development

```
git clone https://github.com/binary-com/binary-bot.git
cd binary-bot
npm install
npm start
```

## Deployment 

```
gulp test-deploy
npm run deploy
```

## To update to latest version

```
git pull
npm install
```

## Running the CLI command

```
npm i -g binary-bot
bot -h // For a quick help
bot bot-example.js
```

### Running with a specific endpoint
**Use only if you know what you're doing**

```
ENDPOINT='wss://ws.binaryws.com/websockets/v3?l=en&app_id=1169' bot bot-example.js
```

### CLI examples:
[`speed-test.js`](/cli-examples/speed-test.js)

## Think you found a bug?

There's a chance that we already know about it and doing our best to fix it. To find out you can search our [GitHub issues](https://github.com/binary-com/binary-bot/issues)

Not satisfied yet? Please create a new issue, and explain to us what is the nature of the problem and how to reproduce [here](https://github.com/binary-com/binary-bot/issues/new)

## We'd love to hear from you

Please send us your inquiries through marketing@binary.com

## Sample Blocks

[Misc. Examples](https://gist.github.com/aminmarashi/dfabc8eadfaf77bf270b0318f03ea8bb)

[Price Actions](https://gist.github.com/aminmarashi/094961982556d36639b9055a1d40ec06)

[Risk Management](https://gist.github.com/aminmarashi/0feb52b5802519cd4157b612d9bd3471)

[Money Management](https://gist.github.com/aminmarashi/8cfc8554f894311e9a80480d28882bf2)

[Tools](https://gist.github.com/aminmarashi/7cd7be9f3ce9004de767f4d4f6a6c5a0)

[Random Uploads](https://gist.github.com/aminmarashi/09d5aa04eef3bd372264da6044355805)

### Binary Bot Gist
Find all above sample blocks and more in [here](https://gist.github.com/aminmarashi)

**Disclaimer**: _All the files and codes in the above links are intended for educational and informational purposes only. They should not be construed as giving investment advice, and you should not rely on them as your singular factor in making or refraining from making any investment decisions. Binary.com accepts no liability whatsoever for any losses incurred by users in their trading. Binary options trading may incur losses as well as gains._


