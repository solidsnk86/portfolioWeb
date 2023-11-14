import Link from 'next/link';
import { useState, useEffect } from 'react';
import ImageAvatar from './AvatarBlog';
import { ArrowLeft, ArrowRight, EyeIcon } from 'lucide-react';
import Head from 'next/head';
import { Card } from '@/components/Card';
import { MT } from '@/components/MeteorLanguages';
import { Footer } from '@/components/Footer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://wbywikatpjrneagwppxf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndieXdpa2F0cGpybmVhZ3dwcHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4Mzg5MzAsImV4cCI6MjAxNTQxNDkzMH0.nv6KxxPZBSiROB3-bak4LGAud2ex-wCDvyykMrYDCZQ'
);

const articles = [
  {
    user: '93176365',
    name: 'Calcagni Gabriel',
    companyDev: 'NeoTecs',
    posted: 'November 11, 2023',
    title: 'Exciting News: "I am grateful to present to you this project from NeoTecs."',
    description:
      'Explore our comprehensive web documentation designed to guide you through the process of programming and configuring wireless access points from various leading brands. Whether you are a seasoned developer or just getting started, our documentation offers step-by-step instructions, code examples, and valuable insights to streamline your experience.',
    url: 'https://neotecs.netlify.app',
    articleId: 1
  }
];

const sendViews = async (articleId) => {
  try {
    const { data, error } = await supabase.from('views').upsert([{ article_id: articleId }]);

    if (error) {
      console.error('Error sending views:', error);
    } else {
      console.log('Views sent successfully:', data);
    }
  } catch (error) {
    console.error('Error sending views:', error);
  }
};

export default function MyBlog() {
  const [articleViews, setArticleViews] = useState({});

  useEffect(() => {
    const fetchArticleViews = async () => {
      try {
        const { data, error } = await supabase.from('views').select();
        console.log(data);

        if (error) {
          console.error('Error fetching article views:', error);
        } else {
          const viewsData = data.reduce((acc, view) => {
            // Parseamos el article_id a número
            acc[parseInt(view.article_id, 10)] = view.views_count;
            return acc;
          }, {});

          setArticleViews(viewsData);
        }
      } catch (error) {
        console.error('Error fetching article views:', error);
      }
    };

    fetchArticleViews();
  }, []);

  const articleVisited = async (articleId) => {
    const newViews = (articleViews[articleId] || 0) + 1;
    setArticleViews((prevViews) => {
      const updatedViews = { ...prevViews, [articleId]: newViews };
      console.log('Updated Views:', updatedViews);
      return updatedViews;
    });
    sendViews(articleId);
  };

  return (
    <main className='text-slate-100 bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 h-screen'>
      <Head>
        <meta name='theme-color' content='#F05252' />
      </Head>
      <MT />
      <ArrowLeft
        className='flex relative xl:fixed left-[14px] top-[1.8rem] cursor-pointer text-zinc-300 hover:opacity-[.8]'
        onClick={() => window.open('/', '_self')}
      />
      {articles.map((a, index) => (
        <div key={index} className='xl:w-1/2 justify-center mx-auto pt-20 px-3'>
          <Card>
            <article className='p-6 space-y-6 relative'>
              <header>
                <span className='text-zinc-400 text-sm'>{a.posted}</span>
                <span className='text-zinc-400 absolute top-[25px] right-5 text-sm'>
                  <EyeIcon className='float-right mx-2 my-[2px] w-4 h-4' />
                  {articleViews[a.articleId] || 0}
                </span>
                <h1 className='text-2xl font-semibold my-2'>{a.title}</h1>
                <p className='text-zinc-400 xl:line-clamp-none line-clamp-3'>{a.description}</p>
              </header>
              <aside className='flex space-x-3'>
                <ImageAvatar user={a.user} />
                <div
                  className='flex-col cursor-pointer'
                  onClick={() => window.open(a.url, '_blank')}
                >
                  <span className='font-semibold'>{a.name}</span>
                  <p className='font-light text-zinc-600 text-sm'>{a.companyDev}</p>
                </div>
                <Link
                  href='http://neotecs.netlify.app'
                  onClick={() => articleVisited(a.articleId)}
                  className='read-more absolute right-2 bottom-5 xl:right-10 xl:bottom-10 flex hover:underline'
                >
                  Read More <ArrowRight className='mx-1 arrow' />
                </Link>
              </aside>
            </article>
          </Card>
        </div>
      ))}
      <Footer />
    </main>
  );
}
