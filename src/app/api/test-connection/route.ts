import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ 
      status: 'success', 
      message: '数据库连接成功' 
    });
  } catch (error) {
    console.error('Connection test error:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: error instanceof Error ? error.message : '连接失败' 
    }, { 
      status: 500 
    });
  }
} 