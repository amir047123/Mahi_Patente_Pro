import { Fragment } from "react";
import { Link } from "react-router-dom";

const DashboardBreadcrumb = ({ role, items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-2">
      <ol className="flex items-center gap-1 text-sm text-secondaryText dark:text-white">
        <li>
          <Link
            to={`/${role}-dashboard`}
            className="block transition hover:text-secondaryText/90 hover:dark:text-gray-200"
          >
            <span className="sr-only"> Home </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </li>

        {items?.map((item) => (
          <Fragment key={item?.name}>
            <li className="rtl:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <Link
                to={`/${role}-dashboard/${item?.path}`}
                className="block transition hover:text-primary text-secondary font-medium"
              >
                {item?.name}
              </Link>
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default DashboardBreadcrumb;
