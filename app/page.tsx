import Image from "next/image";
import Form from "../components/Form";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="">
        <Image
          className=""
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">
            Template.
          </h1>
          <Form />
        </div>
        
      </main>
    </div>
  );
}
