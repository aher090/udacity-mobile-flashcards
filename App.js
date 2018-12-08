import React, { Component } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import store from './store'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import IndividualDeck from './components/IndividualDeck'
import QuizView from './components/QuizView'
import NewQuestionView from './components/NewQuestionView'
import EmptyQuestions from './components/EmptyQuestions'
import { Constants } from 'expo'
import { Container } from 'native-base'
import { createAppContainer } from 'react-navigation';
import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck View',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-albums" size={40} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: 'black',
      style: {
        height: 56,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  IndividualDeck: {
    screen: IndividualDeck,
    navigationOptions: ({ navigation }) => ({
      title: 'Deck details',
      headerTintColor: '#000',
    }),
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: ({ navigation }) => ({
      title: 'Quiz',
      headerTintColor: '#000',
    }),
  },
  NewQuestionView: {
    screen: NewQuestionView,
    navigationOptions: ({ navigation }) => ({
      title: 'Add a question',
      headerTintColor: '#000',
    }),
  },
  EmptyQuestions :{
    screen: EmptyQuestions,
    navigationOptions: ({ navigation }) => ({
      title: 'Alert',
      headerTintColor: '#000',
    }),
  }
})

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <Container style={{flex:1}}>
          <UdaciStatusBar backgroundColor={'white'} barStyle="light-content" />
          <AppContainer />
        </Container>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
