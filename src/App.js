import "./App.css"
import { useWallet, WalletStatus } from "@terra-money/wallet-provider"
import Menu from "./components/Menu"

function App() {
  const { status, connect, disconnect, availableConnectTypes } = useWallet()

  const renderConnectButton = () => {
    if (status === WalletStatus.WALLET_NOT_CONNECTED) {
      return (
        <div className="connect-wallet-div">
          <button
            type="button"
            key={`connect-EXTENSION`}
            onClick={() => connect("EXTENSION")}
            className="cta-button connect-wallet-button"
          >
            Connect wallet
          </button>
        </div>
      )
    } else if (status === WalletStatus.WALLET_CONNECTED) {
      return (
        <button type="button" onClick={() => disconnect()} className="cta-button connect-wallet-button">
          Disconnect
        </button>
      )
    }
  }

  // Let's take a look at what the starting states are!
  console.log("Wallet status is ", status)
  console.log("Available connection types:", availableConnectTypes)

  return (
    <main className="App">
      <header>
        <div className="header-titles">
          <h1>🌑 Stone The Crows 🦅</h1>
          <p>Only you can save the farmers precious crop</p>
        </div>
      </header>
      {/* If not connected, show the crow GIF! */}
      {status === WalletStatus.WALLET_NOT_CONNECTED && (
        <div>
          <img src="https://media3.giphy.com/media/vUZIVELsa8GMo/giphy.gif" alt="Crow gif" />
        </div>
      )}

      {/* Show the menu after connection */}
      {status === WalletStatus.WALLET_CONNECTED && (
        <div className="game-menu-container">
          <Menu />
        </div>
      )}

      {renderConnectButton()}
    </main>
  )
}

export default App
