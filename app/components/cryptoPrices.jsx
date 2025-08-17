"use client"
import { useState, useEffect } from 'react';
import { getCryptoPrices } from '../apis';

const CryptoPriceTicker = ({ 
  symbols = ['bitcoin', 'ethereum', 'binancecoin', 'cardano', 'solana', 'polkadot', 'chainlink', 'polygon', 'avalanche-2', 'uniswap'],
  updateInterval = 60000, // 1 minute
  animationSpeed = 50 // seconds for full scroll
}) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch crypto prices from CoinGecko API

  const fetchCryptoPrices = async () => {
    try {
      const symbolsString = symbols.join(',');
      const response = await getCryptoPrices();

    console.log("getCryptoPrices", response);

    //   const data = response?.data?.data?.cryptoPrices
      
    //   // Transform data into array format
    //   const transformedData = symbols.map(symbol => {
    //     const coinData = data[symbol];
    //     if (!coinData) return null;
        
    //     return {
    //       id: symbol,
    //       name: formatCoinName(symbol),
    //       symbol: getSymbolAbbr(symbol),
    //       price: coinData.usd,
    //       change24h: coinData.usd_24h_change || 0,
    //       marketCap: coinData.usd_market_cap
    //     };
    //   }).filter(Boolean);
      
      setCryptoData(response?.data?.data?.cryptoPrices);
      setError(null);
    } catch (err) {
      console.error('Error fetching crypto prices:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Format coin names
  const formatCoinName = (id) => {
    const nameMap = {
      'bitcoin': 'Bitcoin',
      'ethereum': 'Ethereum',
      'binancecoin': 'BNB',
      'cardano': 'Cardano',
      'solana': 'Solana',
      'polkadot': 'Polkadot',
      'chainlink': 'Chainlink',
      'polygon': 'Polygon',
      'avalanche-2': 'Avalanche',
      'uniswap': 'Uniswap'
    };
    return nameMap[id] || id.charAt(0).toUpperCase() + id.slice(1);
  };

  // Get symbol abbreviations
  const getSymbolAbbr = (id) => {
    const symbolMap = {
      'bitcoin': 'BTC',
      'ethereum': 'ETH',
      'binancecoin': 'BNB',
      'cardano': 'ADA',
      'solana': 'SOL',
      'polkadot': 'DOT',
      'chainlink': 'LINK',
      'polygon': 'MATIC',
      'avalanche-2': 'AVAX',
      'uniswap': 'UNI'
    };
    return symbolMap[id] || id.toUpperCase().slice(0, 4);
  };

  // Format price
  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  // Format market cap
  const formatMarketCap = (marketCap) => {
    if (!marketCap) return '';
    
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toLocaleString()}`;
  };

  // Initial fetch and setup interval
  useEffect(() => {
    // handleGetCryptoPrices();
    fetchCryptoPrices();
    // const interval = setInterval(fetchCryptoPrices, updateInterval);
    // return () => clearInterval(interval);
  }, [symbols, updateInterval]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="crypto-ticker">
        <div className="crypto-ticker__container">
          <div className="crypto-ticker__scroll">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="crypto-ticker__item skeleton">
                <div className="skeleton-box" style={{ width: '80px', height: '20px' }}></div>
                <div className="skeleton-box" style={{ width: '60px', height: '16px' }}></div>
                <div className="skeleton-box" style={{ width: '40px', height: '14px' }}></div>
              </div>
            ))}
          </div>
        </div>
        
        <style jsx>{`
          .crypto-ticker {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            border-bottom: 2px solid #FFD700;
            overflow: hidden;
            position: relative;
            height: 60px;
          }
          
          .crypto-ticker__container {
            height: 100%;
            display: flex;
            align-items: center;
          }
          
          .crypto-ticker__scroll {
            display: flex;
            animation: scroll ${animationSpeed}s linear infinite;
            gap: 40px;
            align-items: center;
          }
          
          .crypto-ticker__item {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 120px;
            padding: 8px 16px;
            white-space: nowrap;
          }
          
          .skeleton-box {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            margin: 2px 0;
            animation: pulse 2s ease-in-out infinite;
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 0.3; }
          }
          
          @keyframes scroll {
            0% { transform: translateX(100vw); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="crypto-ticker error">
        <div className="error-message">
          📈 Crypto data temporarily unavailable - {error}
        </div>
        
        <style jsx>{`
          .crypto-ticker.error {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-bottom: 2px solid #dc3545;
            padding: 15px;
            text-align: center;
            color: #dc3545;
            font-weight: bold;
          }
          
          .error-message {
            font-size: 14px;
          }
        `}</style>
      </div>
    );
  }

  // Duplicate the data to ensure seamless scrolling
  const duplicatedData = [...cryptoData, ...cryptoData];

  return (
    <div className="crypto-ticker">
      <div className="crypto-ticker__container">
        <div className="crypto-ticker__scroll">
          {duplicatedData.map((coin, index) => (
            <div key={`${coin.id}-${index}`} className="crypto-ticker__item">
              <div className="crypto-ticker__item__main">
                <span className="crypto-ticker__item__symbol">{coin.symbol}</span>
                <span className="crypto-ticker__item__price">{formatPrice(coin.price)}</span>
                <span className={`crypto-ticker__item__change ${coin.change24h >= 0 ? 'positive' : 'negative'}`}>
                  {coin.change24h >= 0 ? '↗' : '↘'} {Math.abs(coin.change24h).toFixed(2)}%
                </span>
              </div>
              {coin.marketCap && (
                <div className="crypto-ticker__item__mcap">
                  Cap: {formatMarketCap(coin.marketCap)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .crypto-ticker {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          border-bottom: 2px solid #FFD700;
          overflow: hidden;
          position: relative;
          height: 70px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .crypto-ticker::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, 
            rgba(26, 26, 46, 0.9) 0%, 
            transparent 10%, 
            transparent 90%, 
            rgba(26, 26, 46, 0.9) 100%
          );
          pointer-events: none;
          z-index: 1;
        }
        
        .crypto-ticker__container {
          height: 100%;
          display: flex;
          align-items: center;
          position: relative;
        }
        
        .crypto-ticker__scroll {
          display: flex;
          animation: scroll ${animationSpeed}s linear infinite;
          gap: 50px;
          align-items: center;
          padding-left: 100vw;
        }
        
        .crypto-ticker__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 140px;
          padding: 8px 20px;
          background: rgba(255, 215, 0, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(255, 215, 0, 0.2);
          white-space: nowrap;
          transition: all 0.3s ease;
        }
        
        .crypto-ticker__item:hover {
          background: rgba(255, 215, 0, 0.1);
          border-color: rgba(255, 215, 0, 0.4);
          transform: translateY(-2px);
        }
        
        .crypto-ticker__item__main {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 2px;
        }
        
        .crypto-ticker__item__symbol {
          color: #FFD700;
          font-weight: bold;
          font-size: 14px;
          min-width: 35px;
        }
        
        .crypto-ticker__item__price {
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          min-width: 60px;
        }
        
        .crypto-ticker__item__change {
          font-size: 12px;
          font-weight: 500;
          min-width: 45px;
        }
        
        .crypto-ticker__item__change.positive {
          color: #00ff88;
        }
        
        .crypto-ticker__item__change.negative {
          color: #ff4757;
        }
        
        .crypto-ticker__item__mcap {
          color: #a0a0a0;
          font-size: 10px;
          font-weight: 400;
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @media (max-width: 768px) {
          .crypto-ticker {
            height: 60px;
          }
          
          .crypto-ticker__item {
            min-width: 120px;
            padding: 6px 16px;
          }
          
          .crypto-ticker__item__symbol {
            font-size: 12px;
            min-width: 30px;
          }
          
          .crypto-ticker__item__price {
            font-size: 12px;
            min-width: 50px;
          }
          
          .crypto-ticker__item__change {
            font-size: 11px;
            min-width: 40px;
          }
          
          .crypto-ticker__item__mcap {
            font-size: 9px;
          }
          
          .crypto-ticker__scroll {
            gap: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default CryptoPriceTicker;