# CentriTrade: AI-Enhanced Trading Platform on Solana

CentriTrade is a modern, AI-powered trading platform built on the Solana blockchain. It combines the speed and efficiency of Solana with advanced AI insights to provide traders with a competitive edge in the cryptocurrency market.

![CentriTrade Dashboard](https://i.ibb.co/KpMMvPqb/Screenshot-2025-03-02-105817.png)

## Features

### 🚀 High-Speed Trading
- Leverages Solana's high-throughput blockchain for near-instant transactions
- Integrates with Jupiter Exchange for optimal swap routing and best prices
- Supports multiple token pairs including SOL/USDC, BTC/USDC, ETH/USDC, and more

### 🧠 AI-Powered Insights
- **Price Prediction**: LSTM neural networks analyze historical data to forecast future price movements
- **Sentiment Analysis**: BERT models process social media and news to gauge market sentiment
- **Risk Management**: AI-generated stop-loss and take-profit recommendations based on volatility analysis

### 💼 Advanced Trading Tools
- Real-time price charts with multiple timeframes
- Order history tracking
- Portfolio performance analytics
- Customizable trading interface

## Screenshots

### Home Page
![Home Page](https://i.ibb.co/KpMMvPqb/Screenshot-2025-03-02-105817.png)
*The landing page showcasing the platform's key features and benefits*

### Trading Interface
![Trading Interface](https://i.ibb.co/JwFcLN7y/Screenshot-2025-03-02-135638.png)
*The main trading interface with price chart, order form, and market information*

### AI Insights Dashboard
![AI Insights](https://i.ibb.co/vvZsjTtJ/Screenshot-2025-03-02-120729.png)
*AI-powered analysis including price predictions, sentiment analysis, and risk management recommendations*

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- A Solana wallet (Phantom, Solflare, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Onario747/centri-trade.git
cd centri-trade
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
VITE_HF_API_TOKEN=your_huggingface_api_token
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Setting Up Hugging Face API Access

To use the AI features, you'll need to obtain an API key from Hugging Face:

1. Create an account at [Hugging Face](https://huggingface.co/)
2. Navigate to your profile settings and select "API Tokens"
3. Create a new token with read access
4. Copy the token and add it to your `.env` file as `VITE_HF_API_TOKEN`

## Technologies Used

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Lightweight Charts for financial charting

### Blockchain Integration
- Solana Web3.js for blockchain interactions
- Jupiter Exchange API for token swaps
- Wallet adapter for Solana wallet connections

### AI/ML
- Hugging Face's FinBERT model for sentiment analysis
- Custom LSTM models for price prediction
- Risk analysis algorithms based on volatility metrics

## Demo Mode

For demonstration purposes, the application includes a "Demo Mode" that uses simulated data instead of making actual API calls. This is useful for:

- Presentations and demos
- Testing the UI without API rate limits
- Exploring the platform without connecting a wallet

To enable Demo Mode, click the "Demo Data: OFF" button in the trading interface.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/trade-feature`)
3. Commit your changes (`git commit -m 'Added a trade feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Jupiter Exchange](https://jup.ag/) for their swap API
- [Solana Foundation](https://solana.com/) for the blockchain infrastructure
- [Hugging Face](https://huggingface.co/) for their NLP models
