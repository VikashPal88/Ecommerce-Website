import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { ITEMS_PER_PAGE } from "../../app/constants"

export default function Pagination({ handlePage, page, setPage, totalItems }) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

    return (
        <>
            <div className="flex flex-1 justify-between sm:hidden">
                <div
                    onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                    Previous
                </div>
                <div
                    onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                    Next
                </div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{page * ITEMS_PER_PAGE > totalItems ? totalItems : page * ITEMS_PER_PAGE > totalItems}</span> of{' '}
                        <span className="font-medium">{totalItems}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <div
                            onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
                            className="relative inline-flex items-center cursor-pointer rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </div>

                        {Array.from({ length: totalPages }).map((el, index) => (
                            <div
                                onClick={(e) => handlePage(index + 1)}
                                aria-current="page"
                                className={`relative z-10 inline-flex cursor-pointer items-center ${index + 1 === page ? "bg-indigo-600 text-white" : "text-gray-400"}  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                            >
                                {index + 1}
                            </div>
                        ))
                        }
                        <div
                            onClick={(e) => handlePage(page < totalItems ? page + 1 : page)}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 cursor-pointer hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                    </nav>
                </div>
            </div >
        </>

    )
}