import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // const cookie = req.cookies.has('auth');

  // if (!cookie) {
  //   const response = NextResponse.next();
  //   response.cookies.set('auth', 'mint');
  //   console.log('res', response.cookies);
  //   return response; // Return the modified response with the 'auth' cookie set.
  // }

  // console.log('cookie', req.cookies.get('auth'));
  // return NextResponse.next();
}

export const config = {
  matcher: '/',
};
