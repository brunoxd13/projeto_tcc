import React, { Suspense } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import ProtectedRoute from 'components/molecules/ProtectedRoute'

import Loading from 'components/atoms/Loading'
import Page from 'components/templates/Page'
import AppBar from 'components/organisms/AppBar'

const FeedPage = React.lazy(() => import('components/pages/Admin/Feed'))
const PublicationsPage = React.lazy(() => import('components/pages/Admin/Publications'))
const NewEditItemPage = React.lazy(() => import('components/pages/Admin/NewEditItem'))
const SettingsPage = React.lazy(() => import('components/pages/Admin/Settings'))
const NotFoundPage = React.lazy(() => import('components/pages/NotFound'))

const Admin = () => (
  <Suspense fallback={<Loading />}>
  <Page header={<AppBar />}>
    <Switch>
      <ProtectedRoute path='/admin/feed' exact component={FeedPage} />
      <ProtectedRoute path='/admin/publications' exact component={PublicationsPage} />
      <ProtectedRoute path='/admin/newDraft' exact component={NewEditItemPage} />
      <ProtectedRoute path='/admin/editItem/:id' exact component={NewEditItemPage} />
      <ProtectedRoute path='/admin/settings' exact component={SettingsPage} />
      <Route path='/admin' exact render={() => <Redirect to='/admin/feed' />} />
      <ProtectedRoute component={NotFoundPage} />
    </Switch>
  </Page>
  </Suspense>
)

export default Admin

