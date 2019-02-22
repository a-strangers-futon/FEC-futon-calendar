import React from 'react';

import { Calendar } from './calendar.jsx';
import { Dropdown } from './dropdown.jsx';
import { CalendarContainer, BookingButton, LargeBoldedBookingItem, SmallBoldedBookingItem, SubtextBookingItem } from './styledComponents.jsx';
import { isoDateStringToReadable } from './utils.jsx';
import { Pricing } from './pricing.jsx';

const BookingView = function(props){
  var guestCount = props.dropdownState.adults + props.dropdownState.children;
  return (
    <div className="calendar-box calendar-border">
      <div><LargeBoldedBookingItem>${props.price}</LargeBoldedBookingItem> <SmallBoldedBookingItem>per night</SmallBoldedBookingItem></div>
      <hr></hr>
      <div>
        <SmallBoldedBookingItem>Dates</SmallBoldedBookingItem>
        <div className="booking-row calendar-border" onClick={props.displaySidebarCalendar} style={{marginBottom: '16px'}}>
          <div className="booking-date">
            {isoDateStringToReadable(props.selectedStartDate)}
          </div>
          <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{height: '24px', width: '24px', display: 'block', fill: 'currentcolor', marginTop: 'auto', marginBottom: 'auto'}}>
            <path d="m0 12.5a.5.5 0 0 0 .5.5h21.79l-6.15 6.15a.5.5 0 1 0 .71.71l7-7v-.01a.5.5 0 0 0 .14-.35.5.5 0 0 0 -.14-.35v-.01l-7-7a .5.5 0 0 0 -.71.71l6.15 6.15h-21.79a.5.5 0 0 0 -.5.5z" fillRule="evenodd"></path>
          </svg>
          <div className="booking-date">
            {isoDateStringToReadable(props.selectedEndDate, false)}
          </div>
        </div>
        <CalendarContainer isHidden={props.calendarViewHidden}>
          <Calendar
            view={props.view} moment={props.moment}
            handleLeftArrowClick={props.handleLeftArrowClick} handleRightArrowClick={props.handleRightArrowClick}
            handleDateClick={props.handleDateClick} schedule={props.schedule} handleHover={props.handleHover} handleHoverExit={props.handleHoverExit} animationState={props.animationState}
            />
        </CalendarContainer>
      </div>
      <Dropdown dropdownState={props.dropdownState} displayBookingGuestDropdown={props.displayBookingGuestDropdown} hideBookingGuestDropdown={props.hideBookingGuestDropdown}
      handleDropdownButtonClick={props.handleDropdownButtonClick} />
      <Pricing price={props.price} selectedStartDate={props.selectedStartDate} selectedEndDate={props.selectedEndDate} guests={guestCount} />
      <BookingButton role="button">Request to Book</BookingButton>
      <div style={{display: "flex"}}>
        <SmallBoldedBookingItem style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '16px', fontSize: '10px'}}>You won't be charged yet</SmallBoldedBookingItem>
      </div>
      <hr></hr>
      <SmallBoldedBookingItem>This home is on people's minds.</SmallBoldedBookingItem>
      <br></br>
      <SubtextBookingItem style={{paddingBottom: '16px'}}>It's been viewed 500+ times in the past week.</SubtextBookingItem>
    </div>
  );
};

export {BookingView};
