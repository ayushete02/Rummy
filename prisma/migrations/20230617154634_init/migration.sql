-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rank" INTEGER,
    "amount_won" DECIMAL(10,2),
    "amount_lost" DECIMAL(10,2),
    "address" VARCHAR(42),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
