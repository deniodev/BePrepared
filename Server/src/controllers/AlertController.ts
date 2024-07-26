import { FastifyReply, FastifyRequest } from "fastify";
import { getMessaging } from "firebase-admin/messaging";
import { z } from "zod";
import { db } from "../database";

export class AlertController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const alertSchema = z.object({
      title: z.string(),
      message: z.string(),
      provinceId: z.string(),
      districtId: z.string(),
    });

    try {
      // Validate request body
      const { title, message, districtId, provinceId } = alertSchema.parse(
        request.body
      );

      // Check if the district belongs to the province
      const district = await db.district.findUnique({
        where: {
          id: districtId,
          provinceId,
        },
      });

      if (!district) {
        return reply
          .status(400)
          .send({ error: "District does not belong to the province!" });
      }

      // Get subscribers' device IDs
      const subscribersDeviceIds = await db.subscriber.findMany({
        select: {
          deviceId: true,
        },
        where: {
          districtId,
          deviceId: {
            not: null,
          },
          verified: true,
        },
      });

      // Create alert in the database
      const alert = await db.alert.create({
        data: {
          title,
          message,
          districtId,
          provinceId,
        },
        select: {
          id: true,
          title: true,
          message: true,
          districtId: true,
          provinceId: true,
        },
      });

      const tokens = subscribersDeviceIds.map((deviceId) =>
        String(deviceId.deviceId)
      );

      if (tokens.length === 0) {
        console.log("No verified subscribers with device IDs found.");
        return reply.send(alert);
      }

      const alertNotification = {
        data: alert,
        tokens,
      };

      // Send notifications
      const response = await getMessaging().sendMulticast(alertNotification);
      console.log(`${response.successCount} messages were sent successfully`);

      return reply.send(alert);
    } catch (error) {
      console.error("Error creating alert:", error);

      if (error instanceof z.ZodError) {
        return reply
          .status(400)
          .send({ error: "Invalid input data", details: error.errors });
      }

      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    const querySchema = z.object({
      provinceId: z.string().optional(),
      districtId: z.string().optional(),
    });
    const { provinceId, districtId } = querySchema.parse(request.query);
    const alerts = await db.alert.findMany({
      where: {
        provinceId,
        districtId,
      },
      include: {
        province: true,
        district: true,
      },
    });
    return reply.send(alerts);
  }
}
