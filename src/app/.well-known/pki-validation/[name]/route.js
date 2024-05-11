import { NextRequest, NextResponse } from "next/server";
import { sign, verify } from "jsonwebtoken"
import { cookies } from 'next/headers'
import fs from "fs"
import key from "../../../private"
import db from '@/db_connection'
import { ObjectId } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request) {
    const file = fs.readFileSync(`8EE425EBE6FE38614632923008AAEE3C.txt`);
    return Response.json(file)
}
