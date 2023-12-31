import React, { Component } from "react";

import React, { Component, useState } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };

  }

  handleChange = (e) => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
  
    this.setState({ activeItem });
  };

  handleBooleanChange = (e) => {
    let { name, value } = e.target;
    let checked = e.target.checked
    console.log(checked)
    const activeItem = { ...this.state.activeItem, [name]: checked };
    this.setState({ activeItem });
  };

  render() {
    const { onSave } = this.props;
    return (
      <Modal isOpen={true} animation={false}>
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
          <Form>
          <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={this.state.activeItem.firstName}
                onChange={this.handleChange}
                placeholder=""
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={this.state.activeItem.lastName}
                onChange={this.handleChange}
                placeholder=""
              />
            </FormGroup>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={this.state.activeItem.username}
                onChange={this.handleChange}
                placeholder=""
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={this.state.activeItem.password}
                onChange={this.handleChange}
                placeholder=""
              />
            </FormGroup>
            <FormGroup>
              <Label for="passwordConfirm">Confirm Password</Label>
              <Input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={this.state.activeItem.passwordConfirm}
                onChange={this.handleChange}
                placeholder=""
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle} animation={false}>
        <ModalHeader toggle={toggle}>New Song</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="song-title">Title</Label>
              <Input
                type="text"
                id="song-title"
                name="song"
                value={this.state.activeItem.song}
                onChange={this.handleChange}
                placeholder="Enter song title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="song-artist">Artist</Label>
              <Input
                type="text"
                id="song-artist"
                name="artist"
                value={this.state.activeItem.artist}
                onChange={this.handleChange}
                placeholder="Enter song artist"
              />
            </FormGroup>
            <FormGroup>
              <Label for="song-genre">Genre</Label>
              <select
                id="song-genre"
                name="genre"
                onChange={this.handleChange}
                value={this.state.activeItem.genre}
              >
                <option value=""> </option>
                <option value="Pop">Pop</option>
                <option value="Hip-Hop">Hip-Hop</option>
                <option value="Rock">Rock</option>
                <option value="Classic">Classic</option>
                <option value="Country">Country</option>
                <option value="Indie">Indie</option>
                <option value="EDM">EDM</option>
                <option value="Jazz">Jazz</option>
                <option value="RnB">R&B</option>
                <option value="Other">Other</option>



              </select>
              {/* <Input
                type="text"
                id="song-genre"
                name="genre"
                value={this.state.activeItem.genre}
                onChange={this.handleChange}
                placeholder="Enter song genre"
              /> */}
            </FormGroup>
            <FormGroup check>
              <Label check for="song-favorite">Send to Favorites List</Label>
              <Input
                type="checkbox"
                id="song-favorite"
                name="favorite"
                value={this.state.activeItem.favorite}
                onClick={this.handleBooleanChange}
                defaultChecked={this.state.activeItem.favorite}
                
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem,'songs')}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}