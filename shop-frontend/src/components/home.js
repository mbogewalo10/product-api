import React, {Component} from 'react';
import ProductCard from './product-card'
import axios from 'axios';

class homeCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            products: []
        };
  
    }

    componentDidMount(){
    
        axios.get("https://productshopapi.herokuapp.com/products/")
        .then(res => {
            console.log(res.data.createdProduct.products)
            this.setState({products: res.data.createdProduct.products});  
        })
        .catch((error) =>{
            console.log(error);
        })
    }

render(){
    const allproducts = this.state.products.map((product)=>{
        return(
            <ProductCard key={product._id} productname={product.productname}  price={product.price} description={product.description} productimage={product.productimage}  />
        )
    })
    return(
        <div>
             {allproducts}
        </div>
    )
}
}

export default homeCard;