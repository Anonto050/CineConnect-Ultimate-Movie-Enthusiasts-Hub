import SessionProvider from "@/components/SessionProvider";
import "/styles/globals.css";
import React from "react";
import Head from "next/head";

export const metadata = {
  title: "CineConnect",
  description: "Generated by create next appA comprehensive web platform for cinema enthusiasts. CineConnect brings together movie information, user discussions, theater showtimes, and a marketplace for movie fan art. Geared towards creating a vibrant community for movie lovers",
  
};

export default function RootLayout({ children, session }) {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/LogoW.png" />
      </Head>
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
}



