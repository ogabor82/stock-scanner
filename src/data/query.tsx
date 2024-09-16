export const getSymbol = async (symbol: string | undefined) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${
      import.meta.env.VITE_VANTAGE_KEY_REAL
    }`
  );

  const data = await response.json();
  return data;
};

export const getSymbolDescription = (symbolData: string) => {
  const url = "https://api.openai.com/v1/chat/completions";

  const sysMsg = `In a conversational professional tone, please summarize the stock data based on [Symbol Data]
  - Human readbale format.
  - Use simple language and describe the data in a way that is easy to understand.
  - Always use hungarian language.
  - Do not use any offensive language.
  - Share some information about EPS,  P/E, Price to Sales and other important metrics to help the reader easyl understand these details`;

  const newPrompt = `Symbol Data: ${JSON.stringify(symbolData)}`;

  const data = {
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: sysMsg },
      { role: "user", content: newPrompt },
    ],
  };

  const params = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  };

  return fetch(url, params)
    .then((response) => response.json())
    .then((data) => {
      return data.choices[0].message.content;
    })
    .catch((error) => {
      console.log("Error:", error);
      return Promise.reject("Unable to fetch weather description.");
    });
};
