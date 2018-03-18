import PropTypes from 'prop-types';
import React from 'react';
import FooterLabel from './Label';
import FooterLink from './Link';

class Footer extends React.Component {
  makeLinks() {
    return this.props.links.map(link => (
      <FooterLink
        key={link.title}
        title={link.title}
        url={link.url}
        text={link.text}
      />
    ));
  }
  makeLabels() {
    return this.props.labels.map(label => (
      <FooterLabel
        key={label.text}
        icon={label.icon}
        text={label.text}
      />
    ));
  }
  render() {
    const links = this.makeLinks();
    const labels = this.makeLabels();
    const ele = (
      <div className="footer">
        {labels}
        {links}
      </div>
    );
    return ele;
  }
}

Footer.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })),
  labels: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.node,
    text: PropTypes.string.isRequired,
  })),
};

Footer.defaultProps = {
  links: null,
  labels: null,
};

export default Footer;