const express = require('express');
const yahooFinance = require('yahoo-finance2').default;

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to fetch Yahoo Finance data for a given symbol
app.get('/quote/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { modules } = req.query;

    // Parse modules from query string
    const queryOptions = modules ? { modules: modules.split(',') } : {};

    // Fetch quote summary for the provided symbol and queryOptions
    const quoteSummary = await yahooFinance.quoteSummary(symbol, queryOptions);
    // Send the JSON response
    res.json(quoteSummary);
  } catch (error) {
    // If there's an error, send a 500 status code with an error message
    console.error('Error fetching quote:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
