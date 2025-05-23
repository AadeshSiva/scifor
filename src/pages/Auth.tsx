import React from "react";
// import { Header } from "@/components/layout/Header";
import { AuthForm } from "@/components/authok/AuthForm";

export default function Auth() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
      />
      <div className="max-w-none min-h-screen relative bg-neutral-100 mx-auto max-md:max-w-[991px] max-sm:max-w-screen-sm">
        {/* <Header /> */}
        <main>
          <AuthForm />
        </main>
      </div>
    </>
  );
}