import Stripe from "stripe";
import { prisma } from "../../config/database.js";
import { env } from "../../config/env.js";
import { AppError } from "../../errors/AppError.js";

const stripe = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY) : null;

export const createCheckoutSession = async (payload: { orderId?: string; amount?: number; currency?: string }) => {
  if (!stripe) {
    return { url: "/checkout/fallback", sessionId: "demo-session" };
  }

  const amount = payload.amount ?? 100;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price_data: { currency: payload.currency ?? "usd", unit_amount: Math.round(amount * 100), product_data: { name: "Order Payment" } }, quantity: 1 }],
    success_url: `${env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.CLIENT_URL}/checkout/cancel`,
  });

  return { sessionId: session.id, url: session.url };
};

export const getPaymentById = async (id: string) => {
  const payment = await prisma.payment.findUnique({ where: { id }, include: { order: true } });
  if (!payment) throw new AppError("Payment not found", 404);
  return payment;
};

export const handleWebhookEvent = async (event: unknown) => {
  const eventType = (event as { type?: string }).type;
  const data = (event as { data?: { object?: { metadata?: { orderId?: string }; id?: string } } }).data?.object;

  if (eventType === "checkout.session.completed") {
    const orderId = data?.metadata?.orderId;
    if (orderId) {
      await prisma.payment.updateMany({ where: { orderId }, data: { status: "PAID" } });
      await prisma.order.update({ where: { id: orderId }, data: { status: "PAID" } });
    }
  }

  return { received: true };
};
