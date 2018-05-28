import deepFreeze from 'deep-freeze';
import C from '_utils/constants';
import Mocks from '_mocks'
import file, { initState } from '_data/reducers/upload/file';

const state = {
  ...initState,
  list: Mocks.files,
}

describe('file reducer', () => {
  it(`[file] initState Success`, () => {
    const result = file(undefined, {});
    expect(result).toEqual(initState);
  });
  it(`[file] ${C.ACTION_TYPES.ADD_FILES} Success`, () => {
    const newFiles = Mocks.newFiles(10);
    const action = {
      type: C.ACTION_TYPES.ADD_FILES,
      files: newFiles,
    };
    deepFreeze(state);
    deepFreeze(action);
    const result = file(state, action);
    expect(result).toEqual({
      ...state,
      list: [...Mocks.files, ...newFiles]
    });
  });
  it(`[file] ${C.ACTION_TYPES.DEL_FILE} Success`, () => {
    const newFiles = Mocks.newFiles(10);
    const action = {
      type: C.ACTION_TYPES.DEL_FILE,
      filename: state.list[0].name,
    };
    deepFreeze(state);
    deepFreeze(action);
    const result = file(state, action);
    expect(result).toEqual({
      ...state,
      list: Mocks.files.slice(1, Mocks.files.length)
    });
  });
  it(`[file] ${C.ACTION_TYPES.DEL_ALL_FILE} Success`, () => {
    const newFiles = Mocks.newFiles(10);
    const action = {
      type: C.ACTION_TYPES.DEL_ALL_FILE,
    };
    deepFreeze(state);
    deepFreeze(action);
    const result = file(state, action);
    expect(result).toEqual({
      ...state,
      list: [],
    });
  });
  it(`[file] ${C.ACTION_TYPES.UPLOAD_FILES_SUCCESS} Success`, () => {
    const payload = {
      regiId: 'regiId',
      expireTime: 0,
    };
    const action = {
      type: C.ACTION_TYPES.UPLOAD_FILES_SUCCESS,
      payload,
    };
    deepFreeze(state);
    deepFreeze(action);
    const result = file(state, action);
    expect(result).toEqual({
      ...state,
      list: [],
      regiId: payload.regiId,
      expireTime: payload.expireTime,
      uploading: false,
    });
  });
  it(`[file] ${C.ACTION_TYPES.UPLOAD_FILES_FAILURE} Success`, () => {
    const error = 'error';
    const action = {
      type: C.ACTION_TYPES.UPLOAD_FILES_FAILURE,
      error,
    };
    deepFreeze(state);
    deepFreeze(action);
    const result = file(state, action);
    expect(result).toEqual({
      ...state,
      list: [],
      error,
      uploading: false,
    });
  });
  it(`[file] ${C.ACTION_TYPES.UPLOAD_FILES_PENDING} Success`, () => {
    const totalSize = 0;
    const uploadedSize = 0;
    const action = {
      type: C.ACTION_TYPES.UPLOAD_FILES_PENDING,
      totalSize,
      uploadedSize,
    };
    deepFreeze(state);
    deepFreeze(action);
    const result = file(state, action);
    expect(result).toEqual({
      ...state,
      uploading: true,
      totalSize,
      uploadedSize,
    });
  });
  it(`[file] ${C.ACTION_TYPES.EMPTY_ERROR} Success`, () => {
    const action = {
      type: C.ACTION_TYPES.EMPTY_ERROR,
    };
    deepFreeze(state);
    deepFreeze(action);
    const result = file(state, action);
    expect(result).toEqual({
      ...state,
      error: '',
    });
  });
  it(`[file] ${C.ACTION_TYPES.EMPTY_REGI_ID} Success`, () => {
    const action = {
      type: C.ACTION_TYPES.EMPTY_REGI_ID,
    };
    deepFreeze(state);
    deepFreeze(action);
    const result = file(state, action);
    expect(result).toEqual({
      ...state,
      regiId: '',
    });
  });
});
