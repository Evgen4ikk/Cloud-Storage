import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import classes from './ErrorPage.module.scss';

export const ErrorPage: FC = () => {
  return (
    <div>
      <div className={classes.error}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '60vh',
          }}
        >
          <Typography variant='h2' style={{ color: 'black' }}>
            404
          </Typography>
          <Typography variant='h6' style={{ color: 'black' }}>
            The page you’re looking for doesn’t exist.
          </Typography>
          <Link to='/'>
            <Button variant='contained'>Back Home</Button>
          </Link>
        </Box>
      </div>
      <div className={classes.text}>
        <p>404</p>
      </div>
      <div className={classes.container}>
        {/* caveman left */}
        <div className={classes.caveman}>
          <div className={classes.leg}>
            <div className={classes.foot}>
              <div className={classes.fingers}></div>
            </div>
          </div>
          <div className={classes.leg}>
            <div className={classes.foot}>
              <div className={classes.fingers}></div>
            </div>
          </div>
          <div className={classes.shape}>
            <div className={classes.circle}></div>
            <div className={classes.circle}></div>
          </div>
          <div className={classes.head}>
            <div className={classes.eye}>
              <div className={classes.nose}></div>
            </div>
            <div className={classes.mouth}></div>
          </div>
          <div className={classes['arm-right']}>
            <div className={classes.club}></div>
          </div>
        </div>
        {/* caveman right */}
        <div className={classes.caveman}>
          <div className={classes.leg}>
            <div className={classes.foot}>
              <div className={classes.fingers}></div>
            </div>
          </div>
          <div className={classes.leg}>
            <div className={classes.foot}>
              <div className={classes.fingers}></div>
            </div>
          </div>
          <div className={classes.shape}>
            <div className={classes.circle}></div>
            <div className={classes.circle}></div>
          </div>
          <div className={classes.head}>
            <div className={classes.eye}>
              <div className={classes.nose}></div>
            </div>
            <div className={classes.mouth}></div>
          </div>
          <div className={classes['arm-right']}>
            <div className={classes.club}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
