import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Form from './Form'
import List from './List'

export default function Products() {
  return (
    <Switch>
      <Route path="/admin/products" exact>
        <List />
      </Route>
      <Route path="/admin/products/:productId" exact>
        <Form />
      </Route>
    </Switch>
  )
}
