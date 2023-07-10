// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    AppointmentList: [],
    titleInput: '',
    dateInput: '',
    staredBtnClicked: false,
  }

  titleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  dateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  AddBtnClicked = () => {
    const {titleInput, dateInput} = this.state

    const AppointmentDetails = {
      id: uuidv4(),
      titleInput,
      FormatdateInput: format(new Date(dateInput), 'dd MMMM yyyy, EEEE'),
      isFavorite: false,
    }

    this.setState(prevState => ({
      AppointmentList: [...prevState.AppointmentList, AppointmentDetails],
    }))
  }

  isFavoriteClicked = id => {
    this.setState(prevState => ({
      AppointmentList: prevState.AppointmentList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isFavorite: !eachApp.isFavorite}
        }
        return eachApp
      }),
    }))
  }

  StaredBtnClick = () => {
    this.setState(prevState => ({
      staredBtnClicked: !prevState.staredBtnClicked,
    }))
  }

  render() {
    const {AppointmentList, staredBtnClicked} = this.state
    const {FilteredAppointment} = AppointmentList.filter(
      eachApp => eachApp.isFavorite === true,
    )

    const OutputAppointmentList = staredBtnClicked
      ? FilteredAppointment
      : AppointmentList

    const starBtnClass = staredBtnClicked
      ? 'appStartedbtnClicked'
      : 'appStartedbtnNotClicked'

    return (
      <>
        <div className="app-container">
          <div className="card-container">
            <div className="input-container">
              <div className="input-items">
                <h1 className="main-heading">Add Appointment</h1>
                <div>
                  <label htmlFor="title">TITLE</label>
                  <br />
                  <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    onChange={this.titleInput}
                  />
                </div>
                <div>
                  <label htmlFor="date">DATE</label>
                  <br />
                  <input type="date" id="date" onChange={this.dateInput} />
                </div>
                <button
                  type="button"
                  onClick={this.AddBtnClicked}
                  className="Addbutton"
                >
                  Add
                </button>
              </div>
              <img
                className="appointment-image"
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              />
            </div>
            <hr />
            <div className="app">
              <h1>Appointments</h1>
              <button
                type="button"
                className={starBtnClass}
                onClick={this.StaredBtnClick}
              >
                started
              </button>
            </div>
            <ul className="AppointmentList">
              {OutputAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  eachAppointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  isFavoriteClicked={this.isFavoriteClicked}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Appointments
