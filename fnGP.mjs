async function sendRequest(url, method, body) {
  if (method !== "POST" && method !== "GET") {
    console.error("Метод запроса должен быть GET или POST");
    // у тебя еще будет DELETE и PUT, но пока норм
    return;
  }

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method === "POST") {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();

    console.log("Ответ:", data);
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

const body = {
  theme: "ЛЭ",
  to: "Й",
  text: "Какой то текст",
  date: "04-11-2024",
};

sendRequest("http://localhost:3000/incoming_emails", "POST", body);
