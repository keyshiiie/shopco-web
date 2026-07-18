import { NextResponse } from 'next/server';

export async function POST() {
  const nextResponse = NextResponse.json({ success: true });
  
  // Удаляем куку с токеном
  nextResponse.cookies.delete('payload-token');
  
  return nextResponse;
}