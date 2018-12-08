import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, View, StyleSheet, Text, TouchableOpacity } from 'react-native'

class IndividualDeck extends Component {
    
    render() {
        const { title, questions } = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.questionLengthTitle}>
                        {questions.length} cards
                    </Text>
                </View>

                <View style={styles.individualDeckBox}>
                    <TouchableOpacity
                        style={[styles.addCard, styles.button]}
                        onPress={() =>
                            this.props.navigation.navigate('NewQuestionView', {
                                title: title,
                            })}
                    >
                        <Text style={styles.addCardTitle}>Add Card</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.startQuiz, styles.button]}
                        onPress={() =>
                            questions.length ? this.props.navigation.navigate('QuizView', {
                                title: title,
                                questions: questions,
                            })
                            : this.props.navigation.navigate('EmptyQuestions')
                        }
                            
                    >
                        <Text style={styles.startQuizTitle}>Start Quiz</Text>
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
    individualDeckBox: {
        marginTop: 200,
    },
    button: {
        padding: 10,
        borderRadius: 2,
        height: 60,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 10,
    },
    addCard: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
    },
    startQuiz: {
        backgroundColor: 'black',
    },
    addCardTitle: {
        color: 'black',
        fontSize: 22,
        textAlign: 'center',
    },
    startQuizTitle: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
        padding: 0,
        borderRadius: 2,
    },
    questionLengthTitle: { fontSize: 22 },
    title: { fontSize: 36, color: 'black' },
    titleBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

function mapStateToProps(state) {
    return {
        decks: state,
    }
}

export default connect(mapStateToProps)(IndividualDeck)
