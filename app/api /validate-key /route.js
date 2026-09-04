import { NextResponse } from 'next/server';
import { validateApiKey } from '../../../lib/gemini';

export async function POST(req) {
  try {
    const { apiKey } = await req.json();
    if (!apiKey || apiKey.trim().length < 10) {
      return NextResponse.json({ valid: false, error: 'API key kosong atau terlalu pendek' }, { status: 400 });
    }
    const result = await validateApiKey(apiKey.trim());
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ valid: false, error: err.message || 'Terjadi kesalahan di server' }, { status: 500 });
  }
}
