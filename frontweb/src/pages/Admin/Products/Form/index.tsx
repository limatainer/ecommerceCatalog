import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react'
import CurrencyInput from 'react-currency-input-field';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Category } from 'types/category';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import './styles.css'

type UrlParams = {
  productId: string;
}

export default function Form() {
  const { productId } = useParams<UrlParams>();
  const isEditing = productId !== 'create'
  const history = useHistory()

  // hooks estados
  const [selectCategories, setSelectCategories] = useState<Category[]>([])
  const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<Product>();

  // useEffect EDITING
  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/products/${productId}` }).then((response) => {
        const product = response.data as Product
        setValue('name', product.name)
        setValue('price', product.price)
        setValue('description', product.description)
        setValue('imgUrl', product.imgUrl)
        setValue('categories', product.categories)
      })
    }
  }, [isEditing, productId, setValue])

  // useEffect Selector
  useEffect(() => {
    requestBackend({ url: '/categories' }).then(
      response => {
        setSelectCategories(response.data.content)
      }
    )
  }, [])

  // onSubmit
  const onSubmit = (formData: Product) => {
    const data = { ...formData, price: String(formData.price).replace(',', '.') }

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}` : '/products',
      data,
      withCredentials: true
    }
    requestBackend(config).then(() => {
      // console.log(response.data)
      toast.info("Produto Cadastrado com Sucesso")
      history.push("/admin/products")
    }).catch(() => {
      toast.error("Erro ao cadastrar produto")
    })
  }
  // handleCancel
  const handleCancel = () => {
    history.push("/admin/products")
  }

  return (
    <div className='product-crud-container'>
      <div className='base-card product-crud-form-card'>
        <h1 className='product-crud-form-title'>DADOS DO PRODUTO</h1>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              <div className='margin-bottom-30'>
                {/* INPUTS */}
                {/* Input name */}
                <input
                  {...register("name", {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Nome do Produto"
                  name="name"
                />
                <div className="invalid-feedback d-block">{errors.name?.message}</div>
              </div>
              {/* selector */}
              <div className='margin-bottom-30'>
                <Controller
                  name='categories'
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select {...field}
                      options={selectCategories}
                      classNamePrefix="product-crud-select"
                      isMulti
                      getOptionLabel={(category: Category) => category.name}
                      getOptionValue={(category: Category) => String(category.id)}
                    />
                  )}
                />
                {errors.categories && (
                  <div className='invalid-feedback d-block'>
                    Campo Obrigatório
                  </div>
                )}
              </div>
              {/* Input Price */}
              <div className='margin-bottom-30'>
                <Controller
                  name='price'
                  rules={{ required: 'Campo Obrigatório' }}
                  control={control}
                  render={({ field }) => (
                    <CurrencyInput
                      placeholder='Preço'
                      className={`form-control base-input ${errors.price ? 'is-invalid' : ''}`}
                      disableGroupSeparators={true}
                      value={field.value}
                      onValueChange={field.onChange}
                      decimalsLimit={4}
                    />
                  )}
                />
                <div className="invalid-feedback d-block">{errors.price?.message}</div>
              </div>

              {/* Input ImgUrl */}
              <div className='margin-bottom-30'>
                <input
                  {...register("imgUrl", {
                    required: 'Campo obrigatório',
                    pattern: {
                      value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                      message: 'URL inválido'
                    }
                  })}
                  type="text"
                  className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="URL da imagem do produto"
                  name="imgUrl"
                />
                <div className="invalid-feedback d-block">{errors.imgUrl?.message}</div>
              </div>
            </div>
            {/* Input Descrição */}
            <div className="col-lg-6">
              <div>
                <textarea rows={10}
                  {...register("description", {
                    required: 'Campo obrigatório',
                  })}
                  className={`form-control base-input h-auto ${errors.price ? 'is-invalid' : ''}`}
                  placeholder="Descrição"
                  name="description"
                />
                <div className="invalid-feedback d-block">{errors.description?.message}</div>
              </div>
            </div>
          </div>
          {/* BUTTONS */}
          <div className='product-crud-buttons-container'>
            <button
              onClick={handleCancel}
              className='btn btn-outline-danger product-crud-button'>CANCELAR</button>
            <button className='btn btn-primary product-crud-button text-white'>SALVAR</button>
          </div>
        </form>

      </div>

    </div>
  )
}
