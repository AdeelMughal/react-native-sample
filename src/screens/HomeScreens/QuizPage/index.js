import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AuthTemplate from '../../../containers/AuthTemplate';
import HomeTemplate from '../../../containers/HomeTemplate';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../../common/MapDisptacher';
import {
  getQuiz,
  selectedQuestion,
  addScore,
} from '../../../actions/BooksActions';
import {Yellow, Blue, lightblue, green} from '../../../common/Theme';
import {Colors} from '../../../theme';
import fonts from '../../../common/fonts';
import QuizSuccessModal from '../../../components/QuizSuccessModal';
import FastImage from 'react-native-fast-image';

import {Images, Metrics} from '../../../theme';
import BookControl from '../../../controls/BookControl';
import {QuizModal, ThemedNextButton} from '../../../controls';
import {Text} from '../../../components';
import {DataHelper, SoundHelper} from '../../../helpers';
import _ from 'lodash';
import styles from './styles';

class QuizPage extends Component {
  state = {
    currentQuestion: 0,
    wrongAnswer: false,
    selectedAnswer: '',
    rightAnswer: false,
    totalPoints: 100,
    current: {},
    perQuestionPoints: 0,
    QuizQustionsResults: {
      pointsearned: 0,
      quizQuestionsStatus: [],
    },
    modalData: {},
    visible: false,
    options: [],
    isFreeze: false,
  };

  componentDidMount() {
    let current = this.props.books?.quiz?.questions[this.state.currentQuestion];
    this.props.selectedQuestion(current);

    let shuffled = _.shuffle(current.options, 'option');

    this.setState({
      perQuestionPoints:
        this.state.totalPoints / this.props.books?.quiz?.questions.length,
      current,
      options: shuffled,
    });

    if (current.audio) {
      SoundHelper.playSoundUri(current.audio);
    }
  }

  componentWillUnmount() {
    this.setState({
      currentQuestion: 0,
      wrongAnswer: false,
      selectedAnswer: '',
      rightAnswer: false,
    });
    this.props.selectedQuestion({});
    SoundHelper.stopSound();
  }

  nextQuestion = () => {
    if (this.state.selectedAnswer !== '') {
      if (this.state.QuizQustionsResults.quizQuestionsStatus.length) {
        let quizSingleQuestionIndex = this.state.QuizQustionsResults.quizQuestionsStatus.findIndex(
          (v) =>
            v.questionNumber ==
            this.props.books.selectedQuestion.questionnumber,
        );

        if (quizSingleQuestionIndex !== -1) {
          let quizQuestionsStatus = this.state.QuizQustionsResults
            .quizQuestionsStatus;

          if (
            this.state.selectedAnswer !=
              this.props.books.selectedQuestion.answers.answer &&
            this.state.QuizQustionsResults.quizQuestionsStatus[
              quizSingleQuestionIndex
            ].AnswerStatus == true
          ) {
            quizQuestionsStatus[
              quizSingleQuestionIndex
            ].selectedAnswer = this.state.selectedAnswer;

            quizQuestionsStatus[quizSingleQuestionIndex].AnswerStatus = false;

            quizQuestionsStatus[
              quizSingleQuestionIndex
            ].questionNumber = this.props.books.selectedQuestion.questionnumber;

            this.setState({
              QuizQustionsResults: {
                pointsearned:
                  this.state.QuizQustionsResults.pointsearned -
                  this.state.perQuestionPoints,
                quizQuestionsStatus: quizQuestionsStatus,
              },
            });
          } else if (
            this.state.selectedAnswer ==
              this.props.books.selectedQuestion.answers.answer &&
            this.state.QuizQustionsResults.quizQuestionsStatus[
              quizSingleQuestionIndex
            ].AnswerStatus == false
          ) {
            quizQuestionsStatus[
              quizSingleQuestionIndex
            ].selectedAnswer = this.state.selectedAnswer;

            quizQuestionsStatus[quizSingleQuestionIndex].AnswerStatus = true;

            quizQuestionsStatus[
              quizSingleQuestionIndex
            ].questionNumber = this.props.books.selectedQuestion.questionnumber;

            this.setState({
              QuizQustionsResults: {
                pointsearned:
                  this.state.QuizQustionsResults.pointsearned +
                  this.state.perQuestionPoints,
                quizQuestionsStatus: quizQuestionsStatus,
              },
            });
          }
        } else {
          if (
            this.state.selectedAnswer !=
            this.props.books.selectedQuestion.answers.answer
          ) {
            this.setState({
              QuizQustionsResults: {
                pointsearned: this.state.QuizQustionsResults.pointsearned,
                quizQuestionsStatus: [
                  ...this.state.QuizQustionsResults.quizQuestionsStatus,
                  {
                    selectedAnswer: this.state.selectedAnswer,
                    AnswerStatus: false,
                    questionNumber: this.props.books.selectedQuestion
                      .questionnumber,
                  },
                ],
              },
            });
          } else {
            this.setState({
              QuizQustionsResults: {
                pointsearned:
                  this.state.QuizQustionsResults.pointsearned +
                  this.state.perQuestionPoints,
                quizQuestionsStatus: [
                  ...this.state.QuizQustionsResults.quizQuestionsStatus,
                  {
                    selectedAnswer: this.state.selectedAnswer,
                    AnswerStatus: true,
                    questionNumber: this.props.books.selectedQuestion
                      .questionnumber,
                  },
                ],
              },
            });
          }
        }
      } else {
        if (
          this.state.selectedAnswer !=
          this.props.books.selectedQuestion.answers.answer
        ) {
          this.setState({
            QuizQustionsResults: {
              pointsearned: 0,
              quizQuestionsStatus: [
                ...this.state.QuizQustionsResults.quizQuestionsStatus,
                {
                  selectedAnswer: this.state.selectedAnswer,
                  AnswerStatus: false,
                  questionNumber: this.props.books.selectedQuestion
                    .questionnumber,
                },
              ],
            },
          });
        } else {
          this.setState({
            QuizQustionsResults: {
              pointsearned:
                this.state.QuizQustionsResults.pointsearned +
                this.state.perQuestionPoints,
              quizQuestionsStatus: [
                ...this.state.QuizQustionsResults.quizQuestionsStatus,
                {
                  selectedAnswer: this.state.selectedAnswer,
                  AnswerStatus: true,
                  questionNumber: this.props.books.selectedQuestion
                    .questionnumber,
                },
              ],
            },
          });
        }
      }

      if (
        this.props.books.selectedQuestion.questionnumber ==
        this.props.books.quiz?.questions?.length
      ) {
        setTimeout(() => {
          let data = {
            quizid: this.props.books?.quiz?.id,
            childid: this.props.auth.user.id,
            parentid: DataHelper.getParentData().id,
            score: this.state.QuizQustionsResults.pointsearned,
          };

          this.props.addScore(data, (pass) => {
            let modalData = {
              pointsearned: this.state.QuizQustionsResults.pointsearned,
              AllAnswerStatus: this.state.QuizQustionsResults.quizQuestionsStatus.filter(
                (v) => v.AnswerStatus,
              ).length,
              totalQuestion: this.props.books.quiz?.questions?.length,
              totalPoints: this.props.books.quiz?.points,
            };
            this.setState({modalData, visible: true});
          });
        }, 500);
      } else {
        let current = this.props.books?.quiz?.questions[
          this.state.currentQuestion + 1
        ];
        let shuffled = _.shuffle(current.options, 'option');
        this.setState(
          {
            currentQuestion: this.state.currentQuestion + 1,
            wrongAnswer: false,
            selectedAnswer: '',
            rightAnswer: false,
            current,
            options: shuffled,
            isFreeze: false,
          },
          () => {
            this.props.selectedQuestion(
              this.props.books?.quiz?.questions[this.state.currentQuestion],
            );

            if (current.audio) {
              SoundHelper.playSoundUri(current.audio);
            }
          },
        );
      }
    } else {
      alert('Please select an option');
    }
  };

  goBack = () => {
    if (this.state.currentQuestion !== 0) {
      this.setState(
        {
          currentQuestion: this.state.currentQuestion - 1,
          wrongAnswer: false,
          selectedAnswer: '',
          rightAnswer: false,
        },
        () => {
          this.props.selectedQuestion(
            this.props.books?.quiz?.questions[this.state.currentQuestion],
          );
        },
      );
    } else alert("Can't go back");
  };

  checkAnswer = (answer) => {
    if (answer.id != this.props.books.selectedQuestion.answers.answer) {
      this.setState({
        wrongAnswer: true,
        selectedAnswer: answer.id,
        rightAnswer: false,
        isFreeze: true,
      });
    } else {
      this.setState({
        wrongAnswer: false,
        selectedAnswer: answer.id,
        rightAnswer: true,
        isFreeze: true,
      });
    }
  };

  resetQuiz = () => {
    this.setState(
      {
        currentQuestion: 0,
        wrongAnswer: false,
        selectedAnswer: '',
        rightAnswer: false,
        isFreeze: false,
      },
      () => {
        this.props.selectedQuestion(
          this.props.books?.quiz?.questions[this.state.currentQuestion],
        );
      },
    );
  };

  onPlayPress = () => {
    if (this.state.current.audio) {
      SoundHelper.playSoundUri(this.state.current.audio);
    }
  };

  renderSelectOption = (data, i) => {
    const isRightAnswer =
      this.state.rightAnswer &&
      this.props.books.selectedQuestion.answers.answer == data.id;
    const isWrongAnswer =
      this.state.wrongAnswer &&
      this.props.books.selectedQuestion.answers.answer == data.id;

    return (
      <View style={styles.selectOptionContainer}>
        <TouchableOpacity
          disabled={this.state.isFreeze}
          key={i}
          style={[
            styles.selectOptionBtn,
            {
              borderColor: isWrongAnswer || isRightAnswer ? Yellow : lightblue,
              backgroundColor:
                isWrongAnswer || isRightAnswer
                  ? green
                  : this.state.wrongAnswer &&
                    data.id == this.state.selectedAnswer
                  ? 'red'
                  : 'rgba(0,0,0,0)',
            },
          ]}
          activeOpacity={0.5}
          onPress={() => this.checkAnswer(data)}>
          <Text style={styles.selectOptionBtnText}>{data.option}</Text>
        </TouchableOpacity>
        {this.state.wrongAnswer && data.id == this.state.selectedAnswer ? (
          <View style={styles.rightWrongAnswerIconContainer}>
            <FastImage
              style={styles.iconImage}
              resizeMode={FastImage.resizeMode.contain}
              source={Images.asset14}
            />
          </View>
        ) : isWrongAnswer || isRightAnswer ? (
          <View style={styles.rightWrongAnswerIconContainer}>
            <FastImage
              style={styles.iconImage}
              resizeMode={FastImage.resizeMode.contain}
              source={Images.asset13}
            />
          </View>
        ) : null}
      </View>
    );
  };

  renderContent = () => {
    return (
      <>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            {this.props.books.selectedQuestion.question}
          </Text>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>SELECT AN ANSWER BELOW</Text>
        </View>

        <View style={{width: '80%', marginTop: Metrics.ratio(10)}}>
          {this.state.options?.map((data, i) => {
            return this.renderSelectOption(data, i);
          })}

          <View style={styles.nextBtnContainer}>
            <ThemedNextButton
              gradient={Colors.yellowGradient}
              style={styles.nextBtnStyle}
              text={'NEXT'}
              iconStyle={styles.nextIconStyle}
              textStyle={styles.nextTextStyle}
              onPress={() => {
                this.nextQuestion();
              }}
            />
          </View>
        </View>
      </>
    );
  };

  render() {
    return (
      <HomeTemplate
        renderUser={true}
        navigation={this.props.navigation}
        back
        home>
        <QuizModal
          doShowModal={this.state.visible}
          data={this.state.modalData}
          onClose={() => {
            this.setState({visible: false}, () => {
              this.props.navigation.navigate('QuizShelf');
            });
          }}
          resetQuiz={this.resetQuiz}
        />
        <ImageBackground
          style={{width: '100%', flex: 1}}
          source={Images.asset8}>
          <ScrollView
            style={{
              width: Metrics.screenWidth,
              flex: 1,
            }}>
            <View
              style={{
                width: Metrics.screenWidth,
                flex: 1,
                alignItems: 'center',
                marginBottom: Metrics.ratio(20),
              }}>
              <View
                style={{
                  width: Metrics.screenWidth,
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: Metrics.ratio(30),
                }}>
                <View
                  style={{
                    flex: 0.4,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}>
                  <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                      width: Metrics.moderateRatio(100),
                      height: Metrics.moderateRatio(130),
                    }}
                    source={{
                      uri: this.props.route?.params.image,
                      priority: FastImage.priority.high,
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 0.6,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <FastImage
                    style={{
                      width: Metrics.ratio(200),
                      height: Metrics.ratio(120),
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                    source={Images.quizAsset}
                  />
                </View>
              </View>

              <BookControl
                text={`QUESTION ${this.props.books.selectedQuestion.questionnumber} OF ${this.props.books.quiz?.questions.length}`}
                image={Images.asset56}
                image2={Images.sound}
                isMain={true}
                secondBtnPress={() => {
                  this.onPlayPress();
                }}
                sound={null}
                disabled={true}
              />

              {this.renderContent()}
            </View>
          </ScrollView>
        </ImageBackground>
      </HomeTemplate>
    );
  }
}

export default connect(MapSateToProps, {
  getQuiz,
  selectedQuestion,
  addScore,
})(QuizPage);
