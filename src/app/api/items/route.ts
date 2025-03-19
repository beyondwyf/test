import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Item from '@/models/Item';

export async function GET() {
  try {
    await dbConnect();
    const items = await Item.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
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