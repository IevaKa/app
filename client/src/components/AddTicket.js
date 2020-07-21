import React, { Component } from 'react';
import axios from 'axios';

export default class AddTicket extends Component {
  state = {
    lab: '',
    title: '',
    description: ''
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post('/api/tickets', {
        lab: this.state.lab,
        title: this.state.title,
        description: this.state.description,
        status: 'Opened'
      })
      .then(() => {
        console.log('here', this.props.history)
        this.setState({
            lab: '',
            title: '',
            description: ''
        });
        this.props.history.push('/tickets');
        console.log('after the push', this.state)
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="Lab">Lab</label>
            <select className="form-control" id="lab" name='lab' onChange={this.handleChange}>
                <option value="React | Ironbeers">React | Ironbeers</option>
                <option value="React | Wiki Countries">React | Wiki Countries</option>
                <option value="React | IronBook">React | IronBook</option>
            </select>
        </div>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="title" 
                    name="title" 
                    aria-describedby="title"
                    onChange={this.handleChange}
                    value={this.state.title}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="description">description</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="description"
                    name="description"
                    aria-describedby="description"
                    onChange={this.handleChange}
                    value={this.state.description}
                    />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
  }
}