import React from 'react';
import styled from 'styled-components';

const SearchBarContent = styled.div`

`;

class SearchBar extends React.Component {
    state = { term:'' };
    
    onFormSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.term);
    }
    
    render() {
        return (
            <SearchBarContent>
                <div className='seartch-Bar-Content ui segment'>
                    <form className="ui form" onSubmit={this.onFormSubmit}>
                    <div className="field">
                        <label>Image Search</label>
                        <input 
                            type="text"
                            value={this.state.term}
                            onChange={(e) => this.setState({term: e.target.value})}
                        />
                    </div>
                    </form>
                </div>
            </SearchBarContent>
        );
    }
}

export default SearchBar;