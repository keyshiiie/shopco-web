import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Отправляем запрос к Payload API для входа
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.errors?.[0]?.message || 'Неверный email или пароль' },
        { status: response.status }
      );
    }

    // Создаем ответ и устанавливаем HTTP-only cookie с токеном
    const nextResponse = NextResponse.json({ user: data.user, success: true });

    // Устанавливаем куку с токеном
    nextResponse.cookies.set({
      name: 'payload-token',
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 дней
    });

    return nextResponse;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}