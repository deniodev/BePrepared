import { FastifyReply, FastifyRequest } from "fastify";
import { generateSixDigitsNumber } from "../utils/utils";
import { db } from "../database";

export class SubscriberController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { phone, provinceId, districtId } = request.body;

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

    return reply.status(201).send({
      subscriber: savedSubscriber,
      otp,
    });
  }
}
