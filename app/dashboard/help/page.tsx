import Image from "next/image";
import Link from "next/link";
import Gears from "@/public/gears.png";
import Support from "@/public/customer-service.png";
import Faq from "@/public/faq.png";

export default function Helproute() {
  return (
    <div className="flex justify-center items-center">
      <div className=" flex gap-10 flex-wrap flex-col md:flex-row xl:flex-row items-center justify-center mt-20">
        <Link
          href="/dashboard/help/works"
          className="flex flex-col items-center text-center"
        >
          <Image className="size-20" src={Gears} alt="how-it-works"></Image>
          <p>How does it work?</p>
        </Link>

        <Link
          href="/dashboard/help/faq"
          className="flex flex-col items-center text-center"
        >
          <Image className="size-20" src={Faq} alt="faq"></Image>
          <p>Frequently asked questions</p>
        </Link>

        <Link
          href="/dashboard/help/support"
          className="flex flex-col items-center text-center"
        >
          <Image className="size-20" src={Support} alt="support"></Image>
          <p>Customer support</p>
        </Link>
      </div>
    </div>
  );
}
