import { toast } from "sonner";

interface TradeAccount {
  id: string;
  type: string;
  amount: number;
  image: string;
  features: string[];
}

const deleteAccount = (
  accountId: string,
  setAccountData: React.Dispatch<React.SetStateAction<TradeAccount[]>>
) => {
  const storedData = localStorage.getItem("DemoAccount");
  if (storedData) {
    const parsedData: TradeAccount[] = JSON.parse(storedData);
    const updatedData = parsedData.filter(
      (account) => account.id !== accountId
    );
    localStorage.setItem("DemoAccount", JSON.stringify(updatedData));
    setAccountData(updatedData);
    toast.success("Account deleted successfully!");
  }
};

export default deleteAccount;
