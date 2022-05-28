import { AxiosRequestConfig } from 'axios'
import Pagination from 'components/Pagination'
import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from 'types/product'
import { SpringPage } from 'types/vendor/spring'
import { requestBackend } from 'util/requests'

import './styles.css'

type ControlComponentsData = {
  activePage: number
}

export default function List() {
  const [page, setPage] = useState<SpringPage<Product>>();
  // mantem o estado de todos os dados de componentes que fazem controle da listagem
  const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>(
    { activePage: 0 }
  );

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber })
  }

  const getProducts = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: controlComponentsData.activePage,
        size: 5,
      },
    };
    requestBackend(config)
      .then((response) => {
        setPage(response.data);
      })
  }, [controlComponentsData])

  useEffect(() => {
    getProducts()
  }, [getProducts]);

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
            <ProductCrudCard product={product} onDelete={getProducts} />
          </div>

        ))}
      </div>
      <Pagination
        pageCount={(page) ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange}
      />
    </div>
  )
}
