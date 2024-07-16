import { FastifyReply, FastifyRequest } from "fastify";
import { generateSixDigitsNumber } from "../utils/utils";

export class SubscriberController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { phone, provinceId, districtId } = request.body;

    const savedUser = { phone, provinceId, districtId };

    const otp = generateSixDigitsNumber();
    console.log(otp);

    return reply.status(201).send(savedUser);
  }
}
