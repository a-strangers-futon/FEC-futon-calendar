import _ from 'underscore';
import React from 'react';
import { buildCalGrid, calendarHeaderItems } from './utils.jsx';
import { CalendarRow } from './calendarRow.jsx';
import { OffsetCalendarHeader, CenteredCalendarHeader } from './styledComponents.jsx';
import moment  from "moment";

const CalendarArrow = function(props) {
  if (props.direction === 'left') {
    return (
      <div className="calendar-arrow calendar-arrow-left" role="button" data-view={props.view} data-direction={props.direction} onClick={props.handleClick}>
        <svg style={{'pointerEvents': 'none'}} width="19px" height="19px" focusable="false" viewBox="0 0 1000 1000"><path d="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z"></path></svg>
      </div>
    );
  } else {
    return (
      <div className="calendar-arrow calendar-arrow-right" role="button" data-view={props.view} data-direction={props.direction} onClick={props.handleClick}>
        <svg style={{'pointerEvents': 'none'}} width="19px" height="19px" focusable="false" viewBox="0 0 1000 1000"><path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"></path></svg>
      </div>
    );
  }
}

const Calendar = function(props) {
  var calendarBody = [];
  if (props.handleLeftArrowClick) {
    calendarBody.push(<CalendarArrow handleClick={props.handleLeftArrowClick} direction={"left"} view={props.view} />);
    if (props.view === 'main') {
      calendarBody.push(<OffsetCalendarHeader isLeft={true}>{props.moment.format("MMMM YYYY")}</OffsetCalendarHeader>);
    }
  }
  if (props.view === 'sidebar') {
    calendarBody.push(<CenteredCalendarHeader>{props.moment.format("MMMM YYYY")}</CenteredCalendarHeader>);
  }
  if (props.handleRightArrowClick) {
    if (props.view === 'main') {
      calendarBody.push(<OffsetCalendarHeader isRight={false}>{props.moment.format("MMMM YYYY")}</OffsetCalendarHeader>);
    }
    calendarBody.push(<CalendarArrow handleClick={props.handleRightArrowClick} direction={"right"} view={props.view} />);
  }
  var sidebarCss = '';
  if (props.view === 'sidebar') {
    if (props.calendarViewHidden) {
      sidebarCss += ' calendar-box-hidden';
    } else {
      sidebarCss += ' calendar-box-pop';
    }
  }
  var animationCss = '';
  if (props.view === 'main') {
    if (props.animationState.isMainAnimatingLeft) {
      animationCss += 'animation-enabled translateLeft ';
    } else if (props.animationState.isMainAnimatingRight) {
      animationCss += 'animation-enabled translateRight ';
    }
  } else if (props.view === 'sidebar') {
    if (props.animationState.isSidebarAnimatingLeft) {
      animationCss += 'animation-enabled translateLeft ';
    } else if (props.animationState.isSidebarAnimatingRight) {
      animationCss += 'animation-enabled translateRight ';
    }
  }
  return (
    <div className={"calendar-box" + sidebarCss}>
      <div className="calendar-header">
        {calendarBody}
      </div>
      {calendarHeaderItems}
      <div className="cal-overflow">
        <div className={animationCss + "container"}>
          <div className={"calendar-items-left"}>
            {_.map(Object.values(buildCalGrid(moment(props.moment.toDate()).subtract(1, 'month').month(), moment(props.moment.toDate()).subtract(1, 'month').year(), props.schedule)), 
            (row) => <CalendarRow row={row} handleDateClick={props.handleDateClick} month={props.moment.month()} year={props.moment.year()} view={props.view} />)}
          </div>
          <div className={"calendar-items"}>
            {_.map(Object.values(buildCalGrid(props.moment.month(), props.moment.year(), props.schedule)), (row) => <CalendarRow row={row} handleDateClick={props.handleDateClick} month={props.moment.month()} year={props.moment.year()} view={props.view} handleHover={props.handleHover} handleHoverExit={props.handleHoverExit} />)}
          </div>
          <div className={"calendar-items-right"}>
            {_.map(Object.values(buildCalGrid(moment(props.moment.toDate()).add(1, 'month').month(), moment(props.moment.toDate()).add(1, 'month').year(), props.schedule)),
            (row) => <CalendarRow row={row} handleDateClick={props.handleDateClick} month={props.moment.month()} year={props.moment.year()} view={props.view} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export {Calendar};
