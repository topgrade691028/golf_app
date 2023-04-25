import React, { Component } from 'react';

class AddIndianFoodItem extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event){
    event.preventDefault();
    this.props.onAdd(this.nameInput.value, this.priceInput.value);
    //console.log(this.nameInput.value, this.priceInput.value);
    this.nameInput.value = '';
    this.priceInput.value = '';
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h3> Add Negros Food Item </h3>
        <input placeholder="Name" ref={nameInput => this.nameInput = nameInput} />
        <input placeholder="Price" ref={priceInput => this.priceInput = priceInput} />
        <button>Add</button>

        <hr />
      </form>
  );
 }
}

export default AddIndianFoodItem;
