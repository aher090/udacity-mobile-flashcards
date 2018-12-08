import React, { Component } from 'react'
import {
	Alert,
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	TextInput,
} from 'react-native'
import { connect } from 'react-redux'
import { createDeck } from '../utils/api'
import { addDeck } from '../actions/'

class NewDeck extends Component {
	state = {
		text: null,
	}

	submitDeck = () => {
		const { decks } = this.props
		const deck = this.state.text

		if (deck === null) {
			Alert.alert('Required', 'Deck should have a title')
			return
		}

		if (decks[deck]) {
			Alert.alert('Error', 'Deck Already Exists')
			return
		} else {
			const newDeck = {
				[deck]: { title: deck, questions: [] },
			}
			return createDeck(newDeck)
				.then(deck => this.props.dispatch(addDeck(newDeck)))
				.then(() => {
					this.props.navigation.navigate('DeckList')
				})
				.catch(error => {
					console.log(error)
				})
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.inputBox}>
					<Text style={styles.text}>
						What is the title of your new deck?
					</Text>
					<TextInput
						value={this.state.text}
						style={styles.input}
						onChangeText={text => this.setState({ text })}
						placeholder={'Type Deck Title Here'}
						returnKeyType={'done'}
					/>
					<TouchableOpacity
						onPress={this.submitDeck}
						style={styles.button}
					>
						<Text style={styles.buttonText}>Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
		backgroundColor: 'white',
	},
	text: {
		color: 'black',
		fontSize: 36,
		textAlign: 'center',
	},
	input: {
		width: 250,
		height: 50,
		padding: 8,
		borderWidth: 3,
		borderColor: 'black',
		backgroundColor: '#fff',
		margin: 30,
	},
	button: {
		backgroundColor: 'gray',
		padding: 8,
		borderRadius: 3,
	},
	buttonText: {
		color: 'white',
		fontSize: 22,
	},
	inputBox: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
})

const mapStateToProps = state => {
	return {
		decks: state,
	}
}

export default connect(mapStateToProps)(NewDeck)
