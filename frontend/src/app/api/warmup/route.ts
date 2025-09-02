import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Warmup completed' }, { status: 200 });
}
