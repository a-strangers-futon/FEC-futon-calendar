import React from 'react';

import styled from 'styled-components';

const LargeBoldedBookingItem = styled.div`
  display: inline-block;
  font-size: 22px;
  font-weight: 800;
  line-height: 1.44444em;
  color: #4A4A4A;
`;

const MediumBoldedBookingItem = styled.div`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.28571em;
  color: #484848;
`;

const SmallBoldedBookingItem = styled.div`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.333em;
  color: #484848;
`;

const SubtextBookingItem = styled.div`
  display: inline-block;
  font-size: 12px;
  line-height: 1.333em;
  color: #484848;
`;

const PricingDiv = styled.div`
  display: flex;
  margin-top: 16px;
`;

// const PricingItem = styled.div`
//   display: inline;
//   margin-${props => props.isLeft ? 'left' : 'right'}: 0;
//   margin-${props => props.isLeft ? 'right' : 'left'}: auto;
// `;

const PricingItem = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2857em;
  display: inline;
  margin-top: auto;
  margin-bottom: auto;
  margin-${props => props.isLeft ? 'left' : 'right'}: 0;
  margin-${props => props.isLeft ? 'right' : 'left'}: auto;
`;

// border-color: rgba(0, 132, 137, 0.3) !important;
const DropdownButton = styled.button`
  height: 32px;
  width: 32px;
  background-color: transparent;
  color: ${props => props.isActive ? 'rgb(0, 132, 137)' : 'rgb(0, 132, 137, 0.3)'};
  border-style: solid;
  border-radius: 50%;
  border-color: ${props => props.isActive ? 'rgb(0, 132, 137)' : 'rgb(0, 132, 137, 0.3)'};
  border-width: 1px;
  margin-top: auto;
  margin-bottom: auto;
`;

const BookingButton = styled.button`
  margin-top: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 8px;
  padding-right: 8px; 
  font-size: 16px;
  font-weight: 800;
  line-height: 24px;
  border-color: transparent;
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  width: 100%;
  color: #FFF3FF;
  background-color: rgb(255, 90, 95);
`;

const BookingBorder = styled.div`
`;

const CalendarHeader = styled.div`
  font-size: large;
  font-weight: bold;
`;

const OffsetCalendarHeader = styled(CalendarHeader)`
  position: absolute;
`;

const CenteredCalendarHeader = styled(CalendarHeader)`
  margin: auto;
`;

const CalendarContainer = styled.div`
  background-color: white;
  position: absolute;
  z-index: 1;
  max-height: 350px;
  max-width: 350px;
  display: ${props => props.isHidden ? 'none' : 'block'};
`;

const CalendarBox = styled.div`
  display: ${props => props.isHidden ? 'none' : 'inline-block'};
  margin: 1%;
  padding: 2%;
  max-width: 300px;
  min-height: 400px;
`;

const BaseStyledCalendarItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCalendarItem = styled(BaseStyledCalendarItem)`
`;

export {CalendarBox, CalendarContainer, OffsetCalendarHeader, CenteredCalendarHeader, BookingButton, DropdownButton, PricingItem, PricingDiv, SmallBoldedBookingItem, LargeBoldedBookingItem, MediumBoldedBookingItem, SubtextBookingItem};
