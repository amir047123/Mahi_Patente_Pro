import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";

const PaginationCompo = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage - delta > 2) {
      pages.unshift("ellipsis-left");
    }
    if (currentPage + delta < totalPages - 1) {
      pages.push("ellipsis-right");
    }

    return pages;
  };

  return (
    <div className="text-secondaryText w-fit">
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(currentPage - 1)}
              />
            </PaginationItem>
          )}

          {/* First Page */}
          <PaginationItem>
            <PaginationLink
              isActive={currentPage === 1}
              onClick={() => onPageChange(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {/* Left Ellipsis */}
          {getPageNumbers().includes("ellipsis-left") && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) =>
            page === "ellipsis-left" || page === "ellipsis-right" ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {/* Right Ellipsis */}
          {getPageNumbers().includes("ellipsis-right") && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Last Page */}
          {totalPages > 1 && (
            <PaginationItem>
              <PaginationLink
                isActive={currentPage === totalPages}
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Next Button */}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationCompo;
