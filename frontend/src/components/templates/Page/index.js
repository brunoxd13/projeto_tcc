import React, { Suspense } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import Loading from 'components/atoms/Loading'

import theme from 'app/theme'

const Wrapper = styled.div`
  display: flex;
`

const Content = styled.main`
  flex-grow: 1;
  padding: ${theme.spacing.unit * 7}px;
  height: 100vh;
  overflow: auto;

  @media (max-width: 700px) {
    padding: ${theme.spacing.unit * 4}px;
  }
`

const Page = ({ header, sidebar, children, ...props }) => {
  return (
    <Wrapper {...props}>
      {header}
      
      <Content>
        <Suspense
          fallback={<Loading />}
        >
          {children}
        </Suspense>
      </Content>
    </Wrapper>
  )
}

Page.propTypes = {
  children: PropTypes.any.isRequired
}

export default Page
