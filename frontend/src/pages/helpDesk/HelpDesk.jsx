import React from "react";
import Layout from "../../components/Layout/index";
import { Table } from "react-bootstrap";
export const HelpDesk = () => {
  return (
    <>
      <Layout newIndex="6">
        <div className="my-5 container bg py-3 px-3">
          <h3 className="text-brand">HR Help Desk</h3>
          <div>
            <Table hover striped>
              <thead>
                <tr>
                  <th>Query Type</th>
                  <th>TAT to respond</th>
                  <th>TAT for closure</th>
                  <th>1st Escalation Point</th>
                  <th>2nd Escalation Point</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </Layout>
    </>
  );
};
