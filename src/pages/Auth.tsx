import { AuthForm } from "@/components/authok/AuthForm";
import { useLocation } from "react-router-dom";

export default function Auth() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const view = params.get("view") === "login" ? "login" : "register";

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
      />
      <div className="max-w-none min-h-screen relative bg-neutral-100 mx-auto max-md:max-w-[991px] max-sm:max-w-screen-sm">
        <main>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/53e157ea9e6912d2bf3a95839b06656d5dc44abc"
            alt="Side Logo"
            className="w-[140px] h-[35px] absolute right-4 top-4 z-10"
          />
          {/* <div className="-rotate-90 text-black text-[18px] mt-5 origin-center whitespace-nowrap pt-40 font-linear">
            <span>
              Grow Smarter. <span className="font-bold">Exit Richer™</span>
            </span>
          </div> */}
          <AuthForm initialView={view} />
        </main>
      </div>
    </>
  );
}
