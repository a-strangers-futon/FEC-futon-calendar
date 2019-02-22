import React from 'react';

const CalendarItem = function(props) {
  var itemCss = 'calendar-item-' + props.view;
  var takenCss = ( props.isTaken ? ' calendar-item-taken-' + props.view : '');
  var selectedCss = ( props.isSelected ? ' calendar-item-selected-' + props.view : '');
  var highlightedCss = ( props.isHighlighted ? ' calendar-item-highlighted-' + props.view : '');
  return (
    <div className={itemCss + takenCss + selectedCss + highlightedCss} onMouseEnter={(props.isHoverable ? props.handleHover : () => {})} onMouseLeave={(props.isHoverable ? props.handleHoverExit : () => {})} >
      <div className="calendar-text" onClick={( props.isTaken ? ()=>{} : props.handleDateClick)} data-datestring={props.dateString} data-month={props.month} data-date={props.date} data-year={props.year} data-view={props.view}>
        {props.text}
      </div>
    </div>
  )
}

const EmptyCalendarItem = function(props) {
  return (
    <div className="empty-calendar-item">
    </div>
  )
}

export {CalendarItem, EmptyCalendarItem};
