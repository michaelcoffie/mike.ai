// Global state
let currentTier = 'free';
let messageCount = 0;

// Tier configurations
const tierConfig = {
    free: {
        name: 'Free Plan',
        description: 'You\'re using the free tier. Responses may be limited in accuracy and detail.',
        messageLimit: 10,
        responseTime: 7000,
        color: '#6b7280'
    },
    standard: {
        name: 'Standard Plan',
        description: 'You\'re using the standard tier. Good balance of speed and accuracy.',
        messageLimit: 500,
        responseTime: 2500,
        color: '#3b82f6'
    },
    premium: {
        name: 'Premium Plan',
        description: 'You\'re using premium tier. Highest accuracy, speed, and full source verification.',
        messageLimit: Infinity,
        responseTime: 700,
        color: '#10a37f'
    }
};

// Response data
const responses = {
    'peanut-butter': {
        question: 'Is peanut butter recalled?',
        free: {
            answer: "Yes, some peanut butter products have been recalled. Check with stores for more information.",
            accuracy: 'low',
            accuracyText: 'Vague - lacks specific details',
            sources: 'No sources provided'
        },
        standard: {
            answer: "Yes, Jif peanut butter was recalled in May 2022 due to potential Salmonella contamination. The recall affected multiple jar sizes and product codes manufactured at a specific facility in Lexington, Kentucky.",
            accuracy: 'medium',
            accuracyText: 'Mostly accurate - includes key details',
            sources: 'Source: FDA.gov'
        },
        premium: {
            answer: "CURRENT STATUS: As of November 2024, there are active recalls for Costco's Kirkland Signature Organic Creamy Peanut Butter (batch codes starting with 2425) due to potential Listeria contamination.\n\nDETAILED ANALYSIS:\n\n• Affected Products: Kirkland Signature Organic Creamy Peanut Butter, 28 oz jars\n• Reason: Potential Listeria monocytogenes contamination\n• Date Issued: November 2024\n• Manufacturer: Valencia Peanut Company (New Mexico)\n• Batch Codes: Starting with 2425xxx\n• Health Risk: Listeria can cause serious infections, especially in young children, elderly, and immunocompromised individuals\n• Action Required: Check product codes, return to point of purchase for full refund\n• No illnesses reported as of current date\n\nHISTORICAL CONTEXT:\n• 2022: Major Jif recall (J.M. Smucker Co.) - 49 products, Salmonella outbreak\n• Impact: 21 confirmed illnesses across 17 states",
            accuracy: 'high',
            accuracyText: 'Highly accurate - Cross-verified with multiple sources',
            sources: 'VERIFIED SOURCES:\n• FDA Recall Database (accessed 2024-11-13)\n• CDC Food Safety Alerts\n• Costco Official Recall Notice\n• Valencia Peanut Company Press Release\n• Historical: J.M. Smucker Co. 2022 recall documentation'
        }
    },
    'climate-change': {
        question: 'What is climate change?',
        free: {
            answer: "Climate change is happening. Temperatures are rising globally.",
            accuracy: 'low',
            accuracyText: 'Oversimplified - missing critical context',
            sources: 'No sources provided'
        },
        standard: {
            answer: "Climate change refers to long-term shifts in global temperatures and weather patterns. Since the 1800s, human activities have been the main driver, primarily due to burning fossil fuels like coal, oil, and gas. Global temperatures have risen approximately 1.1°C since pre-industrial times (1850-1900), causing more frequent extreme weather events, rising sea levels, and ecosystem disruption.",
            accuracy: 'medium',
            accuracyText: 'Good accuracy - provides context and statistics',
            sources: 'Sources: UN Climate Reports, IPCC'
        },
        premium: {
            answer: "COMPREHENSIVE ANALYSIS: Global climate change represents a measurable, ongoing shift in Earth's climate system, with 2023 marking the warmest year on record. Current data shows 1.45°C warming above pre-industrial baselines.\n\nCURRENT STATE (2024):\n• Global average temperature: +1.45°C above 1850-1900 baseline\n• CO2 levels: 421 ppm (highest in 800,000 years)\n• Sea level rise: 10cm since 1993, accelerating at 4.62mm/year\n• Arctic ice minimum: declined 13% per decade since 1979\n\nKEY DRIVERS:\n• Fossil fuel combustion: 75% of greenhouse gas emissions\n• Deforestation: 11% of emissions\n• Industrial processes: 14% of emissions\n\nVERIFIED IMPACTS:\n• Extreme weather events increased 5x since 1970\n• Ocean acidification up 30% since pre-industrial era\n• 1 million species at risk of extinction\n\nSCIENTIFIC CONSENSUS:\n• 99% of peer-reviewed climate papers support anthropogenic climate change\n• IPCC 6th Assessment: \"unequivocal\" human influence",
            accuracy: 'high',
            accuracyText: 'Highly accurate - Peer-reviewed sources, real-time data',
            sources: 'VERIFIED SOURCES:\n• IPCC Sixth Assessment Report (AR6, 2021-2023)\n• NASA Global Climate Change Database (real-time)\n• NOAA National Centers for Environmental Information\n• World Meteorological Organization (WMO) 2024 Report\n• Nature Climate Change (peer-reviewed, 2024)\n• Copernicus Climate Change Service (EU)'
        }
    },
    'medical': {
        question: 'I have cold symptoms, what should I do?',
        free: {
            answer: "You might be sick. Try resting and drinking water.",
            accuracy: 'low',
            accuracyText: 'Potentially dangerous - no real medical analysis',
            sources: 'No sources provided'
        },
        standard: {
            answer: "Common cold symptoms include runny nose, cough, sore throat, and mild fever. Rest, stay hydrated (8-10 glasses of water daily), and consider over-the-counter medications for symptom relief. Typical cold duration is 7-10 days. If symptoms persist beyond 10 days, worsen, or you develop high fever (>101.3°F), difficulty breathing, or severe symptoms, consult a healthcare provider.",
            accuracy: 'medium',
            accuracyText: 'Reasonably accurate - provides general guidance',
            sources: 'Sources: Mayo Clinic, CDC'
        },
        premium: {
            answer: "IMPORTANT DISCLAIMER: This is informational only. Always consult licensed healthcare providers for medical diagnosis and treatment.\n\nSYMPTOM ANALYSIS FRAMEWORK:\n\nCOMMON COLD (Rhinovirus):\n• Symptoms: Gradual onset, runny nose, sneezing, mild cough, sore throat\n• Duration: 7-10 days\n• Treatment: Rest, hydration (8-10 glasses water/day), OTC symptom relief\n• When to see doctor: Symptoms >10 days, high fever >101.3°F, difficulty breathing\n\nINFLUENZA (Flu):\n• Symptoms: Sudden onset, high fever, body aches, severe fatigue, dry cough\n• Duration: 1-2 weeks\n• Treatment: Antivirals if within 48 hours of symptom onset, rest, fluids\n• When to see doctor: Immediately if high-risk group, trouble breathing, chest pain\n\nCOVID-19:\n• Symptoms: Variable - fever, cough, loss of taste/smell, fatigue, shortness of breath\n• Testing: Required for definitive diagnosis\n• Treatment: Depends on severity; antivirals available for high-risk patients\n• When to see doctor: Difficulty breathing, persistent chest pain, confusion\n\nRED FLAGS (Seek immediate emergency care):\n• Difficulty breathing or shortness of breath\n• Persistent chest pain or pressure\n• Confusion or inability to stay awake\n• Bluish lips or face\n• Severe or persistent vomiting",
            accuracy: 'high',
            accuracyText: 'Medically reviewed - Evidence-based practices',
            sources: 'VERIFIED MEDICAL SOURCES:\n• CDC Clinical Guidelines (updated 2024)\n• Mayo Clinic Medical Reference\n• WHO Disease Information\n• UpToDate Clinical Decision Support\n• New England Journal of Medicine\n• Johns Hopkins Medicine\n\n⚠️ Medical Disclaimer: Consult qualified healthcare professionals for personalized medical advice.'
        }
    }
};

// Select tier and navigate to chat
function selectTier(tier) {
    currentTier = tier;
    messageCount = 0;
    document.getElementById('tier-selection').classList.remove('active');
    document.getElementById('chat-interface').classList.add('active');
    updateTierInfo();
}

// Show tier selection screen
function showTierSelection() {
    document.getElementById('chat-interface').classList.remove('active');
    document.getElementById('tier-selection').classList.add('active');
    resetChat();
}

// Update tier information in chat interface
function updateTierInfo() {
    const config = tierConfig[currentTier];
    document.getElementById('sidebar-plan-name').textContent = config.name;
    
    if (config.messageLimit === Infinity) {
        document.getElementById('sidebar-plan-info').textContent = 'Unlimited messages';
    } else {
        const remaining = config.messageLimit - messageCount;
        document.getElementById('sidebar-plan-info').textContent = `${remaining} messages remaining today`;
    }
    
    document.getElementById('welcome-tier-name').textContent = config.name;
    document.getElementById('welcome-tier-description').textContent = config.description;
}

// Reset chat
function resetChat() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = `
        <div class="welcome-screen">
            <h2 id="welcome-tier-name">${tierConfig[currentTier].name}</h2>
            <p id="welcome-tier-description">${tierConfig[currentTier].description}</p>
            
            <div class="example-prompts">
                <p class="prompts-label">Try asking about:</p>
                <div class="prompt-cards">
                    <button class="prompt-card" onclick="sendExampleQuery('peanut-butter')">
                        <div class="prompt-icon">🥜</div>
                        <div class="prompt-text">Product Recalls</div>
                        <div class="prompt-example">"Is peanut butter recalled?"</div>
                    </button>
                    <button class="prompt-card" onclick="sendExampleQuery('climate-change')">
                        <div class="prompt-icon">🌍</div>
                        <div class="prompt-text">Climate Information</div>
                        <div class="prompt-example">"What is climate change?"</div>
                    </button>
                    <button class="prompt-card" onclick="sendExampleQuery('medical')">
                        <div class="prompt-icon">⚕️</div>
                        <div class="prompt-text">Health Questions</div>
                        <div class="prompt-example">"I have cold symptoms"</div>
                    </button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('chat-input').value = '';
    messageCount = 0;
    updateTierInfo();
}

// Send example query
function sendExampleQuery(queryType) {
    const question = responses[queryType].question;
    document.getElementById('chat-input').value = question;
    sendMessage(queryType);
}

// Send message
function sendMessage(queryType = null) {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message && !queryType) return;
    
    // Detect query type if not provided
    if (!queryType) {
        if (message.toLowerCase().includes('peanut') || message.toLowerCase().includes('recall')) {
            queryType = 'peanut-butter';
        } else if (message.toLowerCase().includes('climate') || message.toLowerCase().includes('warming')) {
            queryType = 'climate-change';
        } else if (message.toLowerCase().includes('cold') || message.toLowerCase().includes('sick') || message.toLowerCase().includes('symptom')) {
            queryType = 'medical';
        } else {
            // Default generic response
            addMessage('user', message);
            input.value = '';
            setTimeout(() => {
                addGenericResponse();
            }, 500);
            return;
        }
    }
    
    const chatMessages = document.getElementById('chat-messages');
    const welcomeScreen = chatMessages.querySelector('.welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.remove();
    }
    
    // Add user message
    const questionText = queryType ? responses[queryType].question : message;
    addMessage('user', questionText);
    input.value = '';
    
    // Show loading
    addLoadingIndicator();
    
    // Simulate response delay
    const config = tierConfig[currentTier];
    setTimeout(() => {
        removeLoadingIndicator();
        addAIResponse(queryType);
        messageCount++;
        updateTierInfo();
    }, config.responseTime);
}

// Add message to chat
function addMessage(sender, text) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = sender === 'user' ? '👤' : '🤖';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">${text}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add loading indicator
function addLoadingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message assistant loading';
    loadingDiv.id = 'loading-message';
    
    loadingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="loading-indicator">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove loading indicator
function removeLoadingIndicator() {
    const loading = document.getElementById('loading-message');
    if (loading) loading.remove();
}

// Add AI response
function addAIResponse(queryType) {
    const chatMessages = document.getElementById('chat-messages');
    const config = tierConfig[currentTier];
    const responseData = responses[queryType][currentTier];
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';
    
    const responseTime = (config.responseTime / 1000).toFixed(1);
    
    messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div>${responseData.answer}</div>
            <div class="message-meta">
                <div class="response-time">Response time: ${responseTime}s</div>
                <div class="accuracy-badge ${responseData.accuracy}">${responseData.accuracyText}</div>
                ${responseData.sources ? `<div class="sources">${responseData.sources}</div>` : ''}
            </div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add generic response for unrecognized queries
function addGenericResponse() {
    const chatMessages = document.getElementById('chat-messages');
    const config = tierConfig[currentTier];
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';
    
    const responses = {
        free: "I found some information, but details are limited on the free tier.",
        standard: "I can help with that. For best results, try one of the example queries above.",
        premium: "I can provide comprehensive information. Try asking about product recalls, climate change, or health questions for detailed, verified responses."
    };
    
    messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div>${responses[currentTier]}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle keyboard shortcuts
function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// Auto-resize textarea
const textarea = document.getElementById('chat-input');
if (textarea) {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
}
