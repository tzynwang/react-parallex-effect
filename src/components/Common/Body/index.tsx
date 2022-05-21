import React, { memo, useRef, useMemo, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { red, purple, amber } from '@mui/material/colors';
import Image from '@Components/Base/Image';
import StaticImage from '@Components/Base/StaticImage';
import BodyBlock from '@Components/Common/BodyBlock';
import useViewportHeight from '@Hooks/useViewportHeight';
import useWindowScrollTop from '@Hooks/useWindowScrollTop';
import type { BlocksInVP, TriggerPoints } from './types';

const BodyContainer = styled('div')(() => ({
  backgroundColor: purple[50],
}));
const StaticSection = styled('div')(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));
const StaticBlock = styled('div')(() => ({
  padding: '24px',
}));
const ScrollAnimationSection = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));
const ImageContainer = styled('div')(() => ({
  height: '300vh',
  width: '100%',
  position: 'relative',
  flex: '1 1 60%',
}));
const TextContainer = styled('div')(() => ({
  flex: '1 1 40%',
}));
const TextBlock = styled('div')(() => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
}));

const BLOCK_IN_VP: BlocksInVP = {
  ref01: false,
};

const TRIGGER_POINTS: TriggerPoints = {
  ref01: 0,
  ref02: 0,
  ref03: 0,
};

function Body(): React.ReactElement {
  // States
  const block01Ref = useRef<HTMLDivElement | null>(null);
  const [inVP, setInVP] = useState<BlocksInVP>(BLOCK_IN_VP);
  const [trigger, setTrigger] = useState<TriggerPoints>(TRIGGER_POINTS);
  const [currentSec, setCurrentSec] = useState<string>('');
  const vpHeight = useViewportHeight();
  const scrollTop = useWindowScrollTop();

  // Functions
  const handleScroll = (): void => {
    if (!block01Ref.current) return;
    if (
      block01Ref.current.getBoundingClientRect().top < 1 &&
      block01Ref.current.getBoundingClientRect().bottom > 1
    ) {
      setInVP({ ref01: true });
    } else {
      setInVP({ ref01: false });
    }
  };

  // Hooks
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [block01Ref.current]);
  useEffect(() => {
    if (block01Ref.current && vpHeight) {
      setTrigger({
        ref01: block01Ref.current.getBoundingClientRect().top,
        ref02: block01Ref.current.getBoundingClientRect().top + vpHeight,
        ref03: block01Ref.current.getBoundingClientRect().top + vpHeight * 2,
      });
    }
  }, [block01Ref.current, vpHeight]);
  useEffect(() => {
    if (scrollTop > trigger.ref03) {
      setCurrentSec('ref03');
    } else if (scrollTop > trigger.ref02) {
      setCurrentSec('ref02');
    } else if (scrollTop > trigger.ref01) {
      setCurrentSec('ref01');
    } else {
      setCurrentSec('');
    }
  }, [scrollTop, trigger]);

  // Views
  const imgSrc = useMemo(() => {
    console.info(currentSec);
    if (currentSec === 'ref03') {
      return 'https://cdn.stocksnap.io/img-thumbs/960w/animals-cats_UCS90HFBJL.jpg';
    }
    if (currentSec === 'ref02') {
      return 'https://cdn.stocksnap.io/img-thumbs/960w/animals-cats_H2G3Y61IGJ.jpg';
    }
    return 'https://cdn.stocksnap.io/img-thumbs/960w/animals-feline_GWKZ6SI2ED.jpg';
  }, [currentSec]);

  // Main
  return (
    <BodyContainer>
      <BodyBlock bgColor={red[50]}>landing block</BodyBlock>
      {/* static content: theme.breakpoints.down('md') */}
      <StaticSection className="StaticSection">
        <StaticBlock>
          <StaticImage src="https://cdn.stocksnap.io/img-thumbs/960w/animals-feline_GWKZ6SI2ED.jpg" />
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            labore magni, blanditiis quos omnis neque dolore eius aperiam, sint
            dicta, culpa eos velit modi reprehenderit quam nemo. Aliquam,
            debitis quae.
          </div>
        </StaticBlock>
        <StaticBlock>
          <StaticImage src="https://cdn.stocksnap.io/img-thumbs/960w/animals-cats_H2G3Y61IGJ.jpg" />
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            labore magni, blanditiis quos omnis neque dolore eius aperiam, sint
            dicta, culpa eos velit modi reprehenderit quam nemo. Aliquam,
            debitis quae.
          </div>
        </StaticBlock>
        <StaticBlock>
          <StaticImage src="https://cdn.stocksnap.io/img-thumbs/960w/animals-cats_UCS90HFBJL.jpg" />
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            labore magni, blanditiis quos omnis neque dolore eius aperiam, sint
            dicta, culpa eos velit modi reprehenderit quam nemo. Aliquam,
            debitis quae.
          </div>
        </StaticBlock>
      </StaticSection>
      {/* scroll animation: theme.breakpoints.up('md') */}
      <ScrollAnimationSection className="ScrollAnimationSection">
        <ImageContainer ref={block01Ref}>
          <Image src={imgSrc} inVP={inVP.ref01} currentSec={currentSec} />
        </ImageContainer>
        <TextContainer>
          <TextBlock>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
            quas eum, praesentium quod totam distinctio porro asperiores neque
            minima repellendus magnam dolor voluptate alias deleniti facilis
            dicta vel laborum illo?
          </TextBlock>
          <TextBlock>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
            quas eum, praesentium quod totam distinctio porro asperiores neque
            minima repellendus magnam dolor voluptate alias deleniti facilis
            dicta vel laborum illo?
          </TextBlock>
          <TextBlock>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
            quas eum, praesentium quod totam distinctio porro asperiores neque
            minima repellendus magnam dolor voluptate alias deleniti facilis
            dicta vel laborum illo?
          </TextBlock>
        </TextContainer>
      </ScrollAnimationSection>
      <BodyBlock bgColor={amber[50]}>bottom block</BodyBlock>
    </BodyContainer>
  );
}

export default memo(Body);
