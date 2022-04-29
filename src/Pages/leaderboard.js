import { Link } from "react-router-dom"

const Leaderboard = () => {
  return (
    <main className="App">
      <header>
        <Link to="/" className="home-link">
          <div className="header-titles">
            <h1>Leaderboard</h1>
          </div>
        </Link>
      </header>
    </main>
  )
}

export default Leaderboard
