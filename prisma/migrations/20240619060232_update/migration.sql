/*
  Warnings:

  - A unique constraint covering the columns `[userId,petId]` on the table `adoptionrequests` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "adoptionrequests_petId_key";

-- DropIndex
DROP INDEX "adoptionrequests_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "adoptionrequests_userId_petId_key" ON "adoptionrequests"("userId", "petId");
