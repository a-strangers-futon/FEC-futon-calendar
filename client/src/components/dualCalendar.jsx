import React from 'react';
import moment from 'moment';
import { Calendar } from './calendar.jsx';

const DualCalendar = function(props) {
  return (
    <div style={{marginTop: '15px', marginBottom: '15px', marginLeft: '10%'}}>
      <button onClick={props.resetCalendarState}>Clear Dates</button>
      <div className="calendar-container">
        <Calendar view={props.view} moment={props.moment}
        handleLeftArrowClick={props.handleArrowClick} handleDateClick={props.handleDateClick} schedule={props.schedule} handleHover={props.handleHover} handleHoverExit={props.handleHoverExit} animationState={props.animationState} />
        <Calendar view={props.view} moment={moment(props.moment).add(1, 'month')}
        handleRightArrowClick={props.handleArrowClick} handleDateClick={props.handleDateClick} schedule={props.schedule} handleHover={props.handleHover} handleHoverExit={props.handleHoverExit} animationState={props.animationState} />
      </div>
    </div>
  )
}

export {DualCalendar};