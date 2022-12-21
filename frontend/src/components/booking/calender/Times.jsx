import { FormatColorResetOutlined } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { color } from '@mui/system';
import React, { useEffect } from 'react'
import {useState} from 'react';


const time = [
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
];

function Times(props) {
  const [active, setActive] = useState([]);

  function clickHandler(e) {
    
      props.setTime(e.target.innerText);

      setActive(clicked => {
          if (clicked.includes(e.target.innerText)) {
              return clicked.filter(val => val !== e.target.innerText);
            }
            return e.target.innerText;
      });
  }

  return (
      <Grid
          sx={{ justifyContent: 'center' }}
          container
          margin={2}
          width={500}
          spacing={0.5}>
          {time.map((times, i) => {
              return (
                  <Grid
                      key={times}
                      item
                      md={2.2}
                      sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                          color={
                              active.includes(times) ? 'primary' : 'inherit'
                          }
                          variant='contained'
                          onClick={clickHandler}>
                          {times}
                      </Button>
                  </Grid>
              );
          })}
      </Grid>
  );
}

export default Times;