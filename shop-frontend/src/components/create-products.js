import React, {Component} from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import axios from "axios"

import "./Stylesheets.css"

class CreateProduct extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             productname : "",
             price: "",
             quantity:"",
             description:"",
             productimage: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this)
        this.handleSend = this.handleSend.bind(this)
    }


    handleChange(event){
        const {name,value} = event.target
        this.setState({
            [name]:value
        })
     }

     handleFileUpload(event){
        this.setState({productimage: event.target.files[0]});
     }
     handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append("productname", this.state.productname);
        formData.append("price", this.state.price);
        formData.append("quantity", this.state.quantity);
        formData.append("description", this.state.description);
        formData.append("productimage", this.state.productimage);

      axios
      .post("https://productshopapi.herokuapp.com/products", formData)
      .then(result =>{
          console.log(result.data)
    
      })
      .catch(err =>{
          console.log(err)
      });
    
    }


    
    handleSend(){
     alert(`You successfully sent ${this.state.productname} costing  ${this.state.price} euros with quantity ${this.state.quantity}`)
    }
 

    render(){
        return(
            <div className="form-wrapper" >
                <Form className="form-style" onSubmit={this.handleSubmit} >
                    <Form.Group controlId="productName" >
                         <Form.Label>PRODUCT NAME</Form.Label>
                         <Form.Control type="text" name="productname" value={this.state.productname}  onChange={this.handleChange}  /> 
                    </Form.Group>

                    <Form.Group controlId="price" >
                         <Form.Label>PRICE</Form.Label>
                         <Form.Control type="text" name="price"  value={this.state.price} onChange={this.handleChange}   /> 
                    </Form.Group>

                    <Form.Group controlId="quantity" >
                         <Form.Label>QUANTITY</Form.Label>
                         <Form.Control type="text" name="quantity" value={this.state.quantity}  onChange={this.handleChange} /> 
                    </Form.Group>
                    <Form.Group controlId="description" >
                         <Form.Label>Description</Form.Label>
                         <Form.Control type="text" name="description" value={this.state.description}  onChange={this.handleChange} /> 
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>PRODUCT IMAGE</Form.Label>
                        <Form.Control type="file" name="productimage"  onChange={this.handleFileUpload} />
                    </Form.Group>

                    <Button variant="danger" size="lg" block="block" type="submit"  onClick={this.handleSend}  >
                               Create Product
                    </Button>

                </Form>  
            </div>
        )
    }
}

export default CreateProduct;