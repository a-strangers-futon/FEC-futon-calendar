import React from 'react';
import { pluralize } from './utils.jsx';
import { DropdownButton, SmallBoldedBookingItem, MediumBoldedBookingItem, SubtextBookingItem } from './styledComponents.jsx';

const Dropdown = function(props) {
  var totalGuests = props.dropdownState.adults + props.dropdownState.children;
  var [adults, children, infants] = [props.dropdownState.adults, props.dropdownState.children, props.dropdownState.infants];
  var items = [];
  if (props.dropdownState.isActive) {
    items.push((
    <div className="dropdown-items">
      <div className="dropdown-item">
      <MediumBoldedBookingItem className="dropdown-text">Adults</MediumBoldedBookingItem>
        <div className="dropdown-tracker">
          <DropdownButton isActive={adults + children > 1 && adults >= 2} onClick={props.handleDropdownButtonClick} data-increment="-1" data-guesttype="adults" disabled={!(adults + children > 1 && adults >= 2)}>-</DropdownButton>
          <p>{props.dropdownState.adults}</p>
          <DropdownButton isActive={adults + children < 4} onClick={props.handleDropdownButtonClick} data-increment="1" data-guesttype="adults" disabled={!(adults + children < 4)}>+</DropdownButton>
        </div>
      </div>
      <div className="dropdown-item">
        <MediumBoldedBookingItem className="dropdown-text">Children</MediumBoldedBookingItem>
        <div className="dropdown-tracker">
          <DropdownButton isActive={adults + children > 1 && children >= 1} onClick={props.handleDropdownButtonClick} data-increment="-1" data-guesttype="children" disabled={!(adults + children > 1 && children >= 1)}>-</DropdownButton>
          <p>{props.dropdownState.children}</p>
          <DropdownButton isActive={adults + children < 4} onClick={props.handleDropdownButtonClick} data-increment="1" data-guesttype="children" disabled={!(adults + children < 4)}>+</DropdownButton>
        </div>
      </div>
      <div className="dropdown-item">
        <MediumBoldedBookingItem className="dropdown-text">Infants</MediumBoldedBookingItem>
        <div className="dropdown-tracker">
          <DropdownButton isActive={infants > 0} onClick={props.handleDropdownButtonClick} data-increment="-1" data-guesttype="infants" disabled={!(infants > 0)}>-</DropdownButton>
          <p>{props.dropdownState.infants}</p>
          <DropdownButton isActive={infants < 5} onClick={props.handleDropdownButtonClick} data-increment="1" data-guesttype="infants" disabled={!(infants < 5)}>+</DropdownButton>
        </div>
      </div>
      <div className="dropdown-item" style={{margin: '16px', fontSize: '10px'}}><SubtextBookingItem>4 guests maximum. Infants don't count toward the number of guests.</SubtextBookingItem></div>
    </div>
    ));
  }
  var infantText = (infants > 0 ? `, ${infants} ${pluralize('infant', infants)}` : '')
  var activeSvgPath = <path d="m1.71 13.71a1 1 0 1 1 -1.42-1.42l8-8a1 1 0 0 1 1.41 0l8 8a1 1 0 1 1 -1.41 1.42l-7.29-7.29z" fillRule="evenodd"></path>;
  var inactiveSvgPath = <path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fillRule="evenodd"></path>;

  var path = (props.dropdownState.isActive ? activeSvgPath : inactiveSvgPath);

  return (
    <div className="dropdown">
      <SmallBoldedBookingItem>Guests</SmallBoldedBookingItem>
      <div className="booking-row calendar-border" onClick={props.dropdownState.isActive ? props.hideBookingGuestDropdown : props.displayBookingGuestDropdown}>
        <div className="booking-date">{totalGuests} {pluralize('guest', totalGuests)}{infantText}</div>
        <div style={{marginRight: '3%', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>
        <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{height: "16px", width: "16px", display: "block", fill: "currentcolor"}}>
          {path}
        </svg>
        </div>
      </div>
      {items}
    </div>
  );
};

export {Dropdown};
