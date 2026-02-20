// --- CONFIGURATION ---
// NO API KEY HERE - WE GET IT FROM THE SCREEN
const GATE_CODE = "IMPERIAL";

// --- DOM ELEMENTS ---
const gateOverlay = document.getElementById('gate-overlay');
const gateInput = document.getElementById('gate-input');
const appContainer = document.getElementById('app-container');
const apiKeyInput = document.getElementById('api-key-input'); // <--- NEW
const userInput = document.getElementById('user-input');
const actionBtn = document.getElementById('action-btn');
const outputBox = document.getElementById('output-box');

// --- 1. THE GATEKEEPER ---
gateInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (gateInput.value === GATE_CODE) {
      gateOverlay.style.opacity = '0';
      setTimeout(() => {
        gateOverlay.style.display = 'none';
        appContainer.style.display = 'block';
        appContainer.classList.add('app-visible');
      }, 1000);
    } else {
      gateInput.classList.add('shake');
      setTimeout(() => gateInput.classList.remove('shake'), 400);
      gateInput.value = "";
    }
  }
});

// --- 2. THE IMPERIAL ARCHITECT ---
actionBtn.addEventListener('click', async () => {
  const text = userInput.value;
  const apiKey = apiKeyInput.value.trim(); // <--- GRAB KEY FROM INPUT BOX

  if (!text) { alert("ENTER COMMAND"); return; }
  if (!apiKey) { alert("ENTER NEURAL LINK KEY"); return; }

  // Visual Loading State
  actionBtn.innerText = "ARCHITECTING...";
  actionBtn.disabled = true;
  outputBox.innerHTML = "";

  const systemPrompt = `
    You are SIG7, an Imperial Business Architect.
    Analyze this offer: "${text}"
    
    Create a Sovereign Asset Stack (Markdown format):
    1. 3 LinkedIn Posts (Hook, Value, CTA).
    2. A 3-Part Email Sequence (Authority, Vision, Invitation).
    3. A Visual Brief (Luxurious, Minimalist, Gold/Black/Lilac aesthetic).
    
    Tone: Imperial, Decisive, High-Status, Warm.
  `;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}` // <--- USE THE KEY FROM SCREEN
      },
      body: JSON.stringify({
        model: "gpt-4o", 
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const rawText = data.choices[0].message.content;
    
    if (typeof marked !== 'undefined') {
      outputBox.innerHTML = marked.parse(rawText);
    } else {
      outputBox.innerText = rawText;
    }

  } catch (error) {
    console.error(error);
    outputBox.innerHTML = `<p style='color:red; border:1px solid red; padding:10px;'>ERROR: ${error.message}</p>`;
  }

  // Reset Button
  actionBtn.innerText = "EXECUTE";
  actionBtn.disabled = false;
});
