import React from 'react';
import './AppClass.css';
import axios from 'axios';
import StarMatch from './StarMatch';
import App from './App';
// const testData = [
// 		{name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
//      {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
//      {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
// ];
const CardList = (props) => (
        <div>
           {props.profiles.map(profile =>  <Card key={profile.id} {...profile} />)}  {/* Mapping all the testdata items by looping <Card />*/}
             {/* <Card {...testData[0]} />  sending all properties of testData object as props */}
             {/* <Card {...testData[1]} /> react initialises its card class instance here */}
        </div>
);
class Card extends React.Component {
    render(){
        const profile = this.props; //Use class card instance using this keyword
        return (
            <div className="github-profile" style={{ margin: 'none'}}> {/*We can use style property instead of global css, unlike html it works for conditional styling */}
                <img src={profile.avatar_url} />
                <div className="info">
                <div style={{color: Math.random() < 0.5? 'red': 'blue'}}>{profile.name}</div> {/* Conditonal styling using classes is not easy, so use style property */}
                <div className="company">{profile.company}</div>
                </div>
    	    </div>
        );
    }
}
class Form extends React.Component{
    state = { username : ''};
    /*userNameInput = React.createRef(); we need to create ref and refer it for that html element */
    handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(this.userNameInput.current.value);
        // console.log(this.state.username);
       const res = await axios.get(`https://api.github.com/users/${this.state.username}`);
        //console.log(res.data);
        this.props.onSubmit(res.data);
        this.setState({username : ''});
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
               {/* <input type='text' placeholder='Github username' ref={this.userNameInput} required></input> ref is a fancy way of using id of html elements */}
               <input type='text' placeholder='Github username' value={this.state.username} onChange={event => this.setState({username:event.target.value})} required></input> {/* we are using value and onChange to track every keypress change  */}
                <button>Add Card</button>
            </form>
        );
    }
}
class AppClass extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state ={ //this.state should be an object to capture state of the properties
    //         profiles:testData
    //     };
    // }
    //simpler code for above logic
    state = { 
        profiles:[]
              //profiles:testData
    };
    addNewProfile = (profileData) => {
    this.setState(prevState => ({
          profiles: [...prevState.profiles, profileData]
    }))
    }
    render(){
        return (
            <div>
                <div className='header'>
                    <div style={{float: 'left'}}>
                        <div>{this.props.title}</div>
                        <Form onSubmit={this.addNewProfile}/>
                        <CardList profiles={this.state.profiles} />
                    </div>
                </div>
                <div style={{ float: 'left', marginLeft: '100px'}}>
                    <StarMatch />
                </div>
                <div>
                    <App />
                </div>
            </div>
        );
    }
}


export default AppClass;