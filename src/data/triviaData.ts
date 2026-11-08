export interface TriviaQuestion {
  id: string;
  category: 'Shakespeare' | 'Classical Literature' | 'Figures of Speech' | 'Poetry & Metrics' | 'Sri Lankan English Letters' | 'Vocabulary & Etymology';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  literaryContext: string;
}

export const LITERARY_TRIVIA_BANK: TriviaQuestion[] = [
  {
    id: 'triv-1',
    category: 'Shakespeare',
    question: 'In Shakespeare’s "Hamlet", which character utters the famous line: "To thine own self be true"?',
    options: ['Horatio', 'Polonius', 'Claudius', 'Laertes'],
    correctIndex: 1,
    explanation: 'Polonius dispenses this classic fatherly advice to his son Laertes in Act I, Scene 3, as Laertes prepares to depart for France.',
    literaryContext: 'Act I, Scene 3 of Hamlet (1601). While Polonius is often characterized as a tedious courtier, his farewell speech remains one of the most widely quoted passages on personal integrity in English literature.'
  },
  {
    id: 'triv-2',
    category: 'Vocabulary & Etymology',
    question: 'The English word "Serendipity" was coined by Horace Walpole in 1754 based on an ancient Persian name for which country?',
    options: ['India', 'Sri Lanka (Ceylon)', 'Egypt', 'Persia'],
    correctIndex: 1,
    explanation: 'Walpole coined "Serendipity" from "Serendip", the ancient Persian and Arabic name for Sri Lanka, inspired by the fairy tale "The Three Princes of Serendip".',
    literaryContext: 'Horace Walpole correspondence (1754). The protagonists were continually discovering things they were not looking for through fortunate happenstance and acute sagacity.'
  },
  {
    id: 'triv-3',
    category: 'Poetry & Metrics',
    question: 'What is the metric structure of an unrhymed line of Iambic Pentameter commonly used by Shakespeare and Marlowe?',
    options: ['Free Verse', 'Blank Verse', 'Ballad Meter', 'Alexandrine'],
    correctIndex: 1,
    explanation: 'Unrhymed iambic pentameter is strictly termed "Blank Verse". It consists of five metric feet per line, alternating unstressed and stressed syllables (da-DUM da-DUM da-DUM da-DUM da-DUM).',
    literaryContext: 'Adopted in English by the Earl of Surrey in the 1540s, blank verse became the primary vehicle for Elizabethan and Jacobean drama and John Milton’s epic Paradise Lost.'
  },
  {
    id: 'triv-4',
    category: 'Classical Literature',
    question: 'Which celebrated 19th-century novel opens with: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife"?',
    options: ['Jane Eyre by Charlotte Brontë', 'Wuthering Heights by Emily Brontë', 'Pride and Prejudice by Jane Austen', 'Middlemarch by George Eliot'],
    correctIndex: 2,
    explanation: 'Jane Austen begins "Pride and Prejudice" (1813) with this iconic masterpiece of irony, setting up her satirical critique of Regency-era social class and matrimonial economics.',
    literaryContext: 'Chapter 1, Pride and Prejudice (1813). It is celebrated as one of the most famous opening sentences in world literature.'
  },
  {
    id: 'triv-5',
    category: 'Figures of Speech',
    question: 'The phrase "deafening silence" or "cruel kindness" is a classical example of which literary device?',
    options: ['Hyperbole', 'Oxymoron', 'Synecdoche', 'Litotes'],
    correctIndex: 1,
    explanation: 'An oxymoron juxtaposes two seemingly contradictory or opposite terms side-by-side to reveal a paradoxical or deeper truth.',
    literaryContext: 'From ancient Greek "oxumōron", combining "oxus" (sharp/clever) and "mōros" (foolish/dull)—the word itself is an oxymoron!'
  },
  {
    id: 'triv-6',
    category: 'Shakespeare',
    question: 'In "Macbeth", what natural event does the prophecy claim must occur before Macbeth can be defeated?',
    options: ['The Thames river must freeze solid', 'Birnam Wood must move to Dunsinane Hill', 'A comet must blaze across Edinburgh', 'The castle bells must strike thirteen'],
    correctIndex: 1,
    explanation: 'The Apparition tells Macbeth: "Macbeth shall never vanquish\'d be until Great Birnam Wood to high Dunsinane hill shall come against him." Malcolm\'s soldiers later fulfill this by camouflaging themselves with branches from Birnam Wood.',
    literaryContext: 'Macbeth, Act IV, Scene 1 and Act V, Scene 4.'
  },
  {
    id: 'triv-7',
    category: 'Sri Lankan English Letters',
    question: 'Which prominent Sri Lankan poet authored the celebrated culturally defiant poem "Don\'t Talk to Me About Matisse"?',
    options: ['Yasmine Gooneratne', 'Lakdhas Wikkramasinha', 'Patrick Fernando', 'Jean Arasanayagam'],
    correctIndex: 1,
    explanation: 'Lakdhas Wikkramasinha (1941–1978) wrote "Don\'t Talk to Me About Matisse", a powerful assertion of indigenous cultural identity and anti-colonial literary pride.',
    literaryContext: 'A foundational landmark in modern Sri Lankan English poetry, challenging Eurocentric aesthetic hegemony.'
  },
  {
    id: 'triv-8',
    category: 'Figures of Speech',
    question: 'When an author deliberately understates an affirmation by negating its opposite (e.g., "He is no ordinary scholar" to mean "He is extraordinary"), what figure of speech is used?',
    options: ['Litotes', 'Metonymy', 'Apostrophe', 'Euphemism'],
    correctIndex: 0,
    explanation: 'Litotes is an intentional understatement wherein an affirmative is expressed by negating its contrary (e.g., "Not bad at all", "She is no fool").',
    literaryContext: 'Widely used in Anglo-Saxon heroic poetry (such as Beowulf) and classical Latin rhetoric to project dry wit or emphatic restraint.'
  },
  {
    id: 'triv-9',
    category: 'Classical Literature',
    question: 'In George Orwell’s dystopian masterpiece "1984", what is the official language designed to eliminate unorthodox political thought?',
    options: ['Oldspeak', 'Newspeak', 'Doublespeak', 'Party-script'],
    correctIndex: 1,
    explanation: 'Newspeak is the totalitarian language engineered by Ingsoc in Oceania to narrow the range of human thought, making "thoughtcrime" literally impossible to formulate.',
    literaryContext: 'Appendix: "The Principles of Newspeak", 1984 (published 1949).'
  },
  {
    id: 'triv-10',
    category: 'Shakespeare',
    question: 'Which of Shakespeare’s plays features the character Caliban, an indigenous island inhabitant enslaved by the sorcerer Prospero?',
    options: ['The Tempest', 'The Winter’s Tale', 'Pericles', 'Cymbeline'],
    correctIndex: 0,
    explanation: 'Caliban is a central character in "The Tempest" (1611), frequently analyzed in post-colonial literature as an emblem of colonized peoples resisting linguistic and cultural subjugation.',
    literaryContext: 'Caliban’s famous rebuke to Prospero: "You taught me language, and my profit on\'t is, I know how to curse."'
  },
  {
    id: 'triv-11',
    category: 'Vocabulary & Etymology',
    question: 'What is the geological origin of the English mineral word "Tourmaline"?',
    options: ['From the Latin "turris" (tower)', 'From the Sinhala gemological word "Thoramalli" (තෝරමල්ලි)', 'From the French city of Tours', 'From ancient Greek "tyrannos"'],
    correctIndex: 1,
    explanation: 'Tourmaline derives directly from the Sinhala word "Thoramalli" (තෝරමල්ලි), brought to Europe by Dutch merchants from the gem pits of Sri Lanka in the early 18th century.',
    literaryContext: 'Recognized in the Oxford English Dictionary as one of the direct English loanwords originating from Sri Lankan mineralogy.'
  },
  {
    id: 'triv-12',
    category: 'Poetry & Metrics',
    question: 'How many lines comprise a traditional Shakespearean (English) sonnet, and what is its concluding metric feature?',
    options: ['12 lines ending in a triplet', '14 lines ending in a rhyming heroic couplet', '16 lines ending in an envoi', '10 lines ending in a refrain'],
    correctIndex: 1,
    explanation: 'A Shakespearean sonnet contains exactly 14 lines in iambic pentameter: three quatrains followed by a punchy rhyming couplet (rhyme scheme: ABAB CDCD EFEF GG).',
    literaryContext: 'Shakespeare authored 154 sonnets exploring beauty, mortality, love, and the transcendent immortalizing power of verse.'
  }
];

export function getDailyTriviaQuestions(count = 5, seedOffset = 0): TriviaQuestion[] {
  // Rotate smoothly based on the day of the year + optional user round offset
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const startIndex = (dayOfYear * 3 + seedOffset * count) % LITERARY_TRIVIA_BANK.length;

  const result: TriviaQuestion[] = [];
  for (let i = 0; i < count; i++) {
    result.push(LITERARY_TRIVIA_BANK[(startIndex + i) % LITERARY_TRIVIA_BANK.length]);
  }
  return result;
}
