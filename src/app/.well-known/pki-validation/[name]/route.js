
export async function GET(request) {
    const file = fs.readFileSync(`8EE425EBE6FE38614632923008AAEE3C.txt`);
    return Response.json(file)
}
