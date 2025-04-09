export const updateAccountBalance = (accountId: string, tradeResult: number) => {
  const updateBalance = (key: string) => {
    const storedAccounts = localStorage.getItem(key);
    if (storedAccounts) {
      const parsedAccounts = JSON.parse(storedAccounts);
      const updatedAccounts = parsedAccounts.map((account: any) => {
        if (account.id === accountId) {
          return { ...account, amount: account.amount + tradeResult };
        }
        return account;
      });
      localStorage.setItem(key, JSON.stringify(updatedAccounts));
    }
  };

  updateBalance("DemoAccount");
  updateBalance("LiveAccount");
};