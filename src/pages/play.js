import React, { useState, useEffect } from "react"
import * as execute from "../contract/execute"
import { useConnectedWallet } from "@terra-money/wallet-provider"
import LoadingIndicator from "../components/LoadingIndicator"
import * as query from "../contract/query"

const Play = () => {
  const connectedWallet = useConnectedWallet()
  const playTime = 60

  const [time, setTime] = useState(playTime)
  const [targetPosition, setTargetPosition] = useState({ top: "23%", left: "43%", height: "60px" })
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const unsubscribe = setInterval(() => {
      setTime((time) => (time > 0 ? time - 1 : 0))
    }, 1000)
    return unsubscribe
  }, [])

  useEffect(() => {
    if (time === 0) {
      setTargetPosition({ display: "none" })

      const fetchScores = async () => {
        if (connectedWallet && connectedWallet.network.name === "testnet") {
          return (await query.getScores(connectedWallet)).scores
        }
      }

      fetchScores().then((scores) => {
        let hiScore = 0
        scores.map((score, index) => {
          if (score[0] === connectedWallet.walletAddress) {
            return (hiScore = score[1])
          }
          return (hiScore = 0)
        })

        if (hiScore > score) {
          alert(`Game Over! Your score is ${score}. This doesn't beat your hi-score of ${hiScore}.`)
          window.location.href = "/leaderboard"
        } else {
          // Show alert to let user know it's game over
          alert(`Game Over! Your score is ${score}. A new hi-score. Please confirm transaction to submit score.`)
          // setGameOver(true)

          submitScore()
        }
      })
    }
  }, [time])

  const submitScore = async () => {
    if (connectedWallet && connectedWallet.network.name === "testnet") {
      setLoading(true)
      const tx = await execute.setScore(connectedWallet, score)
      console.log(tx)
      alert("Score submitted!")
      setLoading(false)
      window.location.href = "/leaderboard"
    }
  }

  const handleClick = () => {
    let audio = new Audio("/crow-1.wav")

    audio.volume = 0.6
    audio.play()

    if (targetPosition.height === "30px") {
      setScore((score) => score + 3)
    } else if (targetPosition.height === "45px") {
      setScore((score) => score + 2)
    } else {
      setScore((score) => score + 1)
    }

    // Play around with this to control bounds!
    setTargetPosition({
      left: `${Math.floor(Math.random() * 74) + 10}%`, //10 to 84%
      top: `${Math.floor(Math.random() * 70) + 13}%`, //13 to 83%
      height: `${Math.floor(Math.random() * 3) * 15 + 30}px`, //30 to 60 px
    })
  }

  return (
    <div className="score-board-container">
      <div className="play-container">
        <span>Score: {score}</span>
        {/* <span>Hi-Score: {hiscore[1].toString().padStart(2, "0")}</span> */}
        <span>Stone 'em!</span>
        <span>Time left: {time} s</span>
      </div>

      {/* Render loading or game container */}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="game-container">
          {/* CHANGE THIS IMAGE! It's loaded from the public folder. */}
          <img src={"crow.png"} id="target" alt="Target" style={{ ...targetPosition }} onClick={handleClick} />
          <img src="farmer.png" id="farmer-img" alt="Farmer" />
        </div>
      )}
    </div>
  )
}

export default Play
