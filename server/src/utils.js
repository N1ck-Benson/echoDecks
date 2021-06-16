function flashcardBuilder(lingueeData) {
  const newFlashcards = lingueeData.map((example) => {
    const flashcard = {
      example: example.text,
      translation: example.translations[0].text,
    };
    return flashcard;
  });
  return newFlashcards;
}

module.exports = { flashcardBuilder };
