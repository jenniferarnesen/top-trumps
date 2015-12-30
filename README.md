# top-trump informal learning game

This game was the result of a two day hackathon where we tried to create a
learning-based game. The idea of the cards was based on the observation that
kids love trading Pokemon cards, and certain cards are more valuable than
others. And the fact that kids can often recite every detail of the cards
they own, as well as the ones they don't own.

The intention was that the cards should sneakily introduce learning
(e.g., geography, politics). However, due to the nature of the developers
who developed the hackathon project, it currently doesn't have any learning,
but instead tends to mock older people. An upcoming version will
introduce actual learning cards.

Eventually I also want to introduce actual card trading.

# Get developing and playing

* npm install
* npm start (runs on localhost:4500)

npm start will start up lite-server and automatically open index.html in a browser. The second
player also needs to open localhost:4500 in their browser.

This is a two-player game. Find someone to play with, and each player goes to the webpage.
The first player needs to send the second player their id they have been given. The second player
pastes player 1's id into the input box and clicks "Connect". Waala. The two players
should now be connected on a peer network using WebRTC (Massive credit to PeerJS)

In the current game, each player receives a card with an old geezer, stating the geezer's
age and height. The player who gets to go first ("Your go!") can gamble on
either age or height by clicking that area of the card. The player with the highest value
for the gambled property receives a point and gets to gamble again.

That's it. Pretty rudimentary at the moment.

## Image idea:
http://ecx.images-amazon.com/images/I/710TJ2sg9sL._SL1500_.jpg




