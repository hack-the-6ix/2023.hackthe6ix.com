import { Typography } from '@ht6/react-ui';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { ElementType } from 'react';
import {
  card,
  content,
  image,
  label,
  name,
  text,
  title
} from './Card.module.scss';

export interface CardProps {
  slide: {
    image?: IGatsbyImageData;
    title: string;
    content: string;
    name: string;
    role: string;
  };
  headingLevel: ElementType<any>;
  //active: boolean;
}

function Card({ slide, headingLevel }: CardProps) {
  return (
    <div className={card}>
      <GatsbyImage
              imgStyle={{ borderRadius: '100%' }}
              image={slide.image!}
              alt={`Headshot of ${slide.name}`}
              className={image}
      />
      <div className={text}>
        <Typography
          className={title}
          textType='heading3'
          textColor='primary-500'
          as={headingLevel}
        >
          {slide.title}
        </Typography>
        <Typography
          className={content}
          textType='paragraph2'
          textColor='copy-dark'
          as='p'
        >
          {slide.content}
        </Typography>
        <p className={label}>
          <Typography textType='heading4' textColor='primary-600' as='span' className={name}>
            {slide.name},{' '}
          </Typography>
          <Typography textType='subheading' textColor='primary-600' as='span'>
            {slide.role}
          </Typography>
        </p>
      </div>
    </div>
  )
}

export default Card;