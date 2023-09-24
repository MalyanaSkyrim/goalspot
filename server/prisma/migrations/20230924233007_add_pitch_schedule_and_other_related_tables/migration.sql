-- CreateEnum
CREATE TYPE "SurfaceTypeEnum" AS ENUM ('asphalt', 'naturalGrass', 'syntheticGrass');

-- CreateTable
CREATE TABLE "Pitch" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "hasBall" BOOL NOT NULL,
    "hasShower" BOOL NOT NULL,
    "hasShirts" BOOL NOT NULL,
    "hasReferee" BOOL NOT NULL,
    "maxTeamPlayers" INT4 NOT NULL,
    "userId" STRING NOT NULL,
    "surfaceType" "SurfaceTypeEnum" NOT NULL,
    "locationId" STRING,
    "pricePerHour" INT4 NOT NULL,

    CONSTRAINT "Pitch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PitchLocation" (
    "id" STRING NOT NULL,
    "latitude" INT4 NOT NULL,
    "longitude" INT4 NOT NULL,
    "address" STRING NOT NULL,

    CONSTRAINT "PitchLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PitchImage" (
    "id" STRING NOT NULL,
    "url" STRING NOT NULL,
    "pitchId" STRING NOT NULL,

    CONSTRAINT "PitchImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" STRING NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" INT4 NOT NULL,
    "weekly" BOOL NOT NULL,
    "userId" STRING NOT NULL,
    "pitchId" STRING NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pitch_locationId_key" ON "Pitch"("locationId");

-- AddForeignKey
ALTER TABLE "Pitch" ADD CONSTRAINT "Pitch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pitch" ADD CONSTRAINT "Pitch_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "PitchLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitchImage" ADD CONSTRAINT "PitchImage_pitchId_fkey" FOREIGN KEY ("pitchId") REFERENCES "Pitch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_pitchId_fkey" FOREIGN KEY ("pitchId") REFERENCES "Pitch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
