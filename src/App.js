import React,{Component} from 'react';

import './assets/css/common/reset.css';

class App extends Component{
  constructor(){
    super();
    this.state = {
      subNav : [
        {
          name:'Home',
          path:'/home',
          title:"首页",
          icon:""
        }
      ]
    }
  }
  render(){
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;