import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Item from '@/models/Item';

export async function GET() {
  try {
    await dbConnect();

    // Clear existing items
    await Item.deleteMany({});

    // Create sample items
    const sampleItems = [
      {
        name: 'Sample Item 1',
        description: 'This is a description for sample item 1'
      },
      {
        name: 'Sample Item 2',
        description: 'This is a description for sample item 2'
      },
      {
        name: 'Sample Item 3',
        description: 'This is a description for sample item 3'
      }
    ];

    await Item.insertMany(sampleItems);

    return NextResponse.json({ 
      message: 'Database seeded successfully',
      count: sampleItems.length
    }, { status: 200 });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
} 