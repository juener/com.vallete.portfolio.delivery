/*
  Warnings:

  - You are about to drop the column `userId` on the `restaurants` table. All the data in the column will be lost.
  - Added the required column `managerId` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "restaurants" DROP CONSTRAINT "restaurants_userId_fkey";

-- AlterTable
ALTER TABLE "restaurants" DROP COLUMN "userId",
ADD COLUMN     "managerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
