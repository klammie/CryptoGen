import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Unplug } from "lucide-react";

const MyDialog = () => {
  const [isOpen, setIsOpen] = useState(false); // State to control dialog visibility

  const handleClose = () => {
    setIsOpen(false); // Close the dialog
  };

  return (
    <div>
      {/* Trigger to open the dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            className="mt-2 size-9  bg-blue-500 flex items-center justify-center p-2 rounded-md  hover:bg-gray-300 transition duration-200"
          >
            <Unplug className="w-5 h-5 text-gray-800" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md p-6 rounded-lg shadow-md">
          <DialogTitle className="text-xl font-bold text-gray-800 text-center">
            Investor Account Log-in
          </DialogTitle>

          <h3 className="font-medium text-gray-700 text-center mb-3">
            View and manage trades inside MetaTrader
          </h3>

          <div className="flex flex-col justify-evenly p-3 bg-gray-100 rounded-md">
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p className="font-medium">Login:</p>
              <p className="font-semibold text-gray-900">163596899</p>

              <p className="font-medium">Password:</p>
              <p className="font-semibold text-gray-900">s1eozec</p>

              <p className="font-medium">Investor:</p>
              <p className="font-semibold text-gray-900">7pwqbot</p>
            </div>
          </div>

          {/* Button to close the dialog */}
          <div className="flex justify-center mt-4">
            <Button
              onClick={handleClose}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
            >
              Proceed
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyDialog;
