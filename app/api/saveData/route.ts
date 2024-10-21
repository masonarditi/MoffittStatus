// /api/saveData/route.ts
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const dataDirectory = path.join(process.cwd(), 'data');
const filePath = path.join(dataDirectory, 'libraryStats.json');

// Helper function to read data from the file
function readData() {
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent || '[]');
  }
  return [];
}

// Handle GET and POST requests
export async function GET() {
  try {
    const data = readData(); // Read data from JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.json({ message: 'Error reading data.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Ensure the data directory exists
    if (!fs.existsSync(dataDirectory)) {
      fs.mkdirSync(dataDirectory);
    }

    // Read current data and append the new entry
    const fileData = readData();
    fileData.push(data);

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');

    return NextResponse.json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ message: 'Error saving data.' }, { status: 500 });
  }
}
