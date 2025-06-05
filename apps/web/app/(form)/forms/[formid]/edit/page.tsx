import Image from "next/image";

export default function Home() {
  // const params = useParams();
  // console.log(params);
  return (
    <div className=" h-full w-full">
      <div className="w-full h-[30%] bg-amber-100 ">cover</div>

      <div className="mx-auto max-w-3xl relative">
        <div className="absolute top-0 ">
          <Image
            className=" rounded-full cursor-pointer  translate-0 hover:-translate-y-1 shadow-2xl shadow-slate-400"
            src={"/form-logo.jpg"}
            alt="form logo"
            width={150}
            height={150}
          />
        </div>
        <div>title</div>
        <div>blocks</div>
      </div>
    </div>
  );
}
