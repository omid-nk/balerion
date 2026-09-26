import { NextResponse } from "next/server";

import { createOrder } from "@/services/checkout/create-order";

export async function POST(request) {
  try {
    const body = await request.json();

    const courseIds = Array.isArray(body.courseIds)
      ? body.courseIds
          .map(Number)
          .filter((id) => Number.isSafeInteger(id) && id > 0)
      : [];

    const uniqueCourseIds = [...new Set(courseIds)];

    if (!uniqueCourseIds.length) {
      return NextResponse.json(
        {
          error: "سبد خرید خالی است.",
        },
        {
          status: 400,
        },
      );
    }

    const order = await createOrder(uniqueCourseIds);

    return NextResponse.json(order);
  } catch (error) {
    console.error("POST /api/checkout/create-order:", error);

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

    if (code === "EMPTY_CART") {
      return NextResponse.json(
        {
          error: "سبد خرید خالی است.",
        },
        {
          status: 400,
        },
      );
    }

    if (code === "INVALID_COURSE") {
      return NextResponse.json(
        {
          error: "یکی از دوره‌های سبد خرید دیگر قابل خرید نیست.",
        },
        {
          status: 400,
        },
      );
    }

    if (code === "ALREADY_ENROLLED") {
      return NextResponse.json(
        {
          error: "شما قبلاً در یکی از دوره‌های انتخاب‌شده ثبت‌نام کرده‌اید.",
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        error: "ایجاد سفارش انجام نشد.",
      },
      {
        status: 500,
      },
    );
  }
}
