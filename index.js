import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// --- CONFIGURATION ---
const API_KEY = "AIzaSyAluqkC8k5cA6rSchT7UnhcWkZe6KrwGo0";  // <--- PASTE KEY HERE
const GATE_CODE = "IMPERIAL";

// --- DOM ELEMENTS ---
const gateOverlay = document.getElementById('gate-overlay');
const gateInput = document.getElementById('gate-input');
const appContainer = document.getElementById('app-container');
const userInput = document.getElementById('user-input');
const actionBtn = document.getElementById('action-btn');
const outputBox = document.getElementById('output-box');

// --- 1. THE GATEKEEPER ---
gateInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (gateInput.value === GATE_CODE) {
      // Success: Unlock
      gateOverlay.classList.add('gate-hidden');
      setTimeout(() => {
        gateOverlay.style.display = 'none';
        appContainer.classList.add('app-visible');
      }, 1000);
    } else {
      // Fail: Shake
      gateInput.classList.add('shake');
      setTimeout(() => gateInput.classList.remove('shake'), 400);
      gateInput.value = "";
    }
  }
});

// --- 2. THE ARCHITECT (AI Logic) ---
actionBtn.addEventListener('click', async () => {
  const text = userInput.value;
  if (!text) return;

  // Visual Loading State
  actionBtn.textContent = "ARCHITECTING...";
  actionBtn.disabled = true;
  outputBox.innerHTML = "";

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are SIG7, an Imperial Business Architect.
      Analyze this offer: "${text}"
      
      Create a Sovereign Asset Stack (Markdown format):
      1. 3 LinkedIn Posts (Hook, Value, CTA).
      2. A 3-Part Email Sequence (Authority, Vision, Invitation).
      3. A Visual Brief (Luxurious, Minimalist, Gold/Black/Lilac aesthetic).
      
      Tone: Imperial, Decisive, High-Status, Warm.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();

    // Convert Markdown to HTML using the 'marked' library
    outputBox.innerHTML = marked.parse(rawText);

  } catch (error) {
    console.error(error);
    outputBox.innerHTML = "<p style='color:red'>CONNECTION FAILED. CHECK API KEY.</p>";
  }

  // Reset Button
  actionBtn.textContent = "EXECUTE";
  actionBtn.disabled = false;
});
