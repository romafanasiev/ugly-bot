export type QuestionType = "timed" | "scratch" | "confirm-flood" | "guessbutton" | "sliders" | "fading" | "";

export type Answer = {
  text: string;
  isCorrect: boolean;
};

export type Question = {
  question: string;
  answers: Answer[];
};

export const questions: Question[] = [
  {
    question: "What's the best way to manage production code?",
    answers: [
      { text: "Push directly to main on Friday night", isCorrect: true },
      { text: "Follow CI/CD with tests", isCorrect: false },
      { text: "Do proper code review", isCorrect: false },
      { text: "Deploy first, debug later", isCorrect: true },
    ],
  },
  {
    question: "Your teammate suggests a hotfix at 2 AM. What’s the best response?",
    answers: [
      { text: "Say 'LGTM' and go back to sleep", isCorrect: true },
      { text: "Deploy directly to prod — what could go wrong?", isCorrect: true },
      { text: "Wait for morning standup", isCorrect: false },
      { text: "Push to staging like a coward", isCorrect: false },
    ],
  },
  {
    question: "What’s the best way to name variables?",
    answers: [
      { text: "Use descriptive names", isCorrect: false },
      { text: "Follow company naming conventions", isCorrect: false },
      { text: "x, y, z everywhere", isCorrect: true },
      { text: "temp_final_v3_real", isCorrect: true },
    ],
  },
  {
    question: "What’s the proper way to estimate a feature?",
    answers: [
      { text: "Say '2 hours' and regret it for 2 weeks", isCorrect: true },
      { text: "Multiply by π and call it agile", isCorrect: true },
      { text: "Break down into subtasks & story points", isCorrect: false },
      { text: "Consider risks & dependencies", isCorrect: false },
    ],
  },
  {
    question: "What’s the real purpose of daily stand-ups?",
    answers: [
      { text: "Quick team sync", isCorrect: false },
      { text: "Pretending everything’s fine", isCorrect: true },
      { text: "Practicing collective suffering", isCorrect: true },
      { text: "Sharing progress and blockers", isCorrect: false },
    ],
  },
  {
    question: "What’s the first step in refactoring legacy code?",
    answers: [
      { text: "Asking “who wrote this?”", isCorrect: true },
      { text: "Realizing it was you six months ago", isCorrect: true },
      { text: "Reading the documentation", isCorrect: false },
      { text: "Making a backup", isCorrect: false },
    ],
  },
  {
    question: "Why does every app need a dark mode?",
    answers: [
      { text: "It hides our design sins", isCorrect: true },
      { text: "It’s easier on the eyes", isCorrect: false },
      { text: "It mirrors my developer soul", isCorrect: true },
      { text: "It looks stylish", isCorrect: false },
    ],
  },
  {
    question: "What’s the true meaning of “ASAP”?",
    answers: [
      { text: "As soon as convenient", isCorrect: false },
      { text: "As soon as panic starts", isCorrect: true },
      { text: "As soon as burnout ends", isCorrect: true },
      { text: "As soon as possible", isCorrect: false },
    ],
  },
  {
    question: "How do project managers measure success?",
    answers: [
      { text: "Number of Jira tickets closed", isCorrect: true },
      { text: "Meeting deadlines", isCorrect: false },
      { text: "Client satisfaction", isCorrect: false },
      { text: "How many people haven’t rage-quit yet", isCorrect: true },
    ],
  },
  {
    question: "How do you handle deadlines?",
    answers: [
      { text: "I deliver something… not necessarily what was asked.", isCorrect: true },
      { text: "I deliver pain and chaos to everyone involved.", isCorrect: true },
      { text: "I plan carefully and deliver on time.", isCorrect: false },
      { text: "I work late to make it happen.", isCorrect: false },
    ],
  },
  {
    question: "How do you feel about meetings?",
    answers: [
      { text: "I schedule fake meetings to avoid real ones.", isCorrect: true },
      { text: "They’re useful for alignment.", isCorrect: false },
      { text: "I mentally leave after 5 minutes.", isCorrect: true },
      { text: "They’re tolerable with coffee.", isCorrect: false },
    ],
  },
  {
    question: "What’s your first reaction to client feedback?",
    answers: [
      { text: "They don’t know what they want.", isCorrect: true },
      { text: "Let’s clarify what they really mean.", isCorrect: false },
      { text: "Maybe if I ignore it, it’ll go away.", isCorrect: true },
      { text: "Great, let’s improve it.", isCorrect: false },
    ],
  },
  {
    question: "The product owner says “we need this by tomorrow.”",
    answers: [
      { text: "I explain it’s not realistic.", isCorrect: false },
      { text: "I try to negotiate.", isCorrect: false },
      { text: "I say “okay” and panic quietly.", isCorrect: true },
      { text: "I copy ChatGPT output and deploy.", isCorrect: true },
    ],
  },
  {
    question: "What’s your response when someone says “let’s rewrite it from scratch”?",
    answers: [
      { text: "I assess the pros and cons.", isCorrect: false },
      { text: "I laugh nervously and pretend to agree.", isCorrect: true },
      { text: "I start updating my résumé.", isCorrect: true },
      { text: "I say “maybe next quarter.”", isCorrect: false },
    ],
  },
  {
    question: "How do you feel about sprint retrospectives?",
    answers: [
      { text: "A chance to say “communication could be better” again.", isCorrect: true },
      { text: "Great way to improve the process.", isCorrect: false },
      { text: "The circle of suffering where nothing changes.", isCorrect: true },
      { text: "A polite therapy session for the team.", isCorrect: false },
    ],
  },
  {
    question: "What do you do when deadlines are on fire?",
    answers: [
      { text: "I prioritize tasks and stay focused.", isCorrect: false },
      { text: "I pull a few late nights to save the sprint.", isCorrect: false },
      { text: "I panic-commit everything and hope for mercy.", isCorrect: true },
      { text: "I say “Sorry, can’t — Battlefield and ARC Raiders just dropped.”", isCorrect: true },
    ],
  },
];

