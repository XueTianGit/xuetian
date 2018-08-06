import React , {Component } from 'react';
import {Platform , View , Text , Image , StyleSheet , StatusBar} from 'react-native';
import {PropTypes} from 'prop-types';

const NAV_BAR_HEIGHT_ANDROID=50;   //Android的NavigationBar高度
const NAV_BAR_HEIGHT_IOS = 44;    //iOs的NavigationBar高度
const STATUS_BAR_HEIGHT=20;      //状态栏高度
const StatusBarShape={           //状态栏形状的约束 ， 用来属性确认
  backgroundColor:PropTypes.string,
  barStyle:PropTypes.oneOf('default' , 'light-content' , 'dark-content'),
  hidden:PropTypes.bool,
};

export default class NavigatorBar extends Component{
  static propTypes = {
    style: PropTypes.object,  //NavigationBar样式约束
    title: PropTypes.string,  //标题约束：文本类标题
    titleView:PropTypes.element,   //标题的样式约束
    hide:PropTypes.bool,     //是否隐藏NavigationBar
    leftButton:PropTypes.element,   //NavigationBar左侧按钮
    rightButton:PropTypes.element,  //NavigationBar右侧按钮
    statusBar: PropTypes.shape(StatusBarShape),  //状态栏
  };

  static defaultProps ={
    statusBar:{
      barStyle: 'light-content',
      hidden:false,
    }
  };

  constructor(props){
    super(props);
    this.state ={
      title:' ',
      hide:false,
    };
  };

  render(){
    let status = <View style={[styles.statusBarStyle , this.props.statusBar]}>  //获取用户设置的状态栏的样式，用于下面的取出
                    <StatusBar {...this.props.statusBar}/>  //取出用户设置的状态栏的样式
                  </View>;
    let titleView=this.props.titleView ? this.props.titleView : <Text style={styles.titleStyle}>{this.props.title}</Text>;
    let content=<View style={styles.navBarStyle}>
                  {this.props.leftButton}
                  <View style={styles.titleViewContainer}>
                    {titleView}
                  </View>
                  {this.props.rightButton}
                </View>;
    return(
        <View style={[styles.container , this.props.style]}>  //将用户设置的样式取出来
          {status}
          {content}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'gray',
  },
  navBarStyle:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    height:Promise.OS === 'ios'? NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID,
    backgroundColor: '#2196F3',
  },
  titleViewContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    left:40,
    right:40,
    top:0,
    bottom:0,
  },
  titleStyle:{
    fontSize:20,
    color:'white'
  },
  statusBarStyle:{
    height:Platform.OS==='ios'?STATUS_BAR_HEIGHT:0,
  }
});