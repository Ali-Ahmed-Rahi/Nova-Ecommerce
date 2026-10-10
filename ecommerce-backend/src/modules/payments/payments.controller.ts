import { Request, Response } from "express";
import Stripe from "stripe";
import { env } from "../../config/env.js";
import { sendSuccess } from "../../utils/response.js";
import { createCheckoutSession, getPaymentById, handleWebhookEvent } from "./payments.service.js";

export const createSession = async (req: Request, res: Response) => {
  const session = await createCheckoutSession(req.body);
  res.status(201).json(sendSuccess("Checkout session created", session, 201));
};

export const getPayment = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const payment = await getPaymentById(id);
  res.json(sendSuccess("Payment fetched successfully", payment));
};

export const webhook = async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"] as string | undefined;
  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_WEBHOOK_SECRET || !signature) {
    return res.status(400).json({ success: false, message: "Invalid webhook request", errors: [], statusCode: 400 });
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  const event = stripe.webhooks.constructEvent(req.body as Buffer, signature, env.STRIPE_WEBHOOK_SECRET);
  await handleWebhookEvent(event);

  res.json({ received: true });
};
