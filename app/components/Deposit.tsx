import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CopyField from "./CopyField";
import CryptoSelector from "./CryptoSelector";

export function Deposit() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-2xl">Deposit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogTitle>Deposit</DialogTitle>
        <DialogHeader className="flex flex-row justify-center items-center">
          <h3>
            Copy the address below into your Crypto Wallet. If you deposit
            through our site you can scan the QR code with your smart phone
            instead.
          </h3>
        </DialogHeader>
        <CryptoSelector />
      </DialogContent>
    </Dialog>
  );
}
