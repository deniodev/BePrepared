/*
  Warnings:

  - A unique constraint covering the columns `[device_id]` on the table `subscribers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subscribers_device_id_key" ON "subscribers"("device_id");
