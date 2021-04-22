import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TchatViewer.module.scss';
import {REST_ADR} from '../../config/config';

const TchatViewer = (props) => {
  const [messages, setmessages] = useState([]);
  const [lastId, setlastId] = useState(-1);
  const [fetchCount, setfetchCount] = useState(0)
  
  useEffect(() => {
    fetch(`${REST_ADR}/messages?id_gte=${lastId+1}`)
    .then(flux=>flux.json())
    .then(jsonArr=> {
      setTimeout(() =>setfetchCount(fetchCount+1),5000);
      let last=lastId;
      jsonArr.forEach(e=>{if(last<e.id)last=e.id})
      if(lastId<last)setlastId(last);
      setmessages([...messages,...jsonArr]);
      return jsonArr;
    })
  }, [fetchCount]);

  return(
  <div className={styles.TchatViewer} data-testid="TchatViewer">
    {messages.map((e,i)=><div className="message" key={'message='+i}>
      {e.dateTime && e.dateTime.split('T')[1].split('.')[0]+':'}:<span style={{color:e.color}}>{e.text}</span>
      {JSON.stringify(e)}</div>)}
  </div>
);}

TchatViewer.propTypes = {};

TchatViewer.defaultProps = {};

export default TchatViewer;
