-- CreateTable
CREATE TABLE "public"."Weapon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "levelReq" INTEGER NOT NULL DEFAULT 0,
    "atk" INTEGER NOT NULL DEFAULT 0,
    "atkElemental" INTEGER NOT NULL DEFAULT 0,
    "hands" TEXT NOT NULL DEFAULT 'one-handed',
    "imbuementSlots" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WeaponPriceQuote" (
    "id" TEXT NOT NULL,
    "weaponId" TEXT NOT NULL,
    "minPrice" DOUBLE PRECISION NOT NULL,
    "maxPrice" DOUBLE PRECISION NOT NULL,
    "notedAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeaponPriceQuote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Weapon_name_key" ON "public"."Weapon"("name");

-- CreateIndex
CREATE INDEX "WeaponPriceQuote_weaponId_idx" ON "public"."WeaponPriceQuote"("weaponId");

-- AddForeignKey
ALTER TABLE "public"."WeaponPriceQuote" ADD CONSTRAINT "WeaponPriceQuote_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "public"."Weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
