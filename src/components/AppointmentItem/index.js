// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachAppointmentDetails, isFavoriteClicked} = props
  const {titleInput, FormatdateInput, isFavorite, id} = eachAppointmentDetails

  const starImageBtn = () => {
    isFavoriteClicked(id)
  }

  const ImageCheck = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <>
      <li className="appItems">
        <div>
          <p className="title">{titleInput}</p>
          <p>Date: {FormatdateInput}</p>
        </div>
        <button
          type="button"
          data-testid="star"
          className="starImageBtn"
          onClick={starImageBtn}
        >
          <img className="starImage" src={ImageCheck} alt="star" />
        </button>
      </li>
    </>
  )
}

export default AppointmentItem
