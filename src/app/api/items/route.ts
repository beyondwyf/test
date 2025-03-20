import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Item from '@/models/Item';

export async function GET() {
  try {
    // 确保在进行任何数据库操作之前完成连接
    await dbConnect();

    // 等待数据库查询完成
    const items = await Item.find({}).sort({ createdAt: -1 }).lean();
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : '数据库连接失败',
        details: error instanceof Error ? error.stack : null
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await dbConnect();
    
    const newItem = await Item.create({
      name: data.name,
      description: data.description
    });
    
    return NextResponse.json({ item: newItem }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
} 