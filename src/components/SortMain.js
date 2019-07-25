import React,{Component}from 'react';
import styles from '../assets/scss/sort.module.scss'

class SortMain extends Component{
    constructor(){
        super();
        this.state={
            
        }
    }

    render(){
    return                 <div className={styles.nav_main}>
    <div className={styles.nav_main_top}>
        <a href="">
        <img src={[require('../assets/images/sort/nav1.jpg')]} alt=""/>
        </a>
    </div>

    <dl className={styles.nav_main_bottom}>
        <dt>
            <a href="">
                <img src={[require('../assets/images/sort/bgwhile.png')]} alt=""/>
                <span>热门专馆</span>
            </a>
        </dt>
        <dd>
            <a href="">
                {/* <img src="" alt=""/> */}
                <div></div>
                <p>文创生活馆</p>
            </a>
        </dd>
        <dd>
            <a href="">
                {/* <img src="" alt=""/> */}
                <div></div>
                <p>文创生活馆</p>
            </a>
        </dd>
        <dd>
            <a href="">
                {/* <img src="" alt=""/> */}
                <div></div>
                <p>文创生活馆</p>
            </a>
        </dd>
    </dl>
</div>
    }
}


export default SortMain