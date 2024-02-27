import Layout from "../../components/Layout";
import { MyHolidays } from "../adminPanel/AddHoliday";

const newDate = new Date();
const currentYear = newDate.getFullYear();
export const Holidays = () => {
  return (
    <>
      <Layout newIndex="4">
        <MyHolidays />
        <div className="container mt-4 bg p-3">
          <h3 className="text-white">Note</h3>
          <ol>
            <li>
              For the year {currentYear}, There would be 1 optional holiday that
              can be used only on any of the festival day.
            </li>
            <li>Need to apply 15 days prior.</li>
          </ol>
        </div>
      </Layout>
    </>
  );
};
