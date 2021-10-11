import React from 'react'
import Button from '@material-ui/core/Button'
import Api from '../api'


//Bootstrap
import {ToastContainer,toast,Zoom,Bounce} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import 'bootstrap/dist/css/bootstrap.css'

class MessageList extends React.PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
     msjerror:false,
    }
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount() {
    this.api.start()
  }

  messageCallback(message) {
    const { messages } = this.state
    this.setState({
      messages: [
        ...messages.slice(),
        message,
      ],
    }, async () => {
          {this.ToastMessage(message.priority)}
    })
  }

  handleClick = () => {
    const isApiStarted = this.api.isStarted()
    if (isApiStarted) {
      this.api.stop()
    } else {
      this.api.start()
    }
    this.forceUpdate()
  }

  //Funcion de Mensajes
  ToastMessage=(priority)=>{
    if(priority===1){
      toast.error("Error");
    }else if(priority===2){
      toast.warn("Advertencia");
    }else{
      toast.info("Informacion");
    }
    
  }


//Eliminar cada Item
  borrarItem=(arreglo,index)=>{
   arreglo.splice(index,1);
    this.setState({messages:arreglo});
    this.setState({
      messages: [
        ...arreglo,
      ],
    }, async () => {})
  }

  render() {
    const isApiStarted = this.api.isStarted()
    const{messages}=this.state
    return (
     
      <div>
         <ToastContainer autoClose={2000}/>
        <Button
          variant="contained"
          onClick={this.handleClick}
        >
          {isApiStarted ? 'Stop Messages' : 'Start Messages'}
        </Button>


        <table className="table">
        <thead>
        <tr>
            <th>Error</th>
            <th>Warning</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message,index)=>{
            
            return message.priority=== 1 ?
              <tr>                
                <td className="bg-danger" >{message.message} <button
                 onClick={()=>this.borrarItem(messages,index)} className="btn btn-outline-secondary mr-auto">Clear</button></td>                
                <td></td>
                <td></td>
              </tr>
            :  message.priority === 2 ?
              <tr>
                <td></td> 
                <td className="bg-warning">{message.message}
                <button 
                onClick={()=>this.borrarItem(messages,index)}  className="btn btn-outline-secondary">Clear</button></td>
                <td></td> 
              </tr>
            
            :
            <tr>
            <td></td> 
            <td></td> 
            <td className="bg-info">{message.message}
            <button 
            onClick={()=>this.borrarItem(messages,index)} className="btn btn-outline-secondary">Clear</button>
            </td>
          </tr>
           
  })} 

        </tbody>
        </table>
      </div>
    )
  }
}

export default MessageList
