import db from '@/database/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request, context) {
    const params = context.params;
    const id = params.id;
    // console.log(id);

    // const questao = await db.query(
    //     "SELECT * FROM questao WHERE questao.id = ?;",
    //     [id]
    // )

    NextResponse.json({ message: id });
}