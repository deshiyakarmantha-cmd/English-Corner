import { FESTIVAL_METADATA, FESTIVAL_SCHEDULE, CURIOUS_LOANWORDS } from './festivalData';
import {
  BILINGUAL_LEXICON,
  BilingualLexiconEntry,
  WORD_GLOSS_SI,
  FAMOUS_POEM_TRANSLATIONS,
  CANONICAL_WORKS_GUIDE,
} from './scholarKnowledgeBase';
import { LITERARY_TRIVIA_BANK } from './triviaData';

export interface ScholarResponse {
  reply: string;
  category: string;
}

const MORPHOLOGY_ROOTS: Array<{ pattern: RegExp; root: string; meaning: string }> = [
  { pattern: /^un/i, root: 'un- (Old English prefix)', meaning: 'not / reversal of action' },
  { pattern: /^re/i, root: 're- (Latin prefix)', meaning: 'again / back' },
  { pattern: /^pre/i, root: 'pre- (Latin prefix)', meaning: 'before in time or place' },
  { pattern: /^dis/i, root: 'dis- (Latin prefix)', meaning: 'apart / negation / opposite' },
  { pattern: /^bene/i, root: 'bene (Latin root)', meaning: 'good / well' },
  { pattern: /^mal/i, root: 'mal (Latin root)', meaning: 'bad / ill' },
  { pattern: /^chron/i, root: 'chronos (Greek root)', meaning: 'time' },
  { pattern: /^phil/i, root: 'philos (Greek root)', meaning: 'loving / fondness for' },
  { pattern: /^bio/i, root: 'bios (Greek root)', meaning: 'life / living' },
  { pattern: /^geo/i, root: 'ge (Greek root)', meaning: 'earth' },
  { pattern: /^tele/i, root: 'tele (Greek root)', meaning: 'far off / distant' },
  { pattern: /logy$/i, root: '-logy (Greek suffix)', meaning: 'study or science of' },
  { pattern: /tion$|sion$/i, root: '-tion / -sion (Latin noun suffix)', meaning: 'act, state, or condition of' },
  { pattern: /ment$/i, root: '-ment (Latin noun suffix)', meaning: 'result or instrument of an action' },
  { pattern: /ness$/i, root: '-ness (Old English noun suffix)', meaning: 'quality or state of being' },
  { pattern: /ous$|ful$/i, root: '-ous / -ful (adjective suffix)', meaning: 'full of / characterized by' },
  { pattern: /ly$/i, root: '-ly (Old English adverb suffix)', meaning: 'in a specified manner' },
];

function formatLexiconEntry(entry: BilingualLexiconEntry, includeTitle = true): string {
  const header = includeTitle
    ? `### Lexicographical & Bilingual Profile: "${entry.word}"\n\n`
    : '';
  return `${header}1. **English Definition & Phonetics:**
   - **Word:** **${entry.word}** *(${entry.pos})*${entry.phonetic ? ` — \`${entry.phonetic}\`` : ''}
   - **Definition:** ${entry.definition}

2. **සිංහල පරිවර්තනය (Sinhala):**
   - **අර්ථය:** ${entry.sinhala}
   - **උදාහරණය:** *${entry.exampleSi}*

3. **தமிழ் மொழிபெயர்ப்பு (Tamil):**
   - **பொருள்:** ${entry.tamil}

4. **Etymology & Classical Roots:**
   ${entry.etymology}

5. **Literary Example Sentence:**
   > *"${entry.exampleEn}"*`;
}

function buildDynamicWordGloss(text: string): { originalLines: string[]; glossedLines: string[]; matchedVocab: BilingualLexiconEntry[] } {
  const rawLines = text
    .split(/\n|\//)
    .map((l) => l.trim())
    .filter(Boolean);

  const matchedVocab: BilingualLexiconEntry[] = [];
  const seenWords = new Set<string>();

  const glossedLines = rawLines.map((line) => {
    const tokens = line
      .replace(/[.,!?;:"'“”‘’()—–-]/g, ' ')
      .split(/\s+/)
      .filter(Boolean);

    const glossParts: string[] = [];
    for (const token of tokens) {
      const low = token.toLowerCase();
      if (BILINGUAL_LEXICON[low] && !seenWords.has(low)) {
        seenWords.add(low);
        matchedVocab.push(BILINGUAL_LEXICON[low]);
      }
      const directSi = WORD_GLOSS_SI[low];
      if (directSi) {
        glossParts.push(`**${token}** → *${directSi}*`);
      } else if (BILINGUAL_LEXICON[low]) {
        const shortSi = BILINGUAL_LEXICON[low].sinhala.split('/')[0].trim();
        glossParts.push(`**${token}** → *${shortSi}*`);
      }
    }
    return glossParts.length > 0
      ? `- *"${line}"*\n  ↳ **පද අර්ථ (Key Word Gloss):** ${glossParts.join(' · ')}`
      : `- *"${line}"*`;
  });

  return { originalLines: rawLines, glossedLines, matchedVocab };
}

export function extractTranslationPayload(rawText: string): string {
  const quoteMatch = rawText.match(/["“‘]([^"”’]{2,})["”’]/);
  if (quoteMatch) {
    return quoteMatch[1].trim();
  }
  const colonIdx = rawText.indexOf(':');
  if (colonIdx !== -1 && colonIdx < rawText.length - 2) {
    return rawText.slice(colonIdx + 1).replace(/^["“‘\s]+|["”’\s]+$/g, '').trim();
  }
  return '';
}

export function isTranslationPrompt(rawText: string): boolean {
  const p = rawText.toLowerCase();
  return (
    /\b(translate|translation|traduire|traduction|how to say|how do you say)\b/i.test(p) ||
    /\bin\s+(sinhala|tamil|english|french|spanish|german|hindi|japanese)\s*\??$/i.test(p) ||
    p.includes('පරිවර්තනය') ||
    p.includes('පරිවර්තන') ||
    p.includes('තේරුම') ||
    p.includes('மொழிபெயர்ப்பு') ||
    p.includes('மொழிபெயர்க்க')
  );
}

function handleTranslationRequest(rawText: string, lowerText: string): ScholarResponse {
  const payload = extractTranslationPayload(rawText);
  const searchSpace = (payload || rawText).toLowerCase();

  // 1. Check canonical poem translations by content keywords
  const matchedPoem = FAMOUS_POEM_TRANSLATIONS.find((poem) =>
    poem.keywords.some((kw) => searchSpace.includes(kw))
  );

  if (matchedPoem) {
    return {
      category: 'translation_poem_canonical',
      reply: `### Literary Poem Translation: *${matchedPoem.title}*
**Poet:** ${matchedPoem.poet}

#### 1. Original English Verse
${matchedPoem.englishLines}

#### 2. සිංහල කාව්‍යමය පරිවර්තනය (Sinhala Poetic Translation)
${matchedPoem.sinhalaLines}

#### 3. தமிழ் இலக்கிய மொழிபெயர்ப்பு (Tamil Literary Translation)
${matchedPoem.tamilLines}

**Scholarly Translation Note:**
${matchedPoem.analysis}`,
    };
  }

  // 2. Poem / verse translation of arbitrary user-supplied lines
  const isPoemIntent =
    lowerText.includes('poem') ||
    lowerText.includes('poetry') ||
    lowerText.includes('verse') ||
    lowerText.includes('sonnet') ||
    lowerText.includes('stanza') ||
    lowerText.includes('කවි') ||
    lowerText.includes('කවිය') ||
    lowerText.includes('පද්‍ය') ||
    lowerText.includes('கவிதை') ||
    (payload.includes('/') || payload.includes('\n'));

  if (isPoemIntent && payload.length > 5) {
    const { glossedLines, matchedVocab } = buildDynamicWordGloss(payload);
    return {
      category: 'translation_poem_dynamic',
      reply: `### Poetic Line-by-Line Translation Analysis
**Original Verse Analyzed:**
> *${payload}*

#### Lexical & Imagery Breakdown (පද්‍ය විශ්ලේෂණය)
${glossedLines.join('\n')}
${
  matchedVocab.length > 0
    ? `\n**Key Poetic Terms in Sinhala & Tamil:**\n${matchedVocab
        .slice(0, 5)
        .map((m) => `- **${m.word}:** ${m.sinhala} | ${m.tamil}`)
        .join('\n')}`
    : ''
}

**Poetic Translation Guidance:**
- Preserve the *rasa* (emotional tone) and imagery rather than translating word-order rigidly (English is SVO; Sinhala & Tamil prose are SOV).`,
    };
  }

  // 3. Essay / prose / sentence translation
  const isProseIntent =
    lowerText.includes('essay') ||
    lowerText.includes('paragraph') ||
    lowerText.includes('prose') ||
    lowerText.includes('excerpt') ||
    lowerText.includes('sentence') ||
    lowerText.includes('රචනා') ||
    lowerText.includes('ඡේද') ||
    lowerText.includes('වාක්‍ය') ||
    lowerText.includes('கட்டுரை') ||
    payload.split(/\s+/).filter(Boolean).length >= 5;

  if (isProseIntent) {
    const excerpt =
      payload ||
      rawText
        .replace(/\b(please|can\s+you|translate|translation|this|academic|essay|excerpt|paragraph|prose|sentence|into|to|formal|sinhala|tamil|english|french|රචනාව|පරිවර්තනය|කරන්න)\b/gi, '')
        .trim();

    // Special rich translation if it matches the curated festival excerpt
    if (/literature serves as a profound instrument for cross-cultural empathy/i.test(excerpt)) {
      return {
        category: 'translation_essay_curated',
        reply: `### Academic Prose Translation: Cross-Cultural Empathy in Literature

#### 1. Source Academic English
> *"${excerpt}"*

#### 2. විධිමත් ශාස්ත්‍රීය සිංහල පරිවර්තනය (Formal Academic Sinhala)
> *"සාහිත්‍යය යනු අන්තර්-සංස්කෘතික සහකම්පනය (Empathy) සහ සදාචාරාත්මක අවබෝධය ගොඩනැංවීම උදෙසා භාවිත වන ගැඹුරු ශාස්ත්‍රීය මාධ්‍යයකි."*

#### 3. முறையான தமிழ் மொழிபெயர்ப்பு (Formal Academic Tamil)
> *"இலக்கியம் என்பது கலாச்சாரங்களுக்கு இடையிலான பரஸ்பர அனுதாபத்தையும் ஒழுக்க அறிவையும் வளர்க்கும் ஒரு ஆழமான கருவியாகத் திகழ்கிறது."*

**Key Academic Vocabulary Map:**
- **Literature** → සාහිත්‍යය (*Sāhityaya*) | இலக்கியம்
- **Profound instrument** → ගැඹුරු මාධ්‍යය (*Gämbhuru mādhyaya*) | ஆழமான கருவி
- **Cross-cultural empathy** → අන්තර්-සංස්කෘතික සහකම්පනය (*Anthar-sanskruthika sahakampanaya*)
- **Moral insight** → සදාචාරාත්මක අවබෝධය (*Sadāchārātmaka avabōdhaya*)`,
      };
    }

    const { glossedLines, matchedVocab } = buildDynamicWordGloss(excerpt || rawText);
    return {
      category: 'translation_essay_dynamic',
      reply: `### Academic Prose & Sentence Translation Dossier
**Source Excerpt:**
> *"${excerpt || rawText}"*

#### Key Term & Phrase Mapping
${glossedLines.join('\n')}
${
  matchedVocab.length > 0
    ? `\n#### Literary & Scholarly Terminology\n${matchedVocab
        .slice(0, 6)
        .map((m) => `- **${m.word}** (*${m.pos}*): **සිංහල:** ${m.sinhala} | **தமிழ்:** ${m.tamil}`)
        .join('\n')}`
    : ''
}

**Syntactic Reminder (English ↔ Sinhala/Tamil):**
English places verbs near the subject (**Subject + Verb + Object**), whereas formal written Sinhala and Tamil reverse the clause spine to (**Subject + Object/Modifiers + Finite Verb**). Place subordinate clauses (*"By immersing..."* → *"...තුළින්"*) before the main predicate.`,
    };
  }

  // 4. Single Word / Phrase Bilingual Translation
  let targetCandidate = payload;
  if (!targetCandidate) {
    targetCandidate = rawText
      .replace(
        /\b(can\s+you|please|translate|translation|meaning|mean|and|of|the|a|an|word|term|into|to|in|from|sinhala|tamil|english|french|spanish|explaining|explain|its|island|origin|origins|etymology|how\s+do\s+you\s+say|how\s+to\s+say|what\s+is|මොකක්ද|තේරුම|පරිවර්තනය|කරන්න|වචනය)\b/gi,
        ' '
      )
      .replace(/[?:!.,'"“”‘’]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const lookupTokens = targetCandidate.toLowerCase().split(/\s+/).filter(Boolean);
  for (const tok of lookupTokens) {
    if (BILINGUAL_LEXICON[tok]) {
      return {
        category: 'translation_word_lexicon',
        reply: formatLexiconEntry(BILINGUAL_LEXICON[tok], true),
      };
    }
  }

  // Also check if any word anywhere in rawText matches a curated word (skipping stop words like 'english', 'word')
  const allTokens = rawText
    .toLowerCase()
    .replace(/[?:!.,'"“”‘’]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !['word', 'sinhala', 'tamil', 'english', 'translate', 'meaning'].includes(w));

  for (const tok of allTokens) {
    if (BILINGUAL_LEXICON[tok]) {
      return {
        category: 'translation_word_lexicon',
        reply: formatLexiconEntry(BILINGUAL_LEXICON[tok], true),
      };
    }
  }

  const cleanWord = targetCandidate
    ? targetCandidate.charAt(0).toUpperCase() + targetCandidate.slice(1)
    : 'Custom Term';

  const siGloss = WORD_GLOSS_SI[targetCandidate.toLowerCase()];
  const matchedRoots = MORPHOLOGY_ROOTS.filter((r) => r.pattern.test(targetCandidate));

  return {
    category: 'translation_word_morphology',
    reply: `### Bilingual Word Study: "${cleanWord}"
${siGloss ? `- **Sinhala Translation:** **${siGloss}**\n` : ''}${
      matchedRoots.length > 0
        ? `**Morphological & Root Breakdown:**\n${matchedRoots
            .map((r) => `- **${r.root}:** signifies *${r.meaning}*`)
            .join('\n')}\n`
        : ''
    }**Study Note:**
Try enclosing a phrase in quotes (e.g., \`Translate "${cleanWord}" into Sinhala\`) or asking about classical literary vocabulary such as *Serendipity, Petrichor, Ephemeral, Halcyon, Mellifluous, Wisdom, Compassion,* or *Freedom*.`,
  };
}

function handleLiteraryEraDeepDive(lowerText: string, rawText: string): ScholarResponse | null {
  if (
    lowerText.includes('old english') ||
    lowerText.includes('anglo-saxon') ||
    lowerText.includes('beowulf') ||
    rawText.includes('පැරණි ඉංග්‍රීසි')
  ) {
    return {
      category: 'literature_era_old_english',
      reply: `### Old English & The Anglo-Saxon Period (c. 450 – 1066 AD)
The foundational dawn of English literature, forged in heroic oral poetry and monastic manuscripts.

1. **Historical Context:**
   Brought to Britain by Germanic tribes (Angles, Saxons, and Jutes). Christian monks later preserved these oral tales on parchment codices in monasteries such as Lindisfarne and Jarrow.
2. **Signature Poetic Techniques:**
   - **Alliterative Verse:** Lines bound by matching initial consonant sounds rather than end-rhyme, divided by a central pause (*caesura*).
   - **Kennings:** Poetic compound metaphors (*"whale-road"* = sea, *"bone-house"* = body, *"word-hoard"* = vocabulary).
   - **Litotes:** Understated irony (*"that was no small grief"*).
3. **Landmark Texts & Authors:**
   - ***Beowulf* (c. 750):** Anonymous epic confronting Grendel, mortality, and *wyrd* (fate).
   - **Cædmon & Cynewulf:** Early Christian poets; **The Venerable Bede** (*Ecclesiastical History*).`,
    };
  }

  if (
    lowerText.includes('middle english') ||
    lowerText.includes('chaucer') ||
    lowerText.includes('canterbury') ||
    rawText.includes('මධ්‍යතන ඉංග්‍රීසි') ||
    rawText.includes('චෝසර්')
  ) {
    return {
      category: 'literature_era_middle_english',
      reply: `### Middle English & The Chaucerian Epoch (c. 1066 – 1500)
Born from the linguistic fusion of Anglo-Saxon with Norman French and Church Latin after 1066.

1. **Linguistic Shift:**
   English shed complex Germanic noun endings and absorbed over 10,000 French legal, artistic, and courtly terms (*justice, chivalry, poetry, crown*).
2. **Key Literary Techniques:**
   - **Heroic Couplets:** Rhyming iambic pentameter pairs perfected by Geoffrey Chaucer.
   - **Frame Narrative & Estates Satire:** Grouping diverse social classes on pilgrimage to expose hypocrisy with warmth and wit.
3. **Iconic Writers:**
   - **Geoffrey Chaucer:** *The Canterbury Tales* (*"The Father of English Poetry"*).
   - **The Pearl Poet:** *Sir Gawain and the Green Knight* (Arthurian chivalry).
   - **Sir Thomas Malory:** *Le Morte d'Arthur* (1485 prose Arthurian cycle).`,
    };
  }

  if (
    lowerText.includes('renaissance') ||
    lowerText.includes('elizabethan') ||
    rawText.includes('පුනරුදය')
  ) {
    return {
      category: 'literature_era_renaissance',
      reply: `### The English Renaissance & Elizabethan Golden Age (c. 1500 – 1660)
An extraordinary flowering of humanist inquiry, exploration, and theatrical genius centered in London's public playhouses.

1. **Key Literary Innovations:**
   - **Blank Verse (Unrhymed Iambic Pentameter):** Perfected by **Christopher Marlowe** and raised to psychological heights by **William Shakespeare**.
   - **The English Sonnet:** 14-line meditative lyrics exploring beauty, time, and mortality (*Shakespeare, Sidney, Spenser*).
   - **Metaphysical Conceits:** Intellectual, startling metaphors pioneered by **John Donne** (*comparing two lovers' souls to the twin legs of a draftsman's compass*).
   - **Epic Grandeur:** **John Milton's** *Paradise Lost* (1667).
2. **Historical Significance:**
   Shifted English literature from medieval morality plays to deep psychological exploration of ambition (*Macbeth*), conscience (*Hamlet*), and forgiveness (*The Tempest*), alongside the **King James Bible (1611)** which standardized English idiom for centuries.`,
    };
  }

  if (
    lowerText.includes('enlightenment') ||
    lowerText.includes('neoclassical') ||
    lowerText.includes('age of reason') ||
    rawText.includes('ප්‍රබුද්ධත්ව')
  ) {
    return {
      category: 'literature_era_enlightenment',
      reply: `### The Enlightenment & Neoclassical Age of Reason (c. 1660 – 1798)
An epoch celebrating empirical science, symmetry, civic wit, and the birth of the modern English novel.

1. **Core Literary Traits:**
   - **Heroic Couplets & Epigrams:** Polished, balanced wit perfected by **Alexander Pope** (*"To err is human; to forgive, divine"*).
   - **Biting Social Satire:** **Jonathan Swift's** *Gulliver's Travels* (1726) and *A Modest Proposal* exposed political absurdity.
   - **Rise of the Novel:** **Daniel Defoe** (*Robinson Crusoe*) and Henry Fielding (*Tom Jones*) pioneered extended realistic fiction.
   - **Standardization of Language:** **Dr. Samuel Johnson's** landmark *Dictionary of the English Language* (1755) and Horace Walpole coining *"Serendipity"* (1754) from Ceylon!`,
    };
  }

  if (
    lowerText.includes('romantic') ||
    rawText.includes('රොමැන්ටික්')
  ) {
    return {
      category: 'literature_era_romanticism',
      reply: `### The Romantic Movement (c. 1798 – 1837)
A passionate rebellion against cold Enlightenment rationalism and industrial mechanization.

- **Key Luminaries:** William Wordsworth, Samuel Taylor Coleridge, John Keats, Percy Bysshe Shelley, Lord Byron, Mary Shelley, and William Blake.
- **Defining Pillars:**
  1. **The Sublime in Nature:** Experiencing spiritual awe and renewal in mountains, rivers, and solitude.
  2. **Imagination & Ordinary Speech:** Wordsworth defined poetry in *Lyrical Ballads* (1798) as *"the spontaneous overflow of powerful feelings: it takes its origin from emotion recollected in tranquility."*
  3. **Gothic & Cautionary Myth:** Mary Shelley's *Frankenstein* (1818) questioned unchecked scientific ambition; Keats celebrated *"Negative Capability"* and timeless aesthetic beauty.`,
    };
  }

  if (lowerText.includes('victorian') || rawText.includes('වික්ටෝරියානු')) {
    return {
      category: 'literature_era_victorian',
      reply: `### The Victorian Epoch (c. 1837 – 1901)
Literature flourished amidst industrialization, urban poverty, imperial expansion, and Darwinian scientific debates.

- **Key Luminaries:** Charles Dickens, Charlotte Brontë (*Jane Eyre*), Emily Brontë (*Wuthering Heights*), George Eliot (*Middlemarch*), Alfred, Lord Tennyson, and Thomas Hardy.
- **Defining Features:**
  1. **Social Realism & Serialization:** Dickens serialized sweeping novels critiquing workhouses, child labor, and legal corruption (*Oliver Twist, Great Expectations*).
  2. **Psychological Moral Complexity:** Brontë and Eliot explored women's autonomy and provincial ethical dilemmas.
  3. **Sri Lankan Connection:** During this century, scholars like George Turnour and Rhys Davids collaborated with Kandyan monastic scholars to translate Pali chronicles like the *Mahāvaṃsa* into English.`,
    };
  }

  if (
    lowerText.includes('modernism') ||
    lowerText.includes('avant-garde') ||
    lowerText.includes('post-war') ||
    rawText.includes('නූතනවාදය')
  ) {
    return {
      category: 'literature_era_modernism',
      reply: `### Modernism & The 20th-Century Avant-Garde (c. 1901 – 1970)
Following the trauma of World War I, writers shattered linear plots and Victorian certainty under Ezra Pound's rallying cry: *"Make it new!"*

- **Key Writers & Texts:**
  - **T.S. Eliot:** *The Waste Land* (1922) and *Four Quartets* — fragmented mythic collage (even integrating Buddhist and Upanishadic philosophy).
  - **Virginia Woolf & James Joyce:** **Stream-of-consciousness** interior monologue (*Mrs. Dalloway*, *Ulysses*).
  - **George Orwell:** Sharp, lucid political dystopias warning against totalitarian control (*1984*, *Animal Farm*).`,
    };
  }

  if (
    lowerText.includes('sri lankan') ||
    lowerText.includes('post-colonial') ||
    lowerText.includes('postcolonial') ||
    lowerText.includes('ondaatje') ||
    lowerText.includes('wijenaike') ||
    lowerText.includes('karunatilaka') ||
    rawText.includes('ශ්‍රී ලාංකේය')
  ) {
    return {
      category: 'literature_era_sri_lankan',
      reply: `### Post-Colonial & Sri Lankan English Letters
Sri Lankan writers reclaimed English to articulate island landscapes, ancestral memory, Buddhist philosophy, and historical complexity:

- **Michael Ondaatje:** Booker Prize & Golden Man Booker winner for *The English Patient*; author of *Running in the Family* (1982).
- **Shehan Karunatilaka:** 2022 Booker Prize winner for *The Seven Moons of Maali Almeida*.
- **Lakdhas Wikkramasinha:** Anti-colonial poetic voice (*"Don't Talk to Me About Matisse"*).
- **Punyakante Wijenaike & Jean Arasanayagam:** Deeply evocative portraits of rural Ceylon (*The Waiting Earth*) and Kandy's multicultural heritage.
- **Monastic Translation Heritage:** Pirivenas like Asgiri Maha Vihara bridge Pali canonical wisdom with international English scholarship.`,
    };
  }

  if (
    (/\b(eras?|periods?|epochs?)\b/i.test(lowerText) &&
      (lowerText.includes('english') ||
        lowerText.includes('literature') ||
        lowerText.includes('literary') ||
        lowerText.includes('timeline') ||
        lowerText.includes('all ') ||
        lowerText.includes('what are') ||
        lowerText.includes('different') ||
        lowerText.includes('major') ||
        lowerText.includes('list') ||
        lowerText.includes('name'))) ||
    rawText.includes('සාහිත්‍ය යුග') ||
    rawText.includes('ඉංග්‍රීසි යුග') ||
    (rawText.includes('යුග') && (lowerText.includes('english') || rawText.includes('ඉංග්‍රීසි') || rawText.includes('සාහිත්‍ය')))
  ) {
    return {
      category: 'literature_eras_overview',
      reply: `### The Major Eras of English Literature
English literature unfolds across eight foundational historical epochs:

1. **Old English / Anglo-Saxon (c. 450 – 1066):**
   - *Hallmarks:* Oral heroic poetry, alliterative verse, *kennings*, and fatalism (*wyrd*).
   - *Key Work:* ***Beowulf*** (Anonymous), *Cædmon's Hymn*.
2. **Middle English (c. 1066 – 1500):**
   - *Hallmarks:* Fusion of Anglo-Saxon with Norman French & Latin; heroic couplets and frame narratives.
   - *Key Figures:* **Geoffrey Chaucer** (*The Canterbury Tales*), **Thomas Malory** (*Le Morte d'Arthur*).
3. **The English Renaissance & Elizabethan Golden Age (c. 1500 – 1660):**
   - *Hallmarks:* Humanism, public drama, blank verse (iambic pentameter), sonnets, and metaphysical poetry.
   - *Key Figures:* **William Shakespeare**, **Christopher Marlowe**, **John Donne**, **John Milton** (*Paradise Lost*).
4. **The Enlightenment & Neoclassical Age (c. 1660 – 1798):**
   - *Hallmarks:* Reason, satire, balance, the rise of the English novel, and Samuel Johnson's *Dictionary* (1755).
   - *Key Figures:* **Jonathan Swift**, **Alexander Pope**, **Daniel Defoe**.
5. **The Romantic Movement (c. 1798 – 1837):**
   - *Hallmarks:* Emotion, individual imagination, and spiritual awe in nature (*The Sublime*).
   - *Key Figures:* **William Wordsworth**, **S.T. Coleridge**, **John Keats**, **P.B. Shelley**, **Jane Austen** (Regency bridge).
6. **The Victorian Era (c. 1837 – 1901):**
   - *Hallmarks:* Industrial realism, social reform, serialization, and tensions between faith and science.
   - *Key Figures:* **Charles Dickens**, **Charlotte & Emily Brontë**, **George Eliot**, **Alfred, Lord Tennyson**.
7. **Modernism (c. 1901 – 1970):**
   - *Hallmarks:* Post-war fragmentation, *stream-of-consciousness* prose, free verse, and political dystopia.
   - *Key Figures:* **T.S. Eliot**, **Virginia Woolf**, **James Joyce**, **George Orwell**.
8. **Post-Colonial & Contemporary World English (c. 1970 – Present):**
   - *Hallmarks:* Global and indigenous voices enriching English—including Sri Lankan literary luminaries **Michael Ondaatje**, **Shehan Karunatilaka**, **Punyakante Wijenaike**, and **Lakdhas Wikkramasinha**.

*Ask me about any specific era above (for example, "Tell me about the Victorian era") for a deep dive!*`,
    };
  }

  return null;
}

/**
 * High-Calibre Scholarly AI Engine for Sanjanani English Corner.
 */
export function generateScholarResponse(promptText: string): ScholarResponse {
  const raw = promptText.trim();
  const p = raw.toLowerCase();

  if (!raw) {
    return {
      category: 'empty',
      reply: 'Please type or speak a question about English grammar, translation, literature, Shakespeare, or the Sanjanani Literary Festival.',
    };
  }

  // 1. TRANSLATION REQUESTS FIRST (POEMS, ESSAYS, WORDS)
  // Must run BEFORE loanword / vocabulary branches so "Translate Serendipity into Sinhala" gives Serendipity's translation!
  const isTranslationRequest =
    /\b(translate|translation|traduire|traduction|how to say|how do you say)\b/i.test(p) ||
    /in\s+(sinhala|tamil|english|french|spanish)\s*\??$/i.test(p) ||
    p.includes('පරිවර්තනය') ||
    p.includes('පරිවර්තන') ||
    p.includes('තේරුම') ||
    p.includes('மொழிபெயர்ப்பு') ||
    p.includes('மொழிபெயர்க்க');

  if (isTranslationRequest) {
    return handleTranslationRequest(raw, p);
  }

  // 2. MULTILINGUAL NATIVE PEDAGOGICAL RESPONSES (SINHALA, TAMIL, FRENCH, SPANISH, HINDI)
  if (/[\u0D80-\u0DFF]/.test(raw)) {
    const eraDeepDive = handleLiteraryEraDeepDive(p, raw);
    if (eraDeepDive) {
      return eraDeepDive;
    }

    if (raw.includes('ආයුබෝවන්') || raw.includes('සුබ') || raw.includes('කොහොමද') || raw.includes('කවුද')) {
      return {
        category: 'sinhala_greeting',
        reply: `### ආයුබෝවන්! සංජානනී ඉංග්‍රීසි විද්වත් AI (Scholar AI) වෙත සාදරයෙන් පිළිගනිමු!
මම ඓතිහාසික **${FESTIVAL_METADATA.institutionSinhala}** හි පැවැත්වෙන **සංජානනී ශිෂ්‍ය කලා මහෝත්සවය 2026** (${FESTIVAL_METADATA.dates}) ඉංග්‍රීසි අංශයේ ඔබේ ඉගෙනුම් සහායකයා වෙමි.

**ඔබට සිංහලෙන් හෝ ඉංග්‍රීසියෙන් විමසිය හැකි අංශ:**
- **පරිවර්තන (Translation):** ඉංග්‍රීසි වචන, කවි (*Stopping by Woods, Sonnet 18*) හා රචනා සිංහල/දෙමළට පරිවර්තනය.
- **ව්‍යාකරණ (Grammar):** 12 Tenses, Passive Voice, Conditionals, Reported Speech, Prepositions.
- **වාක්‍ය පරීක්ෂාව (Sentence Check):** \`Check my sentence: "ඔබේ ඉංග්‍රීසි වාක්‍යය"\`
- **සාහිත්‍යය හා ෂේක්ස්පියර්:** *Hamlet*, *Macbeth*, *The Tempest*, සාහිත්‍ය යුග 8 සහ රසාලංකාර.`,
      };
    }

    if (raw.includes('කාල') || p.includes('tense') || raw.includes('ක්‍රියාපද') || raw.includes('ව්‍යාකරණ')) {
      return {
        category: 'sinhala_grammar_tenses',
        reply: `### ඉංග්‍රීසි කාල භේදය (The 12 English Tenses) — සරල සිංහල පැහැදිලි කිරීම

ඉංග්‍රීසි භාෂාවේ ප්‍රධාන කාල 3ක් (Present, Past, Future) ඇති අතර ඒවා උප කොටස් 4 බැගින් **කාල 12කට** බෙදේ:

1. **වර්තමාන කාලය (Present Tense):**
   - **Simple Present:** පුරුදු සහ සදාතනික සත්‍ය. (*Subject + Verb(s/es)*) — *"The student reads daily."*
   - **Present Continuous:** මේ මොහොතේ සිදුවන ක්‍රියා. (*am/is/are + Verb-ing*) — *"Monks are studying now."*
   - **Present Perfect:** මෑතකදී අවසන් වූ නමුත් බලපෑම පවතින ක්‍රියා. (*have/has + V3*) — *"He has written an essay."*
2. **අතීත කාලය (Past Tense):**
   - **Simple Past:** අතීතයේ සිදුවී අවසන් වූ ක්‍රියා. (*Subject + V2*) — *"Walpole coined 'Serendipity' in 1754."*
   - **Past Continuous:** අතීතයේ යම් වේලාවක සිදුවෙමින් පැවති ක්‍රියා. (*was/were + Verb-ing*)
   - **Past Perfect:** අතීතයේ තවත් ක්‍රියාවකට පෙර සිදුවී තිබූ ක්‍රියා. (*had + V3*)
3. **අනාගත කාලය (Future Tense):**
   - **Simple Future:** අනාගතයේ සිදුවන දේ. (*will + Verb*) — *"The festival will open on October 07, 2026."*

💡 **වැදගත් රීතිය:** ඒකවචන කර්තෘන් (*He, She, It*) සමඟ Simple Present හිදී ක්‍රියාපදයට \`-s\` හෝ \`-es\` එක් කළ යුතුය.`,
      };
    }

    if (raw.includes('ශේක්ස්පියර්') || p.includes('shakespeare') || raw.includes('හැම්ලට්') || raw.includes('මැක්බත්')) {
      return {
        category: 'sinhala_shakespeare',
        reply: `### විලියම් ෂේක්ස්පියර් (William Shakespeare: 1564–1616)
1. **ප්‍රධාන ඛේදවාචක (Tragedies):** *Hamlet* (සැකය හා හෘද සාක්ෂිය), *Macbeth* (බල තණ්හාව), *King Lear* (අහංකාරය හා පවුල් බිඳවැටීම), *Othello* (ඊර්ෂ්‍යාව).
2. **ප්‍රහසන හා ප්‍රේම කතා:** *The Tempest*, *Romeo and Juliet*, *Twelfth Night*, *A Midsummer Night's Dream*.
3. **කාව්‍යමය මාත්‍රය:** **Iambic Pentameter** (*da-DUM da-DUM da-DUM da-DUM da-DUM* — පේළියකට මාත්‍ර 10).`,
      };
    }

    // Check if an English lexicon word appears inside the Sinhala prompt
    const embeddedTokens = p.replace(/[^a-z\s-]/g, ' ').split(/\s+/).filter(Boolean);
    for (const tok of embeddedTokens) {
      if (BILINGUAL_LEXICON[tok]) {
        return {
          category: 'sinhala_lexicon_match',
          reply: formatLexiconEntry(BILINGUAL_LEXICON[tok], true),
        };
      }
    }

    return {
      category: 'sinhala_general',
      reply: `### සංජානනී ඉංග්‍රීසි විද්වත් මගපෙන්වීම
ඔබගේ විමසීම: **"${raw}"**

මට දැනට සිංහලෙන් පැහැදිලිව උදව් කළ හැකි ප්‍රධාන ක්ෂේත්‍ර:
- **ඉංග්‍රීසි වචන හෝ කවි පරිවර්තනය:** \`Translate "Petrichor" into Sinhala\` හෝ \`Translate poem: "The woods are lovely..."\`
- **ව්‍යාකරණ පාඩම්:** Tenses, Passive Voice, Conditionals, Reported Speech, Articles, Prepositions.
**වැඩිදුර උපකාර සඳහා:** ඔබට අවශ්‍ය වචනය, කවිය හෝ වාක්‍යය උද්ධෘත පාඨ (quotes) තුළ ලබා දී *"Translate ... into Sinhala"* ලෙස විමසන්න.`,
    };
  }

  if (/[\u0B80-\u0BFF]/.test(raw)) {
    if (raw.includes('வணக்கம்') || raw.includes('யார்') || raw.includes('காலை')) {
      return {
        category: 'tamil_greeting',
        reply: `### வணக்கம்! சஞ்சானனி ஆங்கில அறிஞர் AI-க்கு நல்வரவு!
கண்டி அஸ்கிரி மகா விகார மகா பிரிவேனாவில் நடைபெறும் **சஞ்சானனி இலக்கிய விழா 2026** (${FESTIVAL_METADATA.dates}) ஆங்கிலப் பிரிவிற்கு உங்களை வரவேற்கிறேன்.

**நீங்கள் கேட்கக்கூடியவை:**
- **மொழிபெயர்ப்பு (Translation):** சொற்கள், கவிதைகள் மற்றும் கட்டுரைகளை ஆங்கிலம் ↔ தமிழ் / சிங்களத்திற்கு மொழிபெயர்க்க.
- **இலக்கணம் (Grammar):** 12 Tenses, Passive Voice, Conditionals, Prepositions.
- **வாக்கிய திருத்தம்:** \`Check my sentence: "உங்கள் ஆங்கில வாக்கியம்"\``,
      };
    }

    if (raw.includes('இலக்கண') || raw.includes('காலங்கள்') || raw.includes('ஆங்கிலம்') || raw.includes('விளக்கம்')) {
      return {
        category: 'tamil_grammar',
        reply: `### ஆங்கில இலக்கண விளக்கம் (The 12 English Tenses)
ஆங்கிலத்தில் 12 காலங்கள் உள்ளன:
1. **நிகழ்காலம் (Present):** *Simple Present* (வழக்கம்/உண்மை), *Present Continuous* (இப்போது நடப்பது), *Present Perfect* (அண்மையில் முடிந்தது: *have/has + V3*).
2. **இறந்தகாலம் (Past):** *Simple Past* (*V2*), *Past Continuous* (*was/were + ing*), *Past Perfect* (*had + V3*).
3. **எதிர்காலம் (Future):** *Simple Future* (*will + V*), *Future Perfect* (*will have + V3*).

💡 **முக்கிய விதி:** *He, She, It* வரும்போது Simple Present வினைச்சொல்லுடன் \`-s\` அல்லது \`-es\` சேர்க்க வேண்டும்.`,
      };
    }

    return {
      category: 'tamil_general',
      reply: `### சஞ்சானனி ஆங்கில வழிகாட்டல்
உங்கள் கேள்வி: **"${raw}"**

- **வாக்கிய சரிபார்ப்பு:** \`Check my sentence: "உங்கள் வாக்கியம்"\`
- **சொல் / கவிதை மொழிபெயர்ப்பு:** \`Translate "Serendipity" into Tamil\`
- **இலக்கணம் & இலக்கியம்:** Tenses, Active/Passive Voice, Shakespeare (*Hamlet, Macbeth, The Tempest*).`,
    };
  }

  if (/\b(bonjour|salut|comment|français|merci)\b/i.test(p)) {
    return {
      category: 'french_multilingual',
      reply: `### Bienvenue au Pavillon Anglais de Sanjanani 2026 !
Je suis votre tuteur d'anglais et de littérature au monastère historique d'Asgiri Maha Vihara à Kandy, Sri Lanka (${FESTIVAL_METADATA.dates}).
- **Grammaire:** Temps verbaux, voix passive, conditionnels, syntaxe.
- **Correction:** Tapez \`Check my sentence: "votre phrase"\` pour une analyse grammaticale.
- **Littérature:** Shakespeare (*Hamlet, Macbeth, La Tempête*), Romantisme, et poésie.`,
    };
  }

  if (/\b(hola|buenos días|buenas tardes|cómo|español|gracias)\b/i.test(p)) {
    return {
      category: 'spanish_multilingual',
      reply: `### ¡Bienvenidos al Rincón de Inglés de Sanjanani 2026!
Soy su tutor de lengua y literatura inglesa en el histórico Asgiri Maha Vihara en Kandy (${FESTIVAL_METADATA.dates}).
- **Gramática:** Los 12 tiempos verbales, voz pasiva y condicionales.
- **Diagnóstico:** Escribe \`Check my sentence: "tu oración"\` para revisar tu gramática.
- **Literatura:** Análisis de Shakespeare, figuras retóricas y épocas literarias.`,
    };
  }

  if (/[\u0900-\u097F]/.test(raw) || /\b(namaste|namaskar)\b/i.test(p)) {
    return {
      category: 'hindi_multilingual',
      reply: `### संजाननी इंग्लिश कॉर्नर में आपका स्वागत है!
कैंडी, श्रीलंका के ऐतिहासिक असगिरि महा विहार महा पिरिवेना में **संजाननी साहित्य महोत्सव 2026** (${FESTIVAL_METADATA.dates}) में आपका स्वागत है।
- **व्याकरण (Grammar):** 12 Tenses, Active/Passive Voice, Conditionals।
- **वाक्य जाँच:** \`Check my sentence: "आपका वाक्य"\` लिखें।
- **साहित्य एवं शेक्सपियर:** *Hamlet*, *Macbeth*, और अलंकार (Figures of Speech)।`,
    };
  }

  // 3. GREETINGS & INTRODUCTIONS
  if (
    /^(hi|hello|hey|greetings|ayubowan|good morning|good afternoon|good evening)\b[!.]*$/i.test(p) ||
    /^(hi|hello|hey),?\s+(who are you|what is your name|tutor|scholar)/i.test(p) ||
    p === 'who are you' ||
    p === 'what is your name' ||
    p === 'what can you do'
  ) {
    return {
      category: 'greeting',
      reply: `### Ayubowan! Welcome to Sanjanani English Scholar AI
I am your academic tutor for **The English Corner** at the **${FESTIVAL_METADATA.festivalName}** (${FESTIVAL_METADATA.dates}), hosted at **${FESTIVAL_METADATA.institution}**, Kandy.

**How I Can Help You Directly:**
- **Word Meanings & Translations:** Ask *Meaning of "Petrichor"* or *Translate "Freedom" into Sinhala* or paste poetry lines to translate.
- **Sentence Clinic:** Write \`Check my sentence: "Your sentence here"\` for grammar diagnostics and elevated rewrites.
- **Grammar Masterclasses:** Ask about Tenses, Conditionals, Active/Passive Voice, Reported Speech, Prepositions, or Confused Words (*affect vs. effect, lose vs. loose*).
- **Literature & Shakespeare:** Explore *Hamlet, Macbeth, The Tempest, 1984, Pride and Prejudice*, literary devices, or any of the 8 historical eras.`,
    };
  }

  // 4. FESTIVAL DETAILS, SCHEDULE & CONTACT (Only when explicitly asking about the festival/event/contact)
  const isGrammarOrCheck =
    /^check\b/i.test(p) ||
    p.includes('grammar') ||
    p.includes('sentence') ||
    p.includes('tense') ||
    p.includes('eras') ||
    /\bera\b/i.test(p) ||
    /\bperiods?\b/i.test(p) ||
    p.includes('literature') ||
    p.includes('poem') ||
    p.includes('adjective') ||
    p.includes('synonym');

  if (
    !isGrammarOrCheck &&
    (p.includes('festival') ||
      p.includes('sanjanani') ||
      (/\b(asgiri|pirivena)\b/i.test(p) && /\b(where|when|date|schedule|event|contact|phone|email|what is)\b/i.test(p)) ||
      (p.includes('kandy') && (p.includes('event') || p.includes('exhibition') || p.includes('schedule') || p.includes('contact'))))
  ) {
    if (p.includes('contact') || p.includes('phone') || p.includes('email') || p.includes('tel') || p.includes('call')) {
      return {
        category: 'festival_contact',
        reply: `### Official Contact Details — Asgiri Maha Vihara Maha Pirivena
- **Institution:** ${FESTIVAL_METADATA.institution} (${FESTIVAL_METADATA.institutionSinhala})
- **Telephone:** ${FESTIVAL_METADATA.contact.tel}
- **Mobile:** ${FESTIVAL_METADATA.contact.mobile}
- **Email:** ${FESTIVAL_METADATA.contact.email}
- **Website:** ${FESTIVAL_METADATA.contact.web}
- **Media Unit:** ${FESTIVAL_METADATA.contact.mediaUnit}`,
      };
    }

    if (p.includes('when') || p.includes('date')) {
      return {
        category: 'festival_dates',
        reply: `### Sanjanani Literary Festival 2026 Dates
- **Dates:** **${FESTIVAL_METADATA.dates}** (${FESTIVAL_METADATA.datesSinhala})
- **Venue:** ${FESTIVAL_METADATA.location}
- **Pavilion:** ${FESTIVAL_METADATA.pavilionName}`,
      };
    }

    if (p.includes('where') || p.includes('venue') || p.includes('location')) {
      return {
        category: 'festival_venue',
        reply: `### Festival Venue & Location
- **Institution:** **${FESTIVAL_METADATA.institution}** (${FESTIVAL_METADATA.institutionSinhala})
- **Address:** ${FESTIVAL_METADATA.location}
- **Contact:** Tel: ${FESTIVAL_METADATA.contact.tel} | Mobile: ${FESTIVAL_METADATA.contact.mobile} | Email: ${FESTIVAL_METADATA.contact.email}`,
      };
    }

    if (p.includes('schedule') || p.includes('events') || p.includes('program') || p.includes('programme') || p.includes('lineup')) {
      return {
        category: 'festival_schedule',
        reply: `### Sanjanani 2026 Festival Program Lineup
${FESTIVAL_SCHEDULE.map(
  (ev, i) => `${i + 1}. **${ev.time}** — **${ev.title}**\n   - *Lead:* ${ev.speakerOrLead} (${ev.location})`
).join('\n')}`,
      };
    }

    return {
      category: 'festival_overview',
      reply: `### ${FESTIVAL_METADATA.festivalName}
*${FESTIVAL_METADATA.festivalSinhala}*
- **Theme:** *${FESTIVAL_METADATA.theme}*
- **Dates:** ${FESTIVAL_METADATA.dates}
- **Host:** ${FESTIVAL_METADATA.institution}, Kandy
- **Features:** Educational exhibition stalls, Shakespearean metric studies, interactive literary trivia, and multilingual English workshops.`,
    };
  }

  // 5. WORD / ETYMOLOGY LOOKUP FOR LEXICON ENTRIES (e.g. from WordOfTheDay "Ask Scholar AI")
  // Runs BEFORE sentence diagnostics so prompts with quotes + "example sentences" aren't treated as a sentence to check
  const explicitWordMatch =
    raw.match(/(?:explain the literary word|meaning of|definition of|define|etymology of|what does)\s+["“‘']?([a-zA-Z-]+)["”’']?/i) ||
    raw.match(/["“‘']([a-zA-Z-]+)["”’']\s*(?:mean|etymology|definition|origin)/i);

  if (explicitWordMatch) {
    const queriedWord = explicitWordMatch[1].toLowerCase();
    if (BILINGUAL_LEXICON[queriedWord]) {
      return {
        category: 'lexicon_word_explanation',
        reply: formatLexiconEntry(BILINGUAL_LEXICON[queriedWord], true),
      };
    }
  }

  if (p.includes('literary word') || (p.includes('etymology') && p.includes('example sentence'))) {
    const tokens = p.replace(/[^a-z\s-]/g, ' ').split(/\s+/);
    for (const tok of tokens) {
      if (BILINGUAL_LEXICON[tok]) {
        return {
          category: 'lexicon_word_explanation',
          reply: formatLexiconEntry(BILINGUAL_LEXICON[tok], true),
        };
      }
    }
  }

  // 6. SENTENCE CHECK & GRAMMAR DIAGNOSTICS
  const isCheckingSentence =
    /^check\b/i.test(p) ||
    p.includes('correct this') ||
    p.includes('fix this sentence') ||
    p.includes('fix my sentence') ||
    p.includes('is this sentence correct') ||
    p.includes('is this correct') ||
    p.includes('find the mistake') ||
    p.includes('find mistake') ||
    p.includes('check my sentence') ||
    p.includes('check sentence') ||
    p.includes('sentence check') ||
    p.includes('sentence surgery') ||
    (p.includes('mistake in') && p.length > 15) ||
    /^(is|are|does|can)\s+["'].*["']\s+(correct|grammatical)/i.test(p);

  const isQuotedSentenceCheck =
    raw.includes('"') &&
    /\bsentence\b/i.test(p) &&
    !p.includes('example sentence') &&
    !p.includes('etymology') &&
    !p.includes('literary word');

  if (isCheckingSentence || isQuotedSentenceCheck) {
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
          .replace(/^(check this sentence|check my sentence|check this|is this correct|check|correct this|fix this sentence|fix my sentence|please check|can you check)\s*:?\s*/i, '')
          .replace(/\?+$/, '')
          .trim();
      }
    }

    if (candidate.length > 3) {
      return performSentenceDiagnostics(candidate);
    }
  }

  // 7. LOANWORDS FROM SRI LANKA / SOUTH ASIA (only when actually asking about loanwords/origins)
  const isLoanwordQuery =
    p.includes('loanword') ||
    p.includes('loan word') ||
    p.includes('borrowed word') ||
    p.includes('words from sri lanka') ||
    p.includes('words from sinhala') ||
    p.includes('sri lankan words in english') ||
    p.includes('ceylon words') ||
    (p.includes('sinhala') && (p.includes('in english') || p.includes('borrowed') || p.includes('origin')));

  if (isLoanwordQuery) {
    return {
      category: 'loanwords_etymology',
      reply: `### English Loanwords from Sri Lanka & South Asia
English absorbed remarkable vocabulary through Indian Ocean trade and scholarship:

${CURIOUS_LOANWORDS.map((lw, i) => `${i + 1}. **${lw.word}** *(${lw.origin})*: ${lw.meaning}`).join('\n')}`,
    };
  }

  // 8. GRAMMAR MASTERCLASSES
  // 8A. Conditionals (Zero, 1st, 2nd, 3rd)
  if (p.includes('conditional') || p.includes('second conditional') || p.includes('third conditional') || p.includes('if clause')) {
    return {
      category: 'grammar_conditionals',
      reply: `### The Four English Conditionals ("If" Clauses)

1. **Zero Conditional (General Truths & Scientific Facts):**
   - *Formula:* **If + Present Simple, ... Present Simple**
   - *Example:* *If morning sunlight strikes the dew, it sparkles.*
2. **First Conditional (Real & Likely Future Outcomes):**
   - *Formula:* **If + Present Simple, ... will + Base Verb**
   - *Example:* *If you study iambic pentameter, you will recite Shakespeare fluently.*
3. **Second Conditional (Imaginary or Unlikely Present/Future):**
   - *Formula:* **If + Past Simple (or "were"), ... would + Base Verb**
   - *Example:* *If Shakespeare visited Kandy today, he would admire the puppet drama.*
4. **Third Conditional (Hypothetical Past Regrets or Alternate History):**
   - *Formula:* **If + Past Perfect (had + V3), ... would have + V3**
   - *Example:* *If Macbeth had resisted ambition, he would have retained his honor.*`,
    };
  }

  // 8B. Subjunctive Mood
  if (p.includes('subjunctive')) {
    return {
      category: 'grammar_subjunctive',
      reply: `### The Subjunctive Mood in Formal English
Used for hypothetical wishes, contrary-to-fact conditions, and urgent formal recommendations:

1. **Hypothetical / Contrary-to-Fact ("Were" for all subjects):**
   - *Correct:* *"If I **were** the playwright..."* (never *"was"* in formal writing)
   - *Example:* *"She spoke as though the ancient library **were** alive."*
2. **Mandative Subjunctive (Base Verb after *suggest, insist, demand, recommend, require + that*):**
   - *Correct:* *"The Venerable Abbot recommended that every scholar **study** etymology."* (not *studies*)
   - *Correct:* *"It is essential that he **be** present before dawn."*`,
    };
  }

  // 8C. Clauses & Phrases
  if (p.includes('clause') || p.includes('phrase') || p.includes('relative clause') || p.includes('dependent clause')) {
    if (p.includes('relative clause')) {
      return {
        category: 'grammar_relative_clauses',
        reply: `### Relative Clauses (*who, whom, whose, which, that*)
1. **Defining (Essential) — No Commas:**
   *The student **who arrived early** received the anthology.*
2. **Non-Defining (Extra Detail) — Bracketed by Commas:**
   *Asgiri Maha Vihara, **which was founded centuries ago**, preserves timeless manuscripts.*
3. **Pronoun Rule:** **Who** = human subject; **Whom** = human object; **Whose** = possession; **Which / That** = things.`,
      };
    }

    return {
      category: 'grammar_clauses',
      reply: `### Clause vs. Phrase
- **Clause (\`Subject + Finite Verb\`):**
  - *Independent:* Stands alone (*The temple bell chimed at dawn*).
  - *Dependent:* Begins with a subordinator (*although, because, since*) and cannot stand alone.
- **Phrase (No Subject-Verb pair):**
  - Prepositional (*under the bodhi tree*), Participial (*holding an ola leaf*), Infinitive (*to translate poetry*).`,
    };
  }

  // 8D. Reported Speech
  if (p.includes('reported speech') || p.includes('indirect speech') || p.includes('direct speech') || p.includes('direct to indirect')) {
    return {
      category: 'grammar_reported_speech',
      reply: `### Direct vs. Indirect (Reported) Speech
When the reporting verb is past (*said, told*), shift tenses, pronouns, and time markers:
1. **Tense Backshift:** Present Simple → Past Simple (*"I study"* → *he studied*); Present Continuous → Past Continuous; Past Simple / Present Perfect → Past Perfect; *will → would*, *can → could*.
2. **Time Shifts:** *today → that day*, *tomorrow → the next day*, *yesterday → the previous day*, *here → there*.
- *Example:* *"I am reading Hamlet today," said Rahula.* → *Rahula said that he was reading Hamlet that day.*`,
    };
  }

  // 8E. Active vs. Passive Voice
  if (p.includes('passive') || (p.includes('active') && p.includes('voice')) || p.includes('convert to active')) {
    return {
      category: 'grammar_voice',
      reply: `### Active vs. Passive Voice
- **Active (\`Subject + Verb + Object\`):** Direct and vigorous — *"The scholar translated the manuscript."*
- **Passive (\`Object + be + V3 [+ by Agent]\`):** Focuses on the recipient — *"The manuscript was translated by the scholar."*
- **Tense Guide:** *writes → is written* | *wrote → was written* | *has written → has been written* | *will write → will be written*.`,
    };
  }

  // 8F. Subject-Verb Agreement
  if (p.includes('subject-verb agreement') || p.includes('subject verb agreement')) {
    return {
      category: 'grammar_sva',
      reply: `### Mastering Subject-Verb Agreement
1. **Distributive Pronouns (*each, every, everyone, neither, either*):** Always take a **singular** verb (*Each of the monks **has** a manuscript*).
2. **Prepositional Interrupters:** Ignore *"of the..."* when matching the head subject (*The rhythm **of these lines is** steady*).
3. **Correlative Conjunctions (*neither... nor / either... or*):** The verb agrees with the **closer** subject (*Neither the mentor nor the students **were** late*).
4. **Collective Nouns (*jury, committee, audience*):** Singular when acting as one unit; plural only when individuals act separately.`,
    };
  }

  // 8G. Modal Verbs
  if (p.includes('modal') || /\b(can\s+vs\s+could|may\s+vs\s+might|should\s+vs\s+must)\b/i.test(p)) {
    return {
      category: 'grammar_modals',
      reply: `### Modal Auxiliary Verbs (*can, could, may, might, must, should, will, would*)
- **Ability:** *can* (present), *could* (past/polite)
- **Permission:** *may* (formal), *could / can*
- **Obligation:** *must* (necessity), *should / ought to* (advice)
- **Rules:** Modals never take \`-s\` (*He can* ✅) and always take the bare infinitive without *"to"* (*She must go* ✅).`,
    };
  }

  // 8H. Tenses (Specific & General)
  if (
    p.includes('tense') ||
    p.includes('past perfect') ||
    p.includes('present perfect') ||
    p.includes('present continuous') ||
    p.includes('past continuous') ||
    p.includes('future perfect') ||
    p.includes('simple present') ||
    p.includes('simple past')
  ) {
    if (p.includes('past perfect')) {
      return {
        category: 'grammar_tenses',
        reply: `### Past Perfect Tense (\`had + Past Participle\`)
Shows an action completed **before another past action**:
- *Example:* *The keynote speaker **had already departed** before the rain **began** over Kandy.*`,
      };
    }
    if (p.includes('present perfect')) {
      return {
        category: 'grammar_tenses',
        reply: `### Present Perfect Tense (\`have/has + Past Participle\`)
Bridges past experience or recently completed actions with the **present**:
- **Unspecified Past Experience:** *I **have read** all of Shakespeare's tragedies.*
- **Duration up to Now (*since/for*):** *Asgiri Pirivena **has preserved** Pali manuscripts for centuries.*`,
      };
    }
    if (p.includes('present continuous')) {
      return {
        category: 'grammar_tenses',
        reply: `### Present Continuous Tense (\`am/is/are + Verb-ing\`)
Used for actions happening right now (*"The choir is rehearsing"*) or temporary ongoing projects. Remember not to use continuous forms for stative verbs (*Say "I know" / "I understand", not "I am knowing"*).`,
      };
    }
    if (p.includes('future perfect')) {
      return {
        category: 'grammar_tenses',
        reply: `### Future Perfect Tense (\`will have + Past Participle\`)
Describes an action finished **before a future deadline**:
- *Example:* *By October 09, 2026, scholars **will have attended** eight major literary sessions.*`,
      };
    }
    return {
      category: 'grammar_tenses',
      reply: `### The 12 English Tenses Quick Reference Matrix

| Aspect | Present | Past | Future |
| :--- | :--- | :--- | :--- |
| **Simple** | *I write* (Habits/facts) | *I wrote* (Finished past) | *I will write* |
| **Continuous** | *I am writing* (Now) | *I was writing* | *I will be writing* |
| **Perfect** | *I have written* (Past→Now) | *I had written* (Before past) | *I will have written* |
| **Perf. Cont.** | *I have been writing* | *I had been writing* | *I will have been writing* |`,
    };
  }

  // 8I. Gerund vs. Infinitive
  if (p.includes('gerund') || p.includes('infinitive')) {
    return {
      category: 'grammar_gerund_infinitive',
      reply: `### Gerund (\`Verb-ing\` as Noun) vs. Infinitive (\`to + Base Verb\`)
- **Gerund:** Functions as a noun — ***Reading** classics sharpens thought; he enjoys **translating**.* Prepositions are always followed by gerunds (*"I look forward to **meeting** you"*).
- **Infinitive:** Shows intention/purpose — *She came **to recite** Milton.*
- **Meaning Shift Example:** *I stopped **smoking*** (quit the habit) vs. *I stopped **to smoke*** (paused another task in order to smoke).`,
    };
  }

  // 8J. Confused Words
  if (
    (p.includes('affect') && p.includes('effect')) ||
    (p.includes('their') && p.includes('there')) ||
    (p.includes('its') && p.includes("it's")) ||
    (p.includes('who') && p.includes('whom')) ||
    (p.includes('lose') && p.includes('loose')) ||
    (p.includes('accept') && p.includes('except')) ||
    (p.includes('compliment') && p.includes('complement')) ||
    (p.includes('fewer') && p.includes('less')) ||
    (p.includes('then') && p.includes('than')) ||
    (p.includes('principal') && p.includes('principle')) ||
    (p.includes('stationary') && p.includes('stationery'))
  ) {
    if (p.includes('affect') && p.includes('effect')) {
      return {
        category: 'confused_words',
        reply: `### Affect vs. Effect (Mnemonic: RAVEN)
- **Affect (Verb):** To influence (*The monsoon wind affected the crops*).
- **Effect (Noun):** The outcome (*The calming effect of poetry*).`,
      };
    }
    if (p.includes('lose') && p.includes('loose')) {
      return {
        category: 'confused_words',
        reply: `### Lose vs. Loose
- **Lose (Verb, pronounced /luːz/):** To misplace or fail to win (*Do not **lose** your bookmark*).
- **Loose (Adjective, pronounced /luːs/):** Not tight (*A **loose** sheet of parchment*).`,
      };
    }
    if (p.includes('accept') && p.includes('except')) {
      return {
        category: 'confused_words',
        reply: `### Accept vs. Except
- **Accept (Verb):** To receive willingly or agree (*She **accepted** the invitation*).
- **Except (Preposition/Conjunction):** Excluding (*Everyone arrived **except** the messenger*).`,
      };
    }
    if (p.includes('fewer') && p.includes('less')) {
      return {
        category: 'confused_words',
        reply: `### Fewer vs. Less
- **Fewer:** Used with **countable plural nouns** (*fewer mistakes, fewer pages, fewer syllables*).
- **Less:** Used with **uncountable mass nouns** (*less ink, less time, less anxiety*).`,
      };
    }
    if (p.includes('principal') && p.includes('principle')) {
      return {
        category: 'confused_words',
        reply: `### Principal vs. Principle
- **Principal:** Head of a school/pirivena or main/primary (*Remember: "The school **pal**"*).
- **Principle:** A fundamental truth, rule, or moral law (*Guided by ethical **principles***).`,
      };
    }
    if (p.includes('compliment') && p.includes('complement')) {
      return {
        category: 'confused_words',
        reply: `### Compliment vs. Complement
- **Compliment:** Praise or admiration (*He paid a warm **compliment***).
- **Complement:** Something that completes or balances another thing (*Milk tea **complements** spicy kavum*).`,
      };
    }
    if (p.includes('who') && p.includes('whom')) {
      return {
        category: 'confused_words',
        reply: `### Who vs. Whom (He / Him Test)
- **Who** = Subject (**he/she**): ***Who** wrote Hamlet? → He wrote Hamlet.*
- **Whom** = Object (**him/her**): *To **whom** did you speak? → I spoke to him.*`,
      };
    }
    if (p.includes('its') && p.includes("it's")) {
      return {
        category: 'confused_words',
        reply: `### Its vs. It's
- **It's:** Contraction for **"it is"** or **"it has"** (*It's raining in Kandy*).
- **Its:** Possessive pronoun, NO apostrophe (*The temple opened **its** archives*).`,
      };
    }
    if (p.includes('their') && p.includes('there')) {
      return {
        category: 'confused_words',
        reply: `### Their vs. There vs. They're
- **There:** Place/existence (*The books are **there**; **there** are 12 tenses*).
- **Their:** Belonging to them (***Their** essay won*).
- **They're:** Contraction for **they are** (***They're** reciting poetry*).`,
      };
    }
    return {
      category: 'confused_words',
      reply: `### Commonly Confused English Pairs
- **Then (Time/Sequence) vs. Than (Comparison):** *Read first, **then** write. Poetry is older **than** novels.*
- **Stationary (Still, not moving) vs. Stationery (Writing paper & pens):** *The statue was **stationary**; buy envelopes at the **stationery** shop.*`,
    };
  }

  // 8K. Punctuation, Articles, Prepositions, Parts of Speech
  if (p.includes('oxford comma') || p.includes('semicolon') || p.includes('colon') || p.includes('punctuation') || p.includes('apostrophe')) {
    if (p.includes('semicolon') || p.includes('colon')) {
      return {
        category: 'punctuation_semicolon',
        reply: `### Semicolon (;) vs. Colon (:)
- **Semicolon (;):** Joins two complete independent clauses sharing a close idea (*The temple bell rang; the scholars gathered*) or separates list items containing internal commas (*Kandy, Sri Lanka; Oxford, England*).
- **Colon (:):** Introduces a list, quote, or explanation after a complete sentence (*He mastered three tongues: Pali, Sinhala, and English*).`,
      };
    }
    return {
      category: 'punctuation_general',
      reply: `### Essential Punctuation Rules
- **Oxford Comma:** Placed before *and/or* in lists of 3+ items to prevent ambiguity (*"We invited the scholars, Shakespeare, and the Abbot"*).
- **Apostrophe ('):** Shows possession (*Keats's odes, the students' books*) or omission (*don't, it's*). Never use apostrophes for simple plurals (*1990s*, not *1990's*)!`,
    };
  }

  if (/\barticles?\b/i.test(p) && (p.includes('a ') || p.includes('an') || p.includes('the') || p.includes('definite') || p.includes('grammar'))) {
    return {
      category: 'grammar_articles',
      reply: `### English Articles (*a, an, the*)
- **"A" vs. "An" depends on SOUND, not letter:**
  - *an hour, an honest scholar, an apple* (vowel sound)
  - *a university, a European poem, a unique word* (starts with consonant /j/ sound!)
- **"The" (Definite):** Unique or specified nouns (*the sun, the English Corner, the Mahabharata*). Do not use *"the"* before single country names (*Sri Lanka*), only plural/republic names (*the United Kingdom, the Maldives*).`,
    };
  }

  if (p.includes('preposition') || p.includes('in on at') || p.includes('between vs among') || p.includes('since vs for')) {
    return {
      category: 'grammar_prepositions',
      reply: `### Prepositions Guide
- **IN (Broad / Enclosed):** *in October, in 2026, in the morning, in Sri Lanka, in Kandy, in the hall.*
- **ON (Days / Surfaces):** *on Wednesday, on October 7th, on the desk, on Temple Street.*
- **AT (Specific Clock Times / Coordinates):** *at 8:30 AM, at noon, at Asgiri Maha Vihara.*
- **Since vs. For:** **Since** + starting point (*since 2020, since dawn*); **For** + duration (*for three days, for hours*).
- **Between vs. Among:** **Between** = 2 items; **Among** = 3+ items.`,
    };
  }

  if (
    p.includes('part of speech') ||
    p.includes('parts of speech') ||
    /\bwhat (is|are) (a |an )?(noun|verb|adjective|adverb|pronoun|conjunction|interjection|determiner|idiom|phrasal verb)\b/i.test(p)
  ) {
    if (p.includes('determiner')) {
      return {
        category: 'grammar_determiner',
        reply: `### Determiners in English
Words before nouns specifying definiteness or quantity: **Articles** (*a, an, the*), **Demonstratives** (*this, that, these, those*), **Possessives** (*my, their, its*), and **Quantifiers** (*some, many, few, each, every*).`,
      };
    }
    if (p.includes('idiom')) {
      return {
        category: 'grammar_idiom',
        reply: `### What is an Idiom?
An expression whose figurative meaning differs from its literal words: *"Break the ice"* (ease tension), *"Burn the midnight oil"* (study late), *"Wear one's heart on one's sleeve"* (show emotion openly).`,
      };
    }
    if (p.includes('phrasal verb')) {
      return {
        category: 'grammar_phrasal_verb',
        reply: `### Phrasal Verbs
Base verb + preposition/adverb creating a new idiomatic meaning: **look after** (care for), **look up to** (admire), **give up** (stop trying), **put off** (postpone), **carry on** (continue).`,
      };
    }
    return {
      category: 'grammar_parts_of_speech',
      reply: `### The Eight Parts of Speech
1. **Noun:** Names a person, place, thing, or idea (*scholar, Kandy, wisdom*).
2. **Pronoun:** Replaces a noun (*he, she, they, who, which*).
3. **Verb:** Expresses action or state of being (*recite, write, is, become*).
4. **Adjective:** Describes or modifies a noun/pronoun (*ancient, luminous, eloquent*).
5. **Adverb:** Modifies a verb, adjective, or adverb (*gracefully, very, yesterday*).
6. **Preposition:** Shows time, space, or logical relation (*in, on, at, upon, during*).
7. **Conjunction:** Connects words or clauses (*and, but, although, because*).
8. **Interjection:** Expresses sudden feeling (*Hark!, Alas!, Bravo!*).`,
    };
  }

  // 8L. Additional Fundamental English Grammar & Literary Forms
  if (
    p.includes('types of sentence') ||
    p.includes('type of sentence') ||
    p.includes('simple compound complex') ||
    p.includes('compound-complex') ||
    p.includes('complex sentence') ||
    p.includes('compound sentence') ||
    p.includes('simple sentence')
  ) {
    return {
      category: 'grammar_sentence_types',
      reply: `### The Four Structural Types of English Sentences
1. **Simple Sentence (1 Independent Clause):** *The student read the manuscript.*
2. **Compound Sentence (2+ Independent Clauses linked by FANBOYS: *for, and, nor, but, or, yet, so*):** *The rain fell softly, and the scholars lit oil lamps.*
3. **Complex Sentence (1 Independent Clause + 1+ Dependent Clauses):** *Although night had fallen, the choir continued reciting verse.*
4. **Compound-Complex Sentence (2+ Independent Clauses + 1+ Dependent Clauses):** *When dawn broke over the hills, the bell chimed, and the courtyard filled with voices.*`,
    };
  }

  if (p.includes('types of noun') || p.includes('abstract noun') || p.includes('collective noun')) {
    return {
      category: 'grammar_noun_types',
      reply: `### Categories of English Nouns
- **Common vs. Proper:** *city* vs. *Kandy*; *playwright* vs. *William Shakespeare* (always capitalized).
- **Concrete vs. Abstract:** Tangible objects (*book, lantern, rain*) vs. ideas/qualities (*freedom, compassion, wisdom, courage*).
- **Collective Nouns:** Groups treated as one unit (*a choir of singers, an anthology of poems, a faculty of scholars*).
- **Countable vs. Uncountable:** Plurals allowed (*pages, pens*) vs. mass nouns without *-s* (*knowledge, advice, information, equipment, water*).`,
    };
  }

  if (p.includes('prose') && p.includes('poetry')) {
    return {
      category: 'literature_prose_vs_poetry',
      reply: `### Prose vs. Poetry
- **Prose:** Ordinary written or spoken discourse structured in **sentences and paragraphs** without formal metric beat (novels, essays, biographies, letters).
- **Poetry:** Literary expression arranged in **lines and stanzas**, heightening emotion and imagery through **rhythm/meter, sound music (alliteration, rhyme), and compressed figurative language** (sonnets, odes, haiku, epics).`,
    };
  }

  if (p.includes('british') && p.includes('american')) {
    return {
      category: 'english_variants',
      reply: `### British vs. American English Differences
1. **Spelling:** *-our* vs *-or* (**colour/color**, **honour/honor**); *-re* vs *-er* (**theatre/theater**, **centre/center**); *-ise/-ize* (**analyse/analyze**); *-ll-* vs *-l-* (**traveller/traveler**).
2. **Vocabulary:** *autumn / fall*, *lift / elevator*, *holiday / vacation*, *petrol / gas*, *rubber / eraser*, *biscuit / cookie*.
3. **Grammar:** British English favors Present Perfect for recent events (*"I have just eaten"*), whereas American English often allows Simple Past (*"I just ate"*).`,
    };
  }

  if (p.includes('question tag') || p.includes('tag question')) {
    return {
      category: 'grammar_question_tags',
      reply: `### Question Tags Rule
Positive statement → **Negative tag** | Negative statement → **Positive tag**:
- *She writes clearly, **doesn't she**?*
- *They haven't arrived yet, **have they**?*
- *I am early, **aren't I**?* (classic exception!)
- *Let's begin the lesson, **shall we**?*`,
    };
  }

  if (p.includes('comparative') || p.includes('superlative')) {
    return {
      category: 'grammar_comparatives',
      reply: `### Comparatives & Superlatives
- **Short adjectives (1 syllable):** *-er / -est* (*tall → taller → tallest*).
- **Long adjectives (2+ syllables):** *more / most* (*eloquent → more eloquent → most eloquent*).
- **Irregular forms:** *good → better → best* | *bad → worse → worst* | *far → farther/further → farthest/furthest*.
- Never double up (*more better* ❌ → **better** ✅).`,
    };
  }

  if (p.includes('vowel') || p.includes('consonant') || p.includes('syllable')) {
    return {
      category: 'english_phonology',
      reply: `### Vowels, Consonants & Syllables
- **Vowels (5 written letters: A, E, I, O, U — and ~20 spoken vowel sounds):** Articulated with an open vocal tract.
- **Consonants (21 letters):** Articulated with breath constriction (*p, b, t, d, k, g, s, m, l...*).
- **Syllables:** Beats of spoken sound built around one vowel sound (*"beau-ti-ful"* = 3 syllables; *"i-am-bic"* = 3 syllables). Counting syllables is essential for haiku (5–7–5) and Shakespeare's iambic pentameter (10 syllables per line).`,
    };
  }

  // 9. HISTORY OF ENGLISH & VOCABULARY ROOTS
  if (
    ((p.includes('origin') || p.includes('history') || p.includes('evolution')) && p.includes('english')) ||
    p.includes('where did english come from') ||
    p.includes('where do english words come from') ||
    p.includes('latin roots') ||
    p.includes('greek roots')
  ) {
    return {
      category: 'history_of_english',
      reply: `### Historical Evolution & Global Roots of English
1. **Old English (450–1150):** Germanic foundation (*water, heart, mother, light*) — *Beowulf*.
2. **Middle English (1150–1500):** Norman French Conquest (1066) added ~10,000 French & Latin words (*court, justice, poetry*) — Geoffrey Chaucer.
3. **Early Modern English (1500–1750):** Great Vowel Shift, printing press, William Shakespeare (coined 1,700+ words), and King James Bible.
4. **Global Mosaic:** Built of ~29% Latin, ~29% French, ~26% Germanic, ~6% Greek, and 6% global loanwords (Arabic *algebra*, Sanskrit *avatar*, Sinhala *serendipity, tourmaline*, Tamil *catamaran*).`,
    };
  }

  // 10. SHAKESPEARE COMPREHENSIVE GUIDE
  if (
    p.includes('shakespeare') ||
    p.includes('hamlet') ||
    p.includes('macbeth') ||
    p.includes('tempest') ||
    p.includes('romeo') ||
    p.includes('othello') ||
    p.includes('king lear') ||
    p.includes('twelfth night') ||
    p.includes('julius caesar') ||
    p.includes('sonnet 18') ||
    p.includes('iambic pentameter') ||
    p.includes('meter') ||
    p.includes('scansion') ||
    p.includes('blank verse')
  ) {
    if (p.includes('hamlet') || p.includes('to be or not to be')) {
      return {
        category: 'shakespeare_hamlet',
        reply: `### William Shakespeare’s *Hamlet* (c. 1601)
- **Central Conflict:** Commanded by his murdered father's ghost to avenge King Claudius's treachery, Prince Hamlet hesitates—torn between philosophical doubt, moral conscience, and the burden of action.
- **"To be, or not to be" (Act III, Scene 1):** Meditates on why humans endure *"the slings and arrows of outrageous fortune"* rather than risk *"the undiscover'd country from whose bourn no traveller returns."*
- **Iconic Advice:** Polonius to Laertes — *"To thine own self be true."*`,
      };
    }
    if (p.includes('macbeth') || p.includes('tomorrow and tomorrow')) {
      return {
        category: 'shakespeare_macbeth',
        reply: `### William Shakespeare’s *Macbeth* (1606)
- **Plot:** Spurred by three Witches' prophecies and Lady Macbeth, general Macbeth murders King Duncan, triggering relentless guilt, paranoia, and tyranny until Macduff defeats him as Birnam Wood marches to Dunsinane.
- **Themes:** Unchecked ambition, equivocation (*"Fair is foul, and foul is fair"*), sleepless guilt (*"Out, damned spot!"*), and nihilism (*"Tomorrow, and tomorrow, and tomorrow"*).`,
      };
    }
    if (p.includes('tempest') || p.includes('prospero') || p.includes('caliban')) {
      return {
        category: 'shakespeare_tempest',
        reply: `### William Shakespeare’s *The Tempest* (1611)
- **Themes:** Forgiveness over vengeance (*"The rarer action is / In virtue than in vengeance"*), Prospero’s farewell to magic (*"We are such stuff as dreams are made on"*), and post-colonial tension through Caliban (*"You taught me language..."*).`,
      };
    }
    if (p.includes('othello') || p.includes('iago') || p.includes('desdemona')) {
      return {
        category: 'shakespeare_othello',
        reply: `### William Shakespeare’s *Othello* (c. 1604)
A devastating domestic tragedy examining racial outsider status, manipulation, and destructive jealousy (*"O! beware, my lord, of jealousy; / It is the green-ey'd monster"*), orchestrated by Iago against noble Othello and Desdemona.`,
      };
    }
    if (p.includes('king lear') || p.includes('lear')) {
      return {
        category: 'shakespeare_lear',
        reply: `### William Shakespeare’s *King Lear* (c. 1606)
Aging King Lear divides his kingdom based on flattering speeches rather than honest devotion—banishing loyal Cordelia and suffering madness on the storm-swept heath until he achieves tragic humility.`,
      };
    }
    if (p.includes('julius caesar') || p.includes('marc antony') || p.includes('brutus')) {
      return {
        category: 'shakespeare_caesar',
        reply: `### William Shakespeare’s *Julius Caesar* (1599)
Explores political idealism vs. betrayal: Brutus joins conspirators fearing tyranny, while Mark Antony turns Rome against them through masterly verbal irony (*"Brutus is an honourable man"*).`,
      };
    }
    if (p.includes('twelfth night')) {
      return {
        category: 'shakespeare_twelfth_night',
        reply: `### William Shakespeare’s *Twelfth Night* (c. 1601)
One of Shakespeare’s finest romantic comedies of shipwrecked twins, disguised identity (Viola as Cesario), comic hubris (Malvolio), and music (*"If music be the food of love, play on"*).`,
      };
    }
    if (p.includes('romeo') || p.includes('juliet')) {
      return {
        category: 'shakespeare_romeo_juliet',
        reply: `### William Shakespeare’s *Romeo and Juliet* (1595)
Verona’s ancient family feud dooms two young lovers (*"star-cross'd lovers"*). In Act II Scene 2, Juliet challenges artificial social labels: *"What's in a name? That which we call a rose / By any other word would smell as sweet."*`,
      };
    }
    if (p.includes('iambic') || p.includes('meter') || p.includes('scansion') || p.includes('blank verse')) {
      return {
        category: 'shakespeare_meter',
        reply: `### Iambic Pentameter & Blank Verse
- **An Iamb:** Two syllables — unstressed **da** + stressed **DUM**.
- **Pentameter:** Five feet = **10 syllables per line**, echoing a steady human heartbeat (*da-DUM da-DUM da-DUM da-DUM da-DUM*).
- **Example:** *Shall **I** / com **PARE** / thee **TO** / a **SUM** / mer's **DAY**?*
- **Blank Verse:** Unrhymed iambic pentameter, ideal for dramatic dialogue in Shakespeare, Marlowe, and Milton (*Paradise Lost*).`,
      };
    }
    if (p.includes('sonnet')) {
      return {
        category: 'shakespeare_sonnet',
        reply: `### The Shakespearean Sonnet (14 Lines, ABAB CDCD EFEF GG)
Structured into three quatrains developing an argument in iambic pentameter, resolving in a witty final rhyming couplet (*"So long as men can breathe or eyes can see, / So long lives this, and this gives life to thee."* — Sonnet 18).`,
      };
    }
    return {
      category: 'shakespeare_general',
      reply: `### William Shakespeare (1564–1616) — The Bard of Avon
Author of 37 plays and 154 sonnets, Shakespeare enriched English with 1,700+ coined words (*critic, lonely, swagger, generous*) and idioms (*"break the ice", "wild goose chase", "heart of gold"*). Ask specifically about *Hamlet, Macbeth, The Tempest, Othello, Romeo and Juliet*, or *Iambic Pentameter*!`,
    };
  }

  // 11. LITERARY ERAS TIMELINE (ALL 8 ERAS)
  const eraMatch = handleLiteraryEraDeepDive(p, raw);
  if (eraMatch) {
    return eraMatch;
  }

  // 12. CANONICAL AUTHORS & NOVELS GUIDE (1984, Orwell, Austen, Dickens, Milton, Gatsby, Mockingbird, Romantics)
  const matchedWork = CANONICAL_WORKS_GUIDE.find((w) => w.keywords.some((kw) => p.includes(kw)));
  if (matchedWork) {
    return {
      category: 'canonical_work_guide',
      reply: `### ${matchedWork.title}
**Author:** ${matchedWork.author} | **Published:** ${matchedWork.year} | **Era:** ${matchedWork.era}

**Overview & Why It Was Written:**
${matchedWork.summary}

**Core Thematic Pillars:**
${matchedWork.themes.map((t) => `- ${t}`).join('\n')}

**Iconic Quote:**
> ${matchedWork.famousQuote}

**Scholarly & Exam Insight:**
${matchedWork.examInsight}`,
    };
  }

  // 13. ALL FIGURES OF SPEECH & LITERARY DEVICES
  if (
    p.includes('metaphor') ||
    p.includes('simile') ||
    p.includes('personification') ||
    p.includes('alliteration') ||
    p.includes('hyperbole') ||
    p.includes('irony') ||
    p.includes('oxymoron') ||
    p.includes('onomatopoeia') ||
    p.includes('allegory') ||
    p.includes('symbolism') ||
    p.includes('foreshadowing') ||
    p.includes('imagery') ||
    p.includes('paradox') ||
    p.includes('juxtaposition') ||
    p.includes('satire') ||
    p.includes('litotes') ||
    p.includes('allusion') ||
    p.includes('figure of speech') ||
    p.includes('figures of speech') ||
    p.includes('literary device')
  ) {
    if (p.includes('metaphor') || p.includes('simile')) {
      return {
        category: 'literary_devices',
        reply: `### Metaphor vs. Simile
- **Simile** *(uses "like" or "as")*: *The stupa gleamed **like** a lotus upon tranquil waters.*
- **Metaphor** *(direct identification)*: *"All the world's a stage" — Language is a lantern across dark seas.*`,
      };
    }
    if (p.includes('oxymoron') || p.includes('paradox')) {
      return {
        category: 'literary_devices',
        reply: `### Oxymoron vs. Paradox
- **Oxymoron:** Two contradictory words placed side-by-side: *"deafening silence", "cruel kindness", "bittersweet"*.
- **Paradox:** A whole statement that seems self-contradictory yet reveals a deeper truth: *"The child is father of the man"* (Wordsworth) or *"Fair is foul, and foul is fair"* (Macbeth).`,
      };
    }
    if (p.includes('allegory') || p.includes('symbolism')) {
      return {
        category: 'literary_devices',
        reply: `### Symbolism vs. Allegory
- **Symbolism:** Using a concrete object, color, or image to represent an abstract idea (*e.g., the green light in Gatsby = unreachable hope; the mockingbird = innocent goodness*).
- **Allegory:** Extending symbolism across an **entire narrative** so characters and plot enact a coherent moral or political lesson (*e.g., George Orwell's Animal Farm = the corruption of revolution*).`,
      };
    }
    if (p.includes('foreshadowing') || p.includes('imagery') || p.includes('juxtaposition')) {
      return {
        category: 'literary_devices',
        reply: `### Narrative & Descriptive Craft: Foreshadowing, Imagery & Juxtaposition
- **Foreshadowing:** Subtle early hints warning of future tragedy (*e.g., the Witches' opening storm in Macbeth*).
- **Imagery:** Sensory language awakening sight, sound (*auditory*), smell (*olfactory* — wet earth & jasmine), touch, or taste.
- **Juxtaposition:** Placing contrasting scenes side-by-side (e.g., comedic Porter scene right after King Duncan's murder) to heighten emotional impact.`,
      };
    }
    if (p.includes('alliteration')) {
      return {
        category: 'literary_devices',
        reply: `### Alliteration
Repetition of the same initial consonant sound in closely linked words:
- *"The **f**air **b**reeze **b**lew, the white **f**oam **f**lew..."* (Coleridge)
- Enhances oral musicality, emphasis, and memorability.`,
      };
    }
    if (p.includes('hyperbole')) {
      return {
        category: 'literary_devices',
        reply: `### Hyperbole
Deliberate, extravagant exaggeration for emotional force:
- *"Will all great Neptune's ocean wash this blood clean from my hand?"* (*Macbeth*)`,
      };
    }
    if (p.includes('personification')) {
      return {
        category: 'literary_devices',
        reply: `### Personification
Attributing human feelings or actions to nature or abstractions:
- *Wordsworth:* *"Ten thousand [daffodils] tossing their heads in sprightly dance."*`,
      };
    }
    if (p.includes('irony')) {
      return {
        category: 'literary_devices',
        reply: `### The Three Types of Irony
1. **Verbal Irony:** Saying the opposite of what is meant (*Antony calling Brutus an "honourable man"*).
2. **Situational Irony:** Outcome reverses expectation (*"Water, water, everywhere / Nor any drop to drink"*).
3. **Dramatic Irony:** The audience knows vital truth a character does not (*Romeo thinking Juliet is dead*).`,
      };
    }
    return {
      category: 'literary_devices',
      reply: `### Essential Literary Devices
- **Metaphor / Simile:** Figurative comparison (*"All the world's a stage"* / *"white like snow"*).
- **Personification:** Giving human traits to nature (*"the wind whispered"*).
- **Oxymoron:** Contradictory word pair (*"deafening silence"*).
- **Allegory & Symbolism:** Concrete emblems representing moral/political truths (*Animal Farm*).
- **Alliteration & Onomatopoeia:** Sound music (*silent scholars*, *rustle, murmur, chime*).
- **Litotes:** Deliberate understatement negating the opposite (*"no ordinary scholar"*).`,
    };
  }

  // 14. WRITING ESSAYS, LETTERS & SPEAKING FLUENCY
  if (p.includes('how to write an essay') || p.includes('essay writing') || p.includes('essay structure') || p.includes('peel method')) {
    return {
      category: 'writing_essay',
      reply: `### Academic Essay Blueprint (Introduction → P.E.E.L. → Conclusion)
1. **Introduction (15%):** Hook the reader, define key context, and state a crisp **Thesis Statement** uniting your main argument.
2. **Body Paragraphs (P.E.E.L. Formula):**
   - **P — Point:** Assert a clear topic sentence.
   - **E — Evidence:** Anchor with an exact quotation or example.
   - **E — Explanation:** Analyze word choice, literary technique, and why it proves your point.
   - **L — Link:** Connect back to the thesis.
3. **Conclusion (15%):** Synthesize insights in fresh phrasing without introducing new evidence.`,
    };
  }

  if (p.includes('formal letter') || p.includes('write a letter')) {
    return {
      category: 'writing_letter',
      reply: `### Formal Letter Structure
1. **Sender Address & Date** → **Recipient Title & Address**
2. **Salutation:** *Dear Venerable Abbot,* / *Dear Sir or Madam,* / *Dear Dr. Perera,*
3. **Subject Line** (concise & underlined/bold)
4. **Opening → Body → Polite Action Request**
5. **Sign-off:** *Yours faithfully* (if recipient unnamed) or *Yours sincerely* (if named).`,
    };
  }

  if (p.includes('improve') && (p.includes('speaking') || p.includes('english') || p.includes('fluency'))) {
    return {
      category: 'speaking_fluency',
      reply: `### Proven Roadmap for Spoken & Written English Fluency
1. **Shadowing Practice:** Listen to expressive speakers or poems and mirror their rhythm, pauses, and stress patterns aloud.
2. **Active Reading & Lexicon Journaling:** Study 10 minutes of classic prose or editorial English daily; note 3 vivid verbs or adjectives per day.
3. **Think Directly in English:** Narrate observations in complete English clauses rather than translating word-for-word from Sinhala or Tamil.
4. **Speak Slowly with Intention:** Crisp articulation at 110–130 words per minute sounds far more authoritative than rushed speech.`,
    };
  }

  // 15. EVOCATIVE ADJECTIVES & THEMATIC VOCABULARY
  if (
    p.includes('synonym') ||
    p.includes('adjective') ||
    p.includes('another word for') ||
    p.includes('better word for') ||
    p.includes('vocabulary')
  ) {
    if (p.includes('rain') || p.includes('kandy') || p.includes('mist') || p.includes('morning')) {
      return {
        category: 'vocabulary_kandy_rain',
        reply: `### Evocative Literary Adjectives for a Rainy Morning in Kandy
1. **Mist-wreathed** — Draped in delicate bands of highland fog (*"The mist-wreathed ridges above Asgiri Vihara"*).
2. **Petrichor-laden** — Rich with the earthy fragrance released when first rain kisses warm soil (*"A petrichor-laden breeze drifted across the temple flagstones"*).
3. **Verdant** — Deeply lush and freshly green with monsoon moisture (*"Verdant tea-clad hills glistening in quiet rain"*).
4. **Pluvial** — Pertaining to gentle, steady rain; poetic and formal (*"A pluvial cadence upon tiled monastery roofs"*).
5. **Numinous** — Charged with serene spiritual awe and quiet sacred presence (*"The numinous stillness of a rainy Kandyan dawn"*).`,
      };
    }

    if (p.includes('happy') || p.includes('happiness') || p.includes('joy')) {
      return {
        category: 'vocabulary_joy',
        reply: `### Elevated Synonyms for "Happy / Joyful"
- **Blithe** (cheerful, carefree), **Jubilant** (triumphantly glad), **Serene** (calmly content), **Radiant** (glowing with happiness), **Beatific** (blissfully peaceful).`,
      };
    }

    if (p.includes('sad') || p.includes('sorrow') || p.includes('grief')) {
      return {
        category: 'vocabulary_sorrow',
        reply: `### Elevated Synonyms for "Sad / Sorrowful"
- **Melancholic** (thoughtful tender sadness), **Wistful** (longing for the past), **Poignant** (deeply touching to the heart), **Elegiac** (mournfully reflective, as in an elegy), **Despondent** (disheartened).`,
      };
    }

    return {
      category: 'vocabulary_expansion',
      reply: `### High-Value Literary Vocabulary & Roots
- **Lucid / Pellucid** *(adj.)* — Crystal-clear in expression (*From Latin "lux" = light*).
- **Ephemeral** *(adj.)* — Fleeting, lasting briefly (*Mirrors Pali "Anicca"*).
- **Mellifluous** *(adj.)* — Sweetly flowing to the ear (*From Latin "mel" = honey*).
- **Equanimity** *(noun)* — Steadfast calmness of mind under trial (*Mirrors Pali "Upekkhā"*).
- **Resilient** *(adj.)* — Recovering strength after hardship.`,
    };
  }

  // 16. CREATIVE POETRY / STORY COMPOSITION (ONLY WHEN EXPLICITLY ASKED TO WRITE ONE)
  if (
    /\b(write|compose|craft|make|create|generate)\s+(a|an|me\s+a)?\s*(short\s+|beautiful\s+)?(haiku|poem|sonnet|verse|story|tale|fable)\b/i.test(p)
  ) {
    if (p.includes('haiku')) {
      return {
        category: 'creative_haiku',
        reply: `### Original Haiku *(5–7–5 syllables)*
> Mist climbs ancient stones, *(5)*
> Wisdom breathes in quiet halls, *(7)*
> Lantern lights the mind. *(5)*`,
      };
    }
    if (p.includes('story') || p.includes('tale') || p.includes('fable')) {
      return {
        category: 'creative_story',
        reply: `### The Lexicographer’s Monsoon
Rain drummed gently upon the clay roof of the monastery scriptorium. Before the young student lay two open pages: a palm-leaf *Jātaka* verse in Pali and a worn edition of *The Tempest*. Tracing Prospero's words—*"The rarer action is in virtue than in vengeance"*—he smiled, realizing that compassion wears every human alphabet with equal grace.`,
      };
    }
    return {
      category: 'creative_poem',
      reply: `### Bridges of Ink *(In Iambic Pentameter)*
> Upon the highland ridge where shadows fade,
> And morning bells awaken misty skies,
> A scholar reads within the tranquil shade
> Where ancient wisdom speaks and never dies.`,
    };
  }

  // 17. DIRECT MATCH AGAINST LITERARY TRIVIA BANK QUESTIONS
  const matchedTrivia = LITERARY_TRIVIA_BANK.find((item) => {
    const qLower = item.question.toLowerCase();
    const keywords = qLower
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 4 && !['which', 'whose', 'where', 'these', 'famous', 'literary', 'english'].includes(w));
    const hits = keywords.filter((kw) => p.includes(kw));
    return hits.length >= 3;
  });

  if (matchedTrivia) {
    return {
      category: 'trivia_answer',
      reply: `### Verified Answer: **${matchedTrivia.options[matchedTrivia.correctIndex]}**
**Question Context:** *${matchedTrivia.question}*

- **Explanation:** ${matchedTrivia.explanation}
- **Literary Note:** ${matchedTrivia.literaryContext}`,
    };
  }

  // 18. DIRECT SINGLE-WORD LEXICON MATCH (e.g. if user types just "Petrichor" or "Epistemology")
  const singleTokens = p.replace(/[^a-z\s-]/g, ' ').trim().split(/\s+/).filter(Boolean);
  if (singleTokens.length <= 4) {
    for (const tok of singleTokens) {
      if (BILINGUAL_LEXICON[tok]) {
        return {
          category: 'lexicon_single_word',
          reply: formatLexiconEntry(BILINGUAL_LEXICON[tok], true),
        };
      }
    }
  }

  // 19. CLEAN ACADEMIC GUIDANCE FALLBACK (Zero festival promotion)
  return {
    category: 'scholar_scope_notice',
    reply: `I couldn't find an exact built-in match for **"${raw}"**, so please try phrasing it specifically—for example:
- **English Literature & Eras:** *"What are the English literary eras?"*, *"Tell me about the Victorian era"*, or *"Analyze Hamlet"*
- **Grammar & Usage:** *"Explain the 12 tenses"*, *"Types of sentences"*, *"Affect vs effect"*, or \`Check my sentence: "Your sentence"\`
- **Translation:** \`Translate "Your phrase" into Sinhala\``,
  };
}

/**
 * Diagnostic logic for sentence checks.
 */
function performSentenceDiagnostics(sentence: string): ScholarResponse {
  const s = sentence.trim();
  const lower = s.toLowerCase();
  const issues: string[] = [];
  const suggestions: string[] = [];

  if (/\beach\s+of\s+the\s+\w+\s+have\b/i.test(lower)) {
    issues.push(`**Subject-Verb Agreement:** The head subject is **"Each"** (singular distributive pronoun). Ignore the plural noun inside *"of the..."*.`);
    suggestions.push(`Change **"have"** to **"has"**.`);
  }
  if (/\bneither\s+of\s+the\s+\w+\s+(were|are)\b/i.test(lower)) {
    issues.push(`**Singular Distributive Rule:** **"Neither of the..."** takes a singular verb in formal English.`);
    suggestions.push(`Use **"was"** or **"is"** instead of *"were / are"*.`);
  }
  if (/\b(did|didn't|did\s+not|does|doesn't)\s+(went|saw|knew|wrote|took|ate|came|made|gave|spoke)\b/i.test(lower)) {
    issues.push(`**Auxiliary Verb Redundancy:** The auxiliary (*did / didn't / does*) already marks tense; the main verb must stay in its **base infinitive** form.`);
    suggestions.push(`Use the base verb (*e.g., "didn't go", "did see", "didn't know"*).`);
  }
  if (/\byesterday\s+.*\b(go|goes|have\s+gone|has\s+gone)\b/i.test(lower)) {
    issues.push(`**Tense Mismatch:** Specific finished past markers like *"yesterday"* require **Simple Past Tense**, not Present or Present Perfect.`);
    suggestions.push(`Change the verb to Simple Past (*"yesterday I went"*).`);
  }
  if (/\b(their\s+is|their\s+are|their\s+was|their\s+were)\b/i.test(lower)) {
    issues.push(`**Homophone Confusion:** **"Their"** shows possession; existence requires **"There is / There are"**.`);
    suggestions.push(`Replace **"their"** with **"there"**.`);
  }
  if (/\bit's\s+(wings|pages|heritage|monastery|cover|leaf|branches|color|colour|roof|history|meaning)\b/i.test(lower)) {
    issues.push(`**Apostrophe Confusion:** **"It's"** = *"it is / it has"*. Possession takes **"its"** with no apostrophe.`);
    suggestions.push(`Replace **"it's"** with **"its"**.`);
  }
  if (/\ba\s+(apple|hour|honest|honor|honour|umbrella|elephant|island|abbot|ola|idea|orange)\b/i.test(lower)) {
    issues.push(`**Indefinite Article Rule:** Words beginning with a vowel sound take **"an"**, not **"a"** (*"an hour"* has a silent 'h').`);
    suggestions.push(`Change **"a"** to **"an"**.`);
  } else if (/\ban\s+(university|unique|uniform|european|unit|useful)\b/i.test(lower)) {
    issues.push(`**Phonetic Consonant Sound Rule:** Words starting with a **/j/** consonant sound (*"university"*, *"European"*) take **"a"**, not **"an"**.`);
    suggestions.push(`Change **"an"** to **"a"**.`);
  }
  if (/\b(don't|doesn't|didn't|can't|won't)\s+\w*\s*(nothing|nobody|nowhere)\b/i.test(lower)) {
    issues.push(`**Double Negative:** Standard English uses a single negative (*"don't know anything"*, not *"don't know nothing"*).`);
    suggestions.push(`Replace the second negative with **"anything / anybody / anywhere"**.`);
  }
  if (/\b(they\s+is|they\s+was|he\s+don't|she\s+don't|it\s+don't|he\s+go\b|she\s+go\b|he\s+have\b|she\s+have\b)/i.test(lower)) {
    issues.push(`**Subject-Verb Number Mismatch:** Singular third-person subjects (*he, she, it*) take **-s** verbs or **doesn't / has** (*He goes, she doesn't, she has*); plural subjects (*they*) take **are / were**.`);
    suggestions.push(`Align verb number with the grammatical subject.`);
  }
  if (/\b(i\s+am|we\s+are|they\s+are|he\s+is|she\s+is)\s+(strongly\s+|totally\s+|completely\s+)?agree\b/i.test(lower)) {
    issues.push(`**False "Be + Verb" Construction:** **"Agree"** is a main verb, not an adjective. Never place *am / is / are* before *agree*.`);
    suggestions.push(`Write **"I agree"** (or *"I strongly agree"*), NOT *"I am agree"*.`);
  }
  if (/\bdiscuss\s+about\b/i.test(lower)) {
    issues.push(`**Redundant Preposition ("discuss about"):** The transitive verb **discuss** already means *"talk about"*.`);
    suggestions.push(`Remove **"about"**: write *"discuss this"* or *"discuss the topic"*.`);
  }
  if (/\breturn\s+back\b/i.test(lower)) {
    issues.push(`**Pleonasm / Redundancy ("return back"):** *"Return"* already means *"come or give back"*.`);
    suggestions.push(`Use simply **"return"** (or *"go back"*).`);
  }
  if (/\bcomprise\s+of\b/i.test(lower)) {
    issues.push(`**Preposition Error ("comprise of"):** Active *"comprise"* means *"consist of"* and takes NO *"of"*.`);
    suggestions.push(`Write **"comprises..."** or **"consists of..."**.`);
  }
  if (/\bdespite\s+of\b/i.test(lower)) {
    issues.push(`**Preposition Error ("despite of"):** Say either **"despite"** (alone) OR **"in spite of"** (never *"despite of"*).`);
    suggestions.push(`Change *"despite of"* to **"despite"** or **"in spite of"**.`);
  }
  if (/\balthough\b.*\bbut\b/i.test(lower)) {
    issues.push(`**Conjunction Redundancy ("Although... but"):** In English, *"although"* already introduces contrast, so do not repeat *"but"* in the main clause.`);
    suggestions.push(`Keep **"Although"** at the start and drop **"but"**.`);
  }
  if (/\b(more\s+better|more\s+easier|more\s+faster|more\s+taller|most\s+best)\b/i.test(lower)) {
    issues.push(`**Double Comparative / Superlative:** Irregular or *-er* comparatives (*better, easier, faster*) never take *"more"* in front of them.`);
    suggestions.push(`Drop **"more"** and use **"better / easier"** cleanly.`);
  }
  if (/\b(informations|advices|furnitures|equipments|luggages|knowledges)\b/i.test(lower)) {
    issues.push(`**Uncountable Noun Pluralized:** Words such as *information, advice, furniture, equipment, luggage, knowledge* are **uncountable** in English and take no *-s*.`);
    suggestions.push(`Use singular form (or *"pieces of advice / items of furniture"*).`);
  }
  if (/\b(could|would|should|must|might)\s+of\b/i.test(lower)) {
    issues.push(`**Modal Spelling Confusion:** The spoken contraction *could've* stands for **"could have"**, never *"could of"*.`);
    suggestions.push(`Replace **"of"** with **"have"** (*could have, would have, should have*).`);
  }
  if (/\blook(?:ing)?\s+forward\s+to\s+(see|meet|hear|go|visit|attend)\b/i.test(lower)) {
    issues.push(`**Gerund After "to" Preposition:** In **"look forward to"**, *"to"* is a preposition and must be followed by a **gerund (-ing)**.`);
    suggestions.push(`Change the base verb to **-ing** (*"look forward to meeting / seeing..."*).`);
  }

  if (issues.length > 0) {
    return {
      category: 'sentence_check_issue',
      reply: `### Sentence Diagnostic & Syntactic Clinic

**Original Sentence:**
> *"${s}"*

**Identified Issues:**
${issues.map((iss) => `- ${iss}`).join('\n')}

**Recommended Corrections:**
${suggestions.map((sug) => `- ${sug}`).join('\n')}

**Polished Version:**
> *"${getPolishedSentence(s)}"*`,
    };
  }

  return {
    category: 'sentence_check_sound',
    reply: `### Sentence Diagnostic & Syntactic Clinic

**Examined Sentence:**
> *"${s}"*

**Diagnostic Verdict:**
✅ **Grammatically Sound!** Your subject-verb agreement, tense alignment, and prepositions appear clean.

**Stylistic Variations:**
1. **Academic Cadence:** *“${elevateSentence(s, 'academic')}”*
2. **Literary Flourish:** *“${elevateSentence(s, 'literary')}”*`,
  };
}

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
  } else {
    res = res
      .replace(/\bwalked\b/gi, 'meandered')
      .replace(/\bsang\b/gi, 'intoned')
      .replace(/\blooked\b/gi, 'gazed with quiet contemplation')
      .replace(/\bquiet\b/gi, 'serene and undisturbed');
  }
  if (!/[.!?]$/.test(res)) res += '.';
  return res;
}

function getPolishedSentence(sentence: string): string {
  return sentence
    .replace(/\beach\s+of\s+the\s+(\w+)\s+have\b/gi, 'Each of the $1 has')
    .replace(/\bneither\s+of\s+the\s+(\w+)\s+were\b/gi, 'Neither of the $1 was')
    .replace(/\bneither\s+of\s+the\s+(\w+)\s+are\b/gi, 'Neither of the $1 is')
    .replace(/\b(did|didn't|did\s+not)\s+went\b/gi, '$1 go')
    .replace(/\b(did|didn't|did\s+not)\s+saw\b/gi, '$1 see')
    .replace(/\b(did|didn't|did\s+not)\s+knew\b/gi, '$1 know')
    .replace(/\ba\s+(apple|hour|honest|honourable|honorable|umbrella|elephant|island|abbot|ola|idea|orange)\b/gi, 'an $1')
    .replace(/\ban\s+(university|unique|uniform|european|useful)\b/gi, 'a $1')
    .replace(/\btheir\s+(is|are|was|were)\b/gi, 'there $1')
    .replace(/\bhe\s+don't\b/gi, "he doesn't")
    .replace(/\bshe\s+don't\b/gi, "she doesn't")
    .replace(/\bit\s+don't\b/gi, "it doesn't")
    .replace(/\bhe\s+go\b/gi, 'he goes')
    .replace(/\bshe\s+go\b/gi, 'she goes')
    .replace(/\bhe\s+have\b/gi, 'he has')
    .replace(/\bshe\s+have\b/gi, 'she has')
    .replace(/\bthey\s+is\b/gi, 'they are')
    .replace(/\b(i)\s+am\s+agree\b/gi, 'I agree')
    .replace(/\b(we|they)\s+are\s+agree\b/gi, '$1 agree')
    .replace(/\bdiscuss\s+about\b/gi, 'discuss')
    .replace(/\breturn\s+back\b/gi, 'return')
    .replace(/\bcomprise\s+of\b/gi, 'comprise')
    .replace(/\bdespite\s+of\b/gi, 'despite')
    .replace(/\bmore\s+better\b/gi, 'better')
    .replace(/\bmore\s+easier\b/gi, 'easier')
    .replace(/\binformations\b/gi, 'information')
    .replace(/\badvices\b/gi, 'advice')
    .replace(/\bfurnitures\b/gi, 'furniture')
    .replace(/\bequipments\b/gi, 'equipment')
    .replace(/\b(could|would|should|must|might)\s+of\b/gi, '$1 have')
    .replace(/\blook\s+forward\s+to\s+(see|meet|hear|go|visit|attend)\b/gi, (_, v) => `look forward to ${v}ing`)
    .replace(/\blooking\s+forward\s+to\s+(see|meet|hear|go|visit|attend)\b/gi, (_, v) => `looking forward to ${v}ing`)
    .trim();
}
