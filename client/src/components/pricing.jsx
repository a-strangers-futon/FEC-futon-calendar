import React from 'react';
import moment from 'moment';

import { randInt } from './utils.jsx';
import { PricingItem, PricingDiv, SubtextBookingItem } from './styledComponents.jsx';

export function Pricing(props) {
  if (props.selectedStartDate === null || props.selectedEndDate === null) {
    return (<div></div>);
  }
  var startMoment = moment(props.selectedStartDate);
  var endMoment = moment(props.selectedEndDate);
  var days = endMoment.diff(startMoment, 'days') + 1;

  var nightly = props.price * days;
  var serviceFee = randInt(50, 150);
  var total = nightly + serviceFee;
  return (
    <div>
      <PricingDiv>
        <PricingItem isLeft={true}>${props.price} x {days}</PricingItem>
        <PricingItem isLeft={false}>${nightly}</PricingItem>
      </PricingDiv>
      <hr></hr>
      <PricingDiv>
        <PricingItem isLeft={true}>Service Fee</PricingItem>
        <PricingItem isLeft={false}>${serviceFee}</PricingItem>
      </PricingDiv>
      <hr></hr>
      <PricingDiv>
        <PricingItem isLeft={true}>Total</PricingItem>
        <PricingItem isLeft={false}>${total}</PricingItem>
      </PricingDiv>
    </div>
  )
}

