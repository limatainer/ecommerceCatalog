import React, { useEffect, useState } from 'react'
import { ReactComponent as SearchIcon } from 'assets/images/search.svg'
import './styles.css'
import { Controller, useForm } from 'react-hook-form';
import { Category } from 'types/category';
import Select from 'react-select';
import { requestBackend } from 'util/requests';

type ProductFilterData = {
  name: string;
  category: Category;
}

export default function ProductFilter() {
  const [selectCategories, setSelectCategories] = useState<Category[]>([])
  const { register, handleSubmit, control } = useForm<ProductFilterData>();

  // onSubmit
  const onSubmit = (formData: ProductFilterData) => {
    console.log("Enviado", formData)
  }

  // useEffect Selector
  useEffect(() => {
    requestBackend({ url: '/categories' }).then(
      response => {
        setSelectCategories(response.data.content)
      }
    )
  }, [])


  return (
    <div className='base-card product-filter-container'>
      {/* Barra de Pesquisa */}
      <form onSubmit={handleSubmit(onSubmit)} className='product-filter-form'>
        {/* Input Nome e Botao */}
        <div className='product-filter-name-container'>
          <input
            {...register("name")}
            type="text"
            className={"form-control"}
            placeholder="Nome do Produto"
            name="name" /*tem que ser o mesmo passado nos types*/
          />
          {/* Input Search Buton */}
          <button className='product-filter-button-search-icon'>
            <SearchIcon />
          </button>
        </div>
        {/* Input Selector e Botao */}
        <div className='product-filter-bottom-container'>
          {/* Selector */}
          <div className='product-filter-category-container'>
            <Controller
              name='category'
              control={control}
              render={({ field }) => (
                <Select {...field}
                  options={selectCategories}
                  isClearable
                  placeholder="Categoria"
                  classNamePrefix="product-filter-select"
                  getOptionLabel={(category: Category) => category.name}
                  getOptionValue={(category: Category) => String(category.id)}
                />
              )}
            />
          </div>
          {/* Buton */}
          <button className='btn btn-outline-secondary btn-product-filter-clear'>Limpar <span className='btn-product-filter-word'>Filtro</span> </button>
        </div>
      </form>
    </div>
  )
}
