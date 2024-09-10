import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { LikeButton } from '@/components/LikeButton';
import Image from 'next/image';
import Modal from '@/components/Modal';


interface Blog {
  id: number;
  title: string;
  description: string;
  authorName: string;
  imageUrl: string;
  content: string;
  likes: number;
}

const BlogPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the blog ID from the URL
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Exit early if the ID is not available

    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/getBlog?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }

        const blogData: Blog = await response.json();
        setBlog(blogData)
      } catch (e: any) {
        setError(e.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]); // Dependency on the ID parameter

  if (loading) {
    return (
      <Modal show={loading}>

        <span className="loading loading-infinity loading-lg"></span>

      </Modal>
    );
  }

  if (error) {
    return <div className="text-center mt-10 min-h-screen flex items-center justify-center text-xl text-red-500">Error: {error}</div>;
  }

  if (!blog) {
    return <div className="text-center mt-10 min-h-screen flex items-center justify-center text-xl text-gray-500">Blog not found</div>;
  }

  return (
    <div className="container mx-auto mt-8 px-4 lg:px-32 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {blog.imageUrl && (
          <Image width={500} height={700} src={blog.imageUrl} alt={blog.title} className="w-full  object-fit rounded-t-lg" />
        )}
        <div className="p-6">
          <h1 className="text-2xl lg:4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
          <p className="text-gray-600 mb-6">{blog.description}</p>
          <div className="text-gray-800">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
          <div className="mt-4">
            <LikeButton initialLikes={blog.likes} />
          </div>

          <p className="mt-6 text-sm text-gray-500">Author: {blog.authorName}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
