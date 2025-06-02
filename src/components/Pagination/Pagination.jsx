"use client"

import { Pagination as BootstrapPagination } from "react-bootstrap"

const Pagination = ({ current, total, limit, onChange, showInfo = true }) => {
  const totalPages = Math.ceil(total / limit)
  const startItem = (current - 1) * limit + 1
  const endItem = Math.min(current * limit, total)

  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, current - delta); i <= Math.min(totalPages - 1, current + delta); i++) {
      range.push(i)
    }

    if (current - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (current + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const visiblePages = totalPages > 1 ? getVisiblePages() : [1]

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
      {showInfo && (
        <div className="mb-2 mb-md-0">
          <small className="text-muted">
            Showing {startItem} to {endItem} of {total} entries
          </small>
        </div>
      )}

      <BootstrapPagination className="mb-0">
        <BootstrapPagination.Prev disabled={current === 1} onClick={() => onChange(current - 1)} />

        {visiblePages.map((page, index) => {
          if (page === "...") {
            return <BootstrapPagination.Ellipsis key={`ellipsis-${index}`} />
          }

          return (
            <BootstrapPagination.Item key={page} active={page === current} onClick={() => onChange(page)}>
              {page}
            </BootstrapPagination.Item>
          )
        })}

        <BootstrapPagination.Next disabled={current === totalPages} onClick={() => onChange(current + 1)} />
      </BootstrapPagination>
    </div>
  )
}

export default Pagination
