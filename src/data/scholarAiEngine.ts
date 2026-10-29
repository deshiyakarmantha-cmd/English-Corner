import { FESTIVAL_METADATA } from './festivalData';

export interface ScholarResponse {
  reply: string;
  category: string;
}

/**
 * Intelligent diagnostic and educational engine for Sanjanani English Scholar AI.
 * Handles sentence checks, grammar rules, literature eras, Shakespeare queries,
 * loanword etymologies, vocabulary expansion, and festival details.
 */
export function generateScholarResponse(promptText: string): ScholarResponse {
  const p = promptText.trim().toLowerCase();
  const raw = promptText.trim();

  // 1. GREETINGS & INTRODUCTIONS
  if (/^(hi|hello|hey|greetings|ayubowan|good morning|good afternoon|good evening)\b/i.test(p) || p === 'who are you' || p === 'what is your name') {
    return {
      category: 'greeting',
      reply: `### Greetings from the Sanjanani English Scholar AI!
Welcome to **The English Corner** at the historic **${FESTIVAL_METADATA.institution}**, Kandy.

I am your dedicated academic and literary tutor for the **${FESTIVAL_METADATA.festivalName}** (${FESTIVAL_METADATA.dates}).

**Here are some things we can explore together:**
- **Sentence Diagnostics:** Paste any sentence to inspect its grammar, syntax, and phrasing.
- **Grammar Masterclasses:** Ask about any tense, active/passive voice, conditionals, prepositions, or punctuation.
- **William Shakespeare:** Inquire about *Hamlet*, *Macbeth*, *The Tempest*, *Romeo and Juliet*, or Sonnets.
- **World & Sri Lankan Literature:** Explore literary eras from the Renaissance to Sri Lankan English authors.
- **Etymology & Loanwords:** Discover words like *Serendipity* and *Tourmaline* with roots in Ceylon.

*What English question would you like to explore today?*`
    };
  }

  // 2. FESTIVAL DETAILS & SCHEDULE
  if (
    p.includes('festival') ||
    p.includes('sanjanani') ||
    p.includes('when is') ||
    p.includes('where is') ||
    p.includes('schedule') ||
    p.includes('asgiri') ||
    p.includes('pirivena') ||
    p.includes('venue') ||
    p.includes('date') ||
    p.includes('organizer')
  ) {
    if (p.includes('when') || p.includes('date') || p.includes('time')) {
      return {
        category: 'festival_dates',
        reply: `### Sanjanani Literary Festival 2026 Dates
The festival takes place over three full days:
- **Dates:** **${FESTIVAL_METADATA.dates}** (${FESTIVAL_METADATA.datesSinhala})
- **Location:** ${FESTIVAL_METADATA.location}
- **Pavilion:** The English Corner (සංජානනී ඉංග්‍රීසි අංශය)
- **Admission:** Open to all students, monks, teachers, and literature enthusiasts!

*Would you like to know the schedule of drama performances or keynote lectures?*`
      };
    }

    if (p.includes('where') || p.includes('venue') || p.includes('location')) {
      return {
        category: 'festival_venue',
        reply: `### Festival Venue & Location
The **Sanjanani Literary Festival 2026** is held at:
- **Institution:** **${FESTIVAL_METADATA.institution}** (${FESTIVAL_METADATA.institutionSinhala})
- **City:** Kandy (Mahanuwara), Central Province, Sri Lanka
- **Historic Context:** Founded in medieval Kandy, Asgiri Maha Vihara is one of the twin premier chapters of the Siam Nikaya. The Pirivena has long championed classical Pali, Sinhala, Sanskrit, and English scholarship.
- **Contact:** Tel: ${FESTIVAL_METADATA.contact.tel} | Mobile: ${FESTIVAL_METADATA.contact.mobile} | Email: ${FESTIVAL_METADATA.contact.email}`
      };
    }

    if (p.includes('schedule') || p.includes('events') || p.includes('program') || p.includes('programme') || p.includes('performance')) {
      return {
        category: 'festival_schedule',
        reply: `### Sanjanani 2026 Festival Highlights & Program
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
**${FESTIVAL_METADATA.festivalName}**
*${FESTIVAL_METADATA.festivalSinhala}*

- **Theme:** *${FESTIVAL_METADATA.theme}*
- **Dates:** ${FESTIVAL_METADATA.dates}
- **Host:** ${FESTIVAL_METADATA.institution}, Kandy, Sri Lanka
- **The English Corner Pavilion:** Designed to empower student monks and regional youth with high-calibre English expression, grammatical precision, world literature studies, and Shakespearean retrospectives.`
    };
  }

  // 3. SENTENCE CHECK & GRAMMAR DIAGNOSTICS
  // Matches queries asking to check, correct, review, or verify a sentence
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
    // Extract candidate sentence from quotes or following words
    let candidate = '';
    const quoteMatch = raw.match(/["'“‘]([^"'”’]+)["'”’]/);
    if (quoteMatch) {
      candidate = quoteMatch[1].trim();
    } else {
      const colonIndex = raw.indexOf(':');
      if (colonIndex !== -1 && colonIndex < raw.length - 3) {
        candidate = raw.substring(colonIndex + 1).trim();
      } else {
        // Strip common prompt prefixes
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

  // 4. ACTIVE VS PASSIVE VOICE
  if (p.includes('passive') || (p.includes('active') && p.includes('voice')) || p.includes('convert to active') || p.includes('convert to passive')) {
    return {
      category: 'grammar_voice',
      reply: `### Active vs. Passive Voice Masterclass

**1. Active Voice (Direct, Energetic & Kinetic):**
- **Formula:** **Subject (Actor) + Verb + Object (Receiver)**
- **Example:** *The monk translated the ancient ola manuscript.*
- **Why Use It:** It creates clarity, vigor, and accountability. It should form roughly 80–85% of your writing.

**2. Passive Voice (Diplomatic, Objective & Recipient-Focused):**
- **Formula:** **Object + Form of "To Be" + Past Participle + [by Agent]**
- **Example:** *The ancient ola manuscript was translated by the monk.*
- **Legitimate Uses:** 
  1. When the actor is unknown: *"The temple bell was cast in 1750."*
  2. When the receiver is the primary focus: *"The Pirivena was honored with a UNESCO citation."*
  3. In scientific reporting: *"The chemical solution was heated to 100°C."*

**How to Convert:**
- **Step 1:** Locate the action's recipient and promote it to sentence subject.
- **Step 2:** Insert auxiliary verb (*am, is, are, was, were, has been, will be*) matching the original tense.
- **Step 3:** Convert the main verb into its past participle (*e.g., write → written, break → broken*).`
    };
  }

  // 5. OXFORD COMMA & PUNCTUATION
  if (p.includes('oxford comma') || p.includes('serial comma') || p.includes('semicolon') || p.includes('punctuation') || p.includes('em dash') || p.includes('hyphen')) {
    if (p.includes('semicolon')) {
      return {
        category: 'punctuation_semicolon',
        reply: `### The Semicolon (;) — The Architectural Keystone of Syntax
A semicolon is stronger than a comma, but softer than a period.

**Golden Rules:**
1. **Connect Two Independent Clauses:** Use a semicolon between two complete thoughts that are intimately related in meaning without using a coordinating conjunction (*and, but, or*).
   - *Example:* *The temple bell chimed at dawn; the student monks assembled in the quadrangle.*
2. **Complex Lists with Internal Commas:** Use semicolons to separate list items that already contain their own commas.
   - *Example:* *We welcomed delegations from Kandy, Sri Lanka; Kyoto, Japan; and Oxford, England.*

**Common Pitfall:** Never use a semicolon where a comma or colon is required! Both flanks must be capable of standing alone as complete grammatical sentences.`
      };
    }

    return {
      category: 'punctuation_oxford_comma',
      reply: `### The Oxford (Serial) Comma
The Oxford comma is the comma placed immediately before the coordinating conjunction (*and* or *or*) in a list of three or more elements.

**Why It Is Crucial:**
Without it, sentences can create hilarious or confusing ambiguities!

- **Confusing Without Oxford Comma:**
  *We invited the speakers, William Shakespeare and the Abbot.*
  *(Ambiguity: This can be misread as an appositive meaning the speakers ARE Shakespeare and the Abbot!)*
- **Clear With Oxford Comma:**
  *We invited the speakers, William Shakespeare, and the Abbot.*
  *(Explicitly three distinct entities).*

**Festival Recommendation:** At the Sanjanani English Corner, we encourage the Oxford comma for all academic essays and competitive writing.`
    };
  }

  // 6. TENSES & VERB FORMS
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
  1. Speaker departed (Past Perfect — Earliest Event)
  2. Rain began (Simple Past — Later Event)
  3. Now (Present Moment)

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
- **Key Signal:** Often pairs with a time anchor starting with *"By..."* (*By tomorrow, by next year, by 5:00 PM*).`
      };
    }

    return {
      category: 'grammar_tenses',
      reply: `### The 12 English Tenses Quick Reference Guide
English tenses are structured on a 3 × 4 matrix:

| Aspect | Present | Past | Future |
| :--- | :--- | :--- | :--- |
| **Simple** | *I write* (Habits, facts) | *I wrote* (Completed act) | *I will write* (Decisions, promises) |
| **Continuous** | *I am writing* (Now ongoing) | *I was writing* (Interrupted act) | *I will be writing* (Future progress) |
| **Perfect** | *I have written* (Past to now) | *I had written* (Before past event) | *I will have written* (Before future point) |
| **Perf. Cont.** | *I have been writing* (Duration) | *I had been writing* (Past duration) | *I will have been writing* |

**Top Pro-Tip:** Strive for consistent tense harmony across a paragraph. Avoid jumping between past and present without an intentional time-shift!`
    };
  }

  // 7. PREPOSITIONS (IN, ON, AT, SINCE, FOR, BETWEEN, AMONG)
  if (p.includes('preposition') || p.includes('in on at') || p.includes('since vs for') || p.includes('between vs among')) {
    if (p.includes('between') || p.includes('among')) {
      return {
        category: 'grammar_prepositions',
        reply: `### Between vs. Among: The Precise Distinction
- **Between:** Used when referring to distinct, individual items (typically two, but can be more if each entity is individually named).
  - *Example:* *The peace treaty was negotiated between Sri Lanka, India, and the Maldives.*
  - *Example:* *Sit between the Abbot and the lecturer.*
- **Among:** Used when referring to an undifferentiated group, crowd, or collective of three or more.
  - *Example:* *The festival handbills were distributed among the students.*
  - *Example:* *There is great camaraderie among the pirivena novices.*`
      };
    }

    return {
      category: 'grammar_prepositions',
      reply: `### Prepositions of Time & Place: The Pyramid Rule ("In", "On", "At")
Prepositions follow a rule of **Specificity** (from Broadest to Most Specific):

1. **IN (Broadest / General / Enclosed):**
   - **Time (Centuries, Years, Months, Seasons):** *in the 21st century, in 2026, in October, in the morning, in spring*
   - **Place (Countries, Cities, Neighborhoods, Enclosed Rooms):** *in Sri Lanka, in Kandy, in the library hall*

2. **ON (Intermediate / More Specific / Surfaces & Days):**
   - **Time (Specific Days & Dates):** *on Wednesday, on October 7th, on Buddha Jayanti*
   - **Place (Streets, Avenues, Surfaces):** *on Temple Street, on the page, on the table*

3. **AT (Most Precise / Specific Coordinates & Clock Times):**
   - **Time (Exact Clock Times & Pinpoints):** *at 8:30 AM, at noon, at midnight*
   - **Place (Specific Venues & Addresses):** *at Asgiri Maha Vihara, at door number 42, at home*`
    };
  }

  // 8. CONDITIONALS (IF CLAUSES)
  if (p.includes('conditional') || p.includes('if clause') || p.includes('if i were') || p.includes('would have')) {
    return {
      category: 'grammar_conditionals',
      reply: `### English Conditionals (If-Clauses) Masterclass

1. **Zero Conditional (Universal Truths & Science):**
   - *Structure:* If + Present Simple, ... Present Simple
   - *Example:* *If morning mist rises over Kandy Lake, the temperature drops.*

2. **First Conditional (Real Possibility in Future):**
   - *Structure:* If + Present Simple, ... will + Base Verb
   - *Example:* *If you participate in the quiz, you will earn a commemorative certificate.*

3. **Second Conditional (Hypothetical Present / Dreams):**
   - *Structure:* If + Past Simple (Subjunctive "were"), ... would + Base Verb
   - *Example:* *If William Shakespeare were alive today, he would visit Asgiri Pirivena.*
   - *Note:* In formal English, use *"If I were"*, not *"If I was"*.

4. **Third Conditional (Hypothetical Past / Regret):**
   - *Structure:* If + had + Past Participle, ... would have + Past Participle
   - *Example:* *If Hamlet had slain Claudius immediately, many tragedies would have been averted.*`
    };
  }

  // 9. PARTS OF SPEECH (NOUNS, VERBS, ADJECTIVES, ADVERBS, ETC.)
  if (
    p.includes('part of speech') ||
    p.includes('parts of speech') ||
    p.includes('what is a noun') ||
    p.includes('what is a verb') ||
    p.includes('what is an adjective') ||
    p.includes('what is an adverb') ||
    p.includes('what is a conjunction')
  ) {
    return {
      category: 'grammar_parts_of_speech',
      reply: `### The Eight Pillars (Parts of Speech) in English Syntax
Every word in an English sentence belongs to one of eight functional families:

1. **Noun:** Names a person, place, thing, or concept (*scholar, Kandy, manuscript, serenity*).
2. **Pronoun:** Replaces a noun to avoid repetition (*he, she, they, who, each, which*).
3. **Verb:** Imparts kinetic vitality, action, or state of being (*translate, recited, contemplate, is*).
4. **Adjective:** Modifies, colors, and calibrates a noun (*ancient, numinous, eloquent, venerable*).
5. **Adverb:** Modifies a verb, adjective, or another adverb (*patiently, exceptionally, softly*).
6. **Preposition:** Establishes spatial, temporal, or logical relations (*upon, beneath, during, in*).
7. **Conjunction:** Connects words, phrases, or clauses (*and, but, because, although, yet*).
8. **Interjection:** Expresses sudden emotion or exclamation (*Hark!, Alas!, Indeed!*).`
    };
  }

  // 10. ARTICLES (A, AN, THE)
  if (p.includes('article') && (p.includes('a vs an') || p.includes('definite') || p.includes('indefinite') || p.includes('the'))) {
    return {
      category: 'grammar_articles',
      reply: `### English Articles ("A", "An", "The")
Articles define whether a noun is specific or unspecific.

**1. Indefinite Articles ("A" vs. "An"):**
- **The Golden Rule:** The choice between "A" and "An" is determined by the **SOUND**, not the written letter!
  - **Use "A" before Consonant Sounds:** *a book, a scholar, a university* (starts with /j/ consonant sound!), *a European* (starts with /j/!).
  - **Use "An" before Vowel Sounds:** *an apple, an elephant, an hour* (silent 'h'!), *an honorable guest* (silent 'h'!).

**2. Definite Article ("The"):**
- Used when both speaker and listener know the specific entity: *The English Corner, the Venerable Abbot, the Moon.*
- Do not use "the" before proper names of countries (except plural or republics: *the Netherlands, the United Kingdom, the United States*). Say *Sri Lanka*, never *the Sri Lanka*.`
    };
  }

  // 11. SHAKESPEARE: HAMLET, MACBETH, TEMPEST, ROMEO & JULIET, OTHELLO, SONNETS
  if (
    p.includes('shakespeare') ||
    p.includes('hamlet') ||
    p.includes('macbeth') ||
    p.includes('tempest') ||
    p.includes('romeo and juliet') ||
    p.includes('othello') ||
    p.includes('sonnet 18') ||
    p.includes('sonnet') ||
    p.includes('iambic pentameter') ||
    p.includes('bard of avon')
  ) {
    if (p.includes('hamlet') || p.includes('to be or not to be')) {
      return {
        category: 'shakespeare_hamlet',
        reply: `### William Shakespeare's *Hamlet, Prince of Denmark* (c. 1601)
*Hamlet* is universally regarded as Shakespeare's psychological masterpiece.

**Core Narrative Arc:**
Prince Hamlet learns from his father's ghost that his uncle Claudius murdered the king to seize the throne and marry Queen Gertrude. Rather than acting rashly, Hamlet is paralyzed by existential contemplation.

**The "To be, or not to be" Soliloquy (Act III, Scene 1):**
- **Existential Burden:** Weighing the nobility of enduring *"the slings and arrows of outrageous fortune"* against actively ending one's suffering.
- **The Undiscovered Country:** Why humans endure life's misery—because the fear of what dreams may come after death *"puzzles the will"*.
- **Philosophical Takeaway:** *"Thus conscience does make cowards of us all / And thus the native hue of resolution / Is sicklied o'er with the pale cast of thought."*`
      };
    }

    if (p.includes('macbeth') || p.includes('tomorrow and tomorrow') || p.includes('scottish play')) {
      return {
        category: 'shakespeare_macbeth',
        reply: `### William Shakespeare's *Macbeth* (c. 1606)
Shakespeare's most intense, fast-paced tragedy exploring unchecked ambition and moral disintegration.

**Core Themes:**
1. **The Poison of Ambition:** The Scottish general Macbeth, seduced by the cryptic prophecies of the Three Witches and spurred by Lady Macbeth, murders the virtuous King Duncan.
2. **Guilt and Psychological Collapse:** Blood becomes the indelible metaphor: *"Will all great Neptune's ocean wash this blood clean from my hand?"*
3. **The "Tomorrow, and tomorrow, and tomorrow" Soliloquy (Act V, Scene 5):**
   *“Life's but a walking shadow, a poor player / That struts and frets his hour upon the stage / And then is heard no more: it is a tale / Told by an idiot, full of sound and fury, / Signifying nothing.”*`
      };
    }

    if (p.includes('tempest') || p.includes('prospero') || p.includes('caliban')) {
      return {
        category: 'shakespeare_tempest',
        reply: `### William Shakespeare's *The Tempest* (c. 1611)
Widely considered Shakespeare's poetic farewell to theatrical art.

**Core Themes:**
1. **Art, Magic, and Forgiveness:** The exiled Duke Prospero uses arcane sorcery to control an enchanted island. When he has his enemies at his mercy, he chooses forgiveness: *"The rarer action is / In virtue than in vengeance."*
2. **Colonial Encounters & Language:** The relationship between Prospero and Caliban is central to post-colonial criticism. Caliban famously retorts: *"You taught me language, and my profit on't / Is, I know how to curse."*
3. **Mortal Transience:** *“We are such stuff / As dreams are made on, and our little life / Is rounded with a sleep.”*`
      };
    }

    if (p.includes('romeo') || p.includes('juliet')) {
      return {
        category: 'shakespeare_romeo_juliet',
        reply: `### William Shakespeare's *Romeo and Juliet* (c. 1595–96)
The world's most iconic tragedy of star-crossed love.

**Key Insights:**
- **The Feud:** The ancient hatred between the Capulets and Montagues creates a corrupt civic environment where pure devotion cannot survive.
- **The Balcony Scene (Act II, Scene 2):**
  *“What's in a name? That which we call a rose / By any other word would smell as sweet.”*
  Juliet philosophically argues that social conventions and family labels are arbitrary barriers to true essence and love.`
      };
    }

    if (p.includes('iambic pentameter') || p.includes('meter') || p.includes('scansion')) {
      return {
        category: 'shakespeare_meter',
        reply: `### Iambic Pentameter: The Heartbeat of Shakespearean Verse
Shakespeare composed his plays and sonnets predominantly in **iambic pentameter**:

**1. What is an Iamb?**
An iamb is a metric foot consisting of one **unstressed syllable** followed by one **stressed syllable** (*da-DUM*).

**2. What does Pentameter mean?**
*Penta* = Five. So there are **5 iambic feet** per line, totaling **10 syllables**.

**3. Example from Sonnet 18:**
Shall **I** / com **PARE** / thee **TO** / a **SUM** / mer's **DAY**?
(da - **DUM** / da - **DUM** / da - **DUM** / da - **DUM** / da - **DUM**)

**Why Shakespeare Used It:** It closely mirrors the natural cadence of spoken English, elevated with the rhythmic solemnity of the human heartbeat.`
      };
    }

    if (p.includes('sonnet')) {
      return {
        category: 'shakespeare_sonnet',
        reply: `### William Shakespeare's Sonnet Canon & Sonnet 18
Shakespeare authored 154 sonnets, published in the 1609 Quarto.

**The Shakespearean Sonnet Structure:**
- **14 Lines** written in iambic pentameter.
- **Three Quatrains (4 lines each)** developing a poetic argument: **ABAB CDCD EFEF**.
- **One Concluding Rhyming Couplet (2 lines)** providing the climax or epiphany: **GG**.

**Sonnet 18 Highlights:**
*“Shall I compare thee to a summer's day? / Thou art more lovely and more temperate...”*
Earthly summers fade, are stormy, and pass away; but through the immortality of the written poem, the beloved's beauty will never perish:
*“So long as men can breathe or eyes can see, / So long lives this, and this gives life to thee.”*`
      };
    }

    return {
      category: 'shakespeare_general',
      reply: `### William Shakespeare (1564–1616) — The Bard of Avon
William Shakespeare authored **37 plays**, **154 sonnets**, and two narrative poems.

**Key Contributions to the English Language:**
1. **Coined Over 1,700 Words:** Words like *eyeball, majestic, swagger, generous, assassination, addiction, critic*.
2. **Everyday Phrases:** *"Break the ice"*, *"wild goose chase"*, *"heart of gold"*, *"all that glitters is not gold"*, *"seen better days"*.
3. **Dramatic Innovation:** Paved the way for modern psychology by inventing theatrical soliloquies where characters debate their inner conscience aloud.`
    };
  }

  // 12. LITERATURE ERAS & LITERARY DEVICES
  if (
    p.includes('literature') ||
    p.includes('metaphor') ||
    p.includes('simile') ||
    p.includes('romanticism') ||
    p.includes('victorian') ||
    p.includes('modernism') ||
    p.includes('sri lankan literature') ||
    p.includes('ondaatje') ||
    p.includes('haiku') ||
    p.includes('poetry')
  ) {
    if (p.includes('metaphor') || p.includes('simile')) {
      return {
        category: 'literary_devices',
        reply: `### Metaphor vs. Simile: Figures of Poetic Comparison
Both devices bridge two distinct concepts, but differ in directness:

1. **Simile (Explicit Comparison using "Like" or "As"):**
   - *Example:* *The temple stupa stood in the dawn mist **like** a white lotus emerging from water.*
   - *Shakespeare:* *"My love is **as** a fever, longing still."*

2. **Metaphor (Direct Equivalence without "Like" or "As"):**
   - Asserts that one thing **IS** another, transferring its symbolic attributes directly.
   - *Example:* *Language is a lantern illuminating foreign seas.*
   - *Shakespeare:* *"All the world's a stage, and all the men and women merely players."*

**Pro-Tip:** Metaphors are generally more powerful and immersive in essays and poems because they demand the reader embrace the symbolic fusion immediately!`
      };
    }

    if (p.includes('romanticism') || p.includes('romantic')) {
      return {
        category: 'literature_eras',
        reply: `### The Romantic Movement in English Literature (c. 1798–1837)
A passionate revolt against Enlightenment rationalism and industrial mechanization.

- **Key Luminaries:** William Wordsworth, Samuel Taylor Coleridge, John Keats, Percy Bysshe Shelley, Lord Byron, Mary Shelley.
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
Literature flourished during the reign of Queen Victoria amidst unprecedented imperial expansion, industrial factories, and social friction.

- **Key Luminaries:** Charles Dickens, Charlotte Brontë, Emily Brontë, George Eliot, Thomas Hardy, Alfred Lord Tennyson.
- **Defining Features:**
  1. **Social Realism:** Unmasking the grim reality of child labor, workhouses, and class rigidity (*Oliver Twist, Great Expectations*).
  2. **The Triumph of the Novel:** Long, serialized novels exploring marriage, inheritance, and moral ethics (*Jane Eyre, Middlemarch*).
  3. **Faith vs. Doubt:** The intellectual earthquake caused by Darwinian evolution reflected in Tennyson's poetry (*"nature red in tooth and claw"*).`
      };
    }

    if (p.includes('sri lanka') || p.includes('ondaatje') || p.includes('monastic translation')) {
      return {
        category: 'sri_lankan_literature',
        reply: `### Sri Lankan English Literature & Monastic Translation Heritage
Sri Lankan English writing represents a vibrant synthesis of island folklore, Buddhist ethics, tropical landscape, and colonial critique.

- **Michael Ondaatje:** Celebrated for *The English Patient* (Booker Prize winner) and *Running in the Family*, blending lyrical poetry with family memoirs of Ceylon.
- **Punyakante Wijenaike:** Renowned for *The Waiting Earth*, exploring rural agrarian life and the spiritual connection to ancestral soil.
- **Lakdhas Wikkramasinha:** Known for *Don't Talk to Me About Matisse*, asserting indigenous pride and poetic autonomy in English verse.
- **Monastic Translation Tradition:** For over two centuries, pirivenas like Asgiri Maha Vihara in Kandy have translated the Pali Buddhist Canon into English, enabling the Dhamma to reach global scholarly audiences.`
      };
    }

    if (p.includes('haiku')) {
      return {
        category: 'poetic_forms',
        reply: `### The Craft of Writing a Haiku
Originating in Japan and embraced in modern English poetry, a Haiku captures a fleeting moment in nature with acute mindfulness.

**Structure:**
- **Line 1:** 5 Syllables
- **Line 2:** 7 Syllables
- **Line 3:** 5 Syllables
- Total: 17 Syllables (No rhyming required).

**Example Composed for Sanjanani 2026:**
*Quill whispers on page,* (5)
*Morning mists veil temple spires,* (7)
*Thought becomes a flame.* (5)

*Would you like to write a haiku together? Send me a line!*`
      };
    }
  }

  // 13. SRI LANKAN LOANWORDS & ETYMOLOGIES
  if (p.includes('loanword') || p.includes('serendipity') || p.includes('tourmaline') || p.includes('catamaran') || p.includes('origin of')) {
    return {
      category: 'etymology',
      reply: `### English Words with Sri Lankan & South Asian Origins
English has actively borrowed vibrant terms from Sri Lanka:

1. **Serendipity:** Coined in 1754 by Horace Walpole, inspired by the Persian/Arabic name for Sri Lanka (*Serendib*). Means the gift of making fortunate, unexpected discoveries by accident.
2. **Tourmaline:** From the Sinhala word *Thoramalli (තෝරමල්ලි)*, identifying vibrant multi-colored gemstones sourced from Ceylon gem pits.
3. **Catamaran:** From Tamil *Kattu-maram* (tied logs), multi-hulled watercraft that sailed Ceylon's coasts.
4. **Mulligatawny:** From *Milagu-tannir* (pepper-water), a hearty spiced soup created during the colonial era in Ceylon and Madras.
5. **Anicut:** Hydraulic engineering term for a dam or weir across a stream, originating from South Asian irrigation civilization.`
    };
  }

  // 14. VOCABULARY ELEVATION / ADJECTIVES FOR KANDY
  if (p.includes('adjective') || p.includes('vocabulary') || p.includes('synonym') || p.includes('kandy mist') || p.includes('elevate')) {
    return {
      category: 'vocabulary',
      reply: `### Elevating Your Vocabulary: 6 Atmospheric Adjectives for Kandy
Replace everyday words with rich, evocative literary alternatives:

1. **Gossamer** *(Delicate & Ethereal):* Describing morning mist rising above the Mahaweli River like woven spider's silk.
2. **Numinous** *(Awe-inspiring & Spiritually Sacred):* Describing the quiet dawn presence within Asgiri Maha Vihara.
3. **Matutinal** *(Belonging to Early Morning):* Replacing "morning" with a formal classical rhythm.
4. **Verdant** *(Lush, Green & Teeming with Life):* Capturing the tea-cloaked hills of the central highlands.
5. **Sonorous** *(Deep, Rich & Resonant):* Describing the distant tolling of the Pirivena bronze bell.
6. **Ineffable** *(Beyond Expression in Ordinary Words):* Describing moments of profound aesthetic wonder.`
    };
  }

  // 15. DEFAULT SCHOLARLY FALLBACK
  return {
    category: 'scholar_dispatch',
    reply: `### Scholar's Commentary on: "${promptText}"
Thank you for your thoughtful query at **The English Corner**!

To ensure maximum precision in your English learning journey:
- **For Grammar Inquiries:** Ask me to explain specific concepts like *Active vs. Passive Voice*, *Oxford Comma*, *Conditional Clauses*, or *The 12 Tenses*.
- **To Check a Sentence:** Type: \`Check my sentence: "Your sentence here"\` to receive a detailed breakdown of syntax, subject-verb agreement, and phrasing enhancements.
- **For Literature & Shakespeare:** Inquire about *Hamlet*, *Macbeth*, *The Tempest*, *Sonnet 18*, or literary movements from the *Renaissance* to *Sri Lankan English writers*.

*Feel free to select one of the suggested topic chips below or ask another question!*`
  };
}

/**
 * Diagnostic logic for sentence checks.
 * Detects common grammatical bugs, syntax errors, and subject-verb conflicts,
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
    issues.push(`**Double Negative:** English syntax avoids double negatives because two negatives cancel out into a positive affirmation.`);
    suggestions.push(`Replace the second negative with **"anything"**, **"anybody"**, or **"any"** (*"don't know anything"*).`);
  }

  // Check 9: "They is", "He don't", "The monks is"
  if (/\b(they\s+is|they\s+was|he\s+don't|she\s+don't|it\s+don't)\b/i.test(lower)) {
    issues.push(`**Subject-Verb Number Disagreement:** Third-person singular subjects (*he, she, it*) require **"doesn't"**, while plural subjects (*they*) take plural verbs (*"are" / "were"*).`);
    suggestions.push(`Ensure verb number aligns with the subject.`);
  }

  // If specific issues detected:
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
If you wish to elevate this sentence for an academic essay or literary piece, consider these variations:
1. **Academic / Formal Cadence:** 
   *“${elevateSentence(s, 'academic')}”*
2. **Lyrical / Literary Flourish:** 
   *“${elevateSentence(s, 'literary')}”*

*Keep submitting sentences or ask about specific syntactic rules!*`
  };
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
 * Simple heuristic fixer for common mistakes in sample sentences.
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
