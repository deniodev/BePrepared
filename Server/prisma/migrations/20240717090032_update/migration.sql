-- AddForeignKey
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
