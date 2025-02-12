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

        adviceText.innerHTML = data.advice
    .replace(/\*/g, "") 
    .replace(/(Stock Market|Bonds|Real Estate|Gold\/Silver|Cryptocurrency|Fixed Deposits|Recommendation|Additional Considerations|Reasons|Justification|Recommended Option|Investment Options)/g, "<strong>$1</strong>") // Highlight options
    .replace(/\n/g, "<br>");
    } catch (error) {
        console.error("Error:", error);
        adviceText.innerHTML = "<strong>Error fetching investment advice. Please try again.</strong>";
    }
});
