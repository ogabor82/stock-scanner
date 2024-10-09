export const getSymbol = async (symbol: string | undefined) => {
  const response = await fetch(`http://localhost:3000/symbol/${symbol}`);

  const data = await response.json();
  return data;
};

export const getPortfolio = async (symbols: string[] | undefined) => {
  const slug = symbols?.join(",");
  const response = await fetch(`http://localhost:3000/portfolio/${slug}`);

  const data = await response.json();
  return data;
};

export const getDividends = async (symbol: string | undefined) => {
  const response = await fetch(`http://localhost:3000/dividend/${symbol}`);

  const data = await response.json();
  return data;
};

export const getSymbolFromCache = async (symbol: string | undefined) => {
  const response = await fetch(
    `https://stock-scanner-6109b-default-rtdb.europe-west1.firebasedatabase.app/cache/${symbol}.json`
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
