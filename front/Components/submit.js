import { SubmissionError } from 'redux-form';
import { all, fork, takeLatest, delay, put, call } from 'redux-saga/effects';
//import { initialState } from '../reducers/user';

const sleep = new Promise((resolve, reject) => {
    if (true) {
        resolve('성공')
    }
});

export default (async function submit(values) {
  await sleep.then((m) => {
      console.log(m)
        
  }); // simulate server latency

  //window.alert(`You submitted:${JSON.stringify(values, null, 2)}`);
  console.log(values)

});