import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoList} from "./components/TodoList.js";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TodoApp from './components/TodoApp';
import moment from "moment";
import {Login} from './components/Login.js';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'


const LoginView = () => (
      <Login/>
  );

const TodoAppView = () => (
      <TodoApp/>
  );

localStorage.setItem('isLoggedIn','false');
var isLoggedIn = false;

localStorage.setItem('user', "diego@gmail.com");
localStorage.setItem('pass', "123");



class App extends Component {
    
    
    handleLogin(){
        if (localStorage.getItem('isLoggedIn') === 'true'){
            isLoggedIn = true;
        }
    }
    

    constructor(props) {
        super(props);
        this.state = {items: [], text: '', priority: 0, dueDate: moment()};
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    
    


    render() {

        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">TODO React App</h1>
                    </header>

                    <div>
                        <Route path="/todo" component={TodoAppView}/>
                        {!isLoggedIn && (<Route exact path="/" component={LoginView}/>)}
                        {isLoggedIn && (<Route exact path="/" component={LoginView}/>)}
                    </div>
                </div>
            </Router>
        );
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handlePriorityChange(e) {
        this.setState({
            priority: e.target.value
        });
    }
    

    handleDateChange(date) {
        this.setState({
            dueDate: date
        });
    }
    

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.text.length || !this.state.priority.length || !this.state.dueDate)
            return;

        const newItem = {
            text: this.state.text,
            priority: this.state.priority,
            dueDate: this.state.dueDate,

        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: '',
            priority: '',
            dueDate: ''
        }));
    }

}

export default App;
