import { NextResponse, NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt";

export async function middleware(request) {  
  const authData = await getToken({
    req: request
  });  
  if (request.nextUrl.pathname == '/' + process.env.ADMFLDR) {
    if (authData?.email) { 
      return NextResponse.redirect(new URL('/' + process.env.ADMFLDR + '/dashboard', request.url))
    }
  } else {
    if (!authData?.email) {
      if (!['forgot-password','reset-password'].includes(request.nextUrl.pathname.split('/').pop())) {
        return NextResponse.redirect(new URL('/' + process.env.ADMFLDR, request.url))
      } 
    }
  }
}

export const config = {
  matcher: '/rdadmpnl/:path*',
}