document.getElementById("investmentForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    console.log("Fetching investment advice...");

    const amount = document.getElementById("amount").value;
    const period = document.getElementById("period").value;
    const riskTolerance = document.getElementById("riskTolerance").value;
    const adviceText = document.getElementById("adviceText");

    if (!amount || !period) {
        alert("Please enter all fields!");
        return;
    }

    
    document.getElementById("responseContainer").classList.remove("d-none");
    adviceText.innerHTML = "<strong>Loading investment advice, please wait...</strong>";

    try {
        const response = await fetch("http://localhost:5000/api/investment/advice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, period, riskTolerance })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response received:", data);

            // Enhanced formatting for Gemini AI answer
            const raw = data.advice;
            let html = "";



                // Highlight important points, remove dropdowns
                function highlightImportant(text) {
                    // Bold **text**
                    text = text.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#007bff">$1</strong>');
                    // Italic *text*
                    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
                    // Headings (##, ###, ####)
                    text = text.replace(/^#### (.*)$/gm, '<h5 style="color:#28a745">$1</h5>');
                    text = text.replace(/^### (.*)$/gm, '<h4 style="color:#28a745">$1</h4>');
                    text = text.replace(/^## (.*)$/gm, '<h3 style="color:#28a745">$1</h3>');
                    // Highlight keywords
                    text = text.replace(/(Recommendation|Best Investment Option|Analysis|Benefits|Risks|Returns|Description|Applicability|Alternative)/g, '<span style="background:#ffeeba; font-weight:bold;">$1</span>');
                    // Lists: Convert lines starting with * or - to <li>
                    text = text.replace(/^(\s*)(\*|-) (.*)$/gm, '<li>$3</li>');
                    // Wrap consecutive <li> in <ul>
                    text = text.replace(/(<li>.*?<\/li>\s*)+/gs, match => `<ul>${match}</ul>`);
                    // Line breaks
                    text = text.replace(/\n{2,}/g, '<br><br>');
                    text = text.replace(/\n/g, '<br>');
                    return text;
                }


                // Just highlight and show as a single block
                html = highlightImportant(raw);
                adviceText.innerHTML = html;
    } catch (error) {
        console.error("Error:", error);
        adviceText.innerHTML = "<strong>Error fetching investment advice. Please try again.</strong>";
    }
});
