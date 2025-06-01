import BlogCard from "@/Components/Blogs/BlogCard";
import Typography from "@/Components/Typography";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import Footer from "@/Shared/Footer/Footer";
import Navbar from "@/Shared/Navbar/Navbar";

const Blogs = () => {
    const { useFetchEntities } = useCrudOperations("blog");
    const {
        data: blogs
    } = useFetchEntities();
    return (
        <div>
            <Navbar />
            <div className="max-w-screen-max_screen mx-auto xl:px-0 lg:px-8 md:px-6 px-4 pt-28  pb-20">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <Typography.Heading2 className="">
                        See our Popular{" "}
                        <span className="bg-gradient text-transparent bg-clip-text w-fit">
                            Blogs
                        </span>
                    </Typography.Heading2>
                    <Typography.Body className="text-gray-600 mt-2">
                        Learn in Bangla, practice with real tests, and pass your Italian
                        driving exam with confidence!
                    </Typography.Body>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
                  
                  {
                        blogs?.data?.blogs.map(blog => <BlogCard key={blog?._id} blog={blog} />)
                  }  
                    
                </div>

               
            </div>

            <Footer />
        </div>
    );
};

export default Blogs;
