import React, { useState, useEffect } from "react"
import * as execute from "../contract/execute"
import { useConnectedWallet } from "@terra-money/wallet-provider"
import LoadingIndicator from "../components/LoadingIndicator"

const Play = () => {
  const connectedWallet = useConnectedWallet()
  // Configure this as you want, I like shorter games
  const playTime = 60

  const [time, setTime] = useState(playTime)
  // const [gameOver, setGameOver] = useState(false)
  // We use this to track where the target is on the screen
  const [targetPosition, setTargetPosition] = useState({ top: "23%", left: "43%", height: "60px" })
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState(0)

  // Every second we're going to lower the value of time.
  useEffect(() => {
    const unsubscribe = setInterval(() => {
      setTime((time) => (time > 0 ? time - 1 : 0))
    }, 1000)
    return unsubscribe
  }, [])

  useEffect(() => {
    if (time === 0) {
      setTargetPosition({ display: "none" })
      // Show alert to let user know it's game over
      alert(`Game Over! Your score is ${score}. Please confirm transaction to submit score.`)
      // setGameOver(true)
      submitScore()
    }
  }, [time])

  const submitScore = async () => {
    if (connectedWallet && connectedWallet.network.name === "testnet") {
      setLoading(true)
      const tx = await execute.setScore(connectedWallet, score)
      console.log(tx)
      // Once the transaction is confirmed, we let the user know and navigate to the leaderboard
      alert("Score submitted!")
      setLoading(false)
      window.location.href = "/leaderboard"
    }
  }

  const handleClick = () => {
    // OGs will know this :)
    let audio = new Audio("/crow-1.wav")

    // Don't let it get too loud!
    audio.volume = 0.4
    audio.play()
    console.log("height", targetPosition.height)
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
