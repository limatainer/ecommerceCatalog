import React, { useEffect, useState } from 'react'
import { ReactComponent as SearchIcon } from 'assets/images/search.svg'
import './styles.css'
import { Controller, useForm } from 'react-hook-form';
import { Category } from 'types/category';
import Select from 'react-select';
import { requestBackend } from 'util/requests';

export type ProductFilterData = {
  name: string;
  category: Category | null;
}

type Props = {
  onSubmitFilter: (data: ProductFilterData) => void
}

export default function ProductFilter({ onSubmitFilter }: Props) {
  const [selectCategories, setSelectCategories] = useState<Category[]>([])
  const { register, handleSubmit, setValue, getValues, control } = useForm<ProductFilterData>();

  // onSubmit
  const onSubmit = (formData: ProductFilterData) => {
    onSubmitFilter(formData)
  }

  //handleFormClear funcion
  const handleFormClear = () => {
    setValue('name', '')
    setValue('category', null)
  }

  //handleChangeCategory function Selector
  const handleChangeCategory = (value: Category) => {
    setValue('category', value)
    const obj: ProductFilterData = {
      name: getValues('name'),
      category: getValues('category')
    }
    onSubmitFilter(obj)
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
                  onChange={value => handleChangeCategory(value as Category)}
                  getOptionLabel={(category: Category) => category.name}
                  getOptionValue={(category: Category) => String(category.id)}
                />
              )}
            />
          </div>
          {/* Buton */}
          <button onClick={handleFormClear} className='btn btn-outline-secondary btn-product-filter-clear'>Limpar <span className='btn-product-filter-word'>Filtro</span> </button>
        </div>
      </form>
    </div>
  )
}
