import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI 环境变量未设置');
    }

    console.log('正在测试数据库连接...');
    await mongoose.connect(MONGODB_URI);
    console.log('数据库连接测试成功');
    await mongoose.disconnect();

    return NextResponse.json({ 
      success: true, 
      message: '数据库连接测试成功',
      uri: MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@') // 隐藏敏感信息
    });
  } catch (error) {
    console.error('数据库连接测试失败:', error);
    return NextResponse.json({ 
      success: false, 
      error: '数据库连接测试失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
} 