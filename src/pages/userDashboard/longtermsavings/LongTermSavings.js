import moment from "moment";
import React from "react";
import { Table } from "react-bootstrap";
import CreateLongTermSavings from "./CreateLongTermSavings";
import DepositLongTermSaving from "./DepositLongTermSaving";
import SavingInfo from "./SavingInfo";
import WithdrawLongTermSaving from "./WithdrawLongTermSaving";

export default function LongTermSavings({ savings }) {
  const displayLength = (value) => {
    let result = "";

    switch (value.deposit_frequency) {
      case "1":
        result = "3 months";
        break;

      case "2":
        result = "6 months";
        break;

      case "3":
        result = "12 months";
        break;

      default:
        result = "3 months";
        break;
    }

    return result;
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-between mb-3">
        <SavingInfo />
        <CreateLongTermSavings />
      </div>

      {savings.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Goal</th>
              <th>Goal Amount</th>
              <th>Amount saved</th>
              <th>End date</th>
              <th>Amount payable</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {savings.map((x) => (
              <tr key={x.id}>
                <td>{x.goal}</td>
                <td>{x.goal_amount}</td>
                <td>{x.amount_saved}</td>
                <td>{moment(x.end_date).format('DD/MM/YYYY')}</td>
                <td>{x.amount_payable}</td>
                <td>
                  {x.amount_saved <= x.goal_amount ? (
                    <DepositLongTermSaving savingID={x.id} />
                  ) : (
                    <WithdrawLongTermSaving saving={x} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
