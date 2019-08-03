import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
import { connect } from 'react-redux';
import bindActions from 'helpers/bindDispatch';
import { Form, Button, Container, Row, Col, Card, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

//redux
import {
  load,
} from 'redux/modules/images';

export class Home extends React.Component {
  static propTypes = {
    images: PropTypes.array,
  };

  static defaultProps = {
    images: []
  };

  state = {
    viewType: 1
  };

  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.elements.forImages.value) {
      this.props.load(form.elements.forImages.value);
    }
  }

  handleToggleView = (value) => {
    this.setState({
      viewType: value
    });
  }

  render() {
    const { images, loading, loaded, error } = this.props;
    const { viewType } = this.state;

    return (
      <Container className={styles.content}>
        <Form onSubmit={this.handleSubmit} className={styles.form}>
          <Row>
            <Col sm={8}>
              <Form.Control id="forImages" type="text" placeholder="Enter Image Tag" />
            </Col>
            <Col sm={4}>
              <Button variant="primary" type="submit" block>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col>
            <ToggleButtonGroup className={styles.toggleButtonGroup} type="radio" name="viewType" onChange={this.handleToggleView} defaultValue={1}>
              <ToggleButton value={1}>List</ToggleButton>
              <ToggleButton value={2}>Grid</ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
        {error && <Row>Oops, something went wrong...</Row>}
        {loading && <Row><Col>Loading...</Col></Row>}
        {loaded && <Row>
          {images.map(image => (
            <Col xs={viewType === 2 ? 6 : 12} md={viewType === 2 ? 4 : 12} key={image.id}>
              <Card className={viewType === 2 ? styles.grid : styles.list}>
                <Card.Img variant="top" src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} />
                <Card.Body>
                  <Card.Title className={styles.title}>{image.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>}
      </Container>
    );
  }
}

export default connect(state => ({
  images: state.images.items,
  loading: state.images.loading,
  loaded: state.images.loaded,
  error: state.images.error
}), bindActions({
  load
}))(Home);
