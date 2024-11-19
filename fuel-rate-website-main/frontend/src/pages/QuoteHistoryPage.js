import React, { useState, useEffect } from 'react';
import useStateContext from '../hooks/useStateContext';
import { endpointConnection,ENDPOINTS } from '../api/index.js';
import '../css/QuoteHistoryPage.css'; // Import CSS file for styling

const sampleQuotes = [
    { number: 1, gallonsRequested: 100, totalPrice: 2000, deliveryDate: '2024-02-16', suggestedPrice: 20, address: "123 Main Street" },
    { number: 2, gallonsRequested: 150, totalPrice: 3000, deliveryDate: '2024-02-15', suggestedPrice: 20, address: "456 Cosc Avenue" },
    { number: 3, gallonsRequested: 200, totalPrice: 4000, deliveryDate: '2024-02-14', suggestedPrice: 20, address: "789 Oak Lane" },
];

// Page that shows a user's fuel quote history once they logged in
function QuoteHistory() {
    // State to store the list of fuel quotes
    const [quotes, setQuotes] = useState([]);
    const {context, setContext} = useStateContext();

    // Function to fetch fuel quotes from the backend
    const fetchQuotes = () => {
        console.log(context.login_id);
        if (context.login_id) {
            endpointConnection(ENDPOINTS.quotehistory)
            .get(context.login_id)
            .then (res => {
                setQuotes(res.data);
            })
            .catch(error => {
                console.log(error);
            })
        }
        else {
            setQuotes(sampleQuotes);
        }
    };

    useEffect(() => {
        fetchQuotes();
    },[]);

    return (
        <div className="quote-history-container">
            <h2>Quote History</h2>
            {context.login_id ? <p>{context.username}</p> : <p>Sample Data. Log in to see your history.</p>}
            <table>
                <thead>
                    <tr>
                    <th className="black-text">Number</th>
                        <th className="black-text">Gallons Requested</th>
                        <th className="black-text">Delivery Address</th>
                        <th className="black-text">Delivery Date</th>
                        <th className="black-text">Suggested Price/Gallon</th>
                        <th className="black-text">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {quotes.map(quote => (
                        <tr key={quote.number}>
                            <td>#{quote.number}</td>
                            <td>{quote.gallonsRequested}</td>
                            <td>{quote.address}</td>
                            <td>{quote.deliveryDate}</td>
                            <td>${quote.suggestedPrice}</td>
                            <td>${quote.totalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default QuoteHistory;
