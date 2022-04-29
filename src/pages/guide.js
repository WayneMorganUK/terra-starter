import { Link } from "react-router-dom"
import WalletAddress from "../components/WalletAddress"

const Guide = () => {
  return (
    <main className="App">
      <header>
        <Link to="/" className="home-link">
          <div className="header-titles">
            <h1>🌑 Stone The Crows 🦅</h1>
            <p>Only you can save the farmers precious crop</p>
          </div>
        </Link>
        <WalletAddress />
      </header>

      <div className="score-board-container">
        <h3>How to play</h3>

        <div>
          <span className="help">Click as many crows as you can within 15 seconds!</span>
          <br />
          <span className="help">The smaller the crow the more points you are awarded!</span>
        </div>
      </div>
    </main>
  )
}

export default Guide
