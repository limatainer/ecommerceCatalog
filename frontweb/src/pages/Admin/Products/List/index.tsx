import { AxiosRequestConfig } from 'axios'
import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from 'types/product'
import { SpringPage } from 'types/vendor/spring'
import { requestBackend } from 'util/requests'

import './styles.css'

export default function List() {
  const [page, setPage] = useState<SpringPage<Product>>();


  useEffect(() => {
    const config: /*AxiosParams(antes eu criei na mao)*/ AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: 0,
        size: 30,
      },
    };
    requestBackend(config)
      .then((response) => {
        setPage(response.data);
      })
  }, []);


  return (
    <div className='product-crud-container'>
      <div className="product-crud-bar-container">
        <Link to="/admin/products/create">
          <button className='btn btn-primary text-white btn-crud-add'>ADICIONAR</button>
        </Link>
        <div className='base-card product-filter-container'>Buscar Produto</div>
      </div>
      <br />
      <div className="row">
        {page?.content.map(product => (
          <div key={product.id} className="col-sm-6 col-md-12">
            <ProductCrudCard product={product} />
          </div>

        ))}

      </div>
    </div>
  )
}
