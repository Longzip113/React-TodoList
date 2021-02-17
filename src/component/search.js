import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions/index';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyWord: ''
        }
    }
    onChange = (event) =>{
        this.setState({
            keyWord: event.target.value
        })
    }
    onSummit = () =>{
        this.props.onSummitSearch(this.state.keyWord);
    }
  render(){
    return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input type="text"
                            className="form-control" 
                            placeholder="Nhập từ khóa..." 
                            name='keyword'
                            onChange={this.onChange}
                            />
                    <span className="input-group-btn">
                    <button 
                            className="btn btn-primary" 
                            type="button"
                            onClick={this.onSummit}
                            >
                        <span className="fa fa-search mr-5"></span>Tìm
                    </button>
                    </span>
                </div>
            </div>
    );
    }
}

var mapStateToProps  = state  => {
    return {

    }
}

var mapDispatchToProps = (dispatch, props) => {
    return{
        onSummitSearch : keyWord => {
            dispatch(actions.onSearch(keyWord));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);