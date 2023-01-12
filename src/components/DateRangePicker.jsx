import React from "react";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";
// import "react-date-range/dist/styles.css";
import "../components/daterange.scss";
// import "react-date-range/dist/theme/default.css";

const DateRangePicker = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key == "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="calendarWrap">
      <div className="calendar_title">
        <p>Select dates</p>
        <button>X</button>
      </div>

      <div className="dateRange_inp">
        <div className="dateRange_inp_items">
          <label for="startDate">Start date</label>
          <input
            value={`${format(range[0].startDate, "E, d LLL")} `}
            readOnly
            className="inputBox"
            onClick={() => setOpen((open) => !open)}
            name="startDate"
          />
        </div>

        <div className="dateRange_inp_items">
          <label for="endDate">End date</label>
          <input
            value={`${format(range[0].endDate, "E, d LLL")} `}
            readOnly
            className="inputBox"
            onClick={() => setOpen((open) => !open)}
            name="endDate"
          />
        </div>
      </div>

      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="vertical"
            className="calendarElement"
            dateFormat="E dd, LLL"
          >
            {" "}
          </DateRange>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;
