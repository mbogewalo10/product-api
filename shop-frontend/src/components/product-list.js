import React, {Component} from 'react';
import axios from "axios";
import Table from "react-bootstrap/Table";
import ProductTable from "./product-table" ;


class ProductList extends Component {

  constructor(props){
      super(props)
      this.state = {productCollection: [] };
  }

  componentDidMount(){
    
    axios.get("https://productshopapi.herokuapp.com/products/")
    .then(res => {
        this.setState({productCollection: res.data.createdProduct.products});

    })
    .catch((error) =>{
        console.log(error);
    })
}

  DataTable() {
    return this.state.productCollection.map((res, i) => {
      return  <ProductTable obj={res} key={i} />
    
    });
  }

    render(){

        return(
            <div className="table-wrapper" >
                <Table >
                    <thead  >
                        <tr>
                            <td>Product ID</td>
                            <td>Product Name</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>image</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.DataTable()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ProductList;