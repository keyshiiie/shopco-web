import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Получаем токен из куки
    const token = request.cookies.get('payload-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    // Запрашиваем данные пользователя у Payload
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Если токен невалидный, удаляем куку
      const nextResponse = NextResponse.json(
        { error: 'Сессия истекла' },
        { status: 401 }
      );
      nextResponse.cookies.delete('payload-token');
      return nextResponse;
    }

    const userData = await response.json();
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}