import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query || query.length < 3) {
        return NextResponse.json({ data: [], message: 'Unauthorized' }, { status: 400 });
    }

    const API_URL = process.env.API_URL;
    const API_KEY = process.env.API_KEY;

    if (!API_URL || !API_KEY) {
        return NextResponse.json({ data: [], message: 'Error de configuración del servidor' }, { status: 500 });
    }

    try {
        const headers: Record<string, string> = {
            'Accept': 'application/json',
            'X-App-Key': API_KEY || '',
        };

        const response = await fetch(`${API_URL}/animes?search=${encodeURIComponent(query)}&perPage=5`, {
            headers,
            cache: 'no-store'
        });

        if (!response.ok) {
            return NextResponse.json({ data: [] }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ data: [] }, { status: 500 });
    }
}
