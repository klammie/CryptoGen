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

export function ConfirmDelete({ accountData, setAccountData, accountId }) {
  const handleDelete = async () => {
    try {
      // Remove the selected account from localStorage and state
      const updatedAccounts = accountData.filter(
        (account) => account.id !== accountId
      );
      setAccountData(updatedAccounts); // Update state

      localStorage.setItem("DemoAccount", JSON.stringify(updatedAccounts));
      toast.success("Account deleted successfully!");

      // Call `incrementKeyz` after successful deletion
      const response = await incrementKeyz();
      if (response.success) {
        toast.success(response.message); // Keyz incremented successfully
      } else {
        toast.error(response.message); // Failed to increment keyz
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account. Please try again.");
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
