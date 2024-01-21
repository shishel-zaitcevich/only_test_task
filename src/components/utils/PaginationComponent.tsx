import * as React from 'react'
import { useEffect, useRef } from 'react'
import '../../assets/styles/swiperStyles.scss'
import { rotateDotsAroundCenter } from './rotateDotsAroundCenter'
import { eventsProp } from '../../components/Types'

interface PaginationProps {
  totalSlides: number
  activePage: number
  onPageClick: (index: number) => void
  data: eventsProp[]
}

const PaginationComponent: React.FC<PaginationProps> = ({
  totalSlides,
  activePage,
  onPageClick,

  data,
}) => {
  const paginationRef = useRef<HTMLDivElement>(null)

  const formatNumber = (number: number) => number.toString().padStart(2, '0')

  // const handlePaginationClick = (index: number) => {
  //   onPageClick(index) // вызываем onPageClick, чтобы обновить activePage
  //   rotateDotsAroundCenter(data, paginationRef.current, index, () => {})
  // }

  return (
    <div className="pagination-container">
      <div className="pagination_page" ref={paginationRef}>
        <div className="page" onClick={() => onPageClick(activePage)}>
          {`${formatNumber(activePage + 1)}/${formatNumber(totalSlides)}`}
        </div>
      </div>
    </div>
  )
}

export default PaginationComponent
