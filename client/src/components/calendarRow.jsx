import React from 'react';
import {CalendarItem, EmptyCalendarItem} from './calendarItem.jsx';

const CalendarRow = function(props) {
  var cols = [];
  for (var i=0; i<7; i++){
    if (props.row[i]) {
      cols.push(<CalendarItem text={props.row[i].text} handleDateClick={props.handleDateClick} month={props.month} date={props.row[i].text} year={props.year} dateString={props.row[i].dateString} isTaken={props.row[i].isTaken || props.row[i].isTmpTaken} isSelected={props.row[i].isSelected} isHighlighted={props.row[i].isHighlighted} view={props.view} isHoverable={props.row[i].isHoverable} handleHover={props.handleHover} handleHoverExit={props.handleHoverExit} />);
    } else {
      cols.push(<EmptyCalendarItem />);
    }
  }
  
  var className = "calendar-row";
  className += (props.isLeft ? 'calendar-row-left' : '');
  className += (props.isLeft ? 'calendar-row-right' : '');

  return (
    <div className="calendar-row">
      {cols}
    </div>
  )
}

export {CalendarRow};
