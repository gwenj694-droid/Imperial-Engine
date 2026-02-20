:root {
  --gold: #D4AF37;
  --neon-lilac: #d8b4fe;
  --black: #050505;
  --white: #ffffff;
}

body {
  margin: 0; background-color: var(--black); color: var(--gold);
  font-family: 'Montserrat', sans-serif; height: 100vh; overflow: hidden;
  background-image: radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 3px);
  background-size: 550px 550px; animation: dustMove 60s linear infinite;
}

/* THE GATE */
.gate-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: radial-gradient(circle at center, #1a0b2e 0%, #000000 80%);
  display: flex; justify-content: center; align-items: center; z-index: 9999;
  transition: opacity 1.5s ease-out;
}
.gate-hidden { opacity: 0; pointer-events: none; }

.gate-input {
  background: transparent; border: none; border-bottom: 2px solid var(--gold);
  color: var(--white); font-family: 'Cinzel', serif; font-size: 2rem; letter-spacing: 8px;
  text-align: center; width: 350px; padding: 15px; outline: none; text-transform: uppercase;
  text-shadow: 0 0 10px var(--neon-lilac); 
  transition: all 0.4s ease;
}
.gate-input:focus {
  border-bottom-color: var(--neon-lilac); 
  box-shadow: 0 15px 40px -5px rgba(216, 180, 254, 0.5);
  text-shadow: 0 0 20px var(--neon-lilac); transform: scale(1.05);
}

/* THE APP */
.app-container {
  max-width: 900px; margin: 0 auto; padding: 4rem 2rem; opacity: 0;
  background: rgba(0, 0, 0, 0.85); height: 100vh; display: none;
}
.app-visible { display: block; animation: imperialReveal 2s forwards; overflow-y: auto; }

.header-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(216, 180, 254, 0.3); padding-bottom: 20px; }
h1 { margin: 0; font-family: 'Cinzel', serif; background: linear-gradient(to right, var(--gold), var(--neon-lilac)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.subtitle { color: #d8b4fe; font-size: 0.8rem; letter-spacing: 3px; margin: 5px 0 0 0; text-shadow: 0 0 5px rgba(216, 180, 254, 0.5); }
.system-status { color: #D4AF37; font-size: 0.8rem; }

.input-section { margin-top: 4rem; }
.label { color: #888; font-family: 'Cinzel'; letter-spacing: 1px; margin-bottom: 1rem; }
textarea { width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid #aa8c2c; color: #fff; padding: 1.5rem; font-family: 'Montserrat'; font-size: 1.1rem; min-height: 150px; outline: none; box-sizing: border-box; }
textarea:focus { border-color: var(--neon-lilac); box-shadow: 0 0 15px rgba(216, 180, 254, 0.2); }

.action-btn { background: linear-gradient(135deg, var(--gold), #aa8c2c); color: #000; border: none; padding: 1rem 3rem; font-family: 'Cinzel'; font-weight: 800; cursor: pointer; margin-top: 2rem; letter-spacing: 2px; text-transform: uppercase; width: 100%; }
.action-btn:hover { background: linear-gradient(135deg, var(--neon-lilac), #a78bfa); box-shadow: 0 0 20px var(--neon-lilac); }
.action-btn:disabled { opacity: 0.5; cursor: wait; }

.output-box { margin-top: 3rem; border-left: 1px solid var(--neon-lilac); padding-left: 2rem; color: #e0e0e0; line-height: 1.8; padding-bottom: 5rem;}
.output-box strong { color: var(--gold); }

@keyframes dustMove { from { background-position: 0 0; } to { background-position: 550px 550px; } }
@keyframes imperialReveal { from { opacity: 0; filter: blur(10px); } to { opacity: 1; filter: blur(0); } }
.shake { animation: shake 0.4s ease-in-out; }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25%, 75% { transform: translateX(-10px); border-bottom-color: red; } }
