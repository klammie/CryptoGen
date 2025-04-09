import { toast } from "sonner";

const deleteAccount = (
  accountId: string,
  setAccountData: React.Dispatch<React.SetStateAction<Array<any>>>
) => {
  const storedData = localStorage.getItem("DemoAccount");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    const updatedData = parsedData.filter(
      (account: any) => account.id !== accountId
    );
    localStorage.setItem("DemoAccount", JSON.stringify(updatedData));
    setAccountData(updatedData);
    toast.success("Account deleted successfully!");
  }
};

export default deleteAccount;
