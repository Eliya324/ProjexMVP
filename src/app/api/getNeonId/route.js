import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getNeonIdFromClerkId } from '@/lib/clerkToNeon'; // ודא שזה הנתיב הנכון

export async function GET() {
  try {
 const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const neonId = await getNeonIdFromClerkId(userId);
    return NextResponse.json({ neonId });
  } catch (error) {
    console.error('Error getting Neon ID:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
