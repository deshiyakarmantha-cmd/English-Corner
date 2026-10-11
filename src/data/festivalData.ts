import { LiteratureEra, ShakespeareWork, GrammarTopic, QuizQuestion, FestivalEvent, WritingSubmission } from '../types';

export const FESTIVAL_METADATA = {
  festivalName: 'Sanjanani Literary Festival 2026',
  festivalSinhala: 'සංජානනී ශිෂ්‍ය කලා මහෝත්සවය සහ අධ්‍යාපන සංස්කෘතික ප්‍රදර්ශනය 2026',
  festivalSubTitleSinhala: 'යතිවර අංකුර දැයට තිළිණ කළ කහ සිවුරයි - කලා කෙතයි',
  pavilionName: 'The English Corner',
  institution: 'Asgiri Maha Vihara Maha Pirivena',
  institutionSinhala: 'අස්ගිරි මහා විහාර මහ පිරිවෙන - මහනුවර',
  location: 'Asgiri Maha Vihara Maha Pirivena Premises, Kandy (Mahanuwara), Sri Lanka',
  dates: 'October 07, 08, 09, 2026',
  datesSinhala: '2026 ඔක්තෝබර් 07, 08, 09 තෙදින පුරා',
  theme: 'Bridges of Ink: Ancient Wisdom, Universal Eloquence & Modern Expression',
  exhibitionStallsSinhala: 'බෞද්ධ දර්ශනය, ඉතිහාසය, කලාව, භාෂාව, විද්‍යාව සාහිත්‍යය හා බැඳි විවිධ අධ්‍යාපන ප්‍රදර්ශන කුටි',
  contact: {
    tel: '081 2 222 568',
    mobile: '070 1 022 222',
    email: 'asgiriyapirivena@gmail.com',
    web: 'www.asgiripirivena.lk',
    mediaUnit: 'Sri Dalada Maligawa Media Unit (ශ්‍රී දළදා මාළිගාව මාධ්‍ය ඒකකය)'
  },
  invitationSinhala: '“සසුන් කෙත සුවඳවත් කරන සාහිත්‍ය මංගල්‍යයට ඔබ සැමට ගෞරවනීය ආරාධනා!”'
};

export const ENGLISH_LANGUAGE_FACTS = [
  {
    title: 'The Journey from Anglo-Saxon to Global Lingua Franca',
    period: '450 CE – Present',
    description: 'English evolved through three profound epochs: Old English (Germanic dialects of Angles, Saxons, and Jutes), Middle English (revolutionized by the Norman French conquest of 1066 and celebrated by Geoffrey Chaucer), and Early Modern English (expanded by Shakespeare, the King James Bible, and the printing press). Today, it unites over 1.5 billion speakers globally.',
  },
  {
    title: 'A Voracious Lexical Sponge: Loanwords from 350+ Tongues',
    period: 'Linguistic Tapestry',
    description: 'Unlike languages guarded by rigid academies, English freely absorbs words across continents. It borrowed legal terms from Norman French, philosophical concepts from Classical Greek and Latin, scientific and astrological terminology from Arabic, and maritime terms from Dutch.',
  },
  {
    title: 'The Sri Lankan & South Asian Linguistic Bridge',
    period: 'Cultural Crossroads',
    description: 'English adopted numerous words deeply rooted in Sri Lanka and the Indian Ocean: "Serendipity" (from Serendib, the ancient Persian and Arabic name for Sri Lanka), "Tourmaline" (from Sinhala "Thoramalli"), "Anicut" (from irrigation terminology), "Beriberi" (from Sinhala "beri" meaning weakness), and "Catamaran" (from Tamil "kattumaram").',
  },
  {
    title: 'The Monastic Pirivena Tradition & English Mastery',
    period: 'Asgiri Maha Vihara Legacy',
    description: 'Asgiri Maha Vihara Maha Pirivena has nurtured monastic scholars since medieval Kandy. The study of English enables monks and scholars to translate the Tripiṭaka into international scholarly discourse, engage in interfaith and philosophical dialogues, and communicate Buddhist wisdom across the globe.',
  },
];

export const CURIOUS_LOANWORDS = [
  { word: 'Serendipity', origin: 'Sinhala / Persian (Serendib)', meaning: 'The faculty of making happy and unexpected discoveries by accident. Coined by Horace Walpole in 1754 inspired by The Three Princes of Serendip.' },
  { word: 'Tourmaline', origin: 'Sinhala (Thoramalli - තෝරමල්ලි)', meaning: 'A semi-precious gemstone of varied colors, first imported into Europe by the Dutch East India Company from Ceylon gem pits.' },
  { word: 'Catamaran', origin: 'Tamil (Kattu-maram)', meaning: 'A multi-hulled watercraft consisting of two parallel hulls of equal size.' },
  { word: 'Mulligatawny', origin: 'Tamil (Milagu-tannir)', meaning: 'Literally "pepper-water"; a spicy soup popular during colonial Ceylon and British India.' },
  { word: 'Algebra', origin: 'Arabic (Al-Jabr)', meaning: 'Reunion of broken parts, introduced through Islamic mathematicians in Baghdad and Moorish Spain.' },
  { word: 'Avatar', origin: 'Sanskrit (Avatāra)', meaning: 'Descent of a deity to earth; now ubiquitous in virtual computing and literature.' },
  { word: 'Bungalow', origin: 'Hindi/Gujarati (Bangla)', meaning: 'A house built in the style of Bengal; standard domestic architecture across Kandy hill country.' },
  { word: 'Nirvana', origin: 'Pali (Nibbāna) / Sanskrit', meaning: 'The ultimate transcendent state of liberation, supreme peace, and freedom from suffering.' },
];

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'parts-of-speech',
    title: 'The Eight Pillars of Speech',
    subtitle: 'Understanding the architectural units of English syntax',
    rules: [
      'Nouns anchor the subject; Verbs impart kinetic vitality to thought.',
      'Adjectives sculpt and illuminate nouns, while Adverbs calibrate verbs, adjectives, or entire clauses.',
      'Prepositions govern spatial, temporal, and logical relationships.',
      'Conjunctions act as structural keystones weaving clauses into cohesive rhetoric.',
    ],
    examples: [
      {
        correct: 'The venerable scholar patiently translated the palm-leaf manuscript upon the teak desk.',
        explanation: 'Identifies: Noun phrase (venerable scholar), Adverb (patiently), Verb (translated), Object (palm-leaf manuscript), Prepositional phrase (upon the teak desk).',
      },
      {
        correct: 'Neither the teacher nor the students were unaware of the historic festival.',
        incorrect: 'Neither the teacher nor the students was unaware of the historic festival.',
        explanation: 'In correlative conjunctions (neither... nor), the verb agrees with the closer subject ("students" → plural "were").',
      },
    ],
    interactiveTip: 'Notice how replacing weak verb + adverb combinations (e.g., "walked slowly") with vivid verbs ("ambled", "strolled", "meandered") elevates your prose.',
  },
  {
    id: 'tenses-mastery',
    title: 'The Twelve Temporal Dimensions',
    subtitle: 'Navigating past, present, and future with chronological precision',
    rules: [
      'Simple Tenses state facts, habitual routines, or completed acts.',
      'Continuous (Progressive) Tenses illustrate ongoing actions at specific temporal junctures.',
      'Perfect Tenses bridge time horizons: connecting an antecedent event to a subsequent moment.',
      'Perfect Continuous Tenses emphasize uninterrupted duration and persistence.',
    ],
    examples: [
      {
        correct: 'By October 2026, the Pirivena will have hosted the Sanjanani Festival for seven successive years.',
        explanation: 'Future Perfect tense ("will have hosted") anchors a future achievement completed before a specified benchmark.',
      },
      {
        correct: 'Since sunrise, the student monks have been reciting Shakespearean soliloquies in the courtyard.',
        explanation: 'Present Perfect Continuous ("have been reciting") illustrates an action initiated in the past that continues uninterrupted into the present.',
      },
    ],
    interactiveTip: 'Do not use the present continuous for stative verbs of cognition or emotion: say "I understand this sonnet", never "I am understanding this sonnet".',
  },
  {
    id: 'active-vs-passive',
    title: 'Voice & Rhetorical Agency',
    subtitle: 'When to deploy active immediacy versus diplomatic passive focus',
    rules: [
      'Active Voice places the agent in the driver seat: Subject + Verb + Object. Creates vigour, clarity, and authority.',
      'Passive Voice foregrounds the recipient of the action: Object + Auxiliary Verb + Past Participle + [by Agent].',
      'Use Passive Voice intentionally when the agent is unknown, irrelevant, or when diplomatic neutrality is required.',
    ],
    examples: [
      {
        correct: 'Active: William Shakespeare penned thirty-seven plays in London.',
        incorrect: 'Passive: Thirty-seven plays were penned by William Shakespeare in London. (Overused)',
        explanation: 'Active voice focuses cleanly on Shakespeare as the creator and maintains driving momentum.',
      },
      {
        correct: 'Legitimate Passive: The ancient palm-leaf ola manuscripts were preserved in the temple archives.',
        explanation: 'The preservation of the sacred artifacts is more important than who physically placed them in the vault.',
      },
    ],
    interactiveTip: 'Aim for roughly 85% active voice in creative and academic writing, reserving the passive for objective research or poetic mystery.',
  },
  {
    id: 'punctuation-nuance',
    title: 'Punctuation: The Cadence of Thought',
    subtitle: 'Mastering the semicolon, the em-dash, and the venerable Oxford comma',
    rules: [
      'The Semicolon (;) connects two independent clauses that share an intimate thematic resonance without a coordinating conjunction.',
      'The Em-Dash (—) creates an emphatic, dramatic pause or introduces a sudden explanatory parenthesis.',
      'The Oxford (Serial) Comma appears before the coordinating conjunction in a series of three or more items to prevent catastrophic ambiguity.',
    ],
    examples: [
      {
        correct: 'We invited the scholars, William Shakespeare, and the Venerable Abbot.',
        incorrect: 'We invited the scholars, William Shakespeare and the Venerable Abbot. (Implies the scholars ARE Shakespeare and the Abbot!)',
        explanation: 'Without the Oxford comma, an appositive reading mistakenly equates the first plural noun with the following names.',
      },
      {
        correct: 'Language is not merely a tool for commerce; it is the sanctuary of human memory.',
        explanation: 'The semicolon balances two closely entwined philosophical assertions without the clunkiness of "and".',
      },
    ],
    interactiveTip: 'Never place a semicolon between an independent clause and a dependent fragment. Both flanks must stand alone as complete grammatical sentences.',
  },
];

export const LITERATURE_ERAS: LiteratureEra[] = [
  {
    id: 'renaissance',
    era: 'The Renaissance & Elizabethan Age',
    period: 'c. 1558 – 1625',
    overview: 'A dazzling cultural rebirth marked by humanism, maritime exploration, intellectual curiosity, and theatrical brilliance under Queen Elizabeth I and King James I. Literature shifted from medieval allegory to the complex interiority of human psychology.',
    keyFigures: ['William Shakespeare', 'Christopher Marlowe', 'John Donne', 'Ben Jonson', 'Edmund Spenser'],
    definingTraits: ['Mastery of blank verse (unrhymed iambic pentameter)', 'Tragic flaws and humanistic moral dilemmas', 'Metaphysical wit, conceits, and petrarchan sonnets', 'Flourishing public playhouses like The Globe'],
    notableWorks: [
      { title: 'Hamlet', author: 'William Shakespeare', year: '1601', snippet: '"There are more things in heaven and earth, Horatio, than are dreamt of in your philosophy."' },
      { title: 'The Faerie Queene', author: 'Edmund Spenser', year: '1590', snippet: 'Allegorical epic exploring chivalric virtue and national destiny.' },
      { title: 'Doctor Faustus', author: 'Christopher Marlowe', year: '1592', snippet: '"Was this the face that launch\'d a thousand ships, and burnt the topless towers of Ilium?"' },
    ],
  },
  {
    id: 'romantic',
    era: 'The Romantic Movement',
    period: 'c. 1798 – 1837',
    overview: 'A passionate revolt against the cold rationalism of the Enlightenment and the mechanized grime of the Industrial Revolution. Romantics exalted nature, sublime wonder, solitary contemplation, intense emotion, and the unbounded imagination.',
    keyFigures: ['William Wordsworth', 'Samuel Taylor Coleridge', 'John Keats', 'Percy Bysshe Shelley', 'Lord Byron', 'Mary Shelley'],
    definingTraits: ['The Sublime: awe-inspiring terror and ecstasy in nature', 'Emphasis on the primacy of individual feeling and intuition', 'Reverence for medieval lore and ancient ruins', 'Critique of hyper-rationalist industrial exploitation'],
    notableWorks: [
      { title: 'Lyrical Ballads', author: 'Wordsworth & Coleridge', year: '1798', snippet: '"Poetry is the spontaneous overflow of powerful feelings: it takes its origin from emotion recollected in tranquility."' },
      { title: 'Ode to a Nightingale', author: 'John Keats', year: '1819', snippet: '"Thou wast not born for death, immortal Bird! No hungry generations tread thee down."' },
      { title: 'Frankenstein', author: 'Mary Shelley', year: '1818', snippet: 'A Gothic cautionary inquiry into the moral ethics of unchecked scientific hubris.' },
    ],
  },
  {
    id: 'victorian',
    era: 'The Victorian Epoch',
    period: 'c. 1837 – 1901',
    overview: 'An era of sweeping social upheaval, imperial expansion, technological marvels, and deep moral questioning during the reign of Queen Victoria. The novel blossomed into the supreme literary vehicle for examining class inequality, industrialization, and family life.',
    keyFigures: ['Charles Dickens', 'Charlotte Brontë', 'Emily Brontë', 'George Eliot', 'Alfred, Lord Tennyson', 'Thomas Hardy'],
    definingTraits: ['Social realism and biting satire of institutional corruption', 'Moral dilemmas of social mobility and industrial labor', 'The rise of serialization in literary magazines', 'Profound spiritual doubt sparked by Darwinian science'],
    notableWorks: [
      { title: 'Great Expectations', author: 'Charles Dickens', year: '1861', snippet: '"In a word, I was too cowardly to do what I knew to be right, as I had been too cowardly to avoid doing what I knew to be wrong."' },
      { title: 'Jane Eyre', author: 'Charlotte Brontë', year: '1847', snippet: '"I am no bird; and no net ensnares me; I am a free human being with an independent will."' },
      { title: 'Middlemarch', author: 'George Eliot', year: '1871', snippet: 'The definitive panorama of provincial English society and unfulfilled ideals.' },
    ],
  },
  {
    id: 'modern-postcolonial',
    era: 'Modernism & Global Voices',
    period: 'c. 1901 – Present',
    overview: 'Fractured by world wars, rapid technological transformation, and decolonization, Modernism and Post-Colonial literature dismantled traditional linear narrative. Writers around the world forged new forms to capture fragmented identity, hybridity, and self-determination.',
    keyFigures: ['Virginia Woolf', 'T.S. Eliot', 'James Joyce', 'Chinua Achebe', 'Salman Rushdie', 'Michael Ondaatje'],
    definingTraits: ['Stream of consciousness and psychological fragmentation', 'Re-examination of colonial legacies and indigenous languages', 'Magical realism, polyphonic voices, and intercultural dialogue', 'English as an open canvas for post-colonial reinvention'],
    notableWorks: [
      { title: 'The Waste Land', author: 'T.S. Eliot', year: '1922', snippet: '"These fragments I have shored against my ruins."' },
      { title: 'Things Fall Apart', author: 'Chinua Achebe', year: '1958', snippet: 'A seminal rebuttal to colonialist stereotypes through rich Igbo proverbs.' },
      { title: 'Running in the Family', author: 'Michael Ondaatje', year: '1982', snippet: 'A lyrical, poetic memoir traversing the lush landscape, eccentric ancestry, and memories of Sri Lanka.' },
    ],
  },
  {
    id: 'sri-lankan-english',
    era: 'Sri Lankan English Literature & Monastic Heritage',
    period: '20th Century – Contemporary',
    overview: 'A distinctive and deeply resonant literary tradition rooted in the island’s rich history, Buddhist philosophy, ethnic harmony, colonial confrontations, and tropical geography. Monastic scholarship in Pirivenas has played an instrumental role in bridging ancient Pali and Sanskrit classics with contemporary English translation.',
    keyFigures: ['Martin Wickramasinghe (translations)', 'Lakdhas Wikkramasinha', 'Punyakante Wijenaike', 'Patrick Fernando', 'Jean Arasanayagam', 'Prof. Senake Bandaranayake'],
    definingTraits: ['Infusion of Sinhala and Tamil cultural idioms into English cadence', 'Deep reverence for rural landscape, tank cascades, and temple bells of Kandy', 'Exploration of Buddhist ethics: impermanence (Anicca), loving-kindness (Mettā), and inner peace', 'Vibrant bilingual poetic consciousness'],
    notableWorks: [
      { title: 'The Waiting Earth', author: 'Punyakante Wijenaike', year: '1966', snippet: 'A haunting psychological portrait of peasant connection to the ancestral soil of Sri Lanka.' },
      { title: 'Don\'t Talk to Me About Matisse', author: 'Lakdhas Wikkramasinha', year: '1973', snippet: 'A fierce anti-colonial poetic proclamation asserting native artistic autonomy and dignity.' },
      { title: 'The English Patient', author: 'Michael Ondaatje', year: '1992', snippet: 'Winner of the Booker Prize and Golden Man Booker; an evocative study of memory, identity, and healing.' },
    ],
  },
];

export const SHAKESPEARE_WORKS: ShakespeareWork[] = [
  {
    id: 'hamlet',
    title: 'Hamlet, Prince of Denmark',
    genre: 'Tragedy',
    compositionYear: 'c. 1599 – 1601',
    overview: 'Set in the royal court of Elsinore, the play chronicles Prince Hamlet\'s agonizing contemplation of revenge after the ghost of his father reveals that his uncle Claudius murdered him to usurp both crown and queen.',
    centralThemes: ['The paralysis of contemplation vs. impulsive action', 'Mortality, decomposition, and existential despair', 'Appearance versus reality ("God has given you one face, and you make yourself another")', 'The corrosion of a corrupt state ("Something is rotten in the state of Denmark")'],
    iconicQuote: {
      lines: 'To be, or not to be, that is the question: / Whether \'tis nobler in the mind to suffer / The slings and arrows of outrageous fortune, / Or to take arms against a sea of troubles / And by opposing end them.',
      speaker: 'Prince Hamlet',
      context: 'Act III, Scene 1 — Hamlet meditates upon life, suffering, the fear of the afterlife, and human fragility.',
    },
    criticalReview: 'Hamlet remains Shakespeare\'s crowning psychological triumph. Rather than delivering a routine revenge tragedy, the Bard presents the first truly modern consciousness on stage: an intellectual trapped between moral revulsion, philosophical doubt, and mortal responsibility.',
    academicSignificance: 'Widely considered the greatest tragedy in world literature, translated into every major world language and studied as the archetype of tragic introspection.',
    characters: ['Prince Hamlet', 'King Claudius', 'Queen Gertrude', 'Ophelia', 'Polonius', 'Horatio', 'Laertes'],
  },
  {
    id: 'macbeth',
    title: 'Macbeth (The Scottish Play)',
    genre: 'Tragedy',
    compositionYear: 'c. 1606',
    overview: 'A ferocious study of unchecked ambition. Spurred by the cryptic prophecies of three weird sisters and egged on by his ruthless wife, the Scottish general Macbeth murders the benevolent King Duncan, initiating a bloody spiral of paranoia and tyranny.',
    centralThemes: ['Unchecked ambition corrupting moral order', 'Guilt, hallucination, and psychological disintegration', 'Fate and free will versus prophetic seduction', 'Equivocation and deceptive language ("Fair is foul, and foul is fair")'],
    iconicQuote: {
      lines: 'Life\'s but a walking shadow, a poor player / That struts and frets his hour upon the stage / And then is heard no more. It is a tale / Told by an idiot, full of sound and fury, / Signifying nothing.',
      speaker: 'Macbeth',
      context: 'Act V, Scene 5 — Macbeth reacts to the death of Lady Macbeth, gazing into the bleak abyss of nihilism.',
    },
    criticalReview: 'Macbeth is Shakespeare\'s most compact, breathless tragedy. Its dark, nightmarish atmosphere and piercing depiction of conscience being devoured from within make it an enduring warning against tyranny and moral compromise.',
    academicSignificance: 'A cornerstone for understanding political hubris, dramatic economy, and supernatural imagery in Elizabethan and Jacobean drama.',
    characters: ['Macbeth', 'Lady Macbeth', 'Banquo', 'Macduff', 'King Duncan', 'The Three Witches', 'Malcolm'],
  },
  {
    id: 'romeo-and-juliet',
    title: 'Romeo and Juliet',
    genre: 'Tragedy',
    compositionYear: 'c. 1595 – 1596',
    overview: 'In fair Verona, an ancient blood feud between the noble houses of Montague and Capulet condemns the passionate love of two young souls, Romeo and Juliet, whose sudden matrimony and tragic demise ultimately bury their parents\' hatred.',
    centralThemes: ['The transformative yet consuming power of young love', 'Fate, astrological determinism, and "star-cross\'d" destiny', 'The destructive vanity of ancient social and tribal feuds', 'Time and impatience accelerating tragic momentum'],
    iconicQuote: {
      lines: 'What\'s in a name? That which we call a rose / By any other word would smell as sweet. / So Romeo would, were he not Romeo call\'d, / Retain that dear perfection which he owes / Without that title.',
      speaker: 'Juliet Capulet',
      context: 'Act II, Scene 2 — Juliet speaks from her balcony on the arbitrary nature of family names dividing pure devotion.',
    },
    criticalReview: 'Unlike classical tragedies driven by character flaws, Romeo and Juliet presents lovers doomed primarily by social toxicity and merciless timing. The lyrical exuberance of the language, rich in sonnet forms and radiant celestial imagery, creates an immortal hymn to youthful devotion.',
    academicSignificance: 'The supreme archetype of romantic tragedy in Western literature, setting the benchmark for poetic dialogue and dramatic pacing.',
    characters: ['Romeo Montague', 'Juliet Capulet', 'Mercutio', 'Friar Laurence', 'Tybalt', 'The Nurse', 'Lord Capulet'],
  },
  {
    id: 'the-tempest',
    title: 'The Tempest',
    genre: 'Comedy',
    compositionYear: 'c. 1610 – 1611',
    overview: 'Prospero, the rightful Duke of Milan and a master of esoteric magical arts, lives stranded on a remote enchanted island with his daughter Miranda, the airy spirit Ariel, and the deformed native Caliban. He conjures a magical storm to shipwreck his treacherous brother and enemies, orchestrating a profound reckoning that ends not in vengeance, but in forgiveness and the renunciation of his magic.',
    centralThemes: ['Forgiveness over revenge ("The rarer action is / In virtue than in vengeance")', 'Art, illusion, and theatrical creation as magic', 'Colonialism, native dispossession, and the nature of servitude', 'The restoration of civic order and generational reconciliation'],
    iconicQuote: {
      lines: 'We are such stuff / As dreams are made on, and our little life / Is rounded with a sleep.',
      speaker: 'Prospero',
      context: 'Act IV, Scene 1 — Prospero dissolves the wedding masque and contemplates the fleeting, insubstantial nature of mortal existence and theatrical illusions.',
    },
    criticalReview: 'Regarded as Shakespeare\'s allegorical farewell to the stage. In Prospero breaking his staff and drowning his book, generations of critics see the Bard bidding adieu to his own poetic conjuring. It stands at the threshold of modern literature, raising prescient questions about empire, nature, and art.',
    academicSignificance: 'Central to post-colonial literary studies (notably Aimé Césaire\'s and George Lamming\'s critiques) exploring the master-servant dynamic between Prospero, Ariel, and Caliban.',
    characters: ['Prospero', 'Miranda', 'Ariel', 'Caliban', 'Ferdinand', 'Antonio', 'Gonzalo'],
  },
  {
    id: 'othello',
    title: 'Othello, the Moor of Venice',
    genre: 'Tragedy',
    compositionYear: 'c. 1603 – 1604',
    overview: 'Othello, a noble Moorish general in the service of the Venetian state, secretly marries Desdemona. The villainous ensign Iago, driven by bitter envy and racial resentment, weaves a diabolical web of insinuations and deceit, driving Othello into a murderous frenzy of jealousy.',
    centralThemes: ['The corrosive venom of unfounded jealousy ("the green-ey\'d monster")', 'Racial prejudice and outsider identity in a cosmopolitan empire', 'Manipulation, rhetoric, and "motiveless malignity" (Iago)', 'The fragility of honor and trust when poisoned by rumour'],
    iconicQuote: {
      lines: 'O! beware, my lord, of jealousy; / It is the green-ey\'d monster which doth mock / The meat it feeds on.',
      speaker: 'Iago',
      context: 'Act III, Scene 3 — Iago uses pseudo-concern to plant the very suspicion he claims to warn Othello against.',
    },
    criticalReview: 'A harrowing domestic tragedy of unbearable intimacy and tension. Shakespeare exposes how easily noble virtue can be corrupted when preyed upon by sophisticated psychological malice. Iago remains one of the most chillingly rational villains in dramatic history.',
    academicSignificance: 'A cornerstone for literary discussions on race, performative villainy, and the epistemological problem of "ocular proof".',
    characters: ['Othello', 'Desdemona', 'Iago', 'Emilia', 'Cassio', 'Roderigo', 'Brabantio'],
  },
  {
    id: 'sonnet-18',
    title: 'Sonnet 18: "Shall I Compare Thee..."',
    genre: 'Poetry',
    compositionYear: 'c. 1590s (Pub. 1609)',
    overview: 'The most renowned of Shakespeare’s 154 sonnets, written in the classic English (Shakespearean) sonnet form of three quatrains and a concluding rhyming couplet (ABAB CDCD EFEF GG), meditating on time, beauty, and poetic immortality.',
    centralThemes: ['The mutability of nature vs. the eternal endurance of poetry', 'Beauty preserved beyond the reach of Death\'s shadow', 'The power of the written word to grant immortality to the beloved', 'Mastery of the iambic pentameter line'],
    iconicQuote: {
      lines: 'So long as men can breathe or eyes can see, / So long lives this, and this gives life to thee.',
      speaker: 'The Poetic Speaker',
      context: 'Lines 13–14 (Concluding Couplet) — The bold assertion that as long as humanity reads this verse, the beloved’s beauty shall never perish.',
    },
    criticalReview: 'A masterclass in lyric economy. Beginning with a modest rhetorical question, Shakespeare systematically shows how earthly summers are imperfect, stormy, and ephemeral, whereas art confers an eternal springtime upon the human soul.',
    academicSignificance: 'The definitive teaching specimen for the English sonnet form, meter, and the Renaissance concept of poetic monumentality.',
    characters: ['The Poetic Voice', 'The Fair Youth (Subject)'],
  },
];

export const SHAKESPEARE_COINED_PHRASES = [
  { phrase: 'Break the ice', source: 'The Taming of the Shrew', meaning: 'To ease tension and start a conversation in an awkward or formal setting.' },
  { phrase: 'Wild goose chase', source: 'Romeo and Juliet', meaning: 'A foolish, hopeless, or fruitless pursuit.' },
  { phrase: 'Heart of gold', source: 'Henry V', meaning: 'A person with an exceptionally kind, generous, and honorable nature.' },
  { phrase: 'Brave new world', source: 'The Tempest', meaning: 'A new era or state of things, often anticipated with wonder or ironic trepidation.' },
  { phrase: 'In a pickle', source: 'The Tempest', meaning: 'To find oneself trapped in a difficult, embarrassing, or messy predicament.' },
  { phrase: 'Wear one\'s heart upon one\'s sleeve', source: 'Othello', meaning: 'To display one\'s innermost emotions openly rather than concealing them.' },
  { phrase: 'All that glitters is not gold', source: 'The Merchant of Venice', meaning: 'Things that appear attractive or valuable on the surface may turn out to be worthless.' },
  { phrase: 'Faint-hearted', source: 'Henry VI, Part 1', meaning: 'Lacking courage or confidence; timid in the face of challenge.' },
  { phrase: 'Green-eyed monster', source: 'Othello', meaning: 'The destructive, tormenting emotion of jealousy.' },
  { phrase: 'Full circle', source: 'King Lear', meaning: 'Returning completely to the starting point after a long journey or cycle of events.' },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Shakespeare',
    question: 'In which play does Prince Hamlet utter the immortal soliloquy beginning "To be, or not to be"?',
    options: ['Macbeth', 'King Lear', 'Hamlet, Prince of Denmark', 'Julius Caesar'],
    correctIndex: 2,
    explanation: 'Prince Hamlet speaks this famous contemplation on existence, death, and conscience in Act III, Scene 1 of "Hamlet".',
  },
  {
    id: 2,
    category: 'Grammar',
    question: 'Identify the grammatically correct sentence involving the correlative conjunction "Neither... nor":',
    options: [
      'Neither the abbot nor the student monks is attending the assembly.',
      'Neither the abbot nor the student monks are attending the assembly.',
      'Neither the abbot or the student monks are attending the assembly.',
      'Neither the abbot nor the student monks was attending the assembly.'
    ],
    correctIndex: 1,
    explanation: 'When subjects are linked by "neither... nor", the verb agrees with the closer subject ("student monks" is plural, requiring "are").',
  },
  {
    id: 3,
    category: 'Vocabulary',
    question: 'The English word "Serendipity" is derived from "Serendib", which was the ancient Persian and Arabic name for which country?',
    options: ['Sri Lanka', 'Madagascar', 'Greece', 'Zanzibar'],
    correctIndex: 0,
    explanation: 'Horace Walpole coined "serendipity" in 1754, inspired by the fairy tale "The Three Princes of Serendip" (Sri Lanka).',
  },
  {
    id: 4,
    category: 'Literature',
    question: 'Which literary epoch exalted nature, sublime wonder, and intense emotional expression in rebellion against the Industrial Revolution?',
    options: ['The Enlightenment', 'The Romantic Movement', 'The Victorian Era', 'The Post-Modernists'],
    correctIndex: 1,
    explanation: 'The Romantic Movement (Wordsworth, Keats, Shelley) prioritized the sublime in nature, emotional authenticity, and the human spirit.',
  },
  {
    id: 5,
    category: 'Shakespeare',
    question: 'What rhythm defines Shakespeare\'s traditional blank verse and sonnets?',
    options: ['Dactylic Hexameter', 'Anapestic Tetrameter', 'Iambic Pentameter', 'Trochaic Octameter'],
    correctIndex: 2,
    explanation: 'Iambic pentameter consists of five metric feet per line, each containing one unstressed syllable followed by a stressed syllable (da-DUM da-DUM da-DUM da-DUM da-DUM).',
  },
  {
    id: 6,
    category: 'Grammar',
    question: 'Which of the following sentences correctly deploys the "Oxford (serial) comma"?',
    options: [
      'We studied grammar, literature and Shakespeare.',
      'We studied grammar, literature, and Shakespeare.',
      'We studied, grammar literature, and Shakespeare.',
      'We studied grammar; literature, and Shakespeare.'
    ],
    correctIndex: 1,
    explanation: 'The Oxford comma is the comma placed immediately before the coordinating conjunction ("and") in a series of three or more items.',
  },
  {
    id: 7,
    category: 'Shakespeare',
    question: 'Which play features the character Caliban and is widely regarded as Shakespeare’s philosophical farewell to dramatic art?',
    options: ['The Tempest', 'Twelfth Night', 'The Winter\'s Tale', 'A Midsummer Night\'s Dream'],
    correctIndex: 0,
    explanation: '"The Tempest" explores forgiveness, magic, and colonization on an enchanted island, concluding with Prospero abjuring his magical rough art.',
  },
  {
    id: 8,
    category: 'Vocabulary',
    question: 'The English gemological term "Tourmaline" comes directly from which Sinhala word?',
    options: ['Nil-manik (නිල් මැණික්)', 'Thoramalli (තෝරමල්ලි)', 'Padparadscha (පද්මරාග)', 'Pushparaga (පුෂ්පරාග)'],
    correctIndex: 1,
    explanation: '"Tourmaline" entered the European lexicon through Dutch gem traders who sourced stones from Ceylon, derived from the Sinhala "Thoramalli".',
  },
  {
    id: 9,
    category: 'Literature',
    question: 'Which acclaimed Sri Lankan-born author won the Booker Prize and Golden Man Booker for "The English Patient"?',
    options: ['Punyakante Wijenaike', 'Martin Wickramasinghe', 'Michael Ondaatje', 'Lakdhas Wikkramasinha'],
    correctIndex: 2,
    explanation: 'Michael Ondaatje gained worldwide literary acclaim for "The English Patient" (1992) and the lyrical Sri Lankan family memoir "Running in the Family".',
  },
  {
    id: 10,
    category: 'Grammar',
    question: 'Which tense correctly completes: "By next October, the Pirivena ______ the Sanjanani Literary Festival for over a decade"?',
    options: [
      'has been hosting',
      'will have hosted',
      'would host',
      'had hosted'
    ],
    correctIndex: 1,
    explanation: '"Will have hosted" is the Future Perfect tense, designating an action that will be completed prior to a designated landmark in future time.',
  },
];

export const SHAKESPEARE_INSULT_PARTS = {
  column1: [
    'Thou artless', 'Thou bawdy', 'Thou beslubbering', 'Thou bootless', 'Thou churlish',
    'Thou cockered', 'Thou clouted', 'Thou craven', 'Thou currish', 'Thou dankish',
    'Thou dissembling', 'Thou fawning', 'Thou fobbing', 'Thou frothy', 'Thou gleeking',
    'Thou goatish', 'Thou gorbellied', 'Thou impertinent', 'Thou infectious', 'Thou jarring'
  ],
  column2: [
    'base-court', 'bat-fowling', 'beef-witted', 'beetle-headed', 'boil-brained',
    'clapper-clawed', 'clay-brained', 'common-kissing', 'crook-pated', 'dismal-dreaming',
    'dizzy-eyed', 'dog-hearted', 'dread-bolted', 'earth-vexing', 'elf-skinned',
    'fat-kidneyed', 'fen-sucked', 'flap-mouthed', 'fly-bitten', 'folly-fallen'
  ],
  column3: [
    'apple-john!', 'barnacle!', 'bladder!', 'boar-pig!', 'bugbear!',
    'bum-bailey!', 'canker-blossom!', 'clack-dish!', 'clotpole!', 'coxcomb!',
    'codpiece!', 'death-token!', 'dewberry!', 'flap-dragon!', 'flax-wench!',
    'flirt-gill!', 'foot-licker!', 'fustilarian!', 'gudgeon!', 'haggard!'
  ]
};

export const SHAKESPEARE_PRAISE_PARTS = {
  column1: [
    'Thou radiant', 'Thou noble', 'Thou peerless', 'Thou valiant', 'Thou gracious',
    'Thou celestial', 'Thou gentle', 'Thou sweet-spoken', 'Thou virtuous', 'Thou golden'
  ],
  column2: [
    'honey-tongued', 'silver-penned', 'high-minded', 'pure-hearted', 'wisdom-crowned',
    'truth-bearing', 'quick-witted', 'tender-spirited', 'star-gazing', 'temple-dwelling'
  ],
  column3: [
    'luminary of wisdom!', 'paragon of scholarship!', 'jewel of the pirivena!',
    'sovereign of verse!', 'delight of the muses!', 'beacon of eloquence!',
    'herald of truth!', 'flower of chivalry!', 'master of letters!', 'guardian of learning!'
  ]
};

export const WRITING_PROMPTS = [
  {
    theme: 'The Kandy Mist & The Ancient Stupa',
    prompt: 'Dawn breaks over the Asgiri hills. As the temple bells chime across the Mahaweli River, a student scholar opens a centuries-old manuscript written in English by a visiting explorer. What secret message does it reveal?',
  },
  {
    theme: 'Shakespeare in the Pirivena Courtyard',
    prompt: 'Imagine William Shakespeare traveled through the Indian Ocean and arrived at the court of Kandy. Write a dialogue between the Bard and an elder Buddhist scholar on the nature of "Dukkha" (suffering) and "Tragedy".',
  },
  {
    theme: 'The Lost Palm-Leaf Folio',
    prompt: 'You find a hidden library room in Asgiri Pirivena. Inside is an English sonnet inscribed on an ola palm-leaf. Write the 14 lines or tell the story of who carved them.',
  },
  {
    theme: 'A Bridge Across Tongues',
    prompt: 'Write about a conversation between two friends: one speaking only classic English poetry, the other speaking only Sinhala folk verse. How do their hearts understand each other without a dictionary?',
  },
];

export const INITIAL_COMMUNITY_SUBMISSIONS: WritingSubmission[] = [
  {
    id: 'sub-1',
    author: 'Ven. Dhammarakkhitha Thero',
    institution: 'Asgiri Maha Vihara Pirivena, Kandy',
    genre: 'Reflections',
    title: 'Words Like Morning Dew upon Teak Leaves',
    content: 'Language is neither Eastern nor Western when it seeks the light of truth. In learning the grammar of Shakespeare, we discover that human sorrow and human joy are universal rivers flowing into the one great ocean of understanding.',
    timestamp: 'Festival Day 1 · 09:30 AM',
    likes: 42,
  },
  {
    id: 'sub-2',
    author: 'Kavindi Senaratne',
    institution: 'Mahamaya Girls\' College, Kandy',
    genre: 'Haiku',
    title: 'Temple Bells in Autumn',
    content: 'Quill whispers on page,\nMorning mists veil temple spires,\nThought becomes a flame.',
    timestamp: 'Festival Day 1 · 11:15 AM',
    likes: 38,
  },
  {
    id: 'sub-3',
    author: 'Ruvindu Bandara',
    institution: 'Trinity College, Kandy',
    genre: 'Micro-Story',
    title: 'The Lexicographer\'s Lantern',
    content: 'He spent forty rainy seasons translating the Pali sutras into English blank verse. When asked why he troubled with foreign meter, he replied: "If the lamp is English and the oil is compassion, the flame illuminates the whole earth just the same."',
    timestamp: 'Festival Day 2 · 02:20 PM',
    likes: 51,
  },
];

export const FESTIVAL_SCHEDULE: FestivalEvent[] = [
  {
    time: 'October 07 · 08:30 AM – Onward',
    title: 'Inaugural Opening of Cultural & Educational Stalls (English Corner Open)',
    speakerOrLead: 'Asgiri Maha Vihara Maha Pirivena Faculty & Student Scholars',
    location: 'Main Pirivena Grounds & English Pavilion',
    description: 'Opening of educational exhibition stalls on Buddhist Philosophy, History, Art, Language, Science, and Literature. English Corner Grammar Lab and Creative Writing Studio open for all participants.',
  },
  {
    time: 'October 07 · 01:00 PM Onward (පස්වරු 1.00 සිට)',
    title: 'Special Keynote Lecture: Social Attitudes in Modern Literature & Songs',
    speakerOrLead: 'Mr. Sampath Ududumbara (සම්පත් උඩුදුම්බර මහතා) — Veteran Speaker | Sri Lanka Police',
    location: 'Main Assembly Hall, Asgiri Pirivena',
    description: 'විශේෂ දේශනය: නූතන ගද්‍ය පද්‍ය හා ගීත සාහිත්‍යය තුළින් පිළිබිඹු වන සමාජ ආකල්ප පිළිබඳව සිදු කෙරෙන විශේෂ දේශනය (A profound critical study on societal attitudes reflected through contemporary prose, poetry, and musical literature).',
  },
  {
    time: 'October 07 · 07:00 PM Onward (රාත්‍රී 7.00 සිට)',
    title: 'Traditional Puppet Drama: "Dikthala and Kalagola" ("දික්තල සහ කාලගෝල" රූකඩ සන්දර්ශනය)',
    speakerOrLead: 'Ambalangoda Sri Aran Art Institute (අම්බලන්ගොඩ ශ්‍රී අරන් කලායතනය)',
    location: 'Open Stage, Asgiri Pirivena Quadrangle',
    description: 'Authentic performance of the historic folklore puppet drama "Dikthala and Kalagola", celebrating Sri Lankan folk theatrical heritage alongside English comparative dramatic commentary.',
  },
  {
    time: 'October 08 · 08:30 AM Onward (පෙරවරු 8.30 සිට)',
    title: 'Stage Arts Performence Workshop (ප්‍රාසාංගික වැඩමුළුව)',
    speakerOrLead: 'Dr. Sanath Wimalasiri (ආචාර්ය සනත් විමලසිරි මහතා) — Veteran Thespian & Leading Panel',
    location: 'Main Pirivena Auditorium',
    description: 'Hands-on practical dramatic workshop exploring stagecraft, vocal modulation, performance theory, and Shakespearean Elizabethan acting techniques for students and novices.',
  },
  {
    time: 'October 08 · 01:00 PM Onward (පස්වරු 1.00 සිට)',
    title: 'Kavi Maduwa: Grand Poetry Assembly ("කවි මඩුව")',
    speakerOrLead: 'Poet Thushara Hettiarchchi (තුෂාර හෙට්ටිආරච්චි කිවිඳුන්) & Leading Poetic Circle',
    location: 'Bodhi Cloister Literary Pavilion',
    description: 'Vibrant improvisational Sinhala and English poetry circle exploring rhyme, meter, Buddhist thought, and social reality.',
  },
  {
    time: 'October 08 · 07:00 PM Onward (රාත්‍රී 7.00 සිට)',
    title: 'Evening Theatrical Drama: "Jahuta" (\'ජහුටා\' වේදිකා නාට්‍යය)',
    speakerOrLead: 'Nissanka Gunawardena (නිස්සංක ගුණවර්ධනයන්ගේ වේදිකා නාට්‍යය)',
    location: 'Main Assembly Hall, Asgiri Pirivena',
    description: 'Critically acclaimed stage drama "Jahuta", addressing human condition, ethics, and emotional depth in dialogue with world dramatic tragedies.',
  },
  {
    time: 'October 09 · 08:30 AM Onward (පෙරවරු 8.30 සිට)',
    title: 'Musical & Literary Discourse: Social Vision in Sinhala Buddhist Songs',
    speakerOrLead: 'Jagath Wickramasinghe (ප්‍රවීන ගායන ශිල්පී ජගත් වික්‍රමසිංහ) & Premier Orchestra',
    location: 'Main Pirivena Auditorium',
    description: 'සුවිශේෂී කතිකාව හා ගීතාවලිය: "සිංහල බෞද්ධ ගීතයේ සමාජ දෘෂ්ටිය" (Illuminating lecture and live orchestral performance exploring social vision, spiritual philosophy, and lyricism in Sinhala Buddhist music).',
  },
  {
    time: 'October 09 · 02:00 PM Onward (පස්වරු 2.00 සිට)',
    title: 'Literary Keynote Discourse (සාහිත්‍ය දේශනය)',
    speakerOrLead: 'Wasantha Duggannarala (වසන්ත දුග්ගන්නාරාල) — Veteran Lyricist, Film Director & Folklore Researcher',
    location: 'Main Assembly Hall, Asgiri Pirivena',
    description: 'Inspiring keynote address examining oral folklore traditions, the craft of lyrical songwriting, and bridging vernacular literary roots with global English expression.',
  },
];
