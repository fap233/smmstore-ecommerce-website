import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";

import { blogPosts } from "@/constants/blog-posts";

const BlogPage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12 leading-tight">
        Nosso Blog
      </h1>

      <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
        Fique por dentro das últimas tendências, dicas e estratégias para
        dominar o marketing de mídias sociais.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="shadow-lg rounded-xl overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {post.title}
              </CardTitle>
              <CardDescription className="text-gray-500">
                {post.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 line-clamp-3">
                {post.description}
              </p>
              <a
                href={post.link}
                className="text-blue-600 hover:underline font-semibold"
              >
                Leia Mais
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;