import { FastifyReply, FastifyRequest } from "fastify";
import { generateSixDigitsNumber } from "../utils/utils";
import { db } from "../database";
import { z } from "zod";
import { redis } from "../database/redis";

export class SubscriberController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const subscriberSchema = z.object({
      phone: z.string().regex(/^8[2-7]\d{7}/),
      provinceId: z.string(),
      districtId: z.string(),
    });
    const { phone, provinceId, districtId } = subscriberSchema.parse(
      request.body
    );

    const subscriberExists = await db.subscriber.findUnique({
      where: { phone: String(phone) },
    });
    if (subscriberExists) {
      return reply.status(401).send({ error: "Usuario ja existente!" });
    }

    const district = await db.district.findUnique({
      where: {
        id: districtId,
        provinceId,
      },
    });
    if (!district) {
      return reply
        .status(400)
        .send({ error: "Distrito nao pertence a provincia!" });
    }

    const savedSubscriber = await db.subscriber.create({
      data: {
        phone,
        districtId,
        provinceId,
      },
    });

    const otp = generateSixDigitsNumber();
    console.log(otp);
    await redis.set(`otp_${otp}`, phone, 60 * 3);

    return reply.status(201).send(savedSubscriber);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const deviceId = z.string().parse(request.headers.authorization);
    const subscriberSchema = z.object({
      provinceId: z.string().optional(),
      districtId: z.string().optional(),
    });
    const { provinceId, districtId } = subscriberSchema.parse(request.body);

    const subscriber = await db.subscriber.findUnique({
      where: {
        deviceId,
        verified: true,
      },
    });

    if (!subscriber)
      return reply.status(401).send({ error: "Erro de Autenticacao!" });

    const district = await db.district.findUnique({
      where: {
        id: districtId,
        provinceId,
      },
    });
    if (!district) {
      return reply
        .status(400)
        .send({ error: "Distrito nao pertence a provincia" });
    }

    const updatedSubscriber = await db.subscriber.update({
      where: {
        deviceId,
      },
      data: {
        provinceId,
        districtId,
      },
    });

    return reply.send(updatedSubscriber);
  }
}
