-- CreateTable
CREATE TABLE "Deck" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'New deck',
    "description" TEXT,
    "lemmas" TEXT[],
    "flashcards" TEXT[],
    "src" TEXT NOT NULL,
    "dst" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasFlashcards" BOOLEAN NOT NULL DEFAULT false,
    "isLearned" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flashcard" (
    "id" SERIAL NOT NULL,
    "lemma" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "isLearned" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);
