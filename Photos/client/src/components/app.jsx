import ajax from '../lib/ajax';
import Photos from './photos.jsx'
import Carousel from './carousel.jsx'
import React from 'react'

// const appStyle = {
//   position: 'relative',
//   border: '2px solid #333',
//   /* margin: 2%; */
//   overflow: 'hidden',
//   width: '659px', /* VERY important. Lets me change the pic sizes*/
//   height: '379px'/* 659w x 379l big picture, 324w 216l*/
// }
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list : [{url:''}, {url:''},{url:''},{url:''},{url:''},{url:''}],
      display : 'none'
    }

    this.modalHandler = this.modalHandler.bind(this);
    this.switchBack = this.switchBack.bind(this);
  }

  componentWillMount() {
    ajax.getAjax((err, photoobj) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({
        list : photoobj
      });
    })
  }

  modalHandler() {
    this.setState ({
      display : 'block'
    })
  }

  switchBack() {
    this.setState ({
      display : 'none'
    })
  }

  render() {
    return(
      <div >
       <Photos list = {this.state.list} modalHandler = {this.modalHandler} />


      <div className = 'modal__inner' style = {{display:this.state.display}}>
        <Carousel list = {this.state.list} display = {this.state.display} switchBack = {this.switchBack}/>
      </div>
       
       
      </div>
     
    )
  }
}

// {this.state.list.map((photos) => (
//   <Photos photos={photos} />
// ))}

export default App;

   /* {this.state.list.map((photos) => (
          <Photos photos={photos} />
        ))}    WILL USE after*/