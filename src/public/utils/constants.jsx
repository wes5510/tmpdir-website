import React from 'react';
import FooterLabelEntity from '../entities/Label';
import FooterLinkEntity from '../entities/Link';
import ShareEntity from '../entities/Share';
import AppInfoEntity from '../entities/AppInfo';

import LogoImg from '../static/images/logo_72w.png';

import FaCopyright from '../../../node_modules/react-icons/lib/fa/copyright';

const tmpdir = {
  name: 'tmpdir',
  url: 'https://tmpdir.sw-warehouse.xyz',
  logo: LogoImg,
  version: 'Beta',
};

const owner = {
  email: 'lkh5510@gmail.com',
  blog: 'http://sw-warehouse.xyz',
};

const C = {
  APP_INFO: new AppInfoEntity(tmpdir.name, tmpdir.url, tmpdir.logo, tmpdir.version),
  SHARE_LIST: [
    new ShareEntity(
      ShareEntity.VENDER.facebook,
      tmpdir.name,
      tmpdir.url,
    ),
    new ShareEntity(
      ShareEntity.VENDER.twitter,
      tmpdir.url,
      tmpdir.name,
    ),
    new ShareEntity(
      ShareEntity.VENDER.googleplus,
      tmpdir.url,
      tmpdir.name,
    ),
    new ShareEntity(
      ShareEntity.VENDER.whatsapp,
      tmpdir.url,
      tmpdir.name,
    ),
    new ShareEntity(
      ShareEntity.VENDER.reddit,
      tmpdir.url,
      tmpdir.name,
    ),
  ],
  LABELS: [
    new FooterLabelEntity('2017 Kihyeon Lee.', <FaCopyright size="16" />),
  ],
  LINKS: [
    new FooterLinkEntity('Mail: ', owner.email, ['mailto:', owner.email].join('')),
    new FooterLinkEntity('Blog: ', owner.blog, owner.blog),
  ],
  ACTION_TYPES: {
    ADD_FILES: 'ADD_FILES',
    DEL_FILE: 'DEL_FILE',
    DEL_ALL_FILE: 'DEL_ALL_FILE',
    UPLOAD_FILES: 'UPLOAD_FILES',
    EMPTY_ERROR: 'EMPTY_ERROR',
  },
  GUIDE_TEXT: '파일을 드랍하거나 클릭하세요',
  FILE: {
    SIZE: {
      MAX: 1000 * 1000 * 1000,
      WARTERMARK: 1000,
      UNITS: ['B', 'KB', 'MB', 'GB'],
    },
  },
};

export default C;
