import {Component} from 'react'
import EachItem from '../EachItem/EachItem'
import './RockPaperScissor.css'

class RockPaperScissor extends Component {
  state = {
    score: 0,
    isplayingTrue: true,
    personChoice: {},
    computerChoice: {},
    Result: '',
  }

  checkResult = itemObj => {
    const {isplayingTrue, score} = this.state
    console.log(itemObj)

    const {choicesList} = this.props
    const computerChoiceRandomNum = Math.floor(Math.random() * 3)
    const computerChoiceObj = choicesList[computerChoiceRandomNum]
    console.log(computerChoiceObj)
    if (itemObj.id === computerChoiceObj.id) {
      console.log('Draw')
      const res = 'DRAW'
      this.setState({
        personChoice: {...itemObj},
        computerChoice: {...computerChoiceObj},
        Result: res,
        isplayingTrue: !isplayingTrue,
      })
    } else if (
      (itemObj.id === 'PAPER' && computerChoiceObj.id === 'ROCK') ||
      (itemObj.id === 'SCISSORS' && computerChoiceObj.id === 'PAPER') ||
      (itemObj.id === 'ROCK' && computerChoiceObj.id === 'SCISSORs')
    ) {
      console.log('won')
      const res = 'WON'
      this.setState({
        personChoice: {...itemObj},
        computerChoice: {...computerChoiceObj},
        Result: res,
        isplayingTrue: !isplayingTrue,
        score: score + 1,
      })
    } else {
      console.log('you Lose')
      const res = 'LOOSE'
      this.setState({
        personChoice: {...itemObj},
        computerChoice: {...computerChoiceObj},
        Result: res,
        isplayingTrue: !isplayingTrue,
        score: score - 1,
      })
    }
  }

  PlayAgain = () => {
    this.setState({isplayingTrue: true})
  }

  renderPlayingScene = () => {
    const {choicesList} = this.props
    return (
      <ul className="uList">
        {choicesList.map(e => (
          <EachItem checkResult={this.checkResult} key={e.id} itemObj={e} />
        ))}
      </ul>
    )
  }

  renderResult = () => {
    const {personChoice, computerChoice, Result} = this.state
    return (
      <>
        <div className="ResultContainer">
          <div className="eachResultItem">
            <h1 className="eachresultHeading">You</h1>
            <img
              className="resultImage"
              src={personChoice.imageUrl}
              alt={personChoice.id}
            />
          </div>
          <div className="eachResultItem">
            <h1 className="eachresultHeading">Opponent</h1>
            <img
              className="resultImage"
              src={computerChoice.imageUrl}
              alt={computerChoice.id}
            />
          </div>
        </div>
        <div className="PLAYAGAINCONATINER">
          <h1 className="result-heading">YOU {Result}</h1>
          <button
            onClick={this.PlayAgain}
            className="play-again-btn"
            type="button"
          >
            PLAY AGAIN
          </button>
        </div>
      </>
    )
  }

  render() {
    const {score, isplayingTrue} = this.state
    return (
      <div className="bgCont">
        <div className="scoreCardContainer">
          <div className="equipmentName">
            <p>Rock</p>
            <p>Paper</p>
            <p>Scissor</p>
          </div>
          <div className="scoreCard">
            <p>Score</p>
            <h1>{score}</h1>
          </div>
        </div>

        {isplayingTrue ? this.renderPlayingScene() : this.renderResult()}
      </div>
    )
  }
}

export default RockPaperScissor
