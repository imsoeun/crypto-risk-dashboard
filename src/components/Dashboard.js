import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [bitcoinPrices, setBitcoinPrices] = useState([]);
    const [labels, setLabels] = useState([]);
    const [lastPrice, setLastPrice] = useState(null); // 마지막 가격 저장

    useEffect(() => {
        const fetchBitcoinPrice = () => {
            axios.get("http://127.0.0.1:8080/bitcoin_price/")
                .then(response => {
                    const price = response.data.bitcoin_price;
                    const newTime = new Date().toLocaleTimeString();

                    // 🔥 **값이 변할 때만 업데이트!**
                    if (price !== lastPrice) {
                        setBitcoinPrices(prevPrices => [...prevPrices.slice(-9), price]); // 최신 10개 유지
                        setLabels(prevLabels => [...prevLabels.slice(-9), newTime]); // 최신 10개 유지
                        setLastPrice(price); // 마지막 가격 업데이트
                    }
                })
                .catch(error => {
                    console.error("Error fetching Bitcoin price:", error);
                });
        };

        fetchBitcoinPrice(); // 처음 실행
        const interval = setInterval(fetchBitcoinPrice, 30000); // ⏳ **30초마다 업데이트 (CPU/배터리 부담 줄임)**

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, [lastPrice]); // ✅ **이제 lastPrice가 바뀔 때만 UI 업데이트됨!**

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Bitcoin Price (USD)",
                data: bitcoinPrices,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                fill: false,
            },
        ],
    };

    return (
        <div>
            <h2>Crypto Volatility Dashboard</h2>
            <Line data={chartData} />
        </div>
    );
};

export default Dashboard;
