import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function PopupCart() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-2xl">Add to Cart</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogTitle>Checkout</DialogTitle>
        <DialogHeader className="flex flex-row justify-center items-center">
          img
        </DialogHeader>
        <div className="flex flex-col mt-5">
          <div className="my-3">
            <p className="mb-4">
              If you have a Discount code, please enter it below.
            </p>
            <input
              className="py-1 mr-6"
              type="text"
              placeholder="Enter Discount code"
            />
            <Button className="">Apply</Button>
          </div>
          <div className="border py-2 mt-10">
            <p>Item</p>
            <p>Discount</p>
            <p>Total</p>
          </div>
        </div>
        <Button>Proceed</Button>
      </DialogContent>
    </Dialog>
  );
}
