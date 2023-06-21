/* eslint-disable @next/next/no-img-element */
import Heading from '@/components/atoms/Heading/Heading';
import { Paragraph } from '@/components/atoms/Paragraph';
import React from 'react';
import { personal } from 'src/data/personal';

const Jumbotron = () => {
  return (
    <section className="bg-[url(https://i.ibb.co/yB21srY/field-0-8s-1366px-1.png)] h-screen  bg-no-repeat bg-cover">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-4">
          {/* content */}
          <section className="col-span-8 pt-16">
            <div>
              <div className="flex">
                <div className="mr-2">
                  <img
                    src={personal?.author?.avatar_url}
                    alt="avatar"
                    className="rounded-full w-9 h-9"
                  />
                </div>
                <Paragraph variant="bubble">
                  Hello! Im Agus Trihanton.
                </Paragraph>
              </div>
            </div>
            <Heading sizes="xxl" colors="white" as="h1">
              Fulltime{' '}
              <strong className="text-primary">
                {personal?.author?.title}
              </strong>{' '}
              & <strong className="text-primary">father </strong>
              from the Indonesia
            </Heading>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
