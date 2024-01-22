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
  // forwardedRef: React.RefObject<HTMLDivElement>
}

const PaginationComponent: React.FC<PaginationProps> = ({
  totalSlides,
  activePage,
  onPageClick,
  data,
  // forwardedRef,
}) => {
  const paginationRef = useRef<HTMLDivElement>(null)

  const formatNumber = (number: number) => number.toString().padStart(2, '0')

  return (
    <div className="pagination-container">
      <div className="pagination_page" ref={paginationRef}>
        <div
          className="page"
          onClick={() => {
            onPageClick(activePage)
            console.log('paginationRef', paginationRef)
          }}
        >
          {`${formatNumber(activePage + 1)}/${formatNumber(totalSlides)}`}
        </div>
      </div>
    </div>
  )
}

export default PaginationComponent
