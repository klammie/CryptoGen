import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { incrementKeyz } from "@/app/lib/addKeyz"; // Ensure correct import path
import { Account } from "@/app/dashboard/trades/TradeSim"; // ✅ Standardized import
import { deleteDemoAccount } from "@/app/lib/deleteDemoAccount"; // ✅ Import the function

interface ConfirmDeleteProps {
  accountData: Account[];
  setAccountData: React.Dispatch<React.SetStateAction<Account[]>>;
  accountId: string;
}

export function ConfirmDelete({
  accountData,
  setAccountData,
  accountId,
}: ConfirmDeleteProps) {
  const handleDelete = async () => {
    try {
      // ✅ Call database action to delete account
      const response = await deleteDemoAccount();

      if (response.success) {
        // ✅ Filter out deleted account from state
        const updatedAccounts = accountData.filter(
          (account) => account.id !== accountId
        );
        setAccountData(updatedAccounts); // ✅ Update state

        toast.success("Demo account deleted successfully!");

        // ✅ Call `incrementKeyz` after deletion
        const keyResponse = await incrementKeyz();
        if (keyResponse.success) {
          toast.success(keyResponse.message); // ✅ Keyz incremented successfully
        } else {
          toast.error(keyResponse.message); // ❌ Failed to increment keyz
        }
      } else {
        toast.error(response.error); // ❌ Error from deleteDemoAccount function
      }
    } catch (error: unknown) {
      console.error("Error deleting account:", error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to delete account. Please try again.");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="size-9  bg-blue-500 flex items-center justify-center p-2 rounded-md hover:bg-red-500">
          <Trash2 className="w-5 h-5 text-gray-800" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogTitle>Delete demo account</DialogTitle>
        <DialogHeader>Are you sure?</DialogHeader>
        <div className="flex justify-evenly">
          {/* Delete Button - Calls `handleDelete` */}
          <Button onClick={handleDelete} className="bg-red-600">
            Delete
          </Button>

          {/* Cancel Button - Closes Dialog */}
          <DialogClose asChild>
            <Button className="bg-gray-300 hover:bg-gray-400">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
