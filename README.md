
# Udacity Mobile FlashCards Project


React Native Udaciy Mobile Flashcard Project [tested in expo for android]

## Features

Users are able to :
- [x] View a list of cards (Deck View)
- [x] Create a new deck (New Deck)
- [x] Add cards to a deck
- [x] Start a quiz

## Start Up App

To start up the app please do the following:

- `Git clone https://github.com/aher090/udacity-mobile-flashcards.git`
- Make sure to `npm install` & `npm start`
- It will show developer tool on the browser for expo
- From there you can connect the android device through the tunnel


## Additional Information

- Used `create-react-native-app` to bootstrap this project
- Used Iconicons & FontAwesome icons from `@expo/vector-icons`
- Redux was applied, and used mainly for passing the decks, you can see the API setup for this in `utils` folder
- There may be some extra `sudo` commands that you will need to apply before successfully starting the simulator if this is the first time starting up or setting up a react native app
- AsyncStorage is used to store data, you can clear the device on the simulator if you want to erase any additional decks you created, however, there are two default decks always setup initially: `JavaScript` and `React` as demoed in the project details
- Local Push Notificiations is added, couldn't test it on expo




