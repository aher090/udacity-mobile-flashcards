import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native'

import { addCardToDeck } from '../utils/api'

class NewQuestionView extends Component {
    state = {
        question: null,
        answer: null,
    }

    addNewCard = () => {
        const { question, answer } = this.state
        const deckTitle = this.props.navigation.state.params.title
        const card = { question, answer }
        if (question === null || answer === null) {
            Alert.alert('Required', 'Card should have question and answer')
        } else {
            console.log(JSON.stringify(this.props.navigation.state.params, 2, null))
            addCardToDeck({ card, deckTitle }).then(() => {
                this.props.navigation.navigate('IndividualDeck', {
                    title: deckTitle,
                    questions: this.props.navigation.state.params,
                })
            })
        }
    }

    render() {
        const title = this.props.navigation.state.params.title
        return (
            <View style={styles.container}>
                <View style={styles.titleBox}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>What is the your question?</Text>
                    <View>
                        <TextInput
                            value={this.state.question}
                            style={styles.input}
                            onChangeText={question =>
                                this.setState({ question })}
                            placeholder={'Type Question Here'}
                            returnKeyType={'done'}
                        />
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>What is your answer?</Text>

                    <TextInput
                        value={this.state.answer}
                        style={styles.input}
                        underlineColorAndroid={'transparent'}
                        onChangeText={answer => this.setState({ answer })}
                        placeholder={'Type Answer Here'}
                        returnKeyType={'done'}
                    />
                </View>
                <TouchableOpacity
                    onPress={this.addNewCard}
                    style={[styles.button, styles.submit]}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
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
        fontSize: 22,
    },
    input: {
        width: 250,
        height: 50,
        padding: 8,
        borderWidth: 3,
        borderColor: 'black',
        backgroundColor: '#fff',
        textAlignVertical: 'center',
    },
    button: {
        backgroundColor: 'gray',
        padding: 8,
        borderRadius: 3,
        margin: 40,
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
    },
    submit: {
        margin: 50,
    },
    box: { margin: 20 },
    titleBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 36,
        color: 'black',
    },
})

function mapStateToProps(state) {
    return {
        decks: state,
    }
}

// function mapDispatchToProps()

export default connect(mapStateToProps)(NewQuestionView)
