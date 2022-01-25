-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "reporter" TEXT,
    "createdAt" INTEGER NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "streetName" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "civicNumber" TEXT NOT NULL,
    "lotColor" TEXT NOT NULL,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);
