import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

 class EditProduct extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             productname: '',
             price: '',
             quantity:''

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        axios.get('https://productshopapi.herokuapp.com/products/' + this.props.match.params.id)
          .then(res => {
            this.setState({
              productname: res.data.product.productname,
              price:res.data.product.price,
              quantity:res.data.product.quantity
            });
            console.log(res)
      
          })
          .catch((error) => {
            console.log(error);
          })
      }


    handleChange(event){
        const {name,value} = event.target
        this.setState({
            [name]:value
        })
     }

     handleSubmit(e){
        e.preventDefault()
    
        const userObject = {
            productname : this.state.productname,
            price: this.state.price,
            quantity: this.state.quantity
        };

        console.log(userObject)
    
      axios.put("https://productshopapi.herokuapp.com/products/" + this.props.match.params.id, userObject)
      .then(result =>{
          console.log('Product successfully updated' + result)
    
      })
      .catch(err =>{
          console.log(err)
      });

         // Redirect to Student List 
      this.props.history.push('/product-list')
    
    }

    render() {
        return (
            <div className="form-wrapper" >
                <Form className="form-style" onSubmit={this.handleSubmit} >
                    <Form.Group controlId="productname" >
                         <Form.Label>PRODUCT NAME</Form.Label>
                         <Form.Control type="text" name="productName" value={this.state.productname}  onChange={this.handleChange}  /> 
                    </Form.Group>

                    <Form.Group controlId="price" >
                         <Form.Label>PRICE</Form.Label>
                         <Form.Control type="text" name="price"  value={this.state.price} onChange={this.handleChange}   /> 
                    </Form.Group>

                    <Form.Group controlId="quantity" >
                         <Form.Label>QUANTITY</Form.Label>
                         <Form.Control type="text" name="quantity" value={this.state.quantity}  onChange={this.handleChange} /> 
                    </Form.Group>
                    <Button variant="danger" size="lg" block="block" type="submit" onClick={this.handleSend}  >
                               Update Student
                    </Button>

                </Form>  

              
            </div>
        )
    }
}

export default EditProduct;
