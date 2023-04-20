import { GroupButton } from '@app/containers/GroupButtons';
import { InvoiceForm } from '@app/containers/Invoice';
import { getLanguagePending } from '@app/containers/Invoice/store';
import { useAppDispatch } from '@app/store';
import { css } from '@emotion/react';
import { Col, Row } from 'antd';
import { FC, useEffect } from 'react';

const containerStyles = css`
  max-width: 1400px;
  margin: 50px auto;
  padding: 10px;
  .home-row {
    flex-wrap: nowrap;
  }
  @media (max-width: 768px) {
    margin: 20px auto;

    .home-row {
      flex-wrap: wrap;
    }

    .home-right {
      width: 100%;
      flex: 0 0 100% !important;
    }
    .home-left {
      width: 100%;
      flex: 0 0 100% !important;
    }
  }
`;

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLanguagePending());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div css={containerStyles}>
      <Row className="home-row" gutter={0}>
        <Col className="home-left" flex={'85%'}>
          <InvoiceForm />
        </Col>
        <Col className="home-right" flex={'15%'}>
          <GroupButton />
        </Col>
      </Row>
    </div>
  );
};
