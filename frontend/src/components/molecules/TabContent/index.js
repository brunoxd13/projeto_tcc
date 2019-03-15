import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import * as R from 'ramda'

import theme from 'app/theme'

import Loading from 'components/atoms/Loading'
import Flex from 'components/atoms/Flex'
import Input from 'components/atoms/Input'
import Table from 'components/molecules/Table'

import MuiButton from '@material-ui/core/Button'
import MuiIconButton from '@material-ui/core/IconButton'
import MuiTooltip from '@material-ui/core/Tooltip'
import MuiIconSearch from '@material-ui/icons/Search'

const headers = [
  { id: 'title', label: 'Título', align: 'left', reorder: true },
  { id: 'published', label: 'Publicado', align: 'left', reorder: false },
  { id: 'publishPost', label: '', align: 'center', reorder: false },
  { id: 'options', label: 'Opções', align: 'right', reorder: false },
]

const CustomFlex = styled(Flex)`
  && {
    padding-bottom: ${theme.spacing.unit * 2}px;

    > button {
      color: ${theme.palette.textPrimary};
      margin-left: ${theme.spacing.unit * 4}px;
    }
  }
`

const formatObjectRows = (queryData, setRows, setTmpRows) => {
    const rowsWithAllObject = queryData.map(element => (element = { ...element, allObject: element }))
    const rowsFormated = rowsWithAllObject.map(R.omit(['__typename', 'id', 'content']))
    setRows(rowsFormated)
    setTmpRows(rowsFormated)
}

const pressEnter = (value, rows, setTmpRows) => event => {
  if (event.keyCode === 13) {
    search(value, rows, setTmpRows)()
  }
}

const search = (value, rows, setTmpRows) => _ => {
  const newRows = rows.filter(row => row.title.toLowerCase().includes(value))
  setTmpRows(newRows)
}

const TabContent = ({ QUERY, queryName }) => {
  const [filterValue, setFilterValue] = useState('')
  const [tmpRows, setTmpRows] = useState(undefined)
  const [rows, setRows] = useState(undefined)
  const {data,loading} = useQuery(QUERY)

  useEffect(() => {
    if (!filterValue) {
      setTmpRows(rows)
    }
    
    search(filterValue, rows, setTmpRows)
  }, [filterValue])

  if (loading) {
    return <Loading height='auto' /> 
  }

  if (!rows) {
    formatObjectRows(data[`${queryName}`], setRows, setTmpRows)
    return <Loading height='auto' /> 
  }

  return (
    <>
      <CustomFlex height='auto'>
        <Input 
          value={filterValue}
          onChange={e => setFilterValue(e.target.value)}
          label='Filtro'
          placeholder='Busque por algum título'
          onKeyUp={pressEnter(filterValue, rows, setTmpRows)}
          endIcon={
            <MuiTooltip title='Pesquisar' aria-label='Pesquisar'>
              <MuiIconButton onClick={search(filterValue, rows, setTmpRows)}>
                <MuiIconSearch />
              </MuiIconButton>
            </MuiTooltip>
          }
        />
        {
          queryName === 'drafts' &&
          <MuiButton variant="contained" color="primary" onClick={() => console.log('novo')}>Novo</MuiButton>
        }
      </CustomFlex>

      {
        !tmpRows.length
        ? <p>Nenhum item encontrado</p>
        : <Table
            headers={headers}
            rows={tmpRows}
          />
      }
    </>
  )
}

TabContent.propTypes = {
  QUERY: PropTypes.object.isRequired,
}

export default TabContent