
import React, { Component } from 'react'

export class ProductCard extends Component {
    render() {
        return (
              <div className="main-card" >
                   <div className="card" >  
                        <img className="image " src={"https://productshopapi.herokuapp.com/" + this.props.productimage} alt="photo" />
                        <h3>{this.props.productname} </h3>
                        <p className="price"> ${this.props.price} </p>
                        <p> {this.props.description} </p>
                        <p><button>Add to Cart</button></p>
                 </div>
            </div>
                 
        )
    }
}

export default ProductCard;
