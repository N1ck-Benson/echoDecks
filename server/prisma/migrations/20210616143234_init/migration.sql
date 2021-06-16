-- CreateTable
CREATE TABLE "Deck" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'New deck',
    "lemmas" TEXT[],
    "flashcards" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "dst" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasFlashcards" BOOLEAN NOT NULL DEFAULT true,
    "isLearned" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);
