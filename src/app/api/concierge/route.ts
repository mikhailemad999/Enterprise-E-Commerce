import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const consultations = await query(
      `SELECT * FROM concierge_consultations ORDER BY id DESC`
    );
    return NextResponse.json({ success: true, consultations });
  } catch (error: any) {
    console.error('API Concierge GET Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      client_name,
      email,
      phone,
      project_type,
      budget_range,
      architectural_style,
      rooms,
      preferred_date,
      notes,
    } = body;

    const res: any = await query(
      `INSERT INTO concierge_consultations (
        client_name, email, phone, project_type, budget_range,
        architectural_style, rooms_json, preferred_date, notes, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'inquiry_received')`,
      [
        client_name,
        email,
        phone,
        project_type || 'Private Residence',
        budget_range || '150,000 - 500,000 EGP',
        architectural_style || 'Modern Minimalist',
        JSON.stringify(rooms || []),
        preferred_date || null,
        notes || '',
      ]
    );

    return NextResponse.json({
      success: true,
      consultation_id: res.insertId,
      message: 'Bespoke consultation inquiry submitted. A senior architectural consultant will contact you within 24 hours.',
    });
  } catch (error: any) {
    console.error('API Concierge POST Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
