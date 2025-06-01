import { useCrudOperations } from '@/Hooks/useCRUDOperation';
import Navbar from '@/Shared/Navbar/Navbar';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
    const {id}=useParams()
    const { useEntityById } = useCrudOperations("blog");

    const {
        data: blog
    } = useEntityById(id);
    const tags = blog?.data?.tags?.split(",");
   
    return (
        <div>
            <Navbar />
            <div className="max-w-screen-max_screen mx-auto xl:px-0 lg:px-8 md:px-6 px-4 pt-28  pb-20">
                
                <div className='max-w-2xl mx-auto border  p-5 rounded-md'>
                    <img className="w-full max-h-[350px] object-cover rounded-lg overflow-hidden" src={blog?.data?.thumbnail} alt="Blog post thumbnail" />

                    <div className="text-sm text-gray-600 my-2">{moment(blog?.data?.createdAt).format('ll')}</div>

                    <h2 className='text-2xl font-semibold mb-5'>{blog?.data?.title}</h2>

                    <div dangerouslySetInnerHTML={{ __html: blog?.data?.content }}></div>

                    <div className='mt-4 flex items-center gap-2'>
                        <h2 className='text-gray-400 text-sm'>Tags: </h2>{tags?.map(item => <button key={item} className='bg-gray-50 text-gray-400 border border-gray-400 px-4 py-1 rounded-sm text-xs'>{item}</button>)} 
                    </div>
                </div>
           </div>
        </div>
    );
};

export default BlogDetails;