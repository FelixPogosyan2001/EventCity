import React,{Component} from 'react';

class BookingList extends Component {
  render() {
    return(
      <ul type = 'none'>
        {
          this.props.bookings.map((book,i) => {
            return (
              <li className = "book-items" key = {i + Math.random()}>
                <h3>{book.event.title} - {new Date(book.createdAt).toLocaleDateString()}</h3>
                <div>
                  <button onClick = {() => {this.props.cancelBook(book._id)}} className = 'versionBtn'>Cancel</button>
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
}
export default BookingList;
