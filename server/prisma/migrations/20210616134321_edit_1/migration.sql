/*
  Warnings:

  - You are about to drop the column `description` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `flashcards` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `lemma` on the `Flashcard` table. All the data in the column will be lost.
  - Added the required column `deckId` to the `Flashcard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "description",
DROP COLUMN "flashcards",
ALTER COLUMN "hasFlashcards" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Flashcard" DROP COLUMN "lemma",
ADD COLUMN     "deckId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "FlashcardInput" (
    "id" SERIAL NOT NULL,
    "example" TEXT NOT NULL,
    "translation" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FlashcardInput.id_unique" ON "FlashcardInput"("id");

-- AddForeignKey
ALTER TABLE "Flashcard" ADD FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
