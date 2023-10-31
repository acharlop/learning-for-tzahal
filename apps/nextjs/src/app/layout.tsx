import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

import '~/styles/globals.css'

import {headers} from 'next/headers'

import {TRPCReactProvider} from './providers'

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

/**
 * Since we're passing `headers()` to the `TRPCReactProvider` we need to
 * make the entire app dynamic. You can move the `TRPCReactProvider` further
 * down the tree (e.g. /dashboard and onwards) to make part of the app statically rendered.
 */
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Learning for Tzahal',
  description: 'Learn tanach together weekly for tzahal',
  openGraph: {
    title: 'Learning for Tzahal',
    description: 'Learn tanach together weekly for tzahal',
    url: 'https://learning-for-tzahal.vercel.app',
    siteName: 'Learning for Tzahal',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@avi_aviously',
    creator: '@avi_aviously',
  },
  icons: '/favicon.ico',
}

export default function Layout(props: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={['bg-gradient-to-b from-[#2e026d] to-[#15162c] font-sans', fontSans.variable].join(' ')}>
        <TRPCReactProvider headers={headers()}>
          <main className='min-h-screen flex flex-col items-center px-10 text-white lg:px-0'>{props.children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
