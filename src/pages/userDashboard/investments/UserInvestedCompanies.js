import React from 'react'
import DataTable from 'react-data-table-component'

export default function UserInvestedCompanies(props) {
  return (
    <>
        {props.companies?.length > 0 ? (
                <DataTable
                  columns={[
                    {
                      name: "Company",
                      selector: (row) => row.name,
                      sortable: true,
                    },
                    {
                      name: "Amount investment",
                      selector: (row) => row.pivot.amount,
                      sortable: true,
                    },
                    {
                      name: "Approval status",
                      selector: (row) => row.pivot.status,
                      sortable: true,
                    },
                  ]}
                  data={props.companies}
                />
              ) : (
                ""
              )}
    </>
  )
}
