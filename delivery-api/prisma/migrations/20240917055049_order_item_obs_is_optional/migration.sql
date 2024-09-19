-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OrderItems" ALTER COLUMN "obs" DROP NOT NULL;
