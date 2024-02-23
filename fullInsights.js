const express = require('express');
const yahooFinance = require('yahoo-finance2');

const app = express();
const PORT = process.env.PORT || 3000;

// Define query options for Yahoo Finance API
const queryOptions = {
  modules: [
    "assetProfile",
    "balanceSheetHistory",
    "balanceSheetHistoryQuarterly",
    "calendarEvents",
    "cashflowStatementHistory",
    "cashflowStatementHistoryQuarterly",
    "defaultKeyStatistics",
    "earnings",
    "earningsHistory",
    "earningsTrend",
    "financialData",
    "fundOwnership",
    "fundPerformance",
    "fundProfile",
    "incomeStatementHistory",
    "incomeStatementHistoryQuarterly",
    "indexTrend",
    "industryTrend",
    "insiderHolders",
    "insiderTransactions",
    "institutionOwnership",
    "majorDirectHolders",
    "majorHoldersBreakdown",
    "netSharePurchaseActivity",
    "price",
    "quoteType",
    "recommendationTrend",
    "secFilings",
    "sectorTrend",
    "summaryDetail",
    "summaryProfile",
    "symbol",
    "topHoldings",
    "upgradeDowngradeHistory"
  ]
};

// Endpoint to fetch Yahoo Finance data for a given symbol
app.get('/quote/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    // Fetch quote summary for the provided symbol
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
