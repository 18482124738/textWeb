﻿import { query, remove, add, update,saveList } from '@/services/interestCategoryAPI';
import { message } from 'antd';
// import { runInNewContext } from 'vm';

export default {
  namespace: 'interestCategory',

  state: {
    data: {
      Rows: [],
      pagination: {},
    }
  },
  effects: {  
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      if(!response){
        message.error('请求服务器出错');
      }
      if (response.Success===false) {
        message.error(response.Message);
      } else {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
    *add({ payload, callback }, { call, put }) {
      let response = yield call(add, payload);
      if (response.Success) {
        response = yield call(query);
        yield put({
          type: 'save',
          payload: response,
        });
        if (callback) callback();
      } else {
        message.error(response.Message);
      }
    },
    *saveList({ payload, callback }, { call, put }) {
      let response = yield call(saveList, payload);
      if (response.Success) {
        response = yield call(query);
        yield put({
          type: 'save',
          payload: response,
        });
        if (callback) callback();
      } else {
        message.error(response.Message);
      }
    },
    *remove({ payload, callback }, { call, put }) {
      let response = yield call(remove, payload);
      if (response.Success) {
        response = yield call(query, payload);
        yield put({
          type: 'save',
          payload: response,
        });
        if (callback) callback();
      } else {
        message.error(response.Message);
      }
    },
    *update({ payload, callback }, { call, put }) {
      let response = yield call(update, payload);
      if(!response){
        message.error('请求服务器出错');
      }
      if (response.Success) {
        response = yield call(query, payload);
        yield put({
          type: 'save',
          payload: response,
        });
        if (callback) callback();
      } else {
        message.error(response.Message);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
