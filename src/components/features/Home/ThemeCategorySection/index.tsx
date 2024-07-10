import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import { type ThemeData } from '@/types';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const [themes, setThemes] = useState<ThemeData[]>();

  const url = 'https://react-gift-mock-api-two.vercel.app/api/v1/themes';
  useEffect(() => {
    axios.get(url).then((res) => {
      setThemes(res.data.themes);
    });
  }, []);
  // console.log(themes);
  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {themes &&
            themes.map((theme) => (
              <Link to={getDynamicPath.theme(theme.key)}>
                <ThemeCategoryItem image={theme.imageURL} label={theme.label} />
              </Link>
            ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 14px 14px 3px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 45px 52px 23px;
  }
`;
