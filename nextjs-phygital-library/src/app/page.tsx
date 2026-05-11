import { type Homepage } from "@/sanity/types";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
  _id,
  title,
  hero,
  features,
  about,
  contact
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const data = await client.fetch<Homepage | null>(HOMEPAGE_QUERY, {}, options);

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Welcome to Phygital Library</h1>
          <p className="text-gray-600">Please create a "Homepage" document in Sanity Studio to see your content here.</p>
        </div>
      </main>
    );
  }

  const { hero, features, about, contact } = data;

  return (
    <main className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      {hero && (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900 text-white">
          {hero.image && (
            <div className="absolute inset-0 z-0 opacity-40">
              <Image
                src={urlFor(hero.image).url()}
                alt={hero.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="container relative z-10 mx-auto px-8 text-center max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in">
              {hero.title}
            </h1>
            {hero.subtitle && (
              <p className="text-xl md:text-2xl mb-10 text-gray-200">
                {hero.subtitle}
              </p>
            )}
            {hero.ctaText && hero.ctaLink && (
              <Link
                href={hero.ctaLink}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
              >
                {hero.ctaText}
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      {features && (
        <section className="container mx-auto px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{features.title}</h2>
            {features.description && (
              <p className="text-xl text-gray-600">{features.description}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.features?.map((feature) => (
              <div key={feature._key} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                {feature.icon && (
                  <div className="mb-6 relative w-16 h-16">
                    <Image
                      src={urlFor(feature.icon).width(128).height(128).url()}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About Section */}
      {about && (
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-8 max-w-6xl flex flex-col md:flex-row items-center gap-16">
            {about.image && (
              <div className="flex-1 relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={urlFor(about.image).width(800).url()}
                  alt={about.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-6">{about.title}</h2>
              <div className="prose prose-lg text-gray-600">
                <PortableText value={about.content} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {contact && (
        <section className="container mx-auto px-8 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-12">{contact.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contact.email && (
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide text-sm">Email</h3>
                <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline break-all">
                  {contact.email}
                </a>
              </div>
            )}
            {contact.phone && (
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide text-sm">Phone</h3>
                <p className="text-gray-600">{contact.phone}</p>
              </div>
            )}
            {contact.address && (
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide text-sm">Address</h3>
                <p className="text-gray-600 whitespace-pre-line">{contact.address}</p>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}