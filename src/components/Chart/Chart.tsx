import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CircularProgress, styled } from '@mui/material'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'

import { fetchCryptoForChart } from '../../api'
import { currencySelector } from '../../store/selectors'
import { Price } from '../../store/types'

ChartJS.register(...registerables)

const Progress = styled(CircularProgress)(() => ({
  margin: 16,
}))
const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  maxWidth: 1024,
  width: '100%',
  margin: '16px auto',

  [theme.breakpoints.down('md')]: {
    '& #canvas-container': {
      height: '50vh',
      width: '80vw',
    },
  },
  [theme.breakpoints.up('md')]: {
    '& #canvas-container': {
      height: '60vh',
      width: '80vw',
    },
  },
}))
const ChartTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: 16,
  minWidth: 140,
  color: theme.palette.text.secondary,
  fontSize: 32,
  padding: 8,
}))
const ChartContainer = styled('main')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}))

export const Chart: FC = () => {
  const { id } = useParams()
  const [data, setData] = useState<Price[]>([])

  const currency = useSelector(currencySelector)

  useEffect(() => {
    fetchCryptoForChart(id as string, currency as string).then((res) => {
      setData(res?.data.prices)
    })
  }, [id, currency])

  return (
    <ChartContainer>
      {id && <ChartTitle>{id.toUpperCase()}</ChartTitle>}
      <Wrapper>
        <div id="canvas-container">
          {data ? (
            <Line
              data={{
                labels: data.map((coin) => new Date(coin[0]).toLocaleDateString()),
                datasets: [
                  {
                    data: data.map((coin) => coin[1]),
                    label: `Price ${id?.toUpperCase()} ( Past 30 Days ) in ${currency.toUpperCase()}`,
                    borderColor: '#2f81f7',
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          ) : (
            <Progress />
          )}
        </div>
      </Wrapper>
    </ChartContainer>
  )
}
