export async function translateToUrdu(text: string): Promise<string> {
  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: "ur",
        format: "text",
      }),
    });

    const raw = await response.text(); 
    console.log("Translation API Raw Response:", raw); 

    if (!response.ok) {
      console.error(" LibreTranslate API returned an error:", raw);
      return "Translation not available (API returned an error)";
    }

    try {
      const data = JSON.parse(raw);

      if (!data.translatedText) {
        console.warn("No 'translatedText' field found in response.");
        return "Translation not available (empty response)";
      }

      return data.translatedText;
    } catch (parseError) {
      console.error(" Failed to parse JSON:", parseError, "Raw response:", raw);
      return "Translation not available (invalid response format)";
    }
  } catch (fetchError) {
    console.error(" Network or fetch error:", fetchError);
    return "Translation not available (network error)";
  }
}
