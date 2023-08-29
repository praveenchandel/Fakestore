import React from 'react'
import {Product} from '../../Pages/Product'
import './Product.css'

export const Products = (props) => {

  return (
    <div className="flex-container-withWrap">
    {props.products.map((product)=>{
        return <Product productDetails={product} key={product.id}/>
      })
    }
    </div>
  )
}