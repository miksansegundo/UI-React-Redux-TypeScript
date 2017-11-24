import * as React from 'react'
const spinner = require('./img/spinner.svg')
require('./styles.css')

interface IProps extends React.HTMLProps<HTMLDivElement>{
  loading: boolean
}

export function Loading (props: IProps) {
  const { loading } = props

  return (
    <div>
      {loading &&
        <div className='loading'>
          <div>
            <img src={spinner} alt="Loading..." />
          </div>
        </div>
      }
      {!loading &&
        props.children}
    </div>
  )
}