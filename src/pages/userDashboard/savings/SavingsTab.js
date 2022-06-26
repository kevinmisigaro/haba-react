import React from "react";
import DepositSavings from "./depositSavings";
import WithdrawSavings from "./withdrawSavings";

export default function SavingsTab({ regularSavings, user }) {
  return (
    <>
      <div className="text-center my-4">
        <h4>Amount saved: TZS {regularSavings.amount ?? "0"}</h4>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 text-center mb-3">
          <DepositSavings user={user} />
        </div>
        <div className="col-md-6 text-center mb-3">
          <WithdrawSavings user={user} />
        </div>
      </div>
    </>
  );
}
