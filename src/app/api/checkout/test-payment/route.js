import { NextResponse } from "next/server";

import { completeTestPayment } from "@/services/checkout/complete-test-payment";

export async function POST(request) {
  try {
    const body = await request.json();

    const orderId = Number(body.orderId);

    if (!Number.isSafeInteger(orderId) || orderId <= 0) {
      return NextResponse.json(
        {
          error: "شناسه سفارش نامعتبر است.",
        },
        {
          status: 400,
        },
      );
    }

    const payment = await completeTestPayment(orderId);

    return NextResponse.json(payment);
  } catch (error) {
    console.error("POST /api/checkout/test-payment:", error);

    const code = error?.message || error?.code;

    if (code === "AUTH_REQUIRED") {
      return NextResponse.json(
        {
          error: "برای ادامه باید وارد حساب کاربری شوید.",
        },
        {
          status: 401,
        },
      );
    }

    if (code === "ORDER_NOT_FOUND") {
      return NextResponse.json(
        {
          error: "سفارش پیدا نشد.",
        },
        {
          status: 404,
        },
      );
    }

    if (code === "ORDER_NOT_PAYABLE") {
      return NextResponse.json(
        {
          error: "این سفارش قابل پرداخت نیست.",
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        error: "پرداخت انجام نشد.",
      },
      {
        status: 500,
      },
    );
  }
}
