import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogSection() {

    const Blogs = [
        {
            title: "5 ways to Enhance your Productivity",
            imageUrl : "https://res.cloudinary.com/dashccxm0/image/upload/v1744549976/Rectangle_31_a6k7no.png"
        },
        {
            title: "How to fail in CRM usage",
            imageUrl : "https://res.cloudinary.com/dashccxm0/image/upload/v1744549975/Rectangle_32_wv0lwx.png"
        },
        {
            title: "Explore Our AI Email Generation",
            imageUrl: "https://res.cloudinary.com/dashccxm0/image/upload/v1744549975/Rectangle_33_h9lvqf.png"
        }
    ];

    return (
        <>
            <div className="bg-[#F3F3F6] flex flex-col items-center justify-center p-4 space-y-5 py-12">
                <span className="text-2xl font-extrabold border-l-4 border-[#06AE6F] text-[#06AE6F] px-3">Blogs</span>
                <span className="text-xl font-bold tracking-widest">Our latest articles</span>
                <span className="text-center text-lg pt-6 text-gray-400">Explore our latest articles, trends, tips to optimize your CRM bussiness</span>
                <div className="grid grid-cols-1 place-items-center sm:grid-cols-3 sm:gap-6 space-y-5">
                    { Blogs.map((blog, index) => {
                        return (
                            <BlogCard key={index} {...blog} />
                        );
                    })}
                </div>
                <div>
                    <div  className="bg-[#296C5C] rounded-lg flex items-center justify-center px-4 py-2">
                        <Link className="font-bold text-white text-2xl" href={"/"} >Explore More</Link>
                        <ArrowRight className="ml-2" size={30} color={"white"}  />
                    </div>
                </div>
            </div>
        </>

    );
}

function BlogCard({ title, imageUrl }) {
    return (
      <>
          <div className="py-4">
              <Image className="rounded-lg w-[500px]" src={imageUrl} width={900} height={900}  alt={title} />
              <p className="text-center text-lg font-bold py-4">{title}</p>
          </div>
      </>
    );
}