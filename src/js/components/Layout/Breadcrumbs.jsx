/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showModal } from '../../actions';

class Breadcrumbs extends Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {

  }

  openModal() {
    this.props.showModal();
  }

  render() {
    const listItems = window.location.pathname.split('/');
    const listItemFormated = [];
    _.forEach(listItems, (name) => {
      // Put a space before each uppercase
      let nameFormated = name.replace(/([A-Z])/g, ' $1').trim();
      // Put an uppercase at the beginning of each word
      nameFormated = nameFormated.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
      listItemFormated.push(nameFormated);
    });
    const listToReturn = listItemFormated.map((name, id) =>
      (name === 'Openboxes' || name === '' ? null : (
        <a key={`item-${id}`} href={window.location.pathname.split('/', id + 1).join('/')} className="item-bradcrumbs"> {name}
          <img className="item-bradcrumbs" alt="/" src="/openboxes/images/bc_separator.png" />
        </a>
      )));

    return (
      <div className="bradcrumbs-container d-flex">
        <a className="item-bradcrumbs" href="/openboxes">
          <img alt="Breadcrumbs" src="/openboxes/images/skin/house.png" />
        </a>
        <img className="item-bradcrumbs" alt="/" src="/openboxes/images/bc_separator.png" />
        <a
          role="button"
          href="#"
          onClick={() => { this.openModal(); }}
          className="item-bradcrumbs"
        > {this.props.currentLocationName}
        </a>
        <img className="item-bradcrumbs" alt="/" src="/openboxes/images/bc_separator.png" />
        { listToReturn }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentLocationName: state.session.currentLocation.name,
});

export default connect(mapStateToProps, { showModal })(Breadcrumbs);

Breadcrumbs.propTypes = {
  currentLocationName: PropTypes.string.isRequired,
  // Function called to show the location chooser modal
  showModal: PropTypes.func.isRequired,
};
