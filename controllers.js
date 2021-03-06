app.controller('MainController',
    function ($scope, $timeout, GameEvents, Utils, Storage, Connection) {
        var callbacks = {
                onRegisterIdWithPeerServer: function (id) {
                    $scope.myId = id;
                    $scope.status = 'You are registered as ' + id;
                    $scope.$apply();
                },

                onPeerConnectToYou: function (conn) {
                    $scope.connected = true;

                    conn.send({
                        'type': 'turnCheck',
                        'value': $scope.myGo
                    });

                    $scope.status = 'Opponent connected to you!';
                    $scope.$apply();
                },

                onDataReceivedFromPeer: function (data) {
                    $scope.status = 'Data receieved from opponent';

                    switch (data.type) {
                        case 'turnCheck':
                            // Check whose turn it is against the handshake data
                            // hacky as shit but it fucking well works :)
                            $scope.myGo = !data.value;
                            break;

                        case 'card':
                            $scope.$emit(GameEvents.CARD_RECEIVED_FROM_OPPONENT, data.value);
                            break;
                    }

                    $scope.$apply();
                },

                onConnectionToPeerSuccess: function (conn) {
                    $scope.status    = 'Connected to ' + conn.peer;
                    $scope.connected = true;
                    $scope.$emit(GameEvents.READY_TO_PLAY);
                    $scope.$apply();
                }
            },

            flipOpponentsCard = function (show) {
                show = show || false;
                angular.element(document.body).toggleClass('property-chosen', show);
            },

            sendCard = function () {
                $scope.status = 'Sending a card';

                Connection.sendData('card', $scope.myCard);
            }

            nextTurn = function (wonLastRound) {
                flipOpponentsCard();

                $scope.win    = null;
                $scope.myGo   = wonLastRound;
                $scope.myCard = Utils.makeCard();
            },

            handleResult = function (didIwin) {
                var winner = didIwin ? 'me' : 'opponent';

                $scope.scores[winner] += 1;

                $scope.state = didIwin ? 'You win' : didIwin === null ? 'You drew' : 'You lost';

                $scope.status = $scope.state;

                // Do we need to celebrate for too long?
                $timeout(function () {
                    nextTurn(didIwin);
                }, 1500);
            },

            init = function () {
                // Create your first card.
                $scope.myCard         = Utils.makeCard();
                $scope.myGo           = false;
                $scope.connected      = false;
                $scope.scores = {
                    'me': 0,
                    'opponent': 0
                };

                // It might not exist in storage, but if it does the last person you played will be already
                // entered in the connection id input.
                // You can clear out the storage if it's annoying you. See below for more detail.
                // Just uncomment the following line.
                // Storage.clear();
                $scope.opponentId = Storage.retrieveStoredIds().opponentId;
            },

            bindEvents = function () {
                $scope.$on(GameEvents.READY_TO_PLAY, function (event) {
                    $scope.status = 'Opponent is ready to play';
                });

                $scope.$on(GameEvents.PROPERTY_CHOSEN, function (event, propertyName) {
                    if ($scope.myGo) {
                        $scope.status = 'You chose to play with ' + propertyName;
                        $scope.myCard.chosenProperty = propertyName;
                        sendCard();
                    }
                });

                $scope.$on(GameEvents.CARD_RECEIVED_FROM_OPPONENT, function (event, cardData) {
                    // Setting the opponent card is important for the opponent's card
                    // to display correctly in it's card directive.
                    $scope.opponentCard = cardData;

                    flipOpponentsCard(true);

                    // Avoid an infinite loop yes :)
                    if (!$scope.myGo) {
                        sendCard();
                    }

                    Utils.calculateWinner(
                        $scope.myGo ? $scope.myCard.chosenProperty : cardData.chosenProperty,
                        cardData.cardDetails,
                        $scope.myCard.cardDetails
                    ).then(handleResult);
                });
            };

        // Click connect button and fire this
        $scope.connect = function (opponentId) {
            $scope.opponentId = Connection.connectToPeer(opponentId);

            $scope.status = 'Connecting to ' + opponentId;
            $scope.myGo = true;
        };

        // Setup our connection events
        Connection.init(callbacks);

        // Setup our game
        init();
        bindEvents();
    }
);
