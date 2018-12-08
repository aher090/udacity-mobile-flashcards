import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

class QuizView extends Component {
    state = {
        questionsIndex: 0,
        correct: 0,
        showAnswer: false,
    }

    showAnswer = () => {
        this.setState(state => ({ showAnswer: !state.showAnswer }))
    }

    startQuiz = () => {
        this.setState({ questionsIndex: 0, correct: 0, showAnswer: false })
    }

    backToDeck = () => {
        this.props.navigation.goBack()
    }

    answerCorrect = () => {
        this.setState(state => ({
            correct: state.correct + 1,
            questionsIndex: state.questionsIndex + 1,
            showAnswer: false,
        }))
    }

    answerIncorrect = () => {
        this.setState(state => ({
            questionsIndex: state.questionsIndex + 1,
            showAnswer: false,
        }))
    }

    renderShowQuestion = (questions, questionsIndex) => {
        return (
            <View style={styles.questionBox}>
                <Text style={styles.answerTitleText}>
                    {questions[questionsIndex].answer}
                </Text>

                <TouchableOpacity onPress={this.showAnswer}>
                    <Text style={styles.questionText}>Show question</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderShowAnswer = (questions, questionsIndex) => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.questionTitleText}>
                    {questions[questionsIndex].question}
                </Text>

                <TouchableOpacity onPress={this.showAnswer}>
                    <Text style={styles.answerText}>Show answer</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderQuestionsLeft = (questionsLeft, questionsLength) => {
        return (
            <View>
                <View>
                    <Text>
                        {questionsLeft} / {questionsLength}
                    </Text>
                </View>
            </View>
        )
    }

    renderButtons = () => {
        return (
            <View style={styles.quizViewBox}>
                <TouchableOpacity
                    style={[styles.button, styles.correct]}
                    onPress={this.answerCorrect}
                >
                    <Text style={styles.correctText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.incorrect]}
                    onPress={this.answerIncorrect}
                >
                    <Text style={styles.incorrectText}>Incorrect</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderQuizSummary = (correct, questionsLength) => {
        return (
            <View style={styles.container}>
                <Text style={styles.summaryText}>
                    Score: {Number(correct / questionsLength * 100).toFixed()}%
                </Text>

                <View
                    style={[
                        {
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            flex: 2,
                        },
                    ]}
                >
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={[styles.button, styles.extraBtn]}
                            onPress={this.startQuiz}
                        >
                            <Text style={styles.startQuizTitle}>
                                Restart Quiz
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.extraBtn]}
                            onPress={this.backToDeck}
                        >
                            <Text style={styles.backTitle}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        const { questions, title } = this.props.navigation.state.params
        const { questionsIndex, showAnswer, correct } = this.state
        const questionsLength = questions.length
        const questionsLeft = questionsLength - questionsIndex

        const questionsAvailable = questionsIndex < questionsLength
        return (
            <View style={{ flex: 1 }}>
                {questionsAvailable ? (
                    <View style={styles.container}>
                        <View style={styles.group}>
                            {this.renderQuestionsLeft(
                                questionsLeft,
                                questionsLength,
                            )}
                        </View>

                        <View style={styles.groupTwo}>
                            <View>
                                {showAnswer ? (
                                    <View>
                                        {this.renderShowQuestion(
                                            questions,
                                            questionsIndex,
                                        )}
                                    </View>
                                ) : (
                                    <View style={{ alignItems: 'center' }}>
                                        {this.renderShowAnswer(
                                            questions,
                                            questionsIndex,
                                        )}
                                    </View>
                                )}
                            </View>
                        </View>

                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                flex: 2,
                            }}
                        >
                            {this.renderButtons()}
                        </View>
                    </View>
                ) : (
                    <View style={styles.container}>
                        {this.renderQuizSummary(correct, questionsLength)}
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: 'white',
    },
    quizViewBox: {
        margin: 20,
        alignItems: 'center',
    },
    group: { justifyContent: 'flex-start', flex: 1 },
    groupTwo: { flex: 4 },
    button: {
        padding: 10,
        borderRadius: 2,
        height: 60,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        width: 250,
        height: 60,
    },
    questionTitleText: { fontSize: 36 },
    questionText: {
        fontSize: 18,
        color: 'green',
    },
    questionBox: { alignItems: 'center' },
    answerText: {
        fontSize: 18,
        color: 'red',
    },
    answerTitleText: {
        fontSize: 36,
        textAlign: 'center',
    },
    correct: {
        backgroundColor: 'green',
    },
    correctText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
        textAlign: 'center',
        padding: 0,
        borderRadius: 2,
    },
    incorrect: {
        backgroundColor: 'red',
    },
    incorrectText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
        padding: 0,
        borderRadius: 2,
    },
    backTitle: {
        color: 'black',
        fontSize: 22,
        textAlign: 'center',
    },
    startQuizTitle: {
        color: 'black',
        fontSize: 22,
        textAlign: 'center',
        padding: 0,
        borderRadius: 2,
    },
    extraBtn: {
        borderColor: 'black',
        padding: 10,
        borderWidth: 3,
    },
    summaryText: {
        color: 'black',
    },
})

function mapStateToProps(data, {navigation}) {
    const { title, restartQuiz } = navigation.state.params;
    return {
        decks: data,
        restartQuiz,
        questions: data[title].questions
    }
}

export default connect(mapStateToProps)(QuizView)
