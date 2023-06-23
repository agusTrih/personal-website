import Heading from '@/components/atoms/Heading/Heading';
import { Highlight } from '@/components/atoms/Highlight';
import { Paragraph } from '@/components/atoms/Paragraph';

import type { NextPage } from 'next';
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';
import { pallete } from 'src/constant';

const Home: NextPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <Heading as="h1" sizes="xxl" className="mb-10">
        Hi, my name is Agus Trihanton and I am a{' '}
        <Highlight color={pallete.primary}>Frontend</Highlight> Engineer with a
        passion for creating{' '}
        <Highlight color={pallete.secondary}>intuitive</Highlight> and{' '}
        <Highlight color={pallete.primaryVariants}>engaging </Highlight> user
        experiences.
      </Heading>
      <Paragraph>
        My skill set encompasses a strong foundation in{' '}
        <Highlight color={pallete.netral}>HTML, CSS, and JavaScript</Highlight>,
        as well as proficiency in popular library and frameworks like{' '}
        <Highlight color={pallete.secondary} type="circle">
          React Js
        </Highlight>{' '}
        and{' '}
        <Highlight color={pallete.secondary} type="circle">
          Next js
        </Highlight>{' '}
        . I am well-versed in utilizing{' '}
        <Highlight color={pallete.secondary} type="circle">
          Git
        </Highlight>{' '}
        for version control and have a solid understanding of{' '}
        <Highlight color={pallete.primaryVariants}>responsive design</Highlight>{' '}
        principles.
      </Paragraph>

      <Paragraph>
        Driven by my{' '}
        <Highlight color={pallete.secondaryVariants}>
          proactive nature
        </Highlight>
        , I constantly seek opportunities to enhance my skills and stay abreast
        of the latest technologies.
      </Paragraph>
      <Paragraph>
        Throughout my professional journey, I have consistently delivered
        <Highlight color={pallete.netral}> high-quality work</Highlight> within
        deadlines, maintaining a track record of{' '}
        <Highlight color={pallete.secondaryVariants}>
          successful collaboration
        </Highlight>
        with cross-functional teams.
      </Paragraph>
      <Paragraph>
        By combining my{' '}
        <Highlight color={pallete.primaryVariants}>
          technical expertise
        </Highlight>
        , passion for creating exceptional user experiences, and commitment to
        continuous improvement, I am confident in my ability to make a valuable
        contribution as a frontend engineer.
      </Paragraph>
      <Paragraph>
        {' '}
        I am excited to leverage my skills and knowledge to craft innovative and
        user-centric solutions.
      </Paragraph>
    </div>
  );
};

export default Home;
