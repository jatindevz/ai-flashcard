// type Flashcard = {
//   question: string;
//   answer: string;
// };


// function parseFlashcardsFromMessage(message: string): Flashcard[] {
//     const flashcards: Flashcard[] = [];
    
//     // Regex to match Q: and A: pairs (supports bold Q/A as well)
//     const regex = /\*\*Q:\*\* (.+?)\s+\*\*A:\*\* (.+?)(?=(\n\d+\.|\n$))/gs;
  
//     let match;
//     while ((match = regex.exec(message)) !== null) {
//       const question = match[1].trim();
//       const answer = match[2].trim();
//       flashcards.push({ question, answer });
//     }
  
//     return flashcards;
//   }
  
//   const jsonResponse = {
//     message: `Here are 5 flashcards based on the content about photosynthesis:  
  
//   1. **Q:** What is photosynthesis?  
//      **A:** Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll.  
  
//   2. **Q:** Where does photosynthesis primarily occur in plant cells?  
//      **A:** Photosynthesis primarily occurs in the chloroplasts of plant cells.  
  
//   3. **Q:** What are the reactants (inputs) needed for photosynthesis?  
//      **A:** The reactants are carbon dioxide (CO₂), water (H₂O), and sunlight energy.  
  
//   4. **Q:** What are the products (outputs) of photosynthesis?  
//      **A:** The products are glucose (C₆H₁₂O₆) and oxygen (O₂).  
  
//   5. **Q:** What is the overall chemical equation for photosynthesis?  
//      **A:** The equation is: **6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂**`
//   };
  
//   const flashcards = parseFlashcardsFromMessage(jsonResponse.message);
//   console.log(flashcards);
  


// export const BasicPrompt = "Generate flashcards in the form of question and answer pairs based on the following content: [USER_INPUT_TEXT] Each flashcard should test a key concept, fact, or definition. Output 10 flashcards in the format: Q: [Question]A: [Answer]"

// export const BasicPrompts = `
// You are an AI assistant that generates flashcards based on any input provided by the user. 
// Create 10 question-and-answer flashcards from the following input: [USER_INPUT_TEXT]
// The flashcards should help with learning or reviewing the key ideas, facts, definitions, or concepts found in the input. 
// Use clear and concise language. Structure the output like this:
// Each Question and Answer should be separated by '||'

// Question: [Question]
// Answer: [Answer]

// If the input is a topic or title, infer relevant subtopics and generate helpful flashcards accordingly.
// `;

// "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll. This process primarily occurs in the chloroplasts of plant cells. Carbon dioxide and water are converted into glucose and oxygen using sunlight. The overall equation for photosynthesis is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂"


interface Flashcard {
  Q: string;
  A: string;
}

export const flashcardsdemo: Flashcard[] = [
    {
      Q: "What is photosynthesis?",
      A: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll."
    },
    {
      Q: "Where does photosynthesis primarily occur in plant cells?",
      A: "Photosynthesis primarily occurs in the chloroplasts of plant cells."
    },
    {
      Q: "What are the reactants (inputs) needed for photosynthesis?",
      A: "The reactants are carbon dioxide (CO₂), water (H₂O), and sunlight energy."
    },
    {
      Q: "What are the products (outputs) of photosynthesis?",
      A: "The products are glucose (C₆H₁₂O₆) and oxygen (O₂)."
    },
    {
      Q: "What is the overall chemical equation for photosynthesis?",
      A: "The equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂"
    },
    {
      Q: "Why is chlorophyll important in photosynthesis?",
      A: "Chlorophyll absorbs light energy, which drives the photosynthesis process."
    },
    {
      Q: "During which part of the day does photosynthesis usually occur?",
      A: "Photosynthesis typically occurs during the daytime when sunlight is available."
    },
    {
      Q: "What role does water play in photosynthesis?",
      A: "Water provides electrons and hydrogen ions and is split to release oxygen as a byproduct."
    },
    {
      Q: "What gas is taken in and what gas is released during photosynthesis?",
      A: "Carbon dioxide (CO₂) is taken in, and oxygen (O₂) is released."
    },
    {
      Q: "Why is photosynthesis vital for life on Earth?",
      A: "It produces oxygen for respiration and forms the base of the food chain by producing glucose."
    }
  ];
  
  type generatePrompt = {
    text: string;
    count: string;
    type: string
  };

  export  function generatePrompt( {count , type , text }: generatePrompt) : string {
    const Easy = `Create ${count} simple flashcards for beginners focusing on fundamental concepts. Follow this exact format:
<FLASHCARDS>
Q: [Clear, straightforward question using basic vocabulary]
A: [Concise answer - maximum 10 words]
---
</FLASHCARDS>

Guidelines:
- Use simple language suitable for children/early learners
- Focus on concrete facts rather than abstract concepts
- Include basic examples where helpful
- Prioritize memorization of key terms and definitions

Input: ${text}`

const Medium = `Generate ${count} intermediate flashcards that require comprehension. Format precisely:
<FLASHCARDS>
Q: [Question requiring explanation or application]
A: [2-3 sentence answer with key details]
--- 
</FLASHCARDS>

Special Requirements:
- Include "Why" or "How" questions for deeper understanding
- Answers should connect concepts to real-world examples
- Use domain-specific terminology appropriately
- 30% of questions should involve simple comparisons

Input: ${text}`

const Hard = `Produce ${count} advanced flashcards for expert learners. Strict formatting:
<FLASHCARDS>
Q: [Open-ended question requiring analysis/synthesis]
A: [Paragraph-length answer with multiple facets]
---
</FLASHCARDS>

Advanced Features:
- Include hypothetical scenarios ("What would happen if...")
- Require evaluation of tradeoffs or multiple perspectives
- Incorporate data interpretation where applicable
- 2-3 questions should challenge common assumptions

Input: ${text}`


    switch (type) {
      case 'easy':
        return Easy
      case 'medium':
        return Medium
      case 'hard':
        return Hard
      default:
        return Easy
    }
  }