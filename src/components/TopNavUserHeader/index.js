import React, { PureComponent } from 'react';
import Link from 'umi/link';

import RightContent from '../GlobalUserHeader/RightContent';
import HeaderSearch from '../HeaderSearch';
// import BaseMenu from '../SiderMenu/BaseMenu';
// import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';
import styles from './index.less';



export default class TopNavHeader extends PureComponent {
  state = {
    maxWidth: undefined,
  };

  static getDerivedStateFromProps(props) {
    return {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 280 - 165 - 40,
    };
  }

  render() {
    const { theme, contentWidth, logo } = this.props;
    const { maxWidth } = this.state;
    return (
      <div className={`${styles.head} ${theme === 'light' ? styles.light : ''}`}>
        <div
          ref={ref => {
            this.maim = ref;
          }}
          className={`${styles.main} ${contentWidth === 'Fixed' ? styles.wide : ''}`}
        >
          <div className={styles.left}>
            <div className={styles.logo} key="logo" id="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
                <h1>在线教育</h1>
              </Link>
            </div>
            <div
              style={{
                maxWidth,
              }}
            >
              <HeaderSearch />
            </div>
          </div>
          <RightContent {...this.props} />
        </div>
      </div>
    );
  }
}
