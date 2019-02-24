import moment from 'moment';
import _ from 'underscore';
import React from 'react';
import { BookingView } from './booking.jsx';
import { DualCalendar } from './dualCalendar.jsx';
import { cleanSchedule, dateRange, randInt } from './utils.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    var listingId = Number.parseInt(window.location.pathname.split('/')[1], 10);

    if (!listingId) {
      listingId = 1;
    }

    this.state = {
      listingId: listingId,
      price: randInt(100, 700),
      selectedStartDate: null,
      selectedEndDate: null,
      sidebarMoment: moment(moment.utc().startOf('month').format()),
      mainMoment: moment(moment.utc().startOf('month').format()),
      schedule: {},
      dropdown: {
        isActive: false,
        adults: 1,
        children: 0,
        infants: 0
      },
      isMainAnimatingLeft: false,
      isMainAnimatingRight: false,
      isSidebarAnimatingLeft: false,
      isSidebarAnimatingRight: false,
      isSidebarAnimationEnabled: true,
      isMainAnimationEnabled: true,
      calendarViewHidden: true
    }

    this.animationDuration = .25;

    this.resetCalendarState          = this.resetCalendarState.bind(this);
    this.handleArrowClick            = this.handleArrowClick.bind(this);
    this.handleDateClick             = this.handleDateClick.bind(this);
    this.handleHover                 = this.handleHover.bind(this);
    this.handleHoverExit             = this.handleHoverExit.bind(this);
    this.displaySidebarCalendar      = this.displaySidebarCalendar.bind(this);
    this.displayBookingGuestDropdown = this.displayBookingGuestDropdown.bind(this);
    this.hideBookingGuestDropdown    = this.hideBookingGuestDropdown.bind(this);
    this.handleDropdownButtonClick   = this.handleDropdownButtonClick.bind(this);
  }
  displayBookingGuestDropdown(){
    var newDropdownState = this.state.dropdown;
    newDropdownState.isActive = true;
    this.setState({dropdown: newDropdownState});
  }
  hideBookingGuestDropdown(){
    var newDropdownState = this.state.dropdown;
    newDropdownState.isActive = false;
    this.setState({dropdown: newDropdownState});
  }
  displaySidebarCalendar() {
    this.setState({calendarViewHidden: false});
  }
  componentDidMount() {
    fetch(`http://ec2-3-87-57-254.compute-1.amazonaws.com/api/schedule/${this.state.listingId}`)
    .then((resp) => resp.json())
    .then((jsonResp) => this.setState({schedule: cleanSchedule(jsonResp)}))
  }
  handleDropdownButtonClick(event) {
    var value = Number(event.target.dataset.increment);
    var guestKey = event.target.dataset.guesttype;
    var newDropdownState = this.state.dropdown;

    newDropdownState[guestKey] = newDropdownState[guestKey] + value;
    this.setState({dropdown: newDropdownState});
  }
  handleHover(event) {
    var dateString = event.target.children[0].dataset.datestring;
    var hoverableDates = dateRange(this.state.selectedStartDate, dateString);
    var newScheduleState = this.state.schedule;
    for(var dateKey of hoverableDates) {
      newScheduleState[dateKey].isHighlighted = true;
    }
    this.setState({schedule: newScheduleState});
  }
  handleHoverExit(event) {
    if (this.state.selectedStartDate !== null && this.state.selectedEndDate === null) {
      var dateString = event.target.children[0].dataset.datestring;
      var hoverableDates = dateRange(this.state.selectedStartDate, dateString);
      var newScheduleState = this.state.schedule;
      for(var dateKey of hoverableDates) {
        newScheduleState[dateKey].isHighlighted = false;
      }
      this.setState({schedule: newScheduleState});
    }
  }
  handleDateClick(event) {
    var date = event.target.dataset.datestring;
    var currentView = event.target.dataset.view;

    if (this.state.selectedStartDate === null) {
      var newState = this.state;
      newState.selectedStartDate = date;
      if (currentView === 'main') {
        newState.calendarViewHidden = true;
      }
      newState.schedule[date].isSelected = true;
      this.setState(newState, function() {
        this.temporaryBlockout(date);
      });
    } else {
      this.setState({selectedEndDate: date, calendarViewHidden: true});
    }
  }
  resetCalendarState(){
    var newState = this.state;
    newState.selectedStartDate = null;
    newState.selectedEndDate = null;
    newState.calendarViewHidden = true;
    
    for(var k of Object.keys(newState.schedule)) {
      newState.schedule[k].isSelected = false;
      newState.schedule[k].isHoverable = false;
      newState.schedule[k].isHighlighted = false;
      newState.schedule[k].isTmpTaken = false;
    }
    this.setState(newState);
  }
  temporaryBlockout(selectedStartDate){
    var newSchedState = this.state.schedule;
    var firstTakenDate = null;
    for (var k of Object.keys(this.state.schedule)) {
      if (k < selectedStartDate) {
        newSchedState[k].isTmpTaken = true;
      } else {
        if (firstTakenDate) {
          newSchedState[k].isTmpTaken = true;
        } else {
          if (newSchedState[k].isTaken) {
            firstTakenDate = k;
          } else {
            newSchedState[k].isHoverable = true;
          }
        }
      }
    }
    this.setState({schedule: newSchedState});
  }
  handleArrowClick(event) {
    if (event.target.dataset.direction === 'left') {
      if (event.target.dataset.view === 'sidebar') {
        this.setState({isSidebarAnimatingLeft: true}, () => {
          setTimeout(() => this.setState({isSidebarAnimatingLeft: false, sidebarMoment: this.state.sidebarMoment.subtract(1, 'months')}), 1000 * this.animationDuration)
        });
      } else if (event.target.dataset.view === 'main') {
        this.setState({isMainAnimatingLeft: true}, () => {
          setTimeout(() => this.setState({isMainAnimatingLeft: false, mainMoment: this.state.mainMoment.subtract(1, 'months')}), 1000 * this.animationDuration)
        });
      }
    } else if (event.target.dataset.direction === 'right') {
      if (event.target.dataset.view === 'sidebar') {
        this.setState({isSidebarAnimatingRight: true}, () => {
          setTimeout(() => this.setState({isSidebarAnimatingRight: false, sidebarMoment: this.state.sidebarMoment.add(1, 'months')}), 1000 * this.animationDuration)
        });
      } else if (event.target.dataset.view === 'main') {
        this.setState({isMainAnimatingRight: true}, () => {
          setTimeout(() => this.setState({isMainAnimatingRight: false, mainMoment: this.state.mainMoment.add(1, 'months')}), 1000 * this.animationDuration)
        });
      }
    }
  }
  render() {
    var sidebarAnimationState = {
      isSidebarAnimatingLeft: this.state.isSidebarAnimatingLeft,
      isSidebarAnimatingRight: this.state.isSidebarAnimatingRight
    };
    var mainAnimationState = {
      isMainAnimatingLeft: this.state.isMainAnimatingLeft,
      isMainAnimatingRight: this.state.isMainAnimatingRight,
    };
    return (
      <div>
        <div style={{position: 'absolute', right: '15px'}}>
          <BookingView
            price={this.state.price} calendarViewHidden={this.state.calendarViewHidden}
            view={'sidebar'} moment={this.state.sidebarMoment}
            handleLeftArrowClick={this.handleArrowClick} handleRightArrowClick={this.handleArrowClick}
            handleDateClick={this.handleDateClick} schedule={this.state.schedule} handleHover={this.handleHover} handleHoverExit={this.handleHoverExit}
            selectedStartDate={this.state.selectedStartDate} selectedEndDate={this.state.selectedEndDate}
            dropdownState={this.state.dropdown} displaySidebarCalendar={this.displaySidebarCalendar}
            displayBookingGuestDropdown={this.displayBookingGuestDropdown} hideBookingGuestDropdown={this.hideBookingGuestDropdown}
            handleDropdownButtonClick={this.handleDropdownButtonClick} animationState={sidebarAnimationState} />
        </div>
        {<DualCalendar
        view={'main'} moment={this.state.mainMoment}
        handleArrowClick={this.handleArrowClick} resetCalendarState={this.resetCalendarState}
        handleDateClick={this.handleDateClick} schedule={this.state.schedule} handleHover={this.handleHover} handleHoverExit={this.handleHoverExit} animationState={mainAnimationState} />}
        <br></br>
      </div>
    );
  }
}

export default App;