-- CreateTable
CREATE TABLE "restaurants" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
