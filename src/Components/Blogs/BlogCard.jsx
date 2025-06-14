import moment from "moment";
import { Link } from "react-router-dom";

const BlogCard = ({ blog}) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-sm bg-gray-50">
            <img className="w-full h-44 object-cover" src={blog?.thumbnail} alt="Blog post thumbnail" />
            <div className="px-6 py-4">
                <div className="text-sm text-gray-600 mb-2">{moment(blog?.createdAt).format('ll')}</div>
                <div className="font-bold text-xl mb-2 text-gray-800">{blog?.title}</div>
            </div>
            <div className="px-6 pt-4 pb-2">
                <Link to={`/blog-details/${blog?._id}`} className="inline-flex items-center text-blue-600 hover:underline">
                    Read More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;