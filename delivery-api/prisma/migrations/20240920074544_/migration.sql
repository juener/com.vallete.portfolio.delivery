/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codePhoneNumber` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "codePhoneNumber",
DROP COLUMN "id",
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phoneNumber_key" ON "Customer"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("phoneNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
