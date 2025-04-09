import { Cashout } from "@/app/components/Cashout";
import { Deposit } from "@/app/components/Deposit";
import Withdrawl from "@/app/components/Withdrawl";
import { getData } from "@/app/lib/getData";
import { requireUser } from "@/app/lib/hooks";

export default async function Walletroute() {
  const session = await requireUser();
  const data = await getData(session?.user?.id as string);
  return (
    <div className="mt-10 flex mx-auto flex-col items-center justify-center">
      <div className="flex bg-gray-400 items-center justify-center p-3 rounded-lg">
        <div className="font-semibold">
          <p>Balance</p>
          <h1 className=" font-bold text-primary">${data?.accBal}</h1>
        </div>
        <div className="flex flex-row mx-auto gap-4 xl:gap-8">
          <div className="ml-5 font-semibold">
            <p>Free margin</p>
            <h2>${(data?.accBal * 1.2).toFixed(1)}</h2>
          </div>
          <div className="font-semibold">
            <p>Access Keys</p>
            <h2 className="text-center">x{data?.keyz}</h2>
          </div>
          <div className="font-semibold">
            <p>Leverage</p>
            <h2>1:1000</h2>
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-5 mr-3 gap-5 items-center justify-center">
        <div className="ml-5">
          <Deposit />
        </div>
        <div className="mx-5">
          <Withdrawl />
        </div>
        <div>
          <Cashout />
        </div>
      </div>
    </div>
  );
}
