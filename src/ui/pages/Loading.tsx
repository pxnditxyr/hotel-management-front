import { Spinner } from "@nextui-org/react";

export const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen z-10 flex-col gap-20">
      <img src="/logo.png" alt="logo" className="w-64 h-52" />
      <Spinner label="Loading..." color="warning" />
    </div>
  )
}
