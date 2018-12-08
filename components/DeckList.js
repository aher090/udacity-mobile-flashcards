import React, { Component } from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Dimensions,
	FlatList,
	Text,
} from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import SingleDeck from './SingleDeck'

class DeckList extends Component {
	componentDidMount() {
		const { dispatch } = this.props
		fetchDecks()
			.then(decks => {
				return dispatch(getDecks(decks))
			})
			.catch(error => {
				console.log(error)
			})
	}

	// works if using = and arrow function
	renderItem = ({ item }) => (
		<View style={styles.item}>
			<TouchableOpacity
				onPress={() => this.props.navigate('IndividualDeck', item)}
			>
				<SingleDeck title={item.title} questions={item.questions} />
			</TouchableOpacity>
		</View>
	)

	render() {
		let data = Object.values(this.props.decks).sort(
			(a, b) => a.title > b.title,
		)

		return (
			<View style={styles.container}>
				<FlatList
					data={data}
					renderItem={this.renderItem}
					keyExtractor={(item, index) => item.title}
				/>
			</View>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
		decks: state,
		navigate: ownProps.navigation.navigate,
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: Dimensions.get('window').height,
		backgroundColor: 'white',
		padding: 20,
	},
	deck: {
		width: 400,
		margin: 0,
		padding: 0,
	},
})

export default connect(mapStateToProps)(DeckList)
