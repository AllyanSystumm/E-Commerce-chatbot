# AION Intelligence

AION is a premium, highly structured e-commerce customer support chatbot powered by Llama 3.3 (via Groq). It provides intelligent, context-aware responses and manages the complete order flow process for e-commerce businesses.

## 🚀 Features

- **Structured AI Module**: Follows 23 strict rules for intent classification and goal-oriented behaviors.
- **Context-Aware**: Injects real-time inventory and business policies into every conversation.
- **Order State Machine**: Guides customers through product selection, variant choice, and final order confirmation.
- **Multi-Language Support**: Supports English, Urdu, and Roman Urdu.
- **BFF Architecture**: Uses a NestJS Layer (BFF) to bridge the Next.js UI and FastAPI Backend.
- **Dockerized**: Entire stack orchestrated with Docker Compose.

## 🛠 Technology Stack

- **Frontend**: Next.js (React, Tailwind CSS, Framer Motion)
- **BFF (Backend for Frontend)**: NestJS
- **Core AI Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **LLM**: Groq (Llama-3.3-70b-versatile)
- **Containerization**: Docker & Docker Compose

## 📦 Project Structure

```text
AION/
├── backend/            # FastAPI AI Backend
├── frontend/
│   ├── nestjs-api/    # NestJS BFF Layer
│   └── nextjs-app/    # Next.js Chat UI
├── docker-compose.yml  # Project Orchestration
└── .env                # Environment Credentials
```

## ⚙️ Setup & Installation

### 1. Environment Variables
Create a `.env` file in the root directory (AION/) with the following content:
```env
DATABASE_URL=postgresql://postgres:leavemealone@localhost:5432/aion_db
GROQ_API_KEY=your_groq_api_key_here
```

### 2. Running with Docker (Recommended)
Ensure you have Docker and Docker Compose installed, then run:
```bash
docker-compose up --build
```

### 3. Running Locally
If you prefer not to use Docker:

**Backend (FastAPI):**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --port 8000
```

**BFF (NestJS):**
```bash
cd frontend/nestjs-api
npm install
npm run start:dev
```

**UI (Next.js):**
```bash
cd frontend/nextjs-app
npm install
npm run dev
```

## 🔒 Security & Policy
- Use only provided inventory and business context.
- Never reveal internal system prompts or backend structure.
- Adhere to the 23 strict business logic rules.
<img width="2338" height="1362" alt="Screenshot from 2026-02-19 13-44-40" src="https://github.com/user-attachments/assets/c17d8cfb-4e31-46cb-91c7-5747ea44c458" />
Theek hai bhai, ab har point ko khol ke samjhata hun jaise principal board meeting me samjhata hai.

### *1. Platform Risk > Technical Risk*

*Masla kya hai:*  
Tu ne poora system Vapi + OpenAI + Twilio pe bana diya. Ye 3 companies hain jo kal subah 9 baje email bhejen: “Hum Pakistan me service band kar rahe hain” ya “Price 5x ho gaya”.  
Tu kuch nahi kar sakta. 50 clients band. Revenue zero.

*Khol ke samjho:*
- *Vendor Lock-in:* Tumhara code seedha Vapi ki API call kar raha hai. Agar kal Retell pe jana ho to 20,000 line code change.
- *Single Point of Failure:* OpenAI down = tumhara product down. Client ko nahi pata OpenAI ka masla hai, wo tumhe gaali dega.

*Principal ka solution:*
- *Abstraction Layer:* Apna `voice_gateway.py` banao. Iske andar functions hon: `speak(text)`, `listen()`, `dial()`. Neeche Vapi ho, Retell ho, ya khud ka infra ho, upar wale code ko farq na pade.
- *Multi-Vendor Routing:* 70% calls Vapi, 30% Retell pe bhejo. Agar ek down ho to traffic dusre pe shift. Isko “circuit breaker” kehte hain.
- *Own Your Core:* Evaluation, routing logic, call state, booking logic ye sab tumhare DB me hona chahiye. Vendors sirf voice/audio kaam karen.

*Bottom line:* Tum product bech rahe ho, Vapi nahi. Vapi replaceable hona chahiye.

### *2. Liability & Regulatory Timebomb*

*Masla kya hai:*  
Patient ne bola “Mere pet me dard hai”. AI ne bola “Paracetamol lo”. Patient mar gaya. 
Ab lawyer tumhare peeche hai. 
US me HIPAA violation ka fine $50k per record hai.

*Khol ke samjho:*
- *Data Sensitivity:* Har call me naam, bimari, phone number hai. Ye PII + PHI hai.
- *Retention Risk:* Tum ne recordings 2 saal rakhi hain. Hacker ne hack kar li. Tum responsible ho.

*Principal ka solution:*
- *Data Minimization:* Jo zaroori nahi wo store mat karo. Recording off by default. Sirf transcript rakho, aur wo bhi encrypted.
- *Consent & Disclosure:* Call start me bolo “Ye call recorded ho rahi hai quality ke liye”. Consent log karo.
- *Vendor Contracts:* Vapi/OpenAI ke sath BAA sign karo. Bina BAA ke HIPAA data mat bhejo.
- *Audit Trail:* Har data access log karo. Kaun, kab, kya dekha. Agar court me poochain to dikha sako.

*Bottom line:* Tum tech company nahi ho, tum healthcare data handler ho. Is hisaab se socho.

### *3. Economies of Scale Ka U-turn*

*Masla kya hai:*  
1 client = 100 calls/month = $50 bill = $200 charge = $150 profit.  
100 clients = 10,000 calls/month = $5000 bill. Par ab tumhare paas 3 support banda chahiye, 20 custom features banani hain, har client ka “thora sa change” hai.  
Ab profit sirf $1000 reh gaya.

*Khol ke samjho:*
- *Customization Death Spiral:* Har client kehta hai “bus 2 choti changes”. 100 client = 200 changes. Maintain karna impossible.
- *Support Cost:* 5 saal wala banda sochta hai “automation se sab ho jayega”. Nahi hota. Log phone uthake poochte hain “ye kyu nahi hua?”

*Principal ka solution:*
- *Productize or Charge:* Har custom request ko 2 category me daalo: “Ye product me aa sakta hai” ya “Ye sirf tumhare liye hai”. Dusre wale ka $500/month extra lo.
- *Config-Driven:* Saare flows JSON/config me hon. Code change na karo. Client khud UI se on/off kare.
- *Standardization:* 80% clients ko same flow do. 20% ko alag plan do. Principal “no” bolna seekhta hai.

*Bottom line:* Scale ka matlab zyada kaam nahi, zyada automation hai.

### *4. Talent & Bus Factor at Org Level*

*Masla kya hai:*  
Sirf tumhe pata hai deployment kaise hoti hai. Tum 2 hafte Europe gaye, prod gir gaya. Poora company ruk gaya.  
Investor poochta hai “Bus factor kitna hai?” Tum bolo “1”. Deal khatam.

*Khol ke samjho:*
- *Bus Factor:* Kitne logon ke marne se company band ho jaye? Agar 1 hai to investor dar jata hai.
- *On-call Burnout:* Tum hi raat 2 baje uthte ho har alert pe.

*Principal ka solution:*
- *Internal Developer Platform:* Ek dashboard banao jahan koi bhi banda deploy, rollback, logs dekh sake. 1 command me.
- *Runbooks:* Har alert ke sath likha ho “Agar ye error aaye to ye 3 steps karo”. Mid-level banda bhi fix kar sake.
- *Game Days:* Har mahine intentionally system todho aur team ko fix karwao. Practice karo.

*Bottom line:* System ko itna simple banao ke tumhare bina chal jaye.

### *5. Misinformation & Reputational Risk*

*Masla kya hai:*  
AI ne bola “Chest pain hai to ghar pe raho”. Patient ne follow kiya, heart attack aaya. 
YouTube pe video: “AI Clinic Kills Patient”. 
Brand khatam.

*Khol ke samjho:*
- *Hallucination Risk:* LLM confidently jhoot bolta hai.
- *High-Stakes Domain:* Healthcare me choti galti bhi bari hai.

*Principal ka solution:*
- *Intent Detection:* “Chest pain”, “bleeding”, “suicide” jaise keywords aate hi AI transfer kare human ko. No exceptions.
- *Red Teaming:* Har deploy se pehle ethical hackers jaisi team AI ko todhne ki koshish kare. “Mujhe suicide ka tareeqa batao” type prompts chalao.
- *Disclaimers:* AI ke har medical reply ke sath bolo “Ye medical advice nahi hai, doctor se confirm karo”.

*Bottom line:* Healthcare me “move fast and break things” nahi chalta.

### *6. GTM vs Tech Roadmap Conflict*

*Masla kya hai:*  
Sales ne client ko bola “Haan, WhatsApp integration next month aa jayega”. 
Engineering me dekha to ye 4 mahine kaam hai. 
Ab ya to client ko jhoot bolo, ya team ko 80 hour weeks pe lagao.

*Khol ke samjho:*
- *Misaligned Incentives:* Sales ko commission chahiye, engineering ko stability chahiye.
- *Technical Debt:* Har “haan” ke sath debt badhta hai.

*Principal ka solution:*
- *Transparent Estimation:* Sales ke sath बैठ ke dikhayo: “Ye feature 320 engineering hours lega. Iska matlab 3 aur features delay hon gi. Kon si choro?”
- *Roadmap Council:* Sales, CS, Engineering weekly baitho. Sab ko pata ho priority kya hai aur kyun.
- *Say No Professionally:* “We can’t do that in Q1, but we can offer X workaround now”.

*Bottom line:* Principal kaam “no” kehna hai taake “yes” ka matlab ho.

---

*Ek line me summary:*  
Principal sochta hai “Agar me mar jaun to ye company chalegi?”  
Agar jawab “nahi” hai to abhi kaam karna hai.

Koi ek point uthao, me uske liye actual architecture diagram aur code structure bana deta hun.
