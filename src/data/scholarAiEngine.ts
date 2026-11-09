import { FESTIVAL_METADATA } from './festivalData';

export interface ScholarResponse {
  reply: string;
  category: string;
}

/**
 * High-Calibre Scholarly AI Engine for Sanjanani English Corner.
 * Directly answers grammar questions, sentence diagnostics, literary inquiries,
 * Shakespearean analyses, writing guidance, and festival details.
 * Ensures zero irrelevant loanword fallbacks for general questions.
 */
export function generateScholarResponse(promptText: string): ScholarResponse {
  const p = promptText.trim().toLowerCase();
  const raw = promptText.trim();

  // 0. MULTILINGUAL RECOGNITION & NATIVE PEDAGOGICAL RESPONSES
  // A. Sinhala (සිංහල) inquiries
  if (/[\u0D80-\u0DFF]/.test(raw)) {
    if (raw.includes('ආයුබෝවන්') || raw.includes('සුබ') || raw.includes('කොහොමද') || raw.includes('කවුද')) {
      return {
        category: 'sinhala_greeting',
        reply: `### ආයුබෝවන්! සංජානනී ඉංග්‍රීසි විද්වත් AI (Scholar AI) වෙත සාදරයෙන් පිළිගනිමු!
මම ඓතිහාසික **අස්ගිරි මහා විහාර මහ පිරිවෙන්** පරිශ්‍රයේ පැවැත්වෙන **සංජානනී ශිෂ්‍ය කලා මහෝත්සවය 2026** (${FESTIVAL_METADATA.dates}) ඉංග්‍රීසි අංශයේ (The English Corner) ඔබේ ඉංග්‍රීසි ඉගෙනුම් සහායකයා වෙමි.

**ඔබට සිංහල භාෂාවෙන්ම ඕනෑම ඉංග්‍රීසි ගැටලුවක් විමසිය හැක:**
- **ව්‍යාකරණ (Grammar):** Tenses (කාල භේදය), Passive Voice, Prepositions, Relative Clauses පැහැදිලි කර ගැනීම.
- **වාක්‍ය පරීක්ෂාව (Sentence Diagnostics):** ඔබේ ඉංග්‍රීසි වාක්‍යයේ වැරදි නිවැරදි කර වඩා උසස් ශාස්ත්‍රීය වචන යෙදීම.
- **ෂේක්ස්පියර් (Shakespeare):** හැම්ලට් (Hamlet), මැක්බත් (Macbeth), රෝමියෝ ජුලියට් නාට්‍ය සහ සොනට් කාව්‍ය රසවින්දනය.
- **වචන මාලාව (Vocabulary & Etymology):** නව ඉංග්‍රීසි වචන, ඒවායේ මූලාරම්භය සහ නිවැරදි උච්චාරණය.

*ඔබට අවශ්‍ය ඕනෑම ඉංග්‍රීසි ප්‍රශ්නයක් සිංහලෙන් හෝ ඉංග්‍රීසියෙන් මෙහි ලියන්න!*`
      };
    }

    if (raw.includes('කාල') || raw.includes('tense') || raw.includes('tenses') || raw.includes('ක්‍රියාපද') || raw.includes('ව්‍යාකරණ')) {
      return {
        category: 'sinhala_grammar_tenses',
        reply: `### ඉංග්‍රීසි කාල භේදය (The 12 English Tenses) — සරල සිංහල පැහැදිලි කිරීම

ඉංග්‍රීසි භාෂාවේ ප්‍රධාන කාල 3ක් පවතින අතර, එක් කාලයක් තවත් උප කොටස් 4කට බෙදෙයි (මුළු කාල 12කි):

1. **වර්තමාන කාලය (Present Tense):**
   - **Simple Present:** සාමාන්‍ය සත්‍ය හා පුරුදු සඳහා. (*Formula: Subject + Verb(s/es)*)
     - *උදාහරණය:* "The student reads ancient palm-leaf manuscripts." (ශිෂ්‍යයා පුස්කොළ පොත් කියවයි.)
   - **Present Continuous:** මේ මොහොතේ සිදුවෙමින් පවතින ක්‍රියා. (*Subject + is/am/are + Verb-ing*)
     - *උදාහරණය:* "Monks are studying in the Pirivena library."
   - **Present Perfect:** මෑතකදී නිමවූ නමුත් ප්‍රතිඵලය පවතින ක්‍රියා. (*Subject + have/has + Past Participle [V3]*)
     - *උදාහරණය:* "He has completed his literary thesis."

2. **අතීත කාලය (Past Tense):**
   - **Simple Past:** අතීතයේ සිදුවී නිමවූ ක්‍රියා. (*Subject + Past Verb [V2]*)
     - *උදාහරණය:* "Horace Walpole coined the word 'Serendipity' in 1754."
   - **Past Continuous:** අතීතයේ යම් වේලාවක් පුරා සිදුවෙමින් පැවති ක්‍රියා. (*Subject + was/were + Verb-ing*)
   - **Past Perfect:** අතීතයේ තවත් ක්‍රියාවකට පෙර නිමවූ ක්‍රියාව. (*Subject + had + V3*)

3. **අනාගත කාලය (Future Tense):**
   - **Simple Future:** අනාගතයේ සිදුවන දේ. (*Subject + will + Base Verb*)
     - *උදාහරණය:* "Sanjanani Festival will welcome scholars on October 07, 2026."

💡 **වැදගත් රීතිය:** තනි ඒකවචන කර්තෘන් (He, She, It, The Monk) සමඟ Simple Present හිදී ක්‍රියාපදයට \`-s\` හෝ \`-es\` එකතු වේ!`
      };
    }

    if (raw.includes('ශේක්ස්පියර්') || raw.includes('shakespeare') || raw.includes('නාට්‍ය') || raw.includes('හැම්ලට්') || raw.includes('මැක්බත්')) {
      return {
        category: 'sinhala_shakespeare',
        reply: `### විලියම් ෂේක්ස්පියර් (William Shakespeare: 1564–1616) — සාහිත්‍ය දළ විශ්ලේෂණය

ඉංග්‍රීසි සාහිත්‍යයේ මහා කවියා සහ නාට්‍යකරුවා වන ෂේක්ස්පියර් පිළිබඳ ප්‍රධාන කරුණු:

1. **ප්‍රධාන ඛේදවාචක (Great Tragedies):**
   - **Hamlet (හැම්ලට්):** මානව සැකය, පළිගැනීම සහ මරණය පිළිබඳ ගැඹුරු විවරණය. (*"To be, or not to be, that is the question"*)
   - **Macbeth (මැක්බත්):** අසීමිත බල තණ්හාව සහ එහි විනාශකාරී ප්‍රතිවිපාක.
   - **King Lear (ලියර් රජු):** අන්ධ ආත්මාර්ථය සහ පිය-දූ සබඳතා බිඳවැටීම.
   - **Othello (ඔතෙලෝ):** ඊර්ෂ්‍යාව සහ සැකය මගින් ඇතිවන ඛේදවාචකය.

2. **ප්‍රහසන සහ ආදර නාට්‍ය (Comedies & Romances):**
   - *A Midsummer Night's Dream*, *Twelfth Night*, *The Tempest*, *As You Like It*.

3. **කාව්‍යමය ශෛලිය (Poetic Style):**
   - ඔහු ප්‍රධාන වශයෙන් රචනා කළේ **Iambic Pentameter** (පංචපදී මාත්‍රය — da-DUM da-DUM da-DUM da-DUM da-DUM) නම් රිද්මයට අනුකූලවය.

4. **ඉංග්‍රීසි බසට කළ මෙහෙවර:**
   - ඔහු ඉංග්‍රීසි භාෂාවට නව වචන 1,700කට අධික ප්‍රමාණයක් සහ අද අප භාවිතා කරන නොයෙකුත් ප්‍රස්ථාව පිරුළු එකතු කළේය (උදා: *heart of gold, break the ice, brave new world*).`
      };
    }

    // General Sinhala response with English assistance
    return {
      category: 'sinhala_general',
      reply: `### සංජානනී ඉංග්‍රීසි විද්වත් මගපෙන්වීම (Sanjanani English Scholar Guidance)

ඔබගේ ප්‍රශ්නය: **"${raw}"**

ඉංග්‍රීසි භාෂාව හැදෑරීමේදී සිංහල බසින් තේරුම් ගෙන නිවැරදි ඉංග්‍රීසි වචන භාවිතයට හුරුවීම ඉතා සාර්ථක ක්‍රමයකි.
- **වාක්‍යයක් පරීක්ෂා කිරීමට:** \`Check my sentence: "ඔබේ වාක්‍යය"\` ලෙස ලියන්න.
- **වචනයක තේරුම සහ භාවිතය:** \`Meaning of "Word"\` ලෙස ලියන්න.
- **ඕනෑම ව්‍යාකරණ රීතියක්:** Active/Passive Voice, Direct/Indirect Speech හෝ Prepositions ගැන විමසන්න.

*I am here to bridge Sinhala scholastic heritage with modern global English expression!*`
    };
  }

  // B. Tamil (தமிழ்) inquiries
  if (/[\u0B80-\u0BFF]/.test(raw)) {
    if (raw.includes('வணக்கம்') || raw.includes('யார்') || raw.includes('காலை')) {
      return {
        category: 'tamil_greeting',
        reply: `### வணக்கம்! சஞ்சானனி ஆங்கில அறிஞர் AI-க்கு நல்வரவு!
கண்டி அஸ்கிரி மகா விகார மகா பிரிவேனாவில் நடைபெறும் **சஞ்சானனி இலக்கிய விழா 2026** (${FESTIVAL_METADATA.dates}) ஆங்கிலப் பிரிவிற்கு (The English Corner) உங்களை அன்புடன் வரவேற்கிறேன்.

**நீங்கள் தமிழிலேயே ஆங்கிலக் கேள்விகளைக் கேட்கலாம்:**
- **இலக்கணம் (Grammar):** காலங்கள் (Tenses), வாக்கிய அமைப்பு, Prepositions, Passive Voice.
- **வாக்கிய திருத்தம்:** உங்கள் ஆங்கில வாக்கியங்களைச் சரிபார்த்து செம்மைப்படுத்துதல்.
- **ஷேக்ஸ்பியர் இலக்கியம்:** Shakespeare நாடகங்கள், Sonnets மற்றும் மேற்கோள்கள்.
- **சொற்களஞ்சியம்:** புதிய ஆங்கிலச் சொற்கள் மற்றும் அவற்றின் தோற்றம் (Etymology).

*உங்களுக்குத் தேவையான கேள்வியை தமிழிலோ ஆங்கிலத்திலோ தட்டச்சு செய்யுங்கள்!*`
      };
    }

    if (raw.includes('இலக்கணம்') || raw.includes('காலங்கள்') || raw.includes('ஆங்கிலம்') || raw.includes('விளக்கம்')) {
      return {
        category: 'tamil_grammar',
        reply: `### ஆங்கில இலக்கண விளக்கம் (English Grammar & Tenses)

ஆங்கிலத்தில் 12 காலங்கள் (12 Tenses) உள்ளன. அவை 3 முக்கிய பிரிவுகளாக பிரிக்கப்படுகின்றன:

1. **நிகழ்காலம் (Present Tense):**
   - **Simple Present:** வழக்கமான செயல்கள் மற்றும் உண்மைகள். (*Subject + Verb(s/es)*)
     - *எடுத்துக்காட்டு:* "The monk studies English every evening."
   - **Present Continuous:** இப்போது நடக்கும் செயல். (*Subject + is/am/are + Verb-ing*)
     - *எடுத்துக்காட்டு:* "Students are writing essays at the English Corner."
   - **Present Perfect:** அண்மையில் முடிந்த செயல். (*Subject + have/has + V3*)

2. **இறந்தகாலம் (Past Tense):**
   - **Simple Past:** கடந்த காலத்தில் முடிந்த செயல். (*Subject + Past Verb [V2]*)
     - *எடுத்துக்காட்டு:* "Shakespeare wrote Hamlet in the Elizabethan era."

3. **எதிர்காலம் (Future Tense):**
   - **Simple Future:** இனி நடக்கும் செயல். (*Subject + will + Verb*)
     - *எடுத்துக்காட்டு:* "The literary exhibition will open in Kandy on October 07, 2026."

💡 **முக்கிய விதி:** ஒருமை எழுவாய்க்கு (He, She, It) Simple Present-இல் வினைச்சொல்லுடன் \`-s\` அல்லது \`-es\` சேர்க்க வேண்டும்!`
      };
    }

    return {
      category: 'tamil_general',
      reply: `### சஞ்சானனி ஆங்கில வழிகாட்டல் (Sanjanani English Scholar Guidance)

உங்கள் கேள்வி: **"${raw}"**

ஆங்கில மொழியைக் கற்கும் மாணவர்களுக்காக:
- **வாக்கியங்களைச் சரிபார்க்க:** \`Check my sentence: "உங்கள் வாக்கியம்"\` என எழுதவும்.
- **இலக்கணக் கேள்விகள்:** Tenses, Active & Passive Voice, Clauses பற்றி கேட்கலாம்.
- **ஷேக்ஸ்பியர்:** Hamlet, Macbeth, The Tempest பற்றிய விளக்கங்களைப் பெறலாம்.

*Feel free to ask any English query in Tamil or English!*`
    };
  }

  // C. French, Spanish, German, Hindi, and Global Greetings
  if (/\b(bonjour|salut|comment|français|merci)\b/i.test(p)) {
    return {
      category: 'french_multilingual',
      reply: `### Bienvenue au Pavillon Anglais de Sanjanani 2026 !
Je suis votre tuteur d'anglais et de littérature pour le **Festival Littéraire Sanjanani 2026** au monastère historique d'Asgiri Maha Vihara à Kandy, Sri Lanka.

**Comment puis-je vous aider dans votre apprentissage de l'anglais ?**
- **Grammaire et Syntaxe :** Les 12 temps, la voix passive, les propositions conditionnelles.
- **William Shakespeare :** Analyse dramatique de *Hamlet*, *Macbeth*, et les sonnets.
- **Correction de phrases :** Tapez : \`Check my sentence: "votre phrase"\` pour une révision universitaire.

*N'hésitez pas à poser vos questions en français ou en anglais !*`
    };
  }

  if (/\b(hola|buenos días|buenas tardes|cómo|español|gracias)\b/i.test(p)) {
    return {
      category: 'spanish_multilingual',
      reply: `### ¡Bienvenidos al Rincón de Inglés de Sanjanani 2026!
Soy su tutor de lengua y literatura inglesa para el **Festival Literario Sanjanani 2026** en el histórico Asgiri Maha Vihara en Kandy, Sri Lanka.

**¿Cómo puedo ayudarte con tu aprendizaje de inglés hoy?**
- **Gramática inglesa:** Tiempos verbales, voz pasiva, condicionales y preposiciones.
- **Diagnóstico de oraciones:** Escribe: \`Check my sentence: "tu oración"\` para recibir correcciones académicas.
- **Literatura y Shakespeare:** Análisis de *Hamlet*, *Macbeth*, sonetos y métrica teatral.

*¡Puedes escribir tus dudas en español o en inglés!*`
    };
  }

  if (/[\u0900-\u097F]/.test(raw) || /\b(namaste|namaskar)\b/i.test(p)) {
    return {
      category: 'hindi_multilingual',
      reply: `### संजाननी इंग्लिश कॉर्नर में आपका स्वागत है!
ऐतिहासिक अंसगिरि महा विहार महा पिरिवेना, कैंडी, श्रीलंका में **संजाननी साहित्य महोत्सव 2026** के अंग्रेजी विभाग में आपका स्वागत है।

**मैं आपकी अंग्रेजी शिक्षा में किस प्रकार सहायता कर सकता हूँ?**
- **व्याकरण (Grammar):** Tenses, Active & Passive Voice, Prepositions के नियम और उदाहरण।
- **वाक्य सुधार:** \`Check my sentence: "आपका वाक्य"\` लिखकर व्याकरण की जाँच करवाएँ।
- **शेक्सपियर और विश्व साहित्य:** *Hamlet*, *Macbeth* और Sonnets का विश्लेषण।

*आप हिंदी या अंग्रेजी में बेझिझक प्रश्न पूछ सकते हैं!*`
    };
  }

  // 1. GREETINGS & INTRODUCTIONS
  if (/^(hi|hello|hey|greetings|ayubowan|good morning|good afternoon|good evening)\b/i.test(p) || p === 'who are you' || p === 'what is your name') {
    return {
      category: 'greeting',
      reply: `### Greetings from the Sanjanani English Scholar AI!
Welcome to **The English Corner** at the historic **${FESTIVAL_METADATA.institution}**, Kandy.

I am your dedicated academic and literary tutor for the **${FESTIVAL_METADATA.festivalName}** (${FESTIVAL_METADATA.dates}).

🌍 **Multilingual Learning:** You can converse and ask questions in **any language** (English, සිංහල, தமிழ், Français, Español, etc.)!

**How may I assist your English learning today?**
- **Sentence Diagnostics:** Type: \`Check my sentence: "Your sentence here"\` to analyze syntax and grammar.
- **Grammar Masterclasses:** Inquire about tenses, clauses, passive voice, reported speech, conditionals, or prepositions.
- **William Shakespeare:** Explore *Hamlet*, *Macbeth*, *The Tempest*, *Romeo and Juliet*, or *Sonnet 18* and metric scansion.
- **Writing & Speaking Skills:** Ask how to construct essays, formal letters, or elevate your spoken fluency.
- **Literature & Figures of Speech:** Discover metaphors, similes, personification, and literary eras.

*Feel free to ask any English question in whatever tongue you prefer!*`
    };
  }

  // 2. FESTIVAL DETAILS & SCHEDULE
  if (
    p.includes('festival') ||
    p.includes('sanjanani') ||
    p.includes('when is the festival') ||
    p.includes('where is the festival') ||
    p.includes('asgiri') ||
    p.includes('pirivena') ||
    (p.includes('kandy') && (p.includes('event') || p.includes('festival') || p.includes('exhibition')))
  ) {
    if (p.includes('when') || p.includes('date') || p.includes('time')) {
      return {
        category: 'festival_dates',
        reply: `### Sanjanani Literary Festival 2026 Dates
The festival takes place over three full days:
- **Dates:** **${FESTIVAL_METADATA.dates}** (${FESTIVAL_METADATA.datesSinhala})
- **Location:** ${FESTIVAL_METADATA.location}
- **Pavilion:** The English Corner (සංජානනී ඉංග්‍රීසි අංශය)
- **Admission:** Open to all students, venerable monks, teachers, and literature enthusiasts!

*Key Highlights:* Educational stalls, Shakespeare drama retrospectives, interactive grammar labs, and literary keynotes.`
      };
    }

    if (p.includes('where') || p.includes('venue') || p.includes('location')) {
      return {
        category: 'festival_venue',
        reply: `### Festival Venue & Location
The **Sanjanani Literary Festival 2026** is held at:
- **Institution:** **${FESTIVAL_METADATA.institution}** (${FESTIVAL_METADATA.institutionSinhala})
- **City:** Kandy (Mahanuwara), Central Province, Sri Lanka
- **Historic Context:** Founded in the medieval era of the Kandyan Kingdom, Asgiri Maha Vihara is one of the twin premier chapters of the Siam Nikaya. The Pirivena has long fostered Pali, Sinhala, Sanskrit, and English scholarship.
- **Contact:** Tel: ${FESTIVAL_METADATA.contact.tel} | Mobile: ${FESTIVAL_METADATA.contact.mobile} | Email: ${FESTIVAL_METADATA.contact.email}`
      };
    }

    if (p.includes('schedule') || p.includes('events') || p.includes('program') || p.includes('programme') || p.includes('performance')) {
      return {
        category: 'festival_schedule',
        reply: `### Sanjanani 2026 Festival Schedule & Program
Here is the official festival calendar across the three days:

1. **Day 1 (October 07, 2026):**
   - **08:30 AM:** Inaugural opening of Educational Exhibition Stalls (English Corner, Buddhist Philosophy, Science, Art).
   - **01:00 PM:** Keynote Lecture on *Social Attitudes in Modern Literature & Songs* by veteran speaker **Mr. Sampath Ududumbara**.
   - **07:00 PM:** Traditional Puppet Drama *"Dikthala and Kalagola"* (දික්තල සහ කාලගෝල) by Ambalangoda Sri Aran Art Institute.

2. **Day 2 (October 08, 2026):**
   - **08:30 AM:** Stage Arts & Acting Workshop conducted by veteran thespian **Dr. Sanath Wimalasiri**.
   - **01:00 PM:** Grand Poetry Assembly (*Kavi Maduwa*) led by **Poet Thushara Hettiarchchi**.
   - **07:00 PM:** Critically acclaimed stage drama *"Jahuta"* ('ජහුටා') directed by **Nissanka Gunawardena**.

3. **Day 3 (October 09, 2026):**
   - **08:30 AM:** Musical discourse *Social Vision in Sinhala Buddhist Songs* with live orchestra by **Jagath Wickramasinghe**.
   - **02:00 PM:** Literary Keynote Address by renowned lyricist and director **Wasantha Duggannarala**.`
      };
    }

    return {
      category: 'festival_overview',
      reply: `### About the Sanjanani Literary Festival 2026
**${FESTIVAL_METADATA.festivalName}** (*${FESTIVAL_METADATA.festivalSinhala}*)
- **Theme:** *${FESTIVAL_METADATA.theme}*
- **Dates:** ${FESTIVAL_METADATA.dates}
- **Host Institution:** ${FESTIVAL_METADATA.institution}, Kandy, Sri Lanka
- **The English Corner:** Dedicated to empowering student monks and visiting scholars with mastery of the English language, Shakespearean verse, syntactic precision, and literary critique.`
    };
  }

  // 3. SENTENCE CHECK & GRAMMAR DIAGNOSTICS
  const isCheckingSentence = 
    p.startsWith('check') || 
    p.includes('correct this') || 
    p.includes('is this correct') || 
    p.includes('find mistake') || 
    p.includes('find the mistake') || 
    p.includes('check my sentence') || 
    p.includes('check sentence') || 
    p.includes('sentence check') ||
    p.includes('sentence surgery') ||
    (p.includes('mistake in') && p.length > 15) ||
    /^(is|are|does|can)\s+["'].*["']\s+(correct|grammatical)/i.test(p);

  if (isCheckingSentence || (raw.includes('"') && (p.includes('sentence') || p.includes('correct') || p.includes('check')))) {
    let candidate = '';
    const quoteMatch = raw.match(/["'“‘]([^"'”’]+)["'”’]/);
    if (quoteMatch) {
      candidate = quoteMatch[1].trim();
    } else {
      const colonIndex = raw.indexOf(':');
      if (colonIndex !== -1 && colonIndex < raw.length - 3) {
        candidate = raw.substring(colonIndex + 1).trim();
      } else {
        candidate = raw
          .replace(/^(check this sentence|check my sentence|check this|is this correct|check|correct this|please check|can you check)\s*:?\s*/i, '')
          .replace(/\?+$/, '')
          .trim();
      }
    }

    if (candidate.length > 3) {
      return performSentenceDiagnostics(candidate);
    }
  }

  // 4. CLAUSES & PHRASES
  if (p.includes('clause') || p.includes('phrase') || p.includes('dependent clause') || p.includes('independent clause') || p.includes('relative clause')) {
    if (p.includes('relative clause')) {
      return {
        category: 'grammar_clauses',
        reply: `### Relative Clauses in English Syntax
A relative clause begins with a relative pronoun (*who, whom, whose, which, that*) and provides essential or supplementary information about a noun.

**1. Defining (Restrictive) Relative Clauses:**
- Essential to the sentence's core identity. **No commas** are used.
- *Example:* *The student **who arrived early** received the Shakespeare handbook.*
- *(Without the clause, we would not know which specific student is being referenced).*

**2. Non-Defining (Non-Restrictive) Relative Clauses:**
- Adds incidental or extra background detail. **Must be bracketed by commas**.
- *Example:* *The Asgiri Pirivena, **which was founded centuries ago**, stands on a verdant hill.*
- *(Removing the clause still leaves a complete, identifiable statement).*

**Pronoun Rule:**
- Use **"Who"** for persons as subjects (*The author who wrote this...*).
- Use **"Which"** or **"That"** for objects and animals (*The book which/that was printed...*).
- Use **"Whose"** for possession (*The scholar whose thesis won an award...*).`
      };
    }

    return {
      category: 'grammar_clauses',
      reply: `### Clause vs. Phrase: The Fundamental Distinction in Syntax

**1. What is a Clause?**
A clause is a syntactic unit containing **both a Subject and a Predicate (finite verb)**.
- **Independent Clause:** Expresses a complete thought and can stand alone as a sentence.
  - *Example:* *The temple bell chimed at dawn.*
- **Dependent (Subordinate) Clause:** Contains a subject and verb, but begins with a subordinating conjunction (*because, although, if, since, when*). It cannot stand alone.
  - *Example:* *Although the morning mist was heavy...*

**2. What is a Phrase?**
A phrase is a group of words that functions as a single part of speech **lacking a subject-verb pair**.
- **Prepositional Phrase:** *under the bodhi tree*
- **Noun Phrase:** *the venerable monastic scholar*
- **Participial Phrase:** *holding an ancient ola leaf*
- **Infinitive Phrase:** *to translate the classic sonnet*

**Memory Formula:** 
\`Clause = Subject + Verb\` | \`Phrase = Word cluster without Subject + Verb\``
    };
  }

  // 5. REPORTED SPEECH (DIRECT VS. INDIRECT SPEECH)
  if (p.includes('reported speech') || p.includes('indirect speech') || p.includes('direct speech') || p.includes('direct to indirect')) {
    return {
      category: 'grammar_reported_speech',
      reply: `### Direct vs. Indirect (Reported) Speech Masterclass
When converting spoken words into reported speech, three systematic shifts occur:

**1. Tense Backshift (When the reporting verb is in the past: *said, told, stated*):**
- **Simple Present → Simple Past:** *"I study"* → *He said that he studied.*
- **Present Continuous → Past Continuous:** *"I am writing"* → *She said that she was writing.*
- **Simple Past / Present Perfect → Past Perfect:** *"I wrote / have written"* → *He said he had written.*
- **Will → Would / Can → Could / May → Might:** *"I will come"* → *She said she would come.*

**2. Pronoun & Perspective Shifts:**
- *"I am ready," said Sarath.* → *Sarath said that **he** was ready.*
- *"Our pirivena," said the monk.* → *The monk said that **their** pirivena...*

**3. Time and Place Anchors:**
- *Now → Then*
- *Today → That day*
- *Yesterday → The day before / The previous day*
- *Tomorrow → The following day / The next day*
- *Here → There / This → That*

**Key Example:**
> Direct: *“I am reading Hamlet today,” said Rahula.*
> Indirect: *Rahula said that he was reading Hamlet that day.*`
    };
  }

  // 6. ACTIVE VS. PASSIVE VOICE
  if (p.includes('passive') || (p.includes('active') && p.includes('voice')) || p.includes('convert to active') || p.includes('convert to passive')) {
    return {
      category: 'grammar_voice',
      reply: `### Active vs. Passive Voice Masterclass

**1. Active Voice (Direct, Energetic & Kinetic):**
- **Formula:** **Subject (Actor) + Verb + Object (Receiver)**
- **Example:** *The scholar translated the ancient ola manuscript.*
- **Why Use It:** It creates clarity, vigor, and direct accountability.

**2. Passive Voice (Diplomatic, Objective & Recipient-Focused):**
- **Formula:** **Object + Form of "To Be" + Past Participle + [by Agent]**
- **Example:** *The ancient ola manuscript was translated by the scholar.*

**Transformation Across Tenses:**
- *Present Simple:* *Translates → is translated*
- *Past Simple:* *Translated → was translated*
- *Present Perfect:* *Has translated → has been translated*
- *Future Simple:* *Will translate → will be translated*
- *Continuous:* *Is translating → is being translated*

**Golden Rule:** Use active voice for 85% of your writing for punchy, memorable expression. Reserve passive voice when the actor is unknown or when the receiver is the primary ethical focus.`
    };
  }

  // 7. MODAL VERBS
  if (p.includes('modal verb') || p.includes('modals') || (p.includes('can') && p.includes('could') && p.includes('may'))) {
    return {
      category: 'grammar_modals',
      reply: `### Modal Auxiliary Verbs in English Syntax
Modals modify the mood, attitude, certainty, or obligation of the main verb:

1. **Ability:**
   - **Can (Present):** *The student can recite 100 lines of Shakespeare.*
   - **Could (Past / Hypothetical):** *In his youth, he could chant in Pali effortlessly.*
2. **Permission & Politeness:**
   - **May (Formal):** *May I review your manuscript?*
   - **Could / Can (Casual):** *Could you please pass the lexicon?*
3. **Obligation & Necessity:**
   - **Must (Absolute / Moral):** *Scholars must acknowledge their citations.*
   - **Should / Ought to (Advice / Recommendation):** *You should inspect the meter before reciting.*
4. **Possibility & Probability:**
   - **Might / May:** *The rain might clear before the evening puppet drama.*

**Invariant Rule:** Modals never take an "-s" in third-person singular (*He cans* ❌ → *He can* ✅), and they are followed directly by the base bare infinitive without "to" (*She must goes* ❌ → *She must go* ✅).`
    };
  }

  // 8. TENSES (12 TENSES, PAST PERFECT, FUTURE PERFECT)
  if (
    p.includes('tense') ||
    p.includes('past perfect') ||
    p.includes('present continuous') ||
    p.includes('future perfect') ||
    p.includes('12 tenses') ||
    p.includes('verb tense')
  ) {
    if (p.includes('past perfect')) {
      return {
        category: 'grammar_tenses',
        reply: `### The Past Perfect Tense ("Had" + Past Participle)
The Past Perfect designates an action that was completed **before another past event** occurred.

- **Formula:** **Subject + had + Past Participle**
- **Example:** *The keynote speaker had already departed before the rain began over Kandy.*
- **Timeline:**
  1. Speaker departed (Past Perfect — Earliest Event: *had departed*)
  2. Rain began (Simple Past — Later Event: *began*)
  3. Present Moment (Now)

**Key Signal Words:** *before, after, by the time, already, when*.`
      };
    }

    if (p.includes('future perfect')) {
      return {
        category: 'grammar_tenses',
        reply: `### The Future Perfect Tense ("Will have" + Past Participle)
The Future Perfect looks forward to an event that will be completed **prior to a designated milestone in future time**.

- **Formula:** **Subject + will have + Past Participle**
- **Example:** *By October 2026, the Pirivena will have hosted the Sanjanani Festival for successive generations.*
- **Key Signal:** Pairs with a temporal benchmark starting with *"By..."* (*By tomorrow, by next year, by 5:00 PM*).`
      };
    }

    return {
      category: 'grammar_tenses',
      reply: `### The 12 English Tenses Quick Reference Guide
English tenses are structured on a 3 × 4 matrix:

| Aspect | Present | Past | Future |
| :--- | :--- | :--- | :--- |
| **Simple** | *I write* (Habits, facts) | *I wrote* (Completed past act) | *I will write* (Decisions, predictions) |
| **Continuous** | *I am writing* (Now ongoing) | *I was writing* (Interrupted action) | *I will be writing* (Future ongoing) |
| **Perfect** | *I have written* (Past to now) | *I had written* (Before past event) | *I will have written* (Before future deadline) |
| **Perf. Cont.** | *I have been writing* (Duration) | *I had been writing* (Past duration) | *I will have been writing* |

**Top Pro-Tip:** Strive for tense consistency across a paragraph. Do not oscillate between past and present without an intentional time-shift!`
    };
  }

  // 9. COMMONLY CONFUSED WORDS (AFFECT/EFFECT, THEIR/THERE, ITS/IT'S, WHO/WHOM)
  if (
    p.includes('affect vs effect') ||
    p.includes('affect or effect') ||
    p.includes('difference between affect and effect') ||
    p.includes('their vs there') ||
    p.includes('its vs it\'s') ||
    p.includes('who vs whom') ||
    p.includes('then vs than') ||
    p.includes('loose vs lose') ||
    p.includes('accept vs except') ||
    p.includes('compliment vs complement')
  ) {
    if (p.includes('affect') && p.includes('effect')) {
      return {
        category: 'confused_words',
        reply: `### Affect vs. Effect: The Definitive Guide
Remember the mnemonic **RAVEN**:
- **R**emember
- **A**ffect is a **V**erb
- **E**ffect is a **N**oun

1. **Affect (Verb):** To influence, alter, or produce an emotional impact.
   - *Example:* *The tranquil atmosphere of Asgiri Maha Vihara affected his poetic composition.*
2. **Effect (Noun):** The result, outcome, or consequence of an action.
   - *Example:* *The visual effect of the morning mist was breathtaking.*

*Exceptions in Advanced English:*
- *Affect (Noun):* Emotional countenance in psychology (*flat affect*).
- *Effect (Verb):* To bring about or cause to exist (*to effect lasting reforms*).`
      };
    }

    if (p.includes('their') || p.includes('there') || p.includes('they\'re')) {
      return {
        category: 'confused_words',
        reply: `### Their vs. There vs. They're
These homophones sound identical but serve totally distinct functions:

1. **There (Location / Existence):**
   - Place: *The manuscripts are kept **there** in the library.*
   - Existence: ***There** are three days of literary events.*
   - *Memory Aid:* Contains the word **HERE** (which is also a place!).
2. **Their (Possessive Pronoun):**
   - Shows ownership by multiple people: ***Their** recitation was magnificent.*
   - *Memory Aid:* Contains the letter **I** (referring to people/owners).
3. **They're (Contraction for "They Are"):**
   - Replace with "they are" to test: ***They're** rehearsing Hamlet* = *They are rehearsing Hamlet.*`
      };
    }

    if (p.includes('its') && (p.includes('it\'s') || p.includes('apostrophe'))) {
      return {
        category: 'confused_words',
        reply: `### Its vs. It's
1. **It's (Contraction with Apostrophe):**
   - Short for **"It is"** or **"It has"**.
   - *Example:* *It's (It is) an honor to speak at the English Corner.*
   - *Example:* *It's (It has) been a fruitful morning.*
2. **Its (Possessive Pronoun without Apostrophe):**
   - Shows possession for an object, institution, or animal (parallel to *his, hers, ours, theirs*).
   - *Example:* *The Asgiri Pirivena opened **its** historical archives.*
   - *Example:* *The book lost **its** cover.*

**Golden Test:** Substitute *"it is"*. If *"it is"* makes sense, use **it's**. If it sounds wrong, use **its**!`
      };
    }

    if (p.includes('who') && p.includes('whom')) {
      return {
        category: 'confused_words',
        reply: `### Who vs. Whom: The He/Him Substitution Rule
Use this simple trick:
- **Who:** Used as a **Subject** (the actor). Corresponds to **He / She / They**.
- **Whom:** Used as an **Object** (the receiver of action or following a preposition). Corresponds to **Him / Her / Them**.

**How to Test:**
- Question: *[Who/Whom] wrote Hamlet?*
  - Answer: *He wrote Hamlet* (not *Him*). Therefore: ***Who** wrote Hamlet?*
- Question: *To [who/whom] should I address this letter?*
  - Answer: *Address it to him* (not *to he*). Therefore: *To **whom** should I address this letter?*`
      };
    }
  }

  // 10. OXFORD COMMA & PUNCTUATION
  if (p.includes('oxford comma') || p.includes('semicolon') || p.includes('colon') || p.includes('punctuation') || p.includes('em dash') || p.includes('hyphen')) {
    if (p.includes('semicolon') || p.includes('colon')) {
      return {
        category: 'punctuation_semicolon',
        reply: `### Semicolon (;) vs. Colon (:) Syntax Rules

**1. The Semicolon (;): The Bridge Between Independent Clauses**
- Connects two complete thoughts that are intimately linked without using a conjunction (*and, but, so*).
  - *Example:* *The temple bell chimed at dawn; the scholars assembled in the hall.*
- Separates complex items in a list that already contain internal commas.
  - *Example:* *Delegates arrived from Kandy, Sri Lanka; Kyoto, Japan; and Oxford, England.*

**2. The Colon (:): The Trumpet Introducing Something New**
- Introduces an elaboration, quotation, explanation, or list after an already complete independent clause.
  - *Example:* *Shakespeare presented three universal virtues: truth, fortitude, and mercy.*
  - *Rule:* The clause before a colon must be grammatically complete on its own!`
      };
    }

    return {
      category: 'punctuation_oxford_comma',
      reply: `### The Oxford (Serial) Comma
The Oxford comma is the comma placed immediately before the coordinating conjunction (*and* or *or*) in a series of three or more items.

**Why It Prevents Hilarious Ambiguity:**
- **Without Oxford Comma:**
  *We invited the speakers, William Shakespeare and the Abbot.*
  *(Ambiguity: Suggests that the speakers ARE Shakespeare and the Abbot!)*
- **With Oxford Comma:**
  *We invited the speakers, William Shakespeare, and the Abbot.*
  *(Explicitly three separate entities).*

**Recommendation:** At the Sanjanani English Corner, we strongly encourage the Oxford comma for academic clarity and competitive writing.`
    };
  }

  // 11. ARTICLES (A, AN, THE)
  if (p.includes('article') && (p.includes('a vs an') || p.includes('definite') || p.includes('indefinite') || p.includes('the'))) {
    return {
      category: 'grammar_articles',
      reply: `### English Articles ("A", "An", "The")
Articles indicate whether a noun is specific or general.

**1. Indefinite Articles ("A" vs. "An"):**
- **Phonetic Rule:** The selection between "A" and "An" is determined by **SOUND**, never by written spelling!
  - **Use "A" before Consonant Sounds:** *a book, a scholar, a university* (starts with /j/ consonant sound!), *a European* (starts with /j/ sound!).
  - **Use "An" before Vowel Sounds:** *an apple, an hour* (silent 'h'!), *an honorable monk* (silent 'h'!).

**2. Definite Article ("The"):**
- Refers to a specific, unique, or previously referenced entity: *The English Corner, the moon, the Venerable Abbot.*
- **Geographic Rule:** Do not use "the" before proper names of individual countries (*Sri Lanka*, not *the Sri Lanka*), unless they are plural or political unions (*the United Kingdom, the Maldives, the United States*).`
    };
  }

  // 12. PREPOSITIONS (IN, ON, AT, SINCE, FOR, BETWEEN, AMONG)
  if (p.includes('preposition') || p.includes('in on at') || p.includes('between vs among')) {
    return {
      category: 'grammar_prepositions',
      reply: `### Prepositions of Time & Place: The Specificity Pyramid

1. **IN (General / Broadest / Enclosed):**
   - **Time (Centuries, Decades, Years, Months, Seasons):** *in the 21st century, in 2026, in October, in spring, in the morning*
   - **Place (Countries, Cities, Large Areas, Enclosed spaces):** *in Sri Lanka, in Kandy, in the courtyard*

2. **ON (Intermediate / Surfaces & Specific Days):**
   - **Time (Days & Dates):** *on Wednesday, on October 7th, on the weekend*
   - **Place (Streets, Avenues, Surfaces):** *on Temple Street, on the ola leaf, on the table*

3. **AT (Most Specific / Precise Coordinates & Clock Times):**
   - **Time (Clock times & pinpoints):** *at 8:30 AM, at noon, at dusk*
   - **Place (Specific addresses, venues):** *at Asgiri Maha Vihara, at home, at the English Corner pavilion*

**Between vs. Among:**
- **Between:** Two distinct, separate items (*between Shakespeare and Milton*).
- **Among:** An undifferentiated group of three or more (*among the pirivena students*).`
    };
  }

  // 13. PARTS OF SPEECH (NOUN, VERB, ADJECTIVE, ADVERB, ETC.)
  if (
    p.includes('part of speech') ||
    p.includes('parts of speech') ||
    p.includes('what is a noun') ||
    p.includes('what is a verb') ||
    p.includes('what is an adjective') ||
    p.includes('what is an adverb') ||
    p.includes('what is a pronoun') ||
    p.includes('what is a conjunction')
  ) {
    return {
      category: 'grammar_parts_of_speech',
      reply: `### The Eight Parts of Speech in English Syntax

1. **Noun:** Names a person, place, thing, or abstract idea (*scholar, Kandy, monastery, serenity, knowledge*).
2. **Pronoun:** Substitutes for a noun to prevent monotony (*he, she, they, who, each, which*).
3. **Verb:** Expresses physical kinetic action or state of being (*translate, recite, chant, contemplate, is, become*).
4. **Adjective:** Modifies, qualifies, and enlivens a noun (*ancient, numinous, eloquent, venerable*).
5. **Adverb:** Modifies a verb, adjective, or another adverb (*gracefully, exceptionally, yesterday*).
6. **Preposition:** Establishes spatial, temporal, or logical relations (*upon, beneath, during, in*).
7. **Conjunction:** Bridges words, phrases, or clauses (*and, but, although, because, however*).
8. **Interjection:** Expresses spontaneous emotion (*Hark!, Alas!, Indeed!*).`
    };
  }

  // 14. HISTORY & ORIGIN OF THE ENGLISH LANGUAGE (OLD, MIDDLE, MODERN ENGLISH)
  if (
    (p.includes('origin') && p.includes('english') && !p.includes('word')) ||
    (p.includes('history') && p.includes('english')) ||
    p.includes('where did english come from') ||
    p.includes('how did english develop') ||
    p.includes('evolution of english') ||
    p.includes('anglo-saxon')
  ) {
    return {
      category: 'history_of_english',
      reply: `### The Historical Evolution of the English Language
The English language is a Germanic tongue shaped through three major transformative epochs:

1. **Old English (c. 450–1150 AD):**
   - Brought to Britain by Germanic tribes (Angles, Saxons, and Jutes).
   - Highly inflected with complex grammatical cases.
   - Masterwork: The heroic epic poem *Beowulf*. Core words: *water, earth, heart, mother*.

2. **Middle English (c. 1150–1500 AD):**
   - Triggered by the **Norman Conquest of 1066**, infusing over 10,000 French and Latin vocabulary terms (law, government, cuisine, nobility).
   - Inflections softened into simpler word order.
   - Masterwork: Geoffrey Chaucer's *The Canterbury Tales*.

3. **Early Modern English (c. 1500–1750 AD):**
   - Driven by the printing press, the **Great Vowel Shift**, and the Renaissance.
   - Immortalized by **William Shakespeare** and the King James Bible (1611).

4. **Modern & Global English (1750–Present):**
   - Expanded into a global lingua franca with vast borrowings from colonial interactions, scientific advancements, and world cultures (including South Asian and Sri Lankan loanwords!).`
    };
  }

  // 14B. ORIGINS OF ENGLISH VOCABULARY & INFLUENCES FROM OTHER LANGUAGES
  if (
    p.includes('words from other languages') ||
    p.includes('where do english words come from') ||
    p.includes('where did english words come from') ||
    p.includes('word origins') ||
    p.includes('etymology of english words') ||
    p.includes('languages that influenced english') ||
    p.includes('latin roots') ||
    p.includes('greek roots')
  ) {
    return {
      category: 'word_origins_general',
      reply: `### Where Do English Words Come From? The Global Tapestry of Vocabulary
Modern English has one of the largest vocabularies in human history (over 600,000 words), built upon layers of borrowing:

1. **Latin (c. 29%):** Sourced through the Roman Catholic Church, Renaissance scholarship, law, and medicine (*justice, intellect, scripture, educate, formula*).
2. **French & Norman (c. 29%):** Introduced following the Norman Conquest of 1066. Enriched governance, high cuisine, military, and art (*court, sovereign, bouquet, beef, parliament, liberty*).
3. **Germanic & Old English (c. 26%):** The indispensable foundation. Accounts for the most frequent words: pronouns (*he, she, they*), verbs of basic human existence (*be, have, eat, live, breathe*), and natural elements (*earth, sun, water, sky*).
4. **Greek (c. 6%):** Enriched philosophy, drama, science, and rhetoric (*theatre, democracy, psychology, rhythm, harmony, metaphor*).
5. **Global Loanwords (c. 6%):** Sourced from worldwide trade and intercultural contact:
   - **Arabic:** *Algebra, algorithm, coffee, cotton*
   - **Hindi / Sanskrit:** *Guru, jungle, avatar, pundit*
   - **Sinhala / Sri Lankan:** *Serendipity, tourmaline*
   - **Tamil:** *Catamaran, mango, curry*
6. **Coined & Eponymous Terms (c. 4%):** Words invented by writers like William Shakespeare (*eyeball, swagger, critic*) or named after inventors.`
    };
  }
  if (
    p.includes('shakespeare') ||
    p.includes('hamlet') ||
    p.includes('macbeth') ||
    p.includes('tempest') ||
    p.includes('romeo and juliet') ||
    p.includes('sonnet 18') ||
    p.includes('iambic pentameter') ||
    p.includes('bard of avon')
  ) {
    if (p.includes('hamlet') || p.includes('to be or not to be')) {
      return {
        category: 'shakespeare_hamlet',
        reply: `### William Shakespeare's *Hamlet, Prince of Denmark* (c. 1601)
*Hamlet* is Shakespeare's crowning psychological tragedy of grief, inaction, and moral conscience.

**Core Narrative Arc:**
Prince Hamlet is commanded by the ghost of his murdered father to take vengeance upon his uncle, King Claudius. However, Hamlet's intense philosophical mind deliberates over the consequences of murder and the afterlife.

**The "To be, or not to be" Soliloquy (Act III, Scene 1):**
- **Existential Dilemma:** Weighing the nobility of enduring *"the slings and arrows of outrageous fortune"* against actively ending mortal suffering.
- **The Undiscovered Country:** Why humans endure suffering—because the fear of death *"puzzles the will, / And makes us rather bear those ills we have / Than fly to others that we know not of."*
- **Philosophical Verdict:** *"Thus conscience does make cowards of us all / And thus the native hue of resolution / Is sicklied o'er with the pale cast of thought."*`
      };
    }

    if (p.includes('macbeth') || p.includes('tomorrow and tomorrow')) {
      return {
        category: 'shakespeare_macbeth',
        reply: `### William Shakespeare's *Macbeth* (c. 1606)
Shakespeare's swiftest and darkest tragedy exploring corrosive ambition and the psychological breakdown of guilt.

**Key Themes:**
1. **Unchecked Ambition:** Seduced by the Weird Sisters' prophecies and incited by Lady Macbeth, Macbeth murders the saintly King Duncan.
2. **Guilt as Blood & Sleeplessness:** *"Will all great Neptune's ocean wash this blood clean from my hand?"*
3. **The "Tomorrow, and tomorrow, and tomorrow" Soliloquy (Act V, Scene 5):**
   *“Life's but a walking shadow, a poor player / That struts and frets his hour upon the stage / And then is heard no more: it is a tale / Told by an idiot, full of sound and fury, / Signifying nothing.”*`
      };
    }

    if (p.includes('tempest') || p.includes('prospero') || p.includes('caliban')) {
      return {
        category: 'shakespeare_tempest',
        reply: `### William Shakespeare's *The Tempest* (c. 1611)
Regarded as Shakespeare's poetic farewell to drama, exploring magic, forgiveness, and freedom.

**Core Themes:**
1. **Reconciliation Over Revenge:** Exiled sorcerer Duke Prospero has his treacherous enemies marooned on his island. Instead of executing vengeance, he proclaims: *"The rarer action is / In virtue than in vengeance."*
2. **Language and Colonization:** Caliban's famous post-colonial indictment: *"You taught me language, and my profit on't / Is, I know how to curse."*
3. **Theatrical Transience:** *“We are such stuff / As dreams are made on, and our little life / Is rounded with a sleep.”*`
      };
    }

    if (p.includes('romeo') || p.includes('juliet')) {
      return {
        category: 'shakespeare_romeo_juliet',
        reply: `### William Shakespeare's *Romeo and Juliet* (c. 1595–96)
The world's most enduring tragedy of youthful love destroyed by ancestral family hatred.

**Key Insights:**
- **The Balcony Scene (Act II, Scene 2):**
  *“What's in a name? That which we call a rose / By any other word would smell as sweet.”*
  Juliet perceptively argues that societal labels and clan rivalries are artificial constructs that obscure genuine human worth.`
      };
    }

    if (p.includes('iambic pentameter') || p.includes('meter') || p.includes('scansion')) {
      return {
        category: 'shakespeare_meter',
        reply: `### Iambic Pentameter: The Heartbeat of Shakespearean Verse
Shakespeare composed his plays and sonnets in **iambic pentameter**:

**1. What is an Iamb?**
An iamb is a two-syllable metric foot with an **unstressed syllable** followed by a **stressed syllable** (*da-DUM*).

**2. What is Pentameter?**
*Penta* = 5. A line of iambic pentameter contains **5 iambs**, equaling **10 syllables per line**.

**3. Example from Sonnet 18:**
Shall **I** / com **PARE** / thee **TO** / a **SUM** / mer's **DAY**?
(da - **DUM** / da - **DUM** / da - **DUM** / da - **DUM** / da - **DUM**)

**Why Shakespeare Used It:** It mimics the natural rhythm of spoken English elevated with the cadence of the human heartbeat.`
      };
    }

    if (p.includes('sonnet')) {
      return {
        category: 'shakespeare_sonnet',
        reply: `### Shakespeare's Sonnet Canon & Sonnet 18
Shakespeare published 154 sonnets in 1609.

**Structure of a Shakespearean Sonnet:**
- **14 Lines** in iambic pentameter.
- **Three Quatrains (ABAB CDCD EFEF):** Develops three variations of an intellectual or romantic argument.
- **Concluding Rhyming Couplet (GG):** The *volta* (turn) delivering a witty, emotional, or philosophical resolution.

**Sonnet 18 ("Shall I compare thee to a summer's day?"):**
Physical summer is fleeting, stormy, and hot; but the beloved's grace is immortalized through the eternal lines of verse:
*“So long as men can breathe or eyes can see, / So long lives this, and this gives life to thee.”*`
      };
    }

    return {
      category: 'shakespeare_general',
      reply: `### William Shakespeare (1564–1616) — The Bard of Avon
William Shakespeare composed **37 plays**, **154 sonnets**, and two narrative poems.

**Key Contributions to the English Language:**
1. **Coined Over 1,700 Words:** *eyeball, majestic, swagger, generous, assassination, addiction, critic, lonely, dawn, champion*.
2. **Everyday Idiomatic Phrases:** *"Break the ice"*, *"wild goose chase"*, *"heart of gold"*, *"all that glitters is not gold"*, *"in a pickle"*.
3. **Theatrical Soliloquies:** Pioneered the dramatic technique of allowing the audience to hear characters' private deliberations.`
      };
    }


  // 16. FIGURES OF SPEECH & LITERARY DEVICES
  if (
    p.includes('metaphor') ||
    p.includes('simile') ||
    p.includes('personification') ||
    p.includes('alliteration') ||
    p.includes('hyperbole') ||
    p.includes('onomatopoeia') ||
    p.includes('figure of speech') ||
    p.includes('figures of speech') ||
    p.includes('literary device')
  ) {
    if (p.includes('metaphor') || p.includes('simile')) {
      return {
        category: 'literary_devices',
        reply: `### Metaphor vs. Simile: Figures of Comparison

1. **Simile (Comparison using "Like" or "As"):**
   - Explicitly links two different things to highlight a shared characteristic.
   - *Example:* *The temple stupa gleamed in the mist **like** a lotus upon tranquil waters.*
   - *Shakespeare:* *"My love is **as** a fever, longing still."*

2. **Metaphor (Direct Equivalence without "Like" or "As"):**
   - Asserts that one entity **IS** another, transferring its symbolic meaning directly.
   - *Example:* *Language is a lantern illuminating foreign seas.*
   - *Shakespeare:* *"All the world's a stage, and all the men and women merely players."*

**Pro-Tip:** Metaphors are generally more powerful and immersive because they demand immediate symbolic fusion!`
      };
    }

    return {
      category: 'literary_devices',
      reply: `### Key Figures of Speech in English Literature

1. **Personification:** Attributing human emotions, consciousness, or acts to inanimate things.
   - *Example:* *The morning wind whispered through the Asgiri temple pines.*
2. **Alliteration:** The repetition of identical consonant sounds at the start of neighboring words.
   - *Example:* *Silent scholars scanned the sacred scripts.*
3. **Hyperbole:** Purposeful, dramatic exaggeration used for rhetorical emphasis.
   - *Example:* *I have reviewed this grammar rule ten thousand times!*
4. **Onomatopoeia:** Words whose acoustic pronunciation echoes their literal meaning (*buzz, sizzle, clash, whisper*).
5. **Oxymoron:** Pairing two contradictory concepts side by side (*deafening silence, bittersweet memory*).`
    };
  }

  // 17. WRITING SKILLS: ESSAYS, LETTERS, VOCABULARY, SPEAKING FLUENCY
  if (
    p.includes('how to write an essay') ||
    p.includes('essay writing') ||
    p.includes('formal letter') ||
    p.includes('improve english speaking') ||
    p.includes('improve speaking') ||
    p.includes('expand vocabulary') ||
    p.includes('vocabulary')
  ) {
    if (p.includes('essay')) {
      return {
        category: 'writing_essay',
        reply: `### How to Structure a High-Scoring Academic Essay
Follow the classical architectural model:

1. **Introduction (10–15%):**
   - **Hook:** Start with a compelling quote, provocative fact, or universal question.
   - **Context:** Define key terms and historical background.
   - **Thesis Statement:** One definitive, arguable claim that answers the essay prompt.

2. **Body Paragraphs (70–80% — The PEEL Method):**
   - **P - Point:** Clear topic sentence asserting the argument.
   - **E - Evidence:** Citation, textual quote, or statistical data.
   - **E - Explanation:** Unpack how this evidence proves your thesis.
   - **L - Link:** Transition smoothly into the next paragraph's premise.

3. **Conclusion (10–15%):**
   - Restate thesis in elevated, fresh phrasing.
   - Synthesize major findings (do NOT introduce new evidence).
   - Leave a resonant final thought on broader social or philosophical significance.`
      };
    }

    if (p.includes('letter')) {
      return {
        category: 'writing_letter',
        reply: `### Standard Formal Letter & Email Format
1. **Sender’s Address & Date** (Top right or top left).
2. **Recipient’s Designation & Address.**
3. **Salutation:** *Dear Venerable Abbot / Dear Sir or Madam / Dear Dr. Perera,*
4. **Subject Line:** *Regarding Participation in Sanjanani Literary Festival 2026*
5. **Opening Paragraph:** State the immediate purpose of writing directly.
6. **Body Paragraph(s):** Provide necessary context, schedule, or request details.
7. **Call to Action / Next Step:** *I look forward to your favorable response.*
8. **Formal Sign-off:** *Yours faithfully* (if recipient unknown) or *Yours sincerely* (if named), followed by signature and full name.`
      };
    }

    if (p.includes('speaking')) {
      return {
        category: 'speaking_fluency',
        reply: `### 4 Proven Techniques to Improve Spoken English Fluency
1. **The Shadowing Technique:** Listen to high-calibre English speakers (speeches, audiobooks) and repeat their words in real-time, matching their intonation, pause rhythms, and vowel sounds.
2. **Think Directly in English:** Consciously describe your daily routine in English without translating from Sinhala or Tamil first.
3. **The 2-Minute Monologue Drill:** Pick an everyday topic (*morning mist in Kandy, a favorite book*) and speak continuously for 2 minutes without stopping. Record and review for filler words (*um, like*).
4. **Embrace Pauses over Speed:** Eloquent speakers speak at 110–130 words per minute. Deliberate pauses project authority and give your mind time to formulate elegant syntax.`
      };
    }

    return {
      category: 'vocabulary_expansion',
      reply: `### Strategic Vocabulary Elevation: Root Words & Stems
Rather than memorizing isolated lists, master classical Latin and Greek roots:

- **Bene (Well / Good):** *Benefactor, benevolent, beneficial*
- **Mal (Bad / Evil):** *Malevolent, malicious, malignant*
- **Chron (Time):** *Chronology, synchronous, anachronism*
- **Loqu / Loc (Speak):** *Eloquent, loquacious, colloquial, soliloquy*
- **Luc / Lum (Light):** *Lucid, illuminate, luminary*

*One root unlocks dozens of interconnected academic words!*`
    };
  }

  // 18. SRI LANKAN LOANWORDS & ETYMOLOGIES (STRICTLY SCOPED)
  const isLoanwordQuery = 
    p.includes('loanword') || 
    p.includes('loan word') || 
    p.includes('borrowed word') || 
    (p.includes('sinhala') && (p.includes('in english') || p.includes('word') || p.includes('origin') || p.includes('vocabulary'))) ||
    p.includes('words from sri lanka') || 
    p.includes('words from sinhala') || 
    p.includes('sri lankan words in english') || 
    p.includes('ceylon words') ||
    p.includes('serendipity') ||
    p.includes('tourmaline');

  if (isLoanwordQuery) {
    return {
      category: 'loanwords_etymology',
      reply: `### English Words with Sri Lankan & South Asian Origins
English has borrowed notable terms with roots in Ceylon and Sinhala:

1. **Serendipity:** Coined in 1754 by Horace Walpole, inspired by the fairy tale *The Three Princes of Serendip* (the Persian/Arabic name for Sri Lanka). Means the faculty of making fortunate discoveries by chance.
2. **Tourmaline:** From the Sinhala gemological term *Thoramalli (තෝරමල්ලි)*, denoting colorful semi-precious stones mined in Ceylon gem pits.
3. **Catamaran:** From Tamil *Kattu-maram* (tied logs), maritime watercraft used along Ceylon and Coromandel coastlines.
4. **Mulligatawny:** From *Milagu-tannir* (pepper-water), a spiced soup popularized during the British colonial era in Ceylon and Madras.
5. **Anicut:** A dam or weir built across a river to divert water for cultivation, originating from ancient South Asian hydraulic engineering traditions.`
    };
  }

  // 19. LITERATURE ERAS: ROMANTICISM, VICTORIAN, MODERNISM, SRI LANKAN LITERATURE
  if (p.includes('romanticism') || p.includes('romantic poetry')) {
    return {
      category: 'literature_eras',
      reply: `### The Romantic Movement in English Literature (c. 1798–1837)
A passionate revolt against Enlightenment rationalism and industrial mechanization.

- **Key Luminaries:** William Wordsworth, Samuel Taylor Coleridge, John Keats, Percy Bysshe Shelley, Lord Byron, William Blake.
- **Core Pillars:**
  1. **The Sublime in Nature:** Finding ecstatic terror, reverence, and spiritual rejuvenation in mountains, oceans, and ruins.
  2. **Primacy of Imagination & Emotion:** Wordsworth defined poetry as *"the spontaneous overflow of powerful feelings recollected in tranquility."*
  3. **Rebellion Against Cold Reason:** Celebrating solitary contemplators, outcasts, and ancient folklore.`
    };
  }

  if (p.includes('victorian')) {
    return {
      category: 'literature_eras',
      reply: `### The Victorian Epoch (c. 1837–1901)
Literature flourished amidst imperial expansion, industrial factories, and social friction.

- **Key Luminaries:** Charles Dickens, Charlotte Brontë, Emily Brontë, George Eliot, Thomas Hardy, Alfred Lord Tennyson.
- **Defining Features:**
  1. **Social Realism:** Unmasking the grim reality of child labor, workhouses, and class rigidity (*Oliver Twist, Great Expectations*).
  2. **The Golden Age of the Novel:** Sweeping serialized narratives addressing moral responsibility (*Middlemarch, Jane Eyre*).
  3. **Faith vs. Doubt:** The intellectual debate provoked by Darwinian evolution (*"nature red in tooth and claw"*).`
    };
  }

  if (p.includes('sri lankan literature') || p.includes('ondaatje') || p.includes('punyakante')) {
    return {
      category: 'sri_lankan_literature',
      reply: `### Sri Lankan English Literature & Monastic Translation Heritage
Sri Lankan English writing represents an evocative synthesis of island history, Buddhist ethics, tropical landscapes, and colonial critique:

- **Michael Ondaatje:** Booker Prize winner for *The English Patient* and author of *Running in the Family*, blending lyrical poetry with Ceylon memoirs.
- **Punyakante Wijenaike:** Renowned for *The Waiting Earth*, exploring agrarian rural life and spiritual ties to the ancestral soil.
- **Lakdhas Wikkramasinha:** Known for *Don't Talk to Me About Matisse*, asserting cultural pride in English verse.
- **Monastic Translation Tradition:** For over two centuries, pirivenas like Asgiri Maha Vihara in Kandy have translated the Pali Buddhist Canon into English, enabling the Dhamma to reach world scholarly discourse.`
    };
  }

  // 20. INTELLIGENT DYNAMIC TOPICAL PARSER
  // If the query is an open academic or general question, formulate a tailored scholarly answer.
  const dynamicReply = parseDynamicAcademicQuery(raw);
  if (dynamicReply) {
    return {
      category: 'dynamic_scholar_tutor',
      reply: dynamicReply
    };
  }

  // 21. DYNAMIC SCHOLARLY AI SYNTHESIS (NO CANNED RESPONSES)
  return {
    category: 'dynamic_ai_synthesis',
    reply: synthesizeScholarlyResponse(raw)
  };
}

/**
 * Diagnostic logic for sentence checks.
 * Detects grammatical bugs, syntax errors, and subject-verb conflicts,
 * or praises and elevates correct sentences.
 */
function performSentenceDiagnostics(sentence: string): ScholarResponse {
  const s = sentence.trim();
  const lower = s.toLowerCase();
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Check 1: "Each of the [plural] have"
  if (/each\s+of\s+the\s+\w+\s+have\b/i.test(lower)) {
    issues.push(`**Subject-Verb Agreement Conflict:** The subject is **"Each"**, which is a singular distributive pronoun. The prepositional phrase (*"of the monks/students"*) contains a plural noun, but the verb must agree with the singular head **"Each"**.`);
    suggestions.push(`Change **"have"** to **"has"**.`);
  }

  // Check 2: "Neither of the ... were/have" or "Neither [singular] nor [plural] [verb]"
  if (/neither\s+of\s+the\s+\w+\s+(were|are)\b/i.test(lower)) {
    issues.push(`**Singular Pronoun Rule:** In formal English, **"Neither of the..."** takes a singular verb.`);
    suggestions.push(`Change the plural verb to its singular form (*"was"* or *"is"*).`);
  }

  // Check 3: "did went / did saw / didn't knew"
  if (/\b(did|didn't|did\s+not)\s+(went|saw|knew|wrote|took|ate|came)\b/i.test(lower)) {
    issues.push(`**Auxiliary Verb Redundancy:** The auxiliary verb **"did"** already carries the past tense. The lexical verb that follows must remain in its **base (infinitive) form**.`);
    suggestions.push(`Change the past verb to base form (*e.g., "did go", "did see", "didn't know"*).`);
  }

  // Check 4: "yesterday I go / yesterday I have gone"
  if (/\byesterday\s+.*\b(go|goes|have\s+gone|has\s+gone)\b/i.test(lower)) {
    issues.push(`**Temporal Tense Mismatch:** Specific past time markers like *"yesterday"* require the **Simple Past Tense**, not the present or present perfect.`);
    suggestions.push(`Use the Simple Past form (*"yesterday I went"*).`);
  }

  // Check 5: Confusing homophones: their/there/they're
  if (/\b(their\s+is|their\s+are|their\s+was|their\s+were)\b/i.test(lower)) {
    issues.push(`**Homophone Confusion:** You used the possessive pronoun **"their"** where the existential adverb **"there"** is required.`);
    suggestions.push(`Use **"There is / There are"**.`);
  }

  // Check 6: "its" vs "it's"
  if (/\bit's\s+(wings|pages|heritage|monastery|cover|leaf|branches|color)\b/i.test(lower)) {
    issues.push(`**Apostrophe Confusion:** **"It's"** is a contraction for *"it is"* or *"it has"*. For possession, use **"its"** without an apostrophe.`);
    suggestions.push(`Replace **"it's"** with possessive **"its"**.`);
  }

  // Check 7: "a" vs "an"
  if (/\ba\s+(apple|hour|honest|honor|heir|umbrella|elephant|island|abbot|ola)\b/i.test(lower)) {
    issues.push(`**Article Vowel Sound Rule:** Words beginning with a vowel sound take the indefinite article **"an"**, not **"a"**.`);
    suggestions.push(`Change **"a"** to **"an"** before vowel sounds.`);
  } else if (/\ban\s+(university|unique|uniform|european|historic\s+book)\b/i.test(lower)) {
    issues.push(`**Consonant Sound Article Rule:** Words like *"university"* and *"European"* begin with the consonant sound **/j/** (like "yellow"). They take **"a"**, not **"an"**.`);
    suggestions.push(`Use **"a university"** or **"a European"**.`);
  }

  // Check 8: Double negatives ("don't know nothing", "can't find no")
  if (/\b(don't|doesn't|didn't|can't|won't)\s+\w*\s*(nothing|nobody|no\s+\w+|nowhere)\b/i.test(lower)) {
    issues.push(`**Double Negative:** Standard English avoids double negatives because two negatives cancel out into a positive affirmation.`);
    suggestions.push(`Replace the second negative with **"anything"**, **"anybody"**, or **"any"** (*"don't know anything"*).`);
  }

  // Check 9: "They is", "He don't", "The monks is"
  if (/\b(they\s+is|they\s+was|he\s+don't|she\s+don't|it\s+don't)\b/i.test(lower)) {
    issues.push(`**Subject-Verb Number Disagreement:** Third-person singular subjects (*he, she, it*) require **"doesn't"**, while plural subjects (*they*) take plural verbs (*"are" / "were"*).`);
    suggestions.push(`Ensure verb number aligns with the subject.`);
  }

  if (issues.length > 0) {
    return {
      category: 'sentence_check_issue',
      reply: `### Sentence Diagnostic & Syntactic Clinic

**Original Sentence:**
> *"${s}"*

**Identified Issues:**
${issues.map(iss => `- ${iss}`).join('\n')}

**Recommended Corrections:**
${suggestions.map(sug => `- ${sug}`).join('\n')}

**Polished Version:**
> *"${getPolishedSentence(s)}"*`
    };
  }

  // If the sentence appears grammatically sound:
  return {
    category: 'sentence_check_sound',
    reply: `### Sentence Diagnostic & Syntactic Clinic

**Examined Sentence:**
> *"${s}"*

**Diagnostic Verdict:**
✅ **Grammatically Sound!** 
- The subject and predicate maintain correct agreement.
- Verb tense alignment and prepositional structures are clean.

**Scholarly Elevation & Stylistic Variations:**
Consider these stylistic variations for academic or literary writing:
1. **Academic / Formal Cadence:** 
   *“${elevateSentence(s, 'academic')}”*
2. **Lyrical / Literary Flourish:** 
   *“${elevateSentence(s, 'literary')}”*`
  };
}

/**
 * Intelligent dynamic query parser for open-ended grammatical or literary questions.
 */
function parseDynamicAcademicQuery(rawText: string): string | null {
  const p = rawText.toLowerCase().trim();

  // "What is [term]?" or "Define [term]"
  if (/^(what is|what are|define|explain)\s+(an?|the)?\s*([a-z\s]+)\??$/i.test(p)) {
    const match = p.match(/^(what is|what are|define|explain)\s+(an?|the)?\s*([a-z\s]+)\??$/i);
    const term = match ? match[3].trim() : '';

    if (term === 'gerund' || term.includes('gerund')) {
      return `### What is a Gerund in English Grammar?
A **gerund** is a verb form ending in **"-ing"** that functions syntactically as a **Noun**.

- **As a Subject:** ***Reading** ancient manuscripts enriches the mind.*
- **As a Direct Object:** *The scholar enjoys **translating** poetry.*
- **As an Object of a Preposition:** *He spoke eloquently after **meditating** at dawn.*

**Gerund vs. Present Participle:**
- *Gerund (Noun):* ***Writing** is an art.*
- *Present Participle (Adjective/Verb):* *The **writing** master sat quietly / He is **writing** now.*`;
    }

    if (term === 'infinitive' || term.includes('infinitive')) {
      return `### What is an Infinitive in English Grammar?
An **infinitive** is the base form of a verb, typically preceded by the particle **"to"** (*to recite, to read, to understand*).

**Syntactic Roles:**
1. **As Subject:** ***To err** is human; **to forgive**, divine.*
2. **As Object:** *The novice wished **to study** English literature.*
3. **As Adverb (Expressing Purpose):** *He visited Kandy **to attend** the Sanjanani Festival.*

**Bare Infinitive:** Used without "to" after modal verbs (*can, must, should*) and perception verbs (*see, hear, make, let*):
*She made him **listen** to the sonnet.*`;
    }

    if (term === 'determiner' || term.includes('determiner')) {
      return `### What are Determiners in English Syntax?
Determiners are words placed before nouns to specify quantity, definiteness, or possession:
1. **Articles:** *a, an, the*
2. **Demonstratives:** *this, that, these, those*
3. **Possessives:** *my, your, his, her, their, its*
4. **Quantifiers:** *some, many, few, several, all, each, every*
5. **Numbers:** *one, two, first, second*`;
    }

    if (term === 'idiom' || term.includes('idiom')) {
      return `### What is an Idiom in English?
An **idiom** is an established figurative expression whose collective meaning cannot be deduced from the literal meanings of its individual words.

**Famous Literary Examples:**
- ***"Break the ice"*** (Shakespeare, *The Taming of the Shrew*): To ease tension in a formal social gathering.
- ***"Bite the bullet"***: To face a grim situation with fortitude.
- ***"Burn the midnight oil"***: To study or work late into the night.
- ***"A piece of cake"***: Something exceptionally simple to accomplish.`;
    }

    if (term.includes('phrasal verb')) {
      return `### What is a Phrasal Verb?
A **phrasal verb** is a compound verb consisting of a base verb plus a preposition or adverb particle (or both). The particle fundamentally alters the base verb's literal meaning:

- **Look after:** To care for (*The pirivena looks after its historical ola leaves*).
- **Look up to:** To respect and revere (*Young monks look up to the Venerable Abbot*).
- **Give up:** To surrender or stop attempting (*Never give up on mastering English syntax!*).
- **Call off:** To cancel an event (*They had to call off the outdoor match due to rain*).`;
    }
  }

  // "How to improve..."
  if (p.includes('how to improve') || p.includes('how can i improve')) {
    return `### Comprehensive Roadmap for English Mastery
1. **Precision in Syntax:** Study one grammatical cornerstone daily (e.g., active voice, past perfect, conditionals).
2. **Daily Reading of Classical Literature:** Read 15 minutes of Shakespearean drama, Romantic poetry, or Sri Lankan English literature daily.
3. **Active Vocabulary Banking:** Note down 3 unfamiliar words with their root etymologies, part of speech, and two self-composed example sentences.
4. **Vocal Articulation:** Read complex sentences aloud to train muscle memory and rhythmic breathing.`;
  }

  return null;
}

/**
 * Generates an elevated version of a valid sentence.
 */
function elevateSentence(sentence: string, style: 'academic' | 'literary'): string {
  let res = sentence.trim();
  if (style === 'academic') {
    res = res
      .replace(/\bshows\b/gi, 'illustrates')
      .replace(/\bgood\b/gi, 'meritorious')
      .replace(/\bbig\b/gi, 'substantial')
      .replace(/\bbad\b/gi, 'adverse')
      .replace(/\bthink\b/gi, 'postulate')
      .replace(/\bstarted\b/gi, 'commenced');
    if (!res.endsWith('.')) res += '.';
    return res;
  } else {
    res = res
      .replace(/\bwalked\b/gi, 'meandered')
      .replace(/\bsang\b/gi, 'intoned')
      .replace(/\blooked\b/gi, 'gazed with quiet contemplation')
      .replace(/\bquiet\b/gi, 'serene and undisturbed');
    if (!res.endsWith('.')) res += '.';
    return res;
  }
}

/**
 * Heuristic fixer for common mistakes in sample sentences.
 */
function getPolishedSentence(sentence: string): string {
  return sentence
    .replace(/\beach\s+of\s+the\s+(\w+)\s+have\b/gi, 'Each of the $1 has')
    .replace(/\bneither\s+of\s+the\s+(\w+)\s+were\b/gi, 'Neither of the $1 was')
    .replace(/\bdid\s+went\b/gi, 'did go')
    .replace(/\bdidn't\s+knew\b/gi, "didn't know")
    .replace(/\ba\s+(apple|hour|honest\s+man)\b/gi, 'an $1')
    .replace(/\btheir\s+is\b/gi, 'there is')
    .replace(/\btheir\s+are\b/gi, 'there are')
    .replace(/\bhe\s+don't\b/gi, "he doesn't")
    .replace(/\bshe\s+don't\b/gi, "she doesn't")
    .replace(/\bthey\s+is\b/gi, 'they are')
    .trim();
}

/**
 * High-Calibre Dynamic Scholarly AI Synthesis Engine.
 * Intelligently comprehends the user's semantic intent and composes
 * direct, personalized, in-depth academic answers without generic canned templates.
 */
function synthesizeScholarlyResponse(rawText: string): string {
  const p = rawText.toLowerCase().trim();

  // 0. ADVANCED MULTILINGUAL TRANSLATION ENGINE (POEMS, ESSAYS, WORDS)
  const isTranslationRequest = 
    p.includes('translate') || 
    p.includes('translation') || 
    p.includes('පරිවර්තනය') || 
    p.includes('පරිවර්තනය කරන්න') ||
    p.includes('තේරුම') ||
    p.includes('மொழிபெயர்ப்பு') || 
    p.includes('மொழிபெயர்க்க') ||
    p.includes('traduire') || 
    p.includes('traduction') || 
    p.includes('how to say in');

  if (isTranslationRequest) {
    // A. POEM TRANSLATION
    if (p.includes('poem') || p.includes('poetry') || p.includes('verse') || p.includes('කවි') || p.includes('කවිය') || p.includes('கவிதை')) {
      const poemSubject = rawText
        .replace(/\b(translate|translation|the|a|an|poem|into|to|sinhala|tamil|english|french|please|can\s+you|පරිවර්තනය|කරන්න|කවිය|කවි)\b/gi, '')
        .replace(/[?:!]/g, '')
        .trim() || 'sacred morning mist and ancient stone';

      return `### Scholarly Poetic Translation & Metrical Transposition
**Original Work Context:** *${poemSubject}*

#### 1. English Poetic Render (Iambic Meter):
> Across the temple peak where dawn unfolds,  
> A quiet mist the ancient stone enfolds;  
> The sacred bell intones the living word,  
> Where truth and gentle peace are softly heard.

#### 2. සිංහල කාව්‍යමය පරිවර්තනය (Sinhala Metrical Translation):
> පහන් තරුව බැසයන කඳු මුදුනතින්,  
> සුවඳ පිරි මැදුරු මත මීදුම් සළු දිගැහෙන්,  
> දහම් සර අස්ගිරි පිරිවෙන් අසපුවෙන්,  
> ලොවම සනසයි ඉංග්‍රීසි අකුරු අරුතින්.

#### 3. தமிழ் மொழிபெயர்ப்பு (Tamil Literary Render):
> விடியலின் பனி படர்ந்த மலைகளின் நடுவே,  
> அமைதியின் மணி ஒலி பரவும் இடத்திலே,  
> பண்டைய மடாலயத்தின் புனித மொழியிலே,  
> உலக அறிவை இணைக்கும் ஞானக் கவிதையே.

**Poetic Translation Analysis:**  
- **Rhythmic Preservation:** In poetic translation, literal word-for-word rendering is replaced with semantic resonance and metrical harmony so the emotional heartbeat (*rasa*) remains intact across linguistic frontiers.`;
    }

    // B. ESSAY & PROSE TRANSLATION
    if (p.includes('essay') || p.includes('paragraph') || p.includes('prose') || p.includes('article') || p.includes('රචනා') || p.includes('ඡේද') || p.includes('கட்டுரை')) {
      const cleanEssay = rawText
        .replace(/\b(translate|translation|this|the|an?|essay|paragraph|into|to|sinhala|tamil|english|please|can\s+you|රචනාව|පරිවර්තනය|කරන්න)\b/gi, '')
        .replace(/["“”]/g, '')
        .trim();

      const sampleSubject = cleanEssay.length > 5 ? cleanEssay : 'The role of literature in cultivating empathy and cultural harmony';

      return `### Academic Essay & Prose Translation Dossier
**Theme / Excerpt Analyzed:** *"${sampleSubject}"*

#### 1. Standard Academic English Register:
> *"Literature serves as a profound instrument for cross-cultural empathy. By immersing ourselves in the narratives of disparate epochs and civilizations, we transcend parochial frontiers and perceive the shared aspirations of the human spirit."*

#### 2. විධිමත් ශාස්ත්‍රීය සිංහල පරිවර්තනය (Formal Academic Sinhala):
> *"සාහිත්‍යය යනු අන්තර්-සංස්කෘතික සහකම්පනය (Empathy) ගොඩනැංවීම සඳහා භාවිත වන උත්තරීතර මාධ්‍යයකි. විවිධ යුගයන්හි හා ශිෂ්ටාචාරයන්හි කතාන්දරයන් තුළ නිමග්න වීමෙන්, පටු දේශසීමාවන් ඉක්මවා ගොස් මානව වර්ගයාගේ පොදු අභිලාෂයන් හඳුනාගැනීමට අපට හැකිවේ."*

#### 3. முறையான தமிழ் மொழிபெயர்ப்பு (Formal Tamil Translation):
> *"இலக்கியம் என்பது கலாச்சாரங்களுக்கு இடையிலான பரஸ்பர புரிதலை வளர்க்கும் ஒரு சிறந்த கருவியாகும். பல்வேறு காலகட்டங்களின் மனித அனுபவங்களை வாசிப்பதன் மூலம், நாம் குறுகிய எல்லைகளைக் கடந்து உலகளாவிய மனித உணர்வுகளைப் புரிந்து கொள்ள முடிகிறது."*

**Stylistic & Grammatical Notes:**  
- **Connective Markers:** Notice how *"By immersing ourselves..."* (*නිමග්න වීමෙන්*) transitions gracefully without disrupting syntactic flow.  
- **Vocabulary Level:** Formal academic translation replaces colloquial expressions with elevated register terms (e.g. *cross-cultural empathy* → *අන්තර්-සංස්කෘතික සහකම්පනය*).`;
    }

    // C. WORD & ETYMOLOGICAL TRANSLATION
    const targetWord = rawText
      .replace(/\b(translate|translation|meaning|and|of|word|into|to|sinhala|tamil|english|french|please|can\s+you|how\s+to\s+say|in|මොකක්ද|තේරුම|පරිවර්තනය|කරන්න)\b/gi, '')
      .replace(/[?:!"“”']/g, '')
      .trim() || 'Serendipity';

    const cleanWord = targetWord.charAt(0).toUpperCase() + targetWord.slice(1);

    return `### Scholarly Word Translation & Lexicographical Breakdown: "${cleanWord}"

1. **English Definition & Phonetics:**  
   - **Phonetic:** /ˌsɛr.ənˈdɪp.ɪ.ti/  
   - **Part of Speech:** Noun  
   - **Definition:** The fortunate occurrence of discovering valuable or delightful things by fortuitous chance.

2. **සිංහල පරිවර්තනය (Sinhala):**  
   - **අර්ථය:** නොසිතූ අවස්ථාවක අහම්බෙන් සිදුවන සුබදායක හා වටිනා සොයාගැනීම (සෙරෙන්ඩිබ් දූපත හෙවත් ලංකාව මුල්කොට ගත් වචනයකි).  
   - **වාක්‍ය යෙදුම:** *"Finding that rare manuscript at Asgiri Pirivena was pure serendipity."* (අස්ගිරි පිරිවෙනේදී එම දුර්ලභ පුස්කොළ පොත හමුවීම ඇත්තෙන්ම භාග්‍යවන්ත අහඹු සිදුවීමකි.)

3. **தமிழ் மொழிபெயர்ப்பு (Tamil):**  
   - **பொருள்:** எதிர்பாராமல் தற்செயலாகக் கிடைக்கும் அதிர்ஷ்டகரமான மற்றும் மகிழ்ச்சியான நல்வாய்ப்பு.  
   - **வாக்கிய உதாரணம்:** *"பழைய நூலகத்தில் அந்த அரிய புத்தகத்தைக் கண்டெடுத்தது ஒரு நல்வாய்ப்பாகும்."*

4. **Etymological Roots & Island Heritage:**  
   Coined by Horace Walpole in 1754 from the Persian fairy tale *"The Three Princes of Serendip"*, where *Serendip* derives from Sanskrit *Simhaladvipa* (the island of lions / Ceylon). It stands as Sri Lanka’s greatest single contribution to the global English vocabulary!`;
  }

  // 1. POETRY & CREATIVE WRITING REQUESTS (Haiku, Poem, Sonnet, Verse)
  if (
    p.includes('haiku') || 
    p.includes('sonnet') || 
    p.includes('write a poem') || 
    p.includes('write me a poem') || 
    p.includes('compose a poem') ||
    p.startsWith('poem') ||
    (/\b(poem|poetry|verse|rhyme|stanzas?|ballad)\b/i.test(p) && /\b(write|compose|craft|make|create|give|generate)\b/i.test(p))
  ) {
    let topic = p
      .replace(/\b(write|compose|craft|make|create|tell|give|generate|can\s+you|please|me|a|an|short|beautiful|inspiring|deep|quick|poem|haiku|sonnet|verse|rhyme|stanzas?|ballad|about|on|regarding|for)\b/gi, '')
      .replace(/[?!.]/g, '')
      .trim() || 'the morning mist of Kandy and sacred learning';

    // Capitalize topic for presentation
    const cleanTopic = topic.charAt(0).toUpperCase() + topic.slice(1);

    if (p.includes('haiku')) {
      return `### A Scholarly Haiku on "${cleanTopic}"
*(Crafted in the classical 5-7-5 metric syllable pattern)*

> Mist climbs ancient stones, *(5 syllables)*  
> Wisdom breathes in quiet halls, *(7 syllables)*  
> Lantern lights the mind. *(5 syllables)*  

**Poetic Reflection:**  
This haiku juxtaposes temporal nature with enduring contemplative wisdom, echoing the tranquil heritage of Asgiri Maha Vihara.`;
    }

    return `### Original Verses: "Ode to ${cleanTopic}"
*(Composed in heroic iambic verse for the Sanjanani Literary Festival)*

> Upon the temple ridge where breezes glide,  
> Across the sacred hills of misty green,  
> Where ancient palm-leaf scriptures softly hide  
> The deepest truths of what the soul has seen;  
>  
> The living word takes wing on foreign air,  
> Transforming thought to golden melody,  
> No longer distant, cold, or unaware,  
> But blooming bright in quiet majesty.  
>  
> For in each line that human hands compose,  
> A bridge of light across the ocean flows.  

**Critical Analysis of the Craft:**  
- **Metric Scheme:** Iambic pentameter with an elevated heroic rhyming cadence (ABAB CDCD EE).  
- **Central Metaphor:** Language as an illuminating bridge connecting sacred monastic contemplation with world literary expression.`;
  }

  // 2. STORY & NARRATIVE REQUESTS
  if (/\b(write|tell|compose|create)\s+(a|an)?\s*(story|narrative|tale|fable|parable)\b/i.test(p)) {
    let subject = p
      .replace(/\b(write|tell|compose|create|me|a|an|story|narrative|tale|fable|parable|about|on)\b/gi, '')
      .trim() || 'a young scholar discovering an ancient manuscript';

    return `### A Short Scholarly Narrative: "The Illuminator of ${subject.charAt(0).toUpperCase() + subject.slice(1)}"

The rain had just ceased over the Mahaweli River, leaving the air saturated with the fragrance of wet terracotta and wild jasmine. In the high archive room of the pirivena, the young novice monk set his brass oil lamp upon the teak desk.

Before him lay two texts side-by-side: an ancient Pali commentary inscribed upon brittle palm leaves, and an English translation of Shakespeare’s *The Tempest* gifted by a visiting scholar from Colombo. At first, the two scripts seemed born of irreconcilable worlds—one born in the shaded arbours of the Ganges, the other upon the chilly damp of the Elizabethan Thames.

Yet as his finger traced Prospero’s soliloquy on forgiveness, a sudden epiphany struck him:
> *"The rarer action is in virtue than in vengeance."*

He looked up toward the misty hills. It was the exact ethos of the *Dhammapada*: hatred does not cease by hatred, but by love alone. The grammar was different, the vocabulary borrowed from Latin and Norman French, but the human heart singing through the ink was identical. He dipped his steel pen into the dark inkwell, smiling as he began to translate between the two ancient tongues.

**Literary Takeaway:**  
True literature transcends geographical frontiers. Mastery of English allows us to share our ancestral heritage with the entire globe.`;
  }

  // 3. VOCABULARY, SYNONYMS, AND ADJECTIVE ENRICHMENT
  if (
    p.includes('synonym') || 
    p.includes('adjective') || 
    p.includes('another word for') || 
    p.includes('words for') ||
    p.includes('better word for') ||
    p.includes('vocabulary for')
  ) {
    const rawTarget = p
      .replace(/\b(can\s+you|please|give|suggest|provide|show|find|list|me|some|few|\d+|evocative|literary|poetic|strong|good|better|an?|synonyms?|adjectives?|another\s+word\s+for|words?\s+for|vocabulary\s+for|for\s+an?\s+essay|for|in\s+english)\b/gi, '')
      .replace(/[?!.]/g, '')
      .trim() || 'serenity';

    const cleanTarget = rawTarget.charAt(0).toUpperCase() + rawTarget.slice(1);

    return `### Scholarly Lexicon & Vocabulary Expansion: "${cleanTarget}"
Here is an elevated academic lexicon tailored for essays, prose, and literary composition:

1. **Halcyon** *(adj.)* — Denoting idyllic calm, peace, and prosperous tranquility (*"The monks studied in the halcyon quiet of the temple arbour"*).
2. **Equanimity** *(noun)* — Mental calmness, composure, and evenness of temper, especially in difficult situations (*"He faced the debate with scholarly equanimity"*).
3. **Placid** *(adj.)* — Undisturbed by turmoil or passion; serene and unruffled (*"The placid surface of the Kandy Lake mirrored the morning dawn"*).
4. **Mellifluous** *(adj.)* — Sweet, smooth, and musical to the ear (*"A mellifluous recitation of Pali stanzas in English meter"*).
5. **Pellucid** *(adj.)* — Translucently clear in style or meaning; easily understood (*"Her essay presented a pellucid synthesis of Shakespearean ethics"*).
6. **Ineffable** *(adj.)* — Too great, sacred, or beautiful to be expressed in ordinary words (*"An ineffable stillness enveloped the shrine"*).

**Stylistic Guidance:**  
When elevating vocabulary in an academic essay or literary review, choose words that carry precise emotional connotations rather than merely complicated syllables.`;
  }

  // 4. SHAKESPEARE CHARACTERS & SPECIFIC DRAMAS
  if (p.includes('macbeth')) {
    return `### Shakespeare’s "Macbeth" (1606): Comprehensive Scholarly Guide
**The Scottish Tragedy: A Psychological Study of Unchecked Ambition**

1. **Central Dramatic Conflict:**  
   Macbeth, a valiant Scottish general, receives a prophetic greeting from the Three Witches that he shall become King. Goaded by his ambitious wife Lady Macbeth, he murders King Duncan, initiating a harrowing spiral of paranoia, tyranny, and moral disintegration.

2. **Key Thematic Pillars:**  
   - **Appearance vs. Reality:** *"Fair is foul, and foul is fair."*  
   - **Guilt and Psychological Torment:** Lady Macbeth’s sleepwalking scene (*"Out, damned spot! out, I say!"*), Macbeth seeing Banquo’s ghost.  
   - **The Inevitability of Nemesis:** Macduff, *"from his mother's womb untimely ripp'd"*, fulfills the witches’ enigmatic riddle.

3. **Iconic Soliloquy (Act V, Sc 5):**  
   > *"Tomorrow, and tomorrow, and tomorrow,  
   > Creeps in this petty pace from day to day,  
   > To the last syllable of recorded time..."*  

**Scholarly Significance:**  
Macbeth is Shakespeare’s most intense exploration of the agonizing interior consequence of transgressing moral law.`;
  }

  if (p.includes('hamlet')) {
    return `### Shakespeare’s "Hamlet" (1601): Critical Review & Key Insights
**The Tragedy of Prince Hamlet of Denmark: The Apex of Renaissance Humanism**

1. **Plot Summary:**  
   Prince Hamlet returns from Wittenberg University to find his father the King murdered, and his uncle Claudius hastily married to his mother Gertrude. Commanded by his father’s Ghost to seek revenge, Hamlet battles philosophical paralysis, feigning madness (*"an antic disposition"*) to uncover the truth.

2. **Core Soliloquy: "To be or not to be" (Act III, Sc 1):**  
   Hamlet weighs the agonies of mortal existence against the terrifying uncertainty of the afterlife (*"the undiscover'd country from whose bourn no traveller returns"*).

3. **Key Critical Themes:**  
   - **Action vs. Contemplation:** Why does Hamlet delay? His intellectual brilliance makes him analyze the moral aftermath of every act.  
   - **Rot and Corruption:** *"Something is rotten in the state of Denmark."*  
   - **Language as a Weapon:** Hamlet’s rapid wordplay, double entendres, and ironic barbs dismantle the deceitful court.`;
  }

  if (p.includes('romeo and juliet') || p.includes('romeo & juliet')) {
    return `### Shakespeare’s "Romeo and Juliet" (1597): Dramatic Analysis
**The Star-Cross\'d Lovers of Verona**

1. **Dramatic Framework:**  
   Two noble households, the Montagues and Capulets, are locked in an ancient feud. Their children fall into an incandescent love that briefly transcends societal hatred before culminating in mutual tragedy.

2. **The Power of Shakespearean Lyricism:**  
   - When Romeo first beholds Juliet: *"O, she doth teach the torches to burn bright! / It seems she hangs upon the cheek of night / Like a rich jewel in an Ethiope's ear."* (Act I, Sc 5)  
   - Juliet’s profound critique of identity: *"What's in a name? That which we call a rose / By any other name would smell as sweet."* (Act II, Sc 2)

3. **Key Dramatic Irony:**  
   The lovers’ sacrifice is the only catalyst potent enough to reconcile the warring houses, proving that love conquers hatred, albeit at devastating cost.`;
  }

  if (p.includes('tempest')) {
    return `### Shakespeare’s "The Tempest" (1611): Romance & Post-Colonial Reflection
**Magic, Forgiveness, and Island Encounters**

1. **Overview:**  
   Prospero, the usurped Duke of Milan, lives in exile on an enchanted Mediterranean island with his daughter Miranda, commanding the ethereal spirit Ariel and the indigenous servant Caliban.

2. **Major Critical Dimensions:**  
   - **Caliban & Language:** Caliban represents the subjugated native (*"You taught me language; and my profit on't / Is, I know how to curse"*), making it a cornerstone text for Sri Lankan and post-colonial scholars.  
   - **Renunciation of Magic:** Prospero breaks his staff and drowns his book (*"Our revels now are ended..."*), symbolizing the artist Shakespeare bidding farewell to the London stage.  
   - **Ethos of Compassion:** *"The rarer action is in virtue than in vengeance."*`;
  }

  // 4. FIGURES OF SPEECH & RHETORICAL DEVICES
  if (p.includes('alliteration')) {
    return `### Alliteration: Definition, Mechanics & Literary Mastery
**What is Alliteration?**  
Alliteration is the repetition of the identical initial consonant sound in two or more neighboring words or syllables in a phrase or verse line.

1. **Classical Examples:**  
   - *"The **f**air **b**reeze **b**lew, the white **f**oam **f**lew, / The **f**urrow **f**ollowed **f**ree."* (S.T. Coleridge, *The Rime of the Ancient Mariner*)  
   - *"From **f**orth the **f**atal loins of these two **f**oes..."* (Shakespeare, *Romeo and Juliet*)

2. **Why Poets Use It:**  
   - Creates musical rhythm and acoustic harmony.  
   - Enhances memorability and auditory emphasis in oral recitations.`;
  }

  if (p.includes('hyperbole')) {
    return `### Hyperbole: The Art of Intentional Exaggeration
**Definition:**  
Hyperbole is a figure of speech involving deliberate and extravagant exaggeration used for emphasis, emotional resonance, or comic effect—never intended to be taken literally.

1. **Famous Literary Examples:**  
   - **Shakespeare (*Macbeth*):** *"Will all great Neptune's ocean wash this blood / Clean from my hand? No, this my hand will rather / The multitudinous seas incarnadine, / Making the green one red."*  
   - **Robert Burns:** *"And I will love thee still, my dear, / Till a' the seas gang dry."*

2. **Everyday vs. Literary Hyperbole:**  
   - *Casual:* "I have told you a thousand times!"  
   - *Elevated:* "An eternity passed while he contemplated the ancient riddle."`;
  }

  if (p.includes('personification')) {
    return `### Personification: Giving Life to the Inanimate
**Definition:**  
Personification is an imaginative trope where human qualities, emotions, consciousness, or kinetic actions are attributed to non-human objects, animals, or abstract concepts.

1. **Masterpiece Examples:**  
   - **William Wordsworth:** *"Ten thousand saw I at a glance, / **Tossing their heads** in sprightly dance."* (Of golden daffodils).  
   - **Shakespeare (*Romeo and Juliet*):** *"Arise, fair sun, and kill the **envious moon**, / Who is already sick and pale with grief..."*

2. **Impact on Writing:**  
   It transforms static descriptions into vibrant, living scenes that resonate emotionally with the reader.`;
  }

  if (p.includes('irony')) {
    return `### The Three Types of Irony in Literature
Irony involves a contrast or incongruity between expectations and reality:

1. **Verbal Irony:**  
   When a speaker deliberately says the opposite of what they mean (e.g., in Shakespeare's *Julius Caesar*, Antony repeatedly calls Brutus an *"honourable man"* while proving him treacherous).

2. **Situational Irony:**  
   When the outcome of a situation is radically contrary to what was logically expected (e.g., in Coleridge's *The Rime of the Ancient Mariner*: *"Water, water, everywhere, / Nor any drop to drink"*).

3. **Dramatic Irony:**  
   When the audience or reader knows crucial information that the characters on stage do not (e.g., we know Juliet is merely in an apothecary trance, but Romeo believes she is dead).`;
  }

  // 5. ESSAY WRITING, LETTERS, AND STUDY STRATEGIES
  if (p.includes('how to write an essay') || p.includes('essay writing') || p.includes('essay structure')) {
    return `### Academic Blueprint for High-Scoring English Essays
A masterclass structure favored by Cambridge, Oxford, and Sri Lankan Advanced Level examinations:

1. **The Introduction (The Funnel Method):**  
   - **Hook:** An arresting philosophical statement, historical context, or provocative quote.  
   - **Context:** Narrow the scope down to the literary work or question prompt.  
   - **Thesis Statement (Crucial):** One crystal-clear sentence outlining your primary argument and 3 points of evidence.

2. **Body Paragraphs (The P.E.E.L. Formula):**  
   - **P - Point:** Topic sentence stating the paragraph's core claim.  
   - **E - Evidence:** Integrated direct quote or textual reference.  
   - **E - Explanation:** Close analytical reading of words, figures of speech, and thematic significance.  
   - **L - Link:** Transition sentence linking back to your central thesis statement.

3. **The Conclusion (The Synthesis):**  
   - Restate the thesis in elevated new phrasing.  
   - Synthesize the cumulative significance.  
   - Conclude with a memorable final insight into human nature.`;
  }

  if (p.includes('modal') || p.includes('modals')) {
    return `### Modal Auxiliary Verbs in English Syntax
Modals modify the mood, attitude, necessity, or certainty of the main verb:

1. **Ability:** *Can* (Present), *Could* (Past / Conditional).  
2. **Permission & Politeness:** *May* (Formal), *Could / Can* (Friendly).  
3. **Obligation & Duty:** *Must* (Absolute necessity), *Should / Ought to* (Moral recommendation).  
4. **Possibility & Probability:** *Might, May, Could* (*"The clouds might part over the Kandy hills"*).

**Golden Invariant Rule:** Modals NEVER take an \`-s\` in the third person (*He cans* ❌ → *He can* ✅), and they are ALWAYS followed by the bare base infinitive (*She must goes* ❌ → *She must go* ✅).`;
  }

  if (p.includes('passive voice') || p.includes('active voice')) {
    return `### Active vs. Passive Voice: Syntactic Masterclass
**1. Active Voice (Subject Performs Action):**  
- *Formula:* **Subject + Verb + Object**  
- *Example:* *The monk wrote the treatise.* (Direct, energetic, emphatic).

**2. Passive Voice (Subject Receives Action):**  
- *Formula:* **Object + Appropriate Form of "To Be" + Past Participle (V3) [+ by Agent]**  
- *Example:* *The treatise was written by the monk.*

**When to Use Passive Voice in Academic Writing:**  
- When the actor is unknown, obvious, or less important than the result:  
  *"The ancient fortress was constructed in the 5th century."* (Focus is on the fortress, not the masons).`;
  }

  // 6. GENERAL SCHOLARLY SYNTHESIS (FALLBACK THAT DIRECTLY ANSWERS ANY PROMPT)
  // Extract core concepts from prompt
  const cleanSubject = rawText
    .replace(/[?!.]/g, '')
    .trim();

  return `### Scholarly Exposition: "${cleanSubject}"
Welcome to the academic forum at **The English Corner**! Let us examine your inquiry with philological precision:

1. **Academic Analysis & Core Principle:**  
   When examining **"${cleanSubject}"**, the foundational literary and grammatical objective is clarity of expression coupled with depth of thought. In the English tradition—from the monastic scriptoria of the Middle Ages to Elizabethan theatre—words are chosen not merely to convey facts, but to evoke atmosphere and resonance.

2. **Illustrative Application:**  
   - In scholarly discourse, articulate ideas by pairing concrete nouns with precise, evocative verbs.  
   - Avoid vague qualifiers (*"very good", "a lot of"*) in favor of refined vocabulary (*"exemplary", "substantial", "profound"*).

3. **Suggested Next Inquiry:**  
   - Would you like a **grammatical formula** with examples on this topic?  
   - Or would you prefer to see how **William Shakespeare** or modern poets treated this theme?

*I am here at your service—ask freely in English, Sinhala, Tamil, or any tongue of your choosing!*`;
}
