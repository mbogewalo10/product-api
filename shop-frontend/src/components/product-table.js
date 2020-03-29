import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import "./Stylesheets.css"
import axios from 'axios'
 class ProductTable extends Component {

    constructor(props){
        super(props)
        this.deleteProduct = this.deleteProduct.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }


    deleteProduct() {
        axios.delete('https://productshopapi.herokuapp.com/products/' + this.props.obj._id)
            .then((res) => {
                console.log('Student successfully deleted!');
            }).catch((error) => {
                console.log(error)
            })

    }

   handleDelete(){
       alert("Deleted successfully")
   }

    render() {
        return (
               <tr>
                <td>{this.props.obj._id}</td>
                <td>{this.props.obj.productname}</td>
                <td>{this.props.obj.price}</td>
                <td>{this.props.obj.quantity}</td>
                <td>{this.props.obj.productimage}</td>
                <td>
                    <Link className="edit-link editbtn" to={"/edit-product/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteProduct} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}

export default ProductTable;
